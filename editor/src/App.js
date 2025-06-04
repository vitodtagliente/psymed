import React, { useState, useEffect, useRef } from 'react';

// Main App component
const App = () =>
{
  // State to hold the JSON data
  const [jsonData, setJsonData] = useState(null);
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('problems');
  // State for input fields for adding new items (strings)
  const [newItem, setNewItem] = useState('');
  // State for messages to the user (e.g., success, error)
  const [message, setMessage] = useState('');

  // States for nested modifier editing
  const [selectedModifierType, setSelectedModifierType] = useState(null); // e.g., 'gravita'
  const [selectedModifierSubtype, setSelectedModifierSubtype] = useState(null); // e.g., 'lieve'

  // States for adding new modifier types and subtypes
  const [newModifierTypeName, setNewModifierTypeName] = useState('');
  const [newModifierSubtypeName, setNewModifierSubtypeName] = useState('');

  // States for BPRS Categories editing
  const [selectedBPRSCategoryId, setSelectedBPRSCategoryId] = useState(null);
  const [selectedMappingIndex, setSelectedMappingIndex] = useState(null);
  const [newBPRSCategoryName, setNewBPRSCategoryName] = useState('');
  const [newBPRSCategoryId, setNewBPRSCategoryId] = useState('');

  // State for entityTextKeywords multi-select
  const [selectedKeywordsForMapping, setSelectedKeywordsForMapping] = useState([]);
  // State for interactive modifierRules editor
  const [editingModifierRules, setEditingModifierRules] = useState({}); // Initialized useState with an empty object
  // State for baseScore input in BPRS mapping
  const [newMappingBaseScoreInput, setNewMappingBaseScoreInput] = useState(0);

  // States for GAF configuration editing
  const [gafInitialGAF, setGafInitialGAF] = useState(100);
  const [gafNegationImpactFactor, setGafNegationImpactFactor] = useState(0.2);
  const [gafEntityImpact, setGafEntityImpact] = useState({});
  const [gafModifiersImpact, setGafModifiersImpact] = useState({});
  const [newGafEntityText, setNewGafEntityText] = useState('');
  const [newGafEntityImpactValue, setNewGafEntityImpactValue] = useState(0);
  const [selectedGafModifierType, setSelectedGafModifierType] = useState(null);
  const [newGafModifierSubtype, setNewGafModifierSubtype] = useState('');
  const [newGafModifierValue, setNewGafModifierValue] = useState(1.0);

  // Ref for the file input element
  const fileInputRef = useRef(null);


  // Define the categories and their display names
  const categories = {
    problems: 'Problemi',
    negationPrefixes: 'Prefissi di Negazione',
    negationSuffixes: 'Suffissi di Negazione',
    terminationPhrases: 'Frasi di Terminazione',
    pseudoNegations: 'Pseudo Negazioni',
    modifiers: 'Modificatori',
    bprsCategories: 'Categorie BPRS',
    therapies: 'Terapie',
    gaf: 'GAF Configurazione' // New category for GAF
  };

  // Effect to clear messages after a few seconds
  useEffect(() =>
  {
    if (message)
    {
      const timer = setTimeout(() =>
      {
        setMessage('');
      }, 3000); // Clear message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Reset modifier and BPRS selection when changing tabs
  useEffect(() =>
  {
    // Reset modifier states
    setSelectedModifierType(null);
    setSelectedModifierSubtype(null);
    setNewModifierTypeName('');
    setNewModifierSubtypeName('');
    setNewItem(''); // Clear generic item input on tab change

    // Reset BPRS states
    setSelectedBPRSCategoryId(null);
    setSelectedMappingIndex(null);
    setNewBPRSCategoryName('');
    setNewBPRSCategoryId('');
    setSelectedKeywordsForMapping([]);
    setEditingModifierRules({});
    setNewMappingBaseScoreInput(0); // Reset base score input

    // Reset GAF states
    setNewGafEntityText('');
    setNewGafEntityImpactValue(0);
    setSelectedGafModifierType(null);
    setNewGafModifierSubtype('');
    setNewGafModifierValue(1.0);

    // Load GAF data if tab is GAF and jsonData exists
    if (activeTab === 'gaf' && jsonData?.gaf)
    {
      setGafInitialGAF(jsonData.gaf.initialGAF || 100);
      setGafNegationImpactFactor(jsonData.gaf.negationImpactFactor || 0.2);
      setGafEntityImpact(jsonData.gaf.entityImpact || {});
      // Initialize GAF modifier rules editor on tab change
      const initialGafModifierRules = {};
      if (jsonData.modifiers)
      {
        Object.keys(jsonData.modifiers).forEach(typeKey =>
        {
          initialGafModifierRules[typeKey] = {};
          Object.keys(jsonData.modifiers[typeKey]).forEach(subtypeKey =>
          {
            initialGafModifierRules[typeKey][subtypeKey] = jsonData.gaf.modifiersImpact?.[typeKey]?.[subtypeKey] || 1.0;
          });
        });
      }
      setEditingGafModifierRules(initialGafModifierRules);
    }
  }, [activeTab, jsonData]);

  // Update mapping input fields when a new mapping is selected (for BPRS)
  useEffect(() =>
  {
    if (activeTab === 'bprsCategories' && selectedBPRSCategoryId !== null && selectedMappingIndex !== null && jsonData)
    {
      const category = jsonData.bprsCategories.find(cat => cat.id === selectedBPRSCategoryId);
      const mapping = category?.mappings?.[selectedMappingIndex];
      if (mapping)
      {
        // Set selected keywords for the multi-select
        setSelectedKeywordsForMapping(mapping.entityTextKeywords || []);

        // Populate editingModifierRules state from existing mapping.modifierRules
        const initialModifierRules = {};
        if (jsonData.modifiers)
        {
          Object.keys(jsonData.modifiers).forEach(typeKey =>
          {
            initialModifierRules[typeKey] = {};
            Object.keys(jsonData.modifiers[typeKey]).forEach(subtypeKey =>
            {
              // Get existing adjustment or default to 0
              initialModifierRules[typeKey][subtypeKey] = mapping.modifierRules?.[typeKey]?.[subtypeKey]?.adjustment || 0;
            });
          });
        }
        setEditingModifierRules(initialModifierRules);
        setNewMappingBaseScoreInput(mapping.baseScore || 0); // Set base score input
      }
    }
  }, [selectedBPRSCategoryId, selectedMappingIndex, activeTab, jsonData]);

  // Helper function to remove duplicates from an array
  const removeDuplicates = (arr) => Array.isArray(arr) ? [...new Set(arr)] : arr;

  // Handle file upload
  const handleFileUpload = (event) =>
  {
    const file = event.target.files[0];
    if (file)
    {
      const reader = new FileReader();
      reader.onload = (e) =>
      {
        try
        {
          const parsedData = JSON.parse(e.target.result);
          // Validate the structure of the uploaded JSON
          const expectedKeys = Object.keys(categories).filter(key => key !== 'gaf'); // GAF is nested
          let isValidStructure = true;

          // Sanitize relevant arrays to remove duplicates when loading from file
          if (parsedData.problems)
          {
            parsedData.problems = removeDuplicates(parsedData.problems);
          }
          if (parsedData.negationPrefixes)
          {
            parsedData.negationPrefixes = removeDuplicates(parsedData.negationPrefixes);
          }
          if (parsedData.negationSuffixes)
          {
            parsedData.negationSuffixes = removeDuplicates(parsedData.negationSuffixes);
          }
          if (parsedData.terminationPhrases)
          {
            parsedData.terminationPhrases = removeDuplicates(parsedData.terminationPhrases);
          }
          if (parsedData.pseudoNegations)
          {
            parsedData.pseudoNegations = removeDuplicates(parsedData.pseudoNegations);
          }
          if (parsedData.therapies)
          {
            parsedData.therapies = removeDuplicates(parsedData.therapies);
          }

          // Check top-level keys and their types
          for (const key of expectedKeys)
          {
            if (key === 'modifiers')
            {
              if (typeof parsedData[key] !== 'object' || parsedData[key] === null)
              {
                isValidStructure = false;
                break;
              }
            } else if (key === 'bprsCategories')
            {
              if (!Array.isArray(parsedData[key]))
              {
                isValidStructure = false;
                break;
              }
              // Optional: Deeper validation for bprsCategories array items
              for (const cat of parsedData[key])
              {
                if (typeof cat.id !== 'string' || typeof cat.name !== 'string' || !Array.isArray(cat.mappings))
                {
                  isValidStructure = false;
                  break;
                }
              }
            } else if (key === 'gaf')
            { // Check GAF structure
              if (typeof parsedData[key] !== 'object' || parsedData[key] === null ||
                typeof parsedData[key].initialGAF !== 'number' ||
                typeof parsedData[key].negationImpactFactor !== 'number' ||
                typeof parsedData[key].entityImpact !== 'object' || parsedData[key].entityImpact === null ||
                typeof parsedData[key].modifiersImpact !== 'object' || parsedData[key].modifiersImpact === null)
              {
                isValidStructure = false;
                break;
              }
            }
            else
            { // For simple array categories like problems, negationPrefixes, therapies
              if (!Array.isArray(parsedData[key]))
              {
                isValidStructure = false;
                break;
              }
            }
          }

          if (isValidStructure)
          {
            setJsonData(parsedData);
            setMessage('File JSON caricato con successo!');
          } else
          {
            setMessage('Errore: Il file JSON non ha la struttura attesa.');
            setJsonData(null); // Reset data if structure is invalid
          }
        } catch (error)
        {
          setMessage('Errore nella lettura del file JSON: ' + error.message);
          setJsonData(null); // Reset data on parsing error
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle adding a new item to the current active list (strings)
  const handleAddItem = () =>
  {
    if (newItem.trim() === '')
    {
      setMessage('L\'elemento non può essere vuoto.');
      return;
    }

    let targetList = null;
    if (activeTab === 'modifiers' && selectedModifierType && selectedModifierSubtype)
    {
      targetList = jsonData?.modifiers?.[selectedModifierType]?.[selectedModifierSubtype];
    } else if (activeTab !== 'modifiers' && activeTab !== 'bprsCategories' && activeTab !== 'gaf')
    { // Exclude bprsCategories and gaf
      targetList = jsonData?.[activeTab];
    }

    if (targetList && Array.isArray(targetList))
    {
      if (targetList.includes(newItem.trim()))
      {
        setMessage('Errore: L\'elemento esiste già.');
        return;
      }

      const updatedJsonData = { ...jsonData };
      if (activeTab === 'modifiers' && selectedModifierType && selectedModifierSubtype)
      {
        updatedJsonData.modifiers = {
          ...updatedJsonData.modifiers,
          [selectedModifierType]: {
            ...updatedJsonData.modifiers[selectedModifierType],
            [selectedModifierSubtype]: [...targetList, newItem.trim()],
          },
        };
      } else if (activeTab !== 'modifiers' && activeTab !== 'bprsCategories' && activeTab !== 'gaf')
      {
        updatedJsonData[activeTab] = [...targetList, newItem.trim()];
      }
      setJsonData(updatedJsonData);
      setNewItem(''); // Clear input field
      setMessage('Elemento aggiunto con successo!');
    } else
    {
      setMessage('Errore: Seleziona una categoria valida per aggiungere un elemento.');
    }
  };

  // Handle removing an item from the current active list (strings) by index
  const handleRemoveItem = (indexToRemove) =>
  {
    let targetList = null;
    if (activeTab === 'modifiers' && selectedModifierType && selectedModifierSubtype)
    {
      targetList = jsonData?.modifiers?.[selectedModifierType]?.[selectedModifierSubtype];
    } else if (activeTab !== 'modifiers' && activeTab !== 'bprsCategories' && activeTab !== 'gaf')
    { // Exclude bprsCategories and gaf
      targetList = jsonData?.[activeTab];
    }

    if (targetList && Array.isArray(targetList))
    {
      const updatedJsonData = { ...jsonData };
      if (activeTab === 'modifiers' && selectedModifierType && selectedModifierSubtype)
      {
        updatedJsonData.modifiers = {
          ...updatedJsonData.modifiers,
          [selectedModifierType]: {
            ...updatedJsonData.modifiers[selectedModifierType],
            [selectedModifierSubtype]: targetList.filter((_, index) => index !== indexToRemove),
          },
        };
      } else if (activeTab !== 'modifiers' && activeTab !== 'bprsCategories' && activeTab !== 'gaf')
      {
        updatedJsonData[activeTab] = targetList.filter((_, index) => index !== indexToRemove);
      }
      setJsonData(updatedJsonData);
      setMessage('Elemento rimosso con successo!');
    } else
    {
      setMessage('Errore: Seleziona una categoria valida per rimuovere un elemento.');
    }
  };

  // Handle adding a new modifier type (e.g., "nuova_categoria")
  const handleAddModifierType = () =>
  {
    if (newModifierTypeName.trim() === '')
    {
      setMessage('Il nome del nuovo tipo di modificatore non può essere vuoto.');
      return;
    }
    const typeKey = newModifierTypeName.trim().toLowerCase().replace(/\s/g, '_'); // Convert to snake_case
    if (jsonData?.modifiers?.[typeKey])
    {
      setMessage(`Errore: Il tipo di modificatore "${newModifierTypeName.trim()}" esiste già.`);
      return;
    }

    setJsonData(prevData => ({
      ...prevData,
      modifiers: {
        ...prevData.modifiers,
        [typeKey]: {}, // Initialize with an empty object for subtypes
      },
    }));
    setNewModifierTypeName('');
    setMessage(`Tipo di modificatore "${newModifierTypeName.trim()}" aggiunto con successo!`);
  };

  // Handle removing a modifier type
  const handleRemoveModifierType = (typeKeyToRemove) =>
  {
    if (!jsonData?.modifiers?.[typeKeyToRemove])
    {
      setMessage('Errore: Tipo di modificatore non trovato.');
      return;
    }

    const updatedModifiers = { ...jsonData.modifiers };
    delete updatedModifiers[typeKeyToRemove];

    setJsonData(prevData => ({
      ...prevData,
      modifiers: updatedModifiers,
    }));

    // Reset selection if the removed type was active
    if (selectedModifierType === typeKeyToRemove)
    {
      setSelectedModifierType(null);
      setSelectedModifierSubtype(null);
    }
    setMessage(`Tipo di modificatore "${typeKeyToRemove}" rimosso con successo!`);
  };

  // Handle adding a new modifier subtype (e.g., "nuovo_livello" under "gravita")
  const handleAddModifierSubtype = () =>
  {
    if (newModifierSubtypeName.trim() === '')
    {
      setMessage('Il nome della nuova sottocategoria non può essere vuoto.');
      return;
    }
    if (!selectedModifierType)
    {
      setMessage('Errore: Seleziona prima un tipo di modificatore.');
      return;
    }
    const subtypeKey = newModifierSubtypeName.trim().toLowerCase().replace(/\s/g, '_'); // Convert to snake_case
    if (jsonData?.modifiers?.[selectedModifierType]?.[subtypeKey])
    {
      setMessage(`Errore: La sottocategoria "${newModifierSubtypeName.trim()}" esiste già in "${selectedModifierType}".`);
      return;
    }

    setJsonData(prevData => ({
      ...prevData,
      modifiers: {
        ...prevData.modifiers,
        [selectedModifierType]: {
          ...prevData.modifiers[selectedModifierType],
          [subtypeKey]: [], // Initialize with an empty array for strings
        },
      },
    }));
    setNewModifierSubtypeName('');
    setMessage(`Sottocategoria "${newModifierSubtypeName.trim()}" aggiunta con successo a "${selectedModifierType}"!`);
  };

  // Handle removing a modifier subtype
  const handleRemoveModifierSubtype = (subtypeKeyToRemove) =>
  {
    if (!selectedModifierType || !jsonData?.modifiers?.[selectedModifierType]?.[subtypeKeyToRemove])
    {
      setMessage('Errore: Sottocategoria di modificatore non trovata.');
      return;
    }

    const updatedSubtypes = { ...jsonData.modifiers[selectedModifierType] };
    delete updatedSubtypes[subtypeKeyToRemove];

    setJsonData(prevData => ({
      ...prevData,
      modifiers: {
        ...prevData.modifiers,
        [selectedModifierType]: updatedSubtypes,
      },
    }));

    // Reset selection if the removed subtype was active
    if (selectedModifierSubtype === subtypeKeyToRemove)
    {
      setSelectedModifierSubtype(null);
    }
    setMessage(`Sottocategoria "${subtypeKeyToRemove}" rimossa con successo da "${selectedModifierType}"!`);
  };

  // --- BPRS Category Specific Handlers ---

  const handleAddBPRSCategory = () =>
  {
    if (newBPRSCategoryId.trim() === '' || newBPRSCategoryName.trim() === '')
    {
      setMessage('ID e Nome della categoria BPRS non possono essere vuoti.');
      return;
    }
    const newId = newBPRSCategoryId.trim().toLowerCase().replace(/\s/g, '_');
    if (jsonData?.bprsCategories?.some(cat => cat.id === newId))
    {
      setMessage(`Errore: La categoria BPRS con ID "${newId}" esiste già.`);
      return;
    }

    const newCategory = {
      id: newId,
      name: newBPRSCategoryName.trim(),
      mappings: [],
    };

    setJsonData(prevData => ({
      ...prevData,
      bprsCategories: [...(prevData.bprsCategories || []), newCategory],
    }));
    setNewBPRSCategoryId('');
    setNewBPRSCategoryName('');
    setMessage(`Categoria BPRS "${newCategory.name}" aggiunta!`);
  };

  const handleRemoveBPRSCategory = (idToRemove) =>
  {
    setJsonData(prevData => ({
      ...prevData,
      bprsCategories: prevData.bprsCategories.filter(cat => cat.id !== idToRemove),
    }));
    if (selectedBPRSCategoryId === idToRemove)
    {
      setSelectedBPRSCategoryId(null);
      setSelectedMappingIndex(null);
    }
    setMessage(`Categoria BPRS "${idToRemove}" rimossa.`);
  };

  const handleSelectBPRSCategory = (id) =>
  {
    setSelectedBPRSCategoryId(id);
    setSelectedMappingIndex(null); // Reset mapping selection when category changes
  };

  const handleAddMapping = () =>
  {
    if (!selectedBPRSCategoryId)
    {
      setMessage('Seleziona una categoria BPRS prima di aggiungere una mappatura.');
      return;
    }

    const newMapping = {
      entityTextKeywords: [],
      baseScore: 0,
      modifierRules: {},
    };

    setJsonData(prevData => ({
      ...prevData,
      bprsCategories: prevData.bprsCategories.map(cat =>
        cat.id === selectedBPRSCategoryId
          ? { ...cat, mappings: [...cat.mappings, newMapping] }
          : cat
      ),
    }));
    setMessage('Nuova mappatura aggiunta!');
  };

  const handleRemoveMapping = (indexToRemove) =>
  {
    if (!selectedBPRSCategoryId) return;

    setJsonData(prevData => ({
      ...prevData,
      bprsCategories: prevData.bprsCategories.map(cat =>
        cat.id === selectedBPRSCategoryId
          ? { ...cat, mappings: cat.mappings.filter((_, idx) => idx !== indexToRemove) }
          : cat
      ),
    }));
    if (selectedMappingIndex === indexToRemove)
    {
      setSelectedMappingIndex(null);
    }
    setMessage('Mappatura rimossa.');
  };

  const handleSelectMapping = (index) =>
  {
    setSelectedMappingIndex(index);
  };

  // Handle change for modifier rules adjustment input
  const handleModifierAdjustmentChange = (typeKey, subtypeKey, value) =>
  {
    setEditingModifierRules(prevRules => ({
      ...prevRules,
      [typeKey]: {
        ...prevRules[typeKey],
        [subtypeKey]: Number(value), // Ensure it's a number
      },
    }));
  };

  const handleUpdateMapping = () =>
  {
    if (!selectedBPRSCategoryId || selectedMappingIndex === null)
    {
      setMessage('Seleziona una mappatura da aggiornare.');
      return;
    }

    // Construct modifierRules object from editingModifierRules state
    const finalModifierRules = {};
    Object.keys(editingModifierRules).forEach(typeKey =>
    {
      // Only include modifier types that actually have adjustments
      if (editingModifierRules[typeKey] && Object.keys(editingModifierRules[typeKey]).length > 0)
      {
        finalModifierRules[typeKey] = {};
        Object.keys(editingModifierRules[typeKey]).forEach(subtypeKey =>
        {
          // Only include subtypes that have a non-zero adjustment
          if (editingModifierRules[typeKey][subtypeKey] !== 0)
          {
            finalModifierRules[typeKey][subtypeKey] = {
              adjustment: editingModifierRules[typeKey][subtypeKey],
            };
          }
        });
      }
    });

    setJsonData(prevData => ({
      ...prevData,
      bprsCategories: prevData.bprsCategories.map(cat =>
        cat.id === selectedBPRSCategoryId
          ? {
            ...cat,
            mappings: cat.mappings.map((mapping, idx) =>
              idx === selectedMappingIndex
                ? {
                  ...mapping,
                  entityTextKeywords: selectedKeywordsForMapping, // Use the selected keywords array
                  baseScore: Number(newMappingBaseScoreInput),
                  modifierRules: finalModifierRules, // Use the constructed modifier rules
                }
                : mapping
            ),
          }
          : cat
      ),
    }));
    setMessage('Mappatura aggiornata con successo!');
  };

  // --- GAF Configuration Specific Handlers ---

  // State for GAF modifier rules editor
  const [editingGafModifierRules, setEditingGafModifierRules] = useState({});

  useEffect(() =>
  {
    if (activeTab === 'gaf' && jsonData?.gaf?.modifiersImpact && jsonData.modifiers)
    {
      const initialGafModifierRules = {};
      Object.keys(jsonData.modifiers).forEach(typeKey =>
      {
        initialGafModifierRules[typeKey] = {};
        Object.keys(jsonData.modifiers[typeKey]).forEach(subtypeKey =>
        {
          initialGafModifierRules[typeKey][subtypeKey] = jsonData.gaf.modifiersImpact?.[typeKey]?.[subtypeKey] || 1.0;
        });
      });
      setEditingGafModifierRules(initialGafModifierRules);
    }
  }, [activeTab, jsonData]);

  const handleGafModifierImpactChange = (typeKey, subtypeKey, value) =>
  {
    setEditingGafModifierRules(prevRules => ({
      ...prevRules,
      [typeKey]: {
        ...prevRules[typeKey],
        [subtypeKey]: Number(value), // Ensure it's a number
      },
    }));
  };

  const handleUpdateGafConfig = () =>
  {
    // Construct modifiersImpact object from editingGafModifierRules state
    const finalGafModifiersImpact = {};
    Object.keys(editingGafModifierRules).forEach(typeKey =>
    {
      if (editingGafModifierRules[typeKey] && Object.keys(editingGafModifierRules[typeKey]).length > 0)
      {
        finalGafModifiersImpact[typeKey] = {};
        Object.keys(editingGafModifierRules[typeKey]).forEach(subtypeKey =>
        {
          // Only include subtypes that have a non-default (1.0) impact
          if (editingGafModifierRules[typeKey][subtypeKey] !== 1.0)
          {
            finalGafModifiersImpact[typeKey][subtypeKey] = editingGafModifierRules[typeKey][subtypeKey];
          }
        });
      }
    });

    setJsonData(prevData => ({
      ...prevData,
      gaf: {
        ...prevData.gaf,
        initialGAF: Number(gafInitialGAF),
        negationImpactFactor: Number(gafNegationImpactFactor),
        entityImpact: gafEntityImpact,
        modifiersImpact: finalGafModifiersImpact, // Use the constructed modifiers impact
      },
    }));
    setMessage('Configurazione GAF aggiornata con successo!');
  };

  const handleAddGafEntityImpact = () =>
  {
    if (newGafEntityText.trim() === '')
    {
      setMessage('Il testo dell\'entità GAF non può essere vuoto.');
      return;
    }
    const normalizedText = newGafEntityText.trim().toLowerCase(); // Normalize for consistency
    if (gafEntityImpact[normalizedText])
    {
      setMessage('Errore: L\'entità GAF esiste già.');
      return;
    }
    setGafEntityImpact(prev => ({
      ...prev,
      [normalizedText]: Number(newGafEntityImpactValue),
    }));
    setNewGafEntityText('');
    setNewGafEntityImpactValue(0);
    setMessage('Entità GAF aggiunta!');
  };

  const handleRemoveGafEntityImpact = (textToRemove) =>
  {
    const updatedImpact = { ...gafEntityImpact };
    delete updatedImpact[textToRemove];
    setGafEntityImpact(updatedImpact);
    setMessage('Entità GAF rimossa!');
  };

  // Handle starting with an empty JSON structure
  const handleStartFromScratch = () =>
  {
    setJsonData({
      problems: [],
      negationPrefixes: [],
      negationSuffixes: [],
      terminationPhrases: [],
      pseudoNegations: [],
      modifiers: {},
      bprsCategories: [],
      therapies: [],
      gaf: { // Initialize GAF with default values
        initialGAF: 100,
        entityImpact: {
          _default: 5, // Default impact for unlisted entities
        },
        modifiersImpact: {},
        negationImpactFactor: 0.2,
      }
    });
    setMessage('Iniziato un nuovo documento JSON da zero!');
    setActiveTab('problems'); // Set initial tab
    // Reset all specific editing states
    setSelectedModifierType(null);
    setSelectedModifierSubtype(null);
    setNewModifierTypeName('');
    setNewModifierSubtypeName('');
    setSelectedBPRSCategoryId(null);
    setSelectedMappingIndex(null);
    setNewBPRSCategoryName('');
    setNewBPRSCategoryId('');
    setSelectedKeywordsForMapping([]);
    setEditingModifierRules({});
    setNewMappingBaseScoreInput(0);
    setNewItem('');
    setGafInitialGAF(100);
    setGafNegationImpactFactor(0.2);
    setGafEntityImpact({ _default: 5 });
    setGafModifiersImpact({});
    setNewGafEntityText('');
    setNewGafEntityImpactValue(0);
    setSelectedGafModifierType(null);
    setNewGafModifierSubtype('');
    setNewGafModifierValue(1.0);

    // Clear the file input
    if (fileInputRef.current)
    {
      fileInputRef.current.value = '';
    }
  };


  // Handle downloading the modified JSON
  const handleDownload = () =>
  {
    if (jsonData)
    {
      const jsonString = JSON.stringify(jsonData, null, 2); // Pretty print JSON
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'modified_data.json'; // Changed filename to data.json
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up URL object
      setMessage('File JSON scaricato con successo!');
    } else
    {
      setMessage('Nessun dato JSON da scaricare.');
    }
  };

  // Get the current list to display based on active tab and modifier selections
  const getCurrentList = () =>
  {
    if (!jsonData) return [];
    if (activeTab === 'modifiers' && selectedModifierType && selectedModifierSubtype)
    {
      return jsonData.modifiers?.[selectedModifierType]?.[selectedModifierSubtype] || [];
    } else if (activeTab !== 'modifiers' && activeTab !== 'bprsCategories' && activeTab !== 'gaf')
    {
      return jsonData[activeTab] || [];
    }
    return [];
  };

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #F8F9FB; /* Light background color from image */
        }

        .app-container {
          min-height: 100vh;
          background-color: #F8F9FB; /* Light background color from image */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .main-card {
          background-color: #ffffff;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Softer, more subtle shadow */
          width: 100%;
          max-width: 960px;
          border: 1px solid #e0e0e0; /* Lighter border */
          overflow: hidden; /* Ensures no content spills out */
        }

        .main-title {
          font-size: 36px;
          font-weight: 700; /* Slightly less bold */
          text-align: center;
          color: #333333; /* Darker text */
          margin-bottom: 32px;
          letter-spacing: -0.01em; /* Slightly less aggressive letter spacing */
        }

        .message-box {
          margin-bottom: 16px;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          animation: fadeOut 3s forwards; /* Fade out after 3 seconds */
        }

        @keyframes fadeOut {
            0% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; display: none; }
        }

        .message-box.error {
          background-color: #ffe0e0; /* Lighter red */
          color: #cc0000; /* Darker red */
        }

        .message-box.success {
          background-color: #e0ffe0; /* Lighter green */
          color: #008000; /* Darker green */
        }

        .upload-section {
          margin-bottom: 32px;
          padding: 24px;
          background-color: #f0f4f8; /* Light blue-gray background */
          border-radius: 8px;
          border: 1px solid #d0d8e0; /* Subtle border */
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05); /* Softer inset shadow */
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .upload-label {
          display: block;
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 12px;
        }

        .file-input-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .file-input {
          display: block;
          width: 100%;
          font-size: 14px;
          color: #333333;
        }

        .file-input::-webkit-file-upload-button {
          margin-right: 16px;
          padding: 8px 16px;
          border-radius: 6px; /* Less rounded */
          border: 1px solid #bbbbbb; /* Subtle border */
          font-size: 14px;
          font-weight: 600;
          background-color: #e0e0e0; /* Light gray */
          color: #333333;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .file-input::-webkit-file-upload-button:hover {
          background-color: #d0d0d0; /* Darker gray on hover */
          border-color: #999999;
        }

        .start-scratch-button {
          background-color: #007aff; /* iOS blue */
          color: #ffffff;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Softer shadow */
          transition: all 0.2s ease-in-out;
          transform: scale(1);
          border: none;
          cursor: pointer;
          width: 100%; /* Full width on smaller screens */
          margin-top: 10px; /* Space from file input */
        }

        .start-scratch-button:hover {
          background-color: #005bb5; /* Darker blue on hover */
          transform: scale(1.01); /* Less aggressive scale */
        }

        @media (min-width: 640px) {
          .upload-section {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .file-input-container {
            flex-direction: row;
            align-items: center;
            gap: 15px;
            flex-grow: 1;
          }
          .upload-label {
            margin-bottom: 0;
            white-space: nowrap;
          }
          .start-scratch-button {
            width: auto;
            margin-top: 0;
          }
        }


        .tab-navigation {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 32px;
          background-color: #f0f0f0;
          border-radius: 6px;
          padding: 4px;
          box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }

        .tab-button {
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          border: none;
          background: none;
          color: #555555;
          margin: 2px;
        }

        .tab-button:hover {
          background-color: #e0e0e0;
          color: #333333;
        }

        .tab-button.active {
          background-color: #ffffff;
          color: #333333;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid #d0d0d0;
        }

        .content-area {
          padding: 24px;
          background-color: #ffffff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
          margin-bottom: 32px;
        }

        .content-title {
          font-size: 28px;
          font-weight: 700;
          color: #333333; /* Darker text */
          margin-bottom: 24px;
          text-align: center;
        }

        .add-item-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        @media (min-width: 640px) {
          .add-item-section {
            flex-direction: row;
          }
        }

        .add-input {
          flex-grow: 1;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 18px;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .add-input:focus {
          outline: none;
          border-color: #007aff; /* iOS blue for focus */
          box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.3); /* Softer focus shadow */
        }

        .add-button {
          background-color: #007aff; /* iOS blue */
          color: #ffffff;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease-in-out;
          transform: scale(1);
          border: none;
          cursor: pointer;
          width: 100%;
        }

        .add-button:hover {
          background-color: #005bb5;
          transform: scale(1.01); /* Less aggressive scale */
        }

        @media (min-width: 640px) {
          .add-button {
            width: auto;
          }
        }

        .item-list-container {
          max-height: 320px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .item-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .item-list li + li {
            margin-top: 12px;
        }

        .list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #f9f9f9; /* Slightly lighter background */
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* Softer shadow */
          border: 1px solid #e0e0e0; /* Lighter border */
          color: #333333;
          font-size: 18px;
        }

        .list-item-text {
          flex-grow: 1;
          word-break: break-word;
          padding-right: 16px;
        }

        .remove-button {
          background-color: #ff3b30; /* iOS red */
          color: #ffffff;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease-in-out;
          transform: scale(1);
          border: none;
          cursor: pointer;
        }

        .remove-button:hover {
          background-color: #cc0000;
          transform: scale(1.01); /* Less aggressive scale */
        }

        .empty-list-message {
          text-align: center;
          color: #6b7280;
          font-size: 18px;
          padding-top: 32px;
          padding-bottom: 32px;
        }

        .download-section {
          text-align: center;
          margin-top: 32px;
        }

        .download-button {
          background-color: #28a745; /* Green for download */
          color: #ffffff;
          font-weight: 600;
          padding: 16px 32px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease-in-out;
          transform: scale(1);
          border: none;
          cursor: pointer;
        }

        .download-button:hover {
          background-color: #218838;
          transform: scale(1.02);
        }

        .download-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.3);
        }

        .no-data-message {
          text-align: center;
          color: #4b5563;
          font-size: 20px;
          padding: 40px;
          background-color: #f9f9f9; /* Lighter background */
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .no-data-message p:last-child {
          margin-top: 16px;
          font-size: 16px;
          color: #6b7280;
        }

        /* Modifier Specific Styles */
        .modifier-nav-level {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
          padding: 8px;
          background-color: #f0f0f0;
          border-radius: 6px;
          box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }

        .modifier-nav-item {
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          color: #555555;
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
        }

        .modifier-nav-item:hover {
          background-color: #e0e0e0;
          color: #333333;
        }

        .modifier-nav-item.active-modifier {
          background-color: #ffffff;
          color: #333333;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid #d0d0d0;
        }

        .modifier-remove-btn {
          background-color: rgba(255, 59, 48, 0.2); /* iOS red with transparency */
          color: #ff3b30; /* iOS red text */
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .modifier-remove-btn:hover {
          background-color: rgba(255, 59, 48, 0.4);
          color: #cc0000;
        }

        .modifier-add-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
          padding: 16px;
          background-color: #f0f4f8; /* Light blue-gray background */
          border-radius: 8px;
          border: 1px solid #d0d8e0;
        }

        .modifier-add-section .add-input {
          margin-bottom: 0;
        }

        .modifier-add-section .add-button {
          width: auto;
          align-self: flex-end;
        }

        @media (min-width: 640px) {
          .modifier-add-section {
            flex-direction: row;
            align-items: center;
          }
          .modifier-add-section .add-input {
            flex-grow: 1;
          }
        }

        /* BPRS Specific Styles */
        .bprs-add-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
          align-items: stretch;
        }

        @media (min-width: 640px) {
          .bprs-add-section {
            flex-direction: row;
            align-items: center;
          }
          .bprs-add-section .add-input {
            margin-bottom: 0;
          }
        }

        .bprs-add-section .add-input {
          flex-grow: 1;
        }

        .bprs-add-section .add-button {
          width: 100%;
          white-space: nowrap;
          padding: 10px 15px;
          font-size: 16px;
        }
        @media (min-width: 640px) {
          .bprs-add-section .add-button {
            width: auto;
          }
        }

        .bprs-category-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #f9f9f9;
          padding: 12px 16px;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          border: 1px solid #e0e0e0;
          color: #333333;
          font-size: 16px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .bprs-category-item:hover {
          background-color: #f0f0f0;
        }

        .bprs-category-item.active-bprs {
          background-color: #e0f4ff; /* Lighter blue for active */
          border-color: #a0d0ff; /* Softer blue border */
          font-weight: 600;
        }

        .bprs-category-info {
          flex-grow: 1;
        }

        .bprs-category-name {
          font-weight: 600;
        }

        .bprs-category-id {
          font-size: 14px;
          color: #6b7280;
        }

        .bprs-mapping-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #f9f9f9;
          padding: 10px 14px;
          border-radius: 6px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
          border: 1px solid #e0e0e0;
          color: #333333;
          font-size: 15px;
          margin-bottom: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .bprs-mapping-item:hover {
          background-color: #f0f0f0;
        }

        .bprs-mapping-item.active-mapping {
          background-color: #e0f4ff;
          border-color: #a0d0ff;
          font-weight: 500;
        }

        .bprs-mapping-text {
          flex-grow: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .bprs-mapping-details-section {
          margin-top: 20px;
          padding: 20px;
          background-color: #f0f4f8;
          border-radius: 8px;
          border: 1px solid #d0d8e0;
        }

        .bprs-mapping-details-section label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333333;
        }

        .bprs-mapping-details-section input[type="text"],
        .bprs-mapping-details-section input[type="number"],
        .bprs-mapping-details-section textarea,
        .bprs-mapping-details-section select[multiple] {
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 16px;
          margin-bottom: 15px;
          box-sizing: border-box;
        }

        .bprs-mapping-details-section select[multiple] {
            min-height: 120px;
        }

        .bprs-mapping-details-section textarea {
          min-height: 100px;
          resize: vertical;
          font-family: 'Inter', sans-serif;
        }

        .bprs-mapping-details-section input:focus,
        .bprs-mapping-details-section textarea:focus,
        .bprs-mapping-details-section select:focus {
          outline: none;
          border-color: #007aff;
          box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.3);
        }

        .bprs-update-button {
          background-color: #28a745;
          color: #ffffff;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .bprs-update-button:hover {
          background-color: #218838;
        }

        .modifier-rules-editor {
          margin-top: 15px;
          padding: 15px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background-color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .modifier-rules-editor h5 {
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 10px;
        }

        .modifier-rules-editor .modifier-type-section {
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #f0f0f0;
          border-radius: 6px;
          background-color: #f9f9f9;
        }

        .modifier-rules-editor .modifier-type-section h6 {
          font-size: 16px;
          font-weight: 500;
          color: #555555;
          margin-bottom: 8px;
        }

        .modifier-rules-editor .modifier-subtype-input {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .modifier-rules-editor .modifier-subtype-input label {
          flex-shrink: 0;
          width: 100px;
          font-size: 15px;
          color: #555555;
          margin-bottom: 0;
        }

        .modifier-rules-editor .modifier-subtype-input input {
          flex-grow: 1;
          padding: 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 15px;
          margin-bottom: 0;
        }

        /* GAF Specific Styles */
        .gaf-config-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .gaf-config-group {
          padding: 15px;
          background-color: #f0f4f8; /* Light blue-gray background */
          border-radius: 8px;
          border: 1px solid #d0d8e0;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
        }

        .gaf-config-group h3 {
          font-size: 20px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 15px;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 10px;
        }

        .gaf-config-group label {
          display: block;
          font-weight: 500;
          margin-bottom: 5px;
          color: #555555;
        }

        .gaf-config-group input[type="number"],
        .gaf-config-group input[type="text"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 16px;
          margin-bottom: 15px;
          box-sizing: border-box;
        }

        .gaf-config-group input:focus {
          outline: none;
          border-color: #007aff;
          box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.3);
        }

        .gaf-update-button {
          background-color: #28a745;
          color: #ffffff;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
          margin-top: 10px;
        }

        .gaf-update-button:hover {
          background-color: #218838;
        }

        .gaf-entity-list, .gaf-modifier-type-container, .gaf-modifier-subtype-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .gaf-entity-list li, .gaf-modifier-type-item, .gaf-modifier-subtype-list li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #f9f9f9;
          padding: 10px 15px;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
          margin-bottom: 8px;
          font-size: 15px;
          color: #333333;
        }

        .gaf-entity-list li span, .gaf-modifier-type-item span, .gaf-modifier-subtype-list li span {
          flex-grow: 1;
          word-break: break-word;
        }

        .gaf-add-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 15px;
        }

        @media (min-width: 640px) {
          .gaf-add-section {
            flex-direction: row;
            align-items: center;
          }
          .gaf-add-section input {
            flex-grow: 1;
          }
        }

        .gaf-add-button {
          background-color: #007aff;
          color: #ffffff;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .gaf-add-button:hover {
          background-color: #005bb5;
        }

        .gaf-remove-button {
          background-color: #ff3b30;
          color: #ffffff;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .gaf-remove-button:hover {
          background-color: #cc0000;
        }

        .gaf-modifier-type-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 15px;
          padding: 10px;
          background-color: #f0f0f0;
          border-radius: 6px;
          box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }

        .gaf-modifier-type-item {
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          color: #555555;
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
        }

        .gaf-modifier-type-item:hover {
          background-color: #e0e0e0;
          color: #333333;
        }

        .gaf-modifier-type-item.selected-modifier-type {
          background-color: #ffffff;
          color: #333333;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid #d0d0d0;
        }

        .gaf-modifier-type-item .remove-btn {
          background-color: rgba(255, 59, 48, 0.2);
          color: #ff3b30;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .gaf-modifier-type-item .remove-btn:hover {
          background-color: rgba(255, 59, 48, 0.4);
          color: #cc0000;
        }

        .gaf-modifier-subtype-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 15px;
          padding: 10px;
          background-color: #f0f0f0;
          border-radius: 6px;
          box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.1);
          border: 1px solid #e0e0e0;
        }

        .gaf-modifier-subtype-list li {
          background-color: #ffffff;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #d0d0d0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        `}
      </style>
      <div className="app-container">
        <div className="main-card">
          <h1 className="main-title">
            PsyMed Data Editor
          </h1>

          {/* Message display */}
          {message && (
            <div className={`message-box ${message.includes('Errore') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          {/* File Upload Section */}
          <div className="upload-section">
            <div className="file-input-container">
              <label htmlFor="file-upload" className="upload-label">
                Carica il tuo file JSON:
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="file-input"
                ref={fileInputRef} // Attach the ref here
              />
            </div>
            <button
              onClick={handleStartFromScratch}
              className="start-scratch-button"
            >
              Inizia da zero
            </button>
          </div>

          {jsonData && (
            <>
              {/* Tab Navigation */}
              <div className="tab-navigation">
                {Object.entries(categories)
                  .sort(([, nameA], [, nameB]) => nameA.localeCompare(nameB)) // Sort by display name
                  .map(([key, displayName]) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`tab-button ${activeTab === key ? 'active' : ''}`}
                    >
                      {displayName}
                    </button>
                  ))}
              </div>

              {/* Content Area for Active Tab */}
              <div className="content-area">
                <h2 className="content-title">
                  Modifica: {categories[activeTab]}
                </h2>

                {activeTab === 'modifiers' && jsonData.modifiers ? (
                  <>
                    {/* Add New Modifier Type Section */}
                    <div className="modifier-add-section">
                      <input
                        type="text"
                        value={newModifierTypeName}
                        onChange={(e) => setNewModifierTypeName(e.target.value)}
                        placeholder="Aggiungi nuovo tipo (es. 'Colore')"
                        className="add-input"
                      />
                      <button
                        onClick={handleAddModifierType}
                        className="add-button"
                      >
                        Aggiungi Tipo
                      </button>
                    </div>

                    {/* Modifier Type Navigation (e.g., Gravità, Cronicità) */}
                    <div className="modifier-nav-level">
                      {Object.keys(jsonData.modifiers).map((typeKey) => (
                        <div
                          key={typeKey}
                          onClick={() =>
                          {
                            setSelectedModifierType(typeKey);
                            setSelectedModifierSubtype(null); // Reset subtype when type changes
                          }}
                          className={`modifier-nav-item ${selectedModifierType === typeKey ? 'active-modifier' : ''}`}
                        >
                          {typeKey.charAt(0).toUpperCase() + typeKey.slice(1).replace(/_/g, ' ')}
                          {selectedModifierType === typeKey && (
                            <button
                              onClick={(e) =>
                              {
                                e.stopPropagation(); // Prevent selecting the type button
                                handleRemoveModifierType(typeKey);
                              }}
                              className="modifier-remove-btn"
                              title={`Rimuovi tipo "${typeKey}"`}
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {selectedModifierType && jsonData.modifiers[selectedModifierType] && (
                      <>
                        {/* Add New Modifier Subtype Section */}
                        <div className="modifier-add-section">
                          <input
                            type="text"
                            value={newModifierSubtypeName}
                            onChange={(e) => setNewModifierSubtypeName(e.target.value)}
                            placeholder={`Aggiungi nuova sottocategoria a '${selectedModifierType}' (es. 'Rosso')`}
                            className="add-input"
                          />
                          <button
                            onClick={handleAddModifierSubtype}
                            className="add-button"
                          >
                            Aggiungi Sottocategoria
                          </button>
                        </div>

                        {/* Modifier Subtype Navigation (e.g., lieve, moderata for Gravità) */}
                        <div className="modifier-nav-level">
                          {Object.keys(jsonData.modifiers[selectedModifierType]).map((subtypeKey) => (
                            <div
                              key={subtypeKey}
                              onClick={() => setSelectedModifierSubtype(subtypeKey)}
                              className={`modifier-nav-item ${selectedModifierSubtype === subtypeKey ? 'active-modifier' : ''}`}
                            >
                              {subtypeKey.charAt(0).toUpperCase() + subtypeKey.slice(1).replace(/_/g, ' ')}
                              {selectedModifierSubtype === subtypeKey && (
                                <button
                                  onClick={(e) =>
                                  {
                                    e.stopPropagation(); // Prevent selecting the subtype button
                                    handleRemoveModifierSubtype(subtypeKey);
                                  }}
                                  className="modifier-remove-btn"
                                  title={`Rimuovi sottocategoria "${subtypeKey}"`}
                                >
                                  &times;
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedModifierType && selectedModifierSubtype && (
                      <>
                        {/* Add New Item Section for Modifiers (strings) */}
                        <div className="add-item-section">
                          <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder={`Aggiungi un nuovo elemento a '${selectedModifierSubtype}'...`}
                            className="add-input"
                          />
                          <button
                            onClick={handleAddItem}
                            className="add-button"
                          >
                            Aggiungi Elemento
                          </button>
                        </div>

                        {/* List of Items for Modifiers */}
                        <div className="item-list-container">
                          {getCurrentList().length > 0 ? (
                            <ul className="item-list">
                              {getCurrentList().map((item, index) => (
                                <li
                                  key={item + index}
                                  className="list-item"
                                >
                                  <span className="list-item-text">{item}</span>
                                  <button
                                    onClick={() => handleRemoveItem(index)}
                                    className="remove-button"
                                  >
                                    Rimuovi
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="empty-list-message">Nessun elemento in questa sottocategoria. Aggiungine uno!</p>
                          )}
                        </div>
                      </>
                    )}

                    {!selectedModifierType && (
                      <p className="empty-list-message">Seleziona un tipo di modificatore o aggiungine uno nuovo.</p>
                    )}
                    {selectedModifierType && Object.keys(jsonData.modifiers[selectedModifierType]).length === 0 && (
                      <p className="empty-list-message">Nessuna sottocategoria per questo tipo. Aggiungine una nuova.</p>
                    )}
                    {selectedModifierType && !selectedModifierSubtype && Object.keys(jsonData.modifiers[selectedModifierType]).length > 0 && (
                      <p className="empty-list-message">Seleziona una sottocategoria di modificatore.</p>
                    )}
                  </>
                ) : activeTab === 'bprsCategories' && jsonData.bprsCategories ? (
                  <>
                    {/* Add New BPRS Category Section */}
                    <div className="bprs-add-section">
                      <input
                        type="text"
                        value={newBPRSCategoryId}
                        onChange={(e) => setNewBPRSCategoryId(e.target.value)}
                        placeholder="ID Categoria"
                        className="add-input"
                      />
                      <input
                        type="text"
                        value={newBPRSCategoryName}
                        onChange={(e) => setNewBPRSCategoryName(e.target.value)}
                        placeholder="Nome Categoria"
                        className="add-input"
                      />
                      <button
                        onClick={handleAddBPRSCategory}
                        className="add-button"
                      >
                        Aggiungi Categoria
                      </button>
                    </div>

                    {/* List of BPRS Categories */}
                    <div className="item-list-container">
                      {jsonData.bprsCategories.length > 0 ? (
                        <ul className="item-list">
                          {jsonData.bprsCategories.map((category) => (
                            <li
                              key={category.id}
                              onClick={() => handleSelectBPRSCategory(category.id)}
                              className={`bprs-category-item ${selectedBPRSCategoryId === category.id ? 'active-bprs' : ''}`}
                            >
                              <div className="bprs-category-info">
                                <div className="bprs-category-name">{category.name}</div>
                                <div className="bprs-category-id">ID: {category.id}</div>
                              </div>
                              <button
                                onClick={(e) =>
                                {
                                  e.stopPropagation();
                                  handleRemoveBPRSCategory(category.id);
                                }}
                                className="remove-button"
                                title={`Rimuovi categoria "${category.name}"`}
                              >
                                Rimuovi
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="empty-list-message">Nessuna categoria BPRS. Aggiungine una nuova!</p>
                      )}
                    </div>

                    {selectedBPRSCategoryId && (
                      <div className="content-area" style={{ marginTop: '20px' }}>
                        <h3 className="content-title" style={{ fontSize: '24px' }}>
                          Mappature per: {jsonData.bprsCategories.find(cat => cat.id === selectedBPRSCategoryId)?.name}
                        </h3>

                        {/* Add New Mapping Button */}
                        <div className="add-item-section">
                          <button
                            onClick={handleAddMapping}
                            className="add-button"
                          >
                            Aggiungi Nuova Mappatura
                          </button>
                        </div>

                        {/* List of Mappings */}
                        <div className="item-list-container">
                          {jsonData.bprsCategories.find(cat => cat.id === selectedBPRSCategoryId)?.mappings.length > 0 ? (
                            <ul className="item-list">
                              {jsonData.bprsCategories.find(cat => cat.id === selectedBPRSCategoryId)?.mappings.map((mapping, index) => (
                                <li
                                  key={index}
                                  onClick={() => handleSelectMapping(index)}
                                  className={`bprs-mapping-item ${selectedMappingIndex === index ? 'active-mapping' : ''}`}
                                >
                                  <span className="bprs-mapping-text">
                                    Keywords: {mapping.entityTextKeywords?.join(', ').substring(0, 50)}... | Score: {mapping.baseScore}
                                  </span>
                                  <button
                                    onClick={(e) =>
                                    {
                                      e.stopPropagation();
                                      handleRemoveMapping(index);
                                    }}
                                    className="remove-button"
                                    title={`Rimuovi mappatura ${index + 1}`}
                                  >
                                    Rimuovi
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="empty-list-message">Nessuna mappatura per questa categoria. Aggiungine una!</p>
                          )}
                        </div>

                        {selectedMappingIndex !== null && (
                          <div className="bprs-mapping-details-section">
                            <h4 className="content-title" style={{ fontSize: '20px', marginBottom: '15px' }}>
                              Dettagli Mappatura {selectedMappingIndex + 1}
                            </h4>
                            <label htmlFor="keywords-select">Keywords (seleziona da 'Problemi'):</label>
                            <select
                              id="keywords-select"
                              multiple
                              value={selectedKeywordsForMapping}
                              onChange={(e) =>
                              {
                                const options = Array.from(e.target.selectedOptions);
                                const values = options.map(option => option.value);
                                setSelectedKeywordsForMapping(values);
                              }}
                            >
                              {jsonData.problems && jsonData.problems.map(problem => (
                                <option key={problem} value={problem}>
                                  {problem}
                                </option>
                              ))}
                            </select>

                            <label htmlFor="base-score-input">Base Score:</label>
                            <input
                              id="base-score-input"
                              type="number"
                              value={newMappingBaseScoreInput}
                              onChange={(e) => setNewMappingBaseScoreInput(Number(e.target.value))}
                            />

                            <label>Regole Modificatore:</label>
                            <div className="modifier-rules-editor">
                              {jsonData.modifiers && Object.keys(jsonData.modifiers).length > 0 ? (
                                Object.keys(jsonData.modifiers).map(typeKey => (
                                  <div key={typeKey} className="modifier-type-section">
                                    <h6>{typeKey.charAt(0).toUpperCase() + typeKey.slice(1).replace(/_/g, ' ')}</h6>
                                    {Object.keys(jsonData.modifiers[typeKey]).map(subtypeKey => (
                                      <div key={subtypeKey} className="modifier-subtype-input">
                                        <label htmlFor={`adj-${typeKey}-${subtypeKey}`}>
                                          {subtypeKey.charAt(0).toUpperCase() + subtypeKey.slice(1).replace(/_/g, ' ')}:
                                        </label>
                                        <input
                                          id={`adj-${typeKey}-${subtypeKey}`}
                                          type="number"
                                          value={editingModifierRules?.[typeKey]?.[subtypeKey] || 0}
                                          onChange={(e) => handleModifierAdjustmentChange(typeKey, subtypeKey, e.target.value)}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ))
                              ) : (
                                <p className="empty-list-message" style={{ padding: '0' }}>Nessun modificatore disponibile. Aggiungine nella sezione 'Modificatori'.</p>
                              )}
                            </div>

                            <button
                              onClick={handleUpdateMapping}
                              className="bprs-update-button"
                              style={{ marginTop: '20px' }}
                            >
                              Aggiorna Mappatura
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : activeTab === 'gaf' && jsonData.gaf ? (
                  <>
                    <div className="gaf-config-section">
                      <div className="gaf-config-group">
                        <h3>Parametri Generali GAF</h3>
                        <label htmlFor="gaf-initial-score">Punteggio GAF Iniziale:</label>
                        <input
                          id="gaf-initial-score"
                          type="number"
                          value={gafInitialGAF}
                          onChange={(e) => setGafInitialGAF(Number(e.target.value))}
                        />

                        <label htmlFor="gaf-negation-factor">Fattore Impatto Negazione:</label>
                        <input
                          id="gaf-negation-factor"
                          type="number"
                          step="0.01"
                          value={gafNegationImpactFactor}
                          onChange={(e) => setGafNegationImpactFactor(Number(e.target.value))}
                        />
                        <button onClick={handleUpdateGafConfig} className="gaf-update-button">
                          Aggiorna Parametri GAF
                        </button>
                      </div>

                      <div className="gaf-config-group">
                        <h3>Impatto Entità GAF</h3>
                        <div className="gaf-add-section">
                          <input
                            type="text"
                            value={newGafEntityText}
                            onChange={(e) => setNewGafEntityText(e.target.value)}
                            placeholder="Testo entità (es. 'ansia')"
                            className="add-input"
                          />
                          <input
                            type="number"
                            value={newGafEntityImpactValue}
                            onChange={(e) => setNewGafEntityImpactValue(Number(e.target.value))}
                            placeholder="Valore impatto"
                            className="add-input"
                          />
                          <button onClick={handleAddGafEntityImpact} className="gaf-add-button">
                            Aggiungi Impatto Entità
                          </button>
                        </div>
                        <ul className="gaf-entity-list item-list-container">
                          {Object.entries(gafEntityImpact).map(([text, value]) => (
                            <li key={text} className="list-item">
                              <span>{text}: {value}</span>
                              <button onClick={() => handleRemoveGafEntityImpact(text)} className="gaf-remove-button">
                                Rimuovi
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="gaf-config-group">
                        <h3>Impatto Modificatori GAF</h3>
                        <div className="modifier-rules-editor"> {/* Re-using modifier-rules-editor for styling */}
                          {jsonData.modifiers && Object.keys(jsonData.modifiers).length > 0 ? (
                            Object.keys(jsonData.modifiers).map(typeKey => (
                              <div key={typeKey} className="modifier-type-section">
                                <h6>{typeKey.charAt(0).toUpperCase() + typeKey.slice(1).replace(/_/g, ' ')}</h6>
                                {Object.keys(jsonData.modifiers[typeKey]).map(subtypeKey => (
                                  <div key={subtypeKey} className="modifier-subtype-input">
                                    <label htmlFor={`gaf-adj-${typeKey}-${subtypeKey}`}>
                                      {subtypeKey.charAt(0).toUpperCase() + subtypeKey.slice(1).replace(/_/g, ' ')}:
                                    </label>
                                    <input
                                      id={`gaf-adj-${typeKey}-${subtypeKey}`}
                                      type="number"
                                      step="0.1" // Allow decimal for impact factor
                                      value={editingGafModifierRules?.[typeKey]?.[subtypeKey] || 1.0} // Default to 1.0
                                      onChange={(e) => handleGafModifierImpactChange(typeKey, subtypeKey, e.target.value)}
                                    />
                                  </div>
                                ))}
                              </div>
                            ))
                          ) : (
                            <p className="empty-list-message" style={{ padding: '0' }}>Nessun modificatore disponibile. Aggiungine nella sezione 'Modificatori'.</p>
                          )}
                        </div>
                        <button onClick={handleUpdateGafConfig} className="gaf-update-button" style={{ marginTop: '20px' }}>
                          Aggiorna Impatto Modificatori GAF
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  // Default rendering for other categories (arrays of strings)
                  <>
                    {/* Add New Item Section */}
                    <div className="add-item-section">
                      <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder={`Aggiungi un nuovo elemento a '${categories[activeTab]}'...`}
                        className="add-input"
                      />
                      <button
                        onClick={handleAddItem}
                        className="add-button"
                      >
                        Aggiungi
                      </button>
                    </div>

                    {/* List of Items */}
                    <div className="item-list-container">
                      {getCurrentList().length > 0 ? (
                        <ul className="item-list">
                          {getCurrentList().map((item, index) => (
                            <li
                              key={item + index} // Using item + index as key for uniqueness
                              className="list-item"
                            >
                              <span className="list-item-text">{item}</span>
                              <button
                                onClick={() => handleRemoveItem(index)}
                                className="remove-button"
                              >
                                Rimuovi
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="empty-list-message">Nessun elemento in questa categoria. Aggiungine uno!</p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Download Button */}
              <div className="download-section">
                <button
                  onClick={handleDownload}
                  className="download-button"
                >
                  Scarica JSON Modificato
                </button>
              </div>
            </>
          )}

          {!jsonData && (
            <div className="no-data-message">
              <p>Carica un file JSON per iniziare a modificarlo.</p>
              <p>
                Il file JSON dovrebbe contenere le chiavi: `problems`, `negationPrefixes`, `negationSuffixes`, `terminationPhrases`, `pseudoNegations`, `therapies` (tutte array di stringhe), `modifiers` (un oggetto annidato), `bprsCategories` (un array di oggetti), e `gaf` (un oggetto).
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
