import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, XCircle, Info, Hash, UploadCloud, FileText, TrendingUp } from 'lucide-react';

// Component to display a single problem
const ProblemCard = ({ problem }) => (
    <div className="problem-card">
        <h3 className="problem-card-title">
            <Info className="icon-blue" />
            {problem.text}
        </h3>
        <div className="problem-card-details">
            <p className="problem-negated-status">
                Negated: {problem.isNegated ? <XCircle className="icon-red" /> : <CheckCircle className="icon-green" />}
            </p>
            {Object.keys(problem.modifiers).length > 0 && (
                <div className="modifiers-section">
                    <p className="modifiers-title">Modifiers:</p>
                    <ul className="modifiers-list">
                        {Object.entries(problem.modifiers).map(([key, values]) => (
                            <li key={key} className="modifier-item">
                                <span className="modifier-key">{key.replace(/_/g, ' ')}:</span> {values.join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
);

// Main App component
const App = () =>
{
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Handles file selection and parsing
    const handleFileChange = (event) =>
    {
        const file = event.target.files[0];
        if (!file)
        {
            return;
        }

        setLoading(true);
        setError(null);

        const reader = new FileReader();

        reader.onload = (e) =>
        {
            try
            {
                const parsedData = JSON.parse(e.target.result);
                // Check if the parsed data has the expected category structure including gafScore
                if (Object.keys(parsedData).length > 0 && Object.values(parsedData).every(
                    category => category.problems && category.bprsScores && typeof category.totalBPRSSum === 'number' && typeof category.gafScore === 'number'
                ))
                {
                    setJsonData(parsedData);
                    // Automatically select the first category if available
                    setSelectedCategory(Object.keys(parsedData)[0]);
                } else
                {
                    setError("Invalid JSON structure. Please ensure it contains categories with 'problems', 'bprsScores', 'totalBPRSSum', and 'gafScore'.");
                    setJsonData(null);
                    setSelectedCategory(null);
                }
            } catch (parseError)
            {
                setError(`Error parsing JSON file: ${parseError.message}`);
                setJsonData(null);
                setSelectedCategory(null);
            } finally
            {
                setLoading(false);
            }
        };

        reader.onerror = () =>
        {
            setError("Error reading file. Please try again.");
            setLoading(false);
            setJsonData(null);
            setSelectedCategory(null);
        };

        reader.readAsText(file);
    };

    // Handles category selection
    const handleCategoryChange = (event) =>
    {
        setSelectedCategory(event.target.value);
    };

    // Get data for the currently selected category
    const currentCategoryData = jsonData && selectedCategory ? jsonData[selectedCategory] : null;

    // Format BPRS data for the chart
    const bprsData = currentCategoryData ? Object.entries(currentCategoryData.bprsScores).map(([key, value]) => ({
        name: value.name,
        score: value.score,
    })) : [];

    return (
        <div className="app-container">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

                body {
                    margin: 0;
                    font-family: 'Inter', sans-serif;
                }

                .app-container {
                    min-height: 100vh;
                    background-color: #f3f4f6; /* gray-100 */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2rem 1rem; /* py-8 px-4 */
                }

                @media (min-width: 640px) { /* sm */
                    .app-container {
                        padding-left: 1.5rem; /* sm:px-6 */
                        padding-right: 1.5rem; /* sm:px-6 */
                    }
                }

                @media (min-width: 1024px) { /* lg */
                    .app-container {
                        padding-left: 2rem; /* lg:px-8 */
                        padding-right: 2rem; /* lg:px-8 */
                    }
                }

                .main-content-wrapper {
                    background-color: #ffffff; /* bg-white */
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
                    border-radius: 0.5rem; /* rounded-lg */
                    padding: 1.5rem; /* p-6 */
                    width: 100%;
                    max-width: 56rem; /* max-w-4xl */
                }

                @media (min-width: 640px) { /* sm */
                    .main-content-wrapper {
                        padding: 2rem; /* sm:p-8 */
                    }
                }

                @media (min-width: 1024px) { /* lg */
                    .main-content-wrapper {
                        padding: 2.5rem; /* lg:p-10 */
                    }
                }

                .main-title {
                    font-size: 2.25rem; /* text-4xl */
                    font-weight: 800; /* font-extrabold */
                    color: #2d3748; /* text-gray-800 */
                    text-align: center;
                    margin-bottom: 2rem; /* mb-8 */
                }

                .upload-section {
                    background-color: #eff6ff; /* bg-blue-50 */
                    padding: 1.5rem; /* p-6 */
                    border-radius: 0.5rem; /* rounded-lg */
                    margin-bottom: 2rem; /* mb-8 */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .custom-file-input {
                    background-color: #3b82f6; /* bg-blue-600 */
                    color: #ffffff; /* text-white */
                    font-weight: 700; /* font-bold */
                    padding: 0.75rem 1.5rem; /* py-3 px-6 */
                    border-radius: 9999px; /* rounded-full */
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg */
                    transition: all 0.3s ease-in-out; /* transition duration-300 ease-in-out */
                }

                .custom-file-input:hover {
                    background-color: #2563eb; /* hover:bg-blue-700 */
                    transform: scale(1.05); /* hover:scale-105 */
                }

                .custom-file-input .lucide-icon { /* Targeting Lucide icon within the label */
                    width: 1.25rem; /* w-5 */
                    height: 1.25rem; /* h-5 */
                    margin-right: 0.75rem; /* mr-3 */
                }

                .hidden-input {
                    display: none;
                }

                .error-message {
                    color: #dc2626; /* text-red-600 */
                    margin-top: 1rem; /* mt-4 */
                    text-align: center;
                }

                .upload-message {
                    color: #4b5563; /* text-gray-600 */
                    margin-top: 1rem; /* mt-4 */
                    display: flex;
                    align-items: center;
                }

                .upload-message .lucide-icon {
                    width: 1.25rem; /* w-5 */
                    height: 1.25rem; /* h-5 */
                    margin-right: 0.5rem; /* mr-2 */
                }

                .category-selection {
                    margin-bottom: 2rem; /* mb-8 */
                }

                .section-title {
                    font-size: 1.5rem; /* text-2xl */
                    font-weight: 600; /* font-semibold */
                    color: #374151; /* text-gray-700 */
                    margin-bottom: 1rem; /* mb-4 */
                    display: flex;
                    align-items: center;
                }

                .section-title .lucide-icon {
                    width: 1.75rem; /* w-7 */
                    height: 1.75rem; /* h-7 */
                    margin-right: 0.75rem; /* mr-3 */
                    color: #4f46e5; /* text-indigo-600 */
                }

                .category-select-wrapper {
                    position: relative;
                }

                .category-select {
                    display: block;
                    width: 100%;
                    padding: 0.75rem; /* p-3 */
                    border: 1px solid #d1d5db; /* border border-gray-300 */
                    border-radius: 0.5rem; /* rounded-lg */
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
                    outline: none; /* focus:outline-none */
                    -webkit-appearance: none; /* appearance-none */
                    -moz-appearance: none; /* appearance-none */
                    appearance: none;
                    padding-right: 2.5rem; /* pr-10 for arrow icon */
                }

                .category-select:focus {
                    border-color: #6366f1; /* focus:border-indigo-500 */
                    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5); /* focus:ring-2 focus:ring-indigo-500 */
                }

                .category-select-wrapper .pointer-events-none {
                    position: absolute;
                    inset: 0; /* top-0 right-0 bottom-0 left-0 */
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end; /* Align to the right */
                    padding-right: 0.5rem; /* px-2 */
                    color: #374151; /* text-gray-700 */
                    pointer-events: none;
                }

                .category-select-wrapper .pointer-events-none svg {
                    fill: currentColor;
                    height: 1rem; /* h-4 */
                    width: 1rem; /* w-4 */
                }

                /* Problem Card Styles */
                .problem-card {
                    background-color: #ffffff; /* bg-white */
                    border-radius: 0.5rem; /* rounded-lg */
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
                    padding: 1rem; /* p-4 */
                    transition: transform 0.2s ease-in-out; /* transition-transform transform */
                }

                .problem-card:hover {
                    transform: scale(1.05); /* hover:scale-105 */
                }

                .problem-card-title {
                    font-size: 1.125rem; /* text-lg */
                    font-weight: 600; /* font-semibold */
                    color: #2d3748; /* text-gray-800 */
                    margin-bottom: 0.5rem; /* mb-2 */
                    display: flex;
                    align-items: center;
                }

                .problem-card-title .icon-blue {
                    width: 1.25rem; /* w-5 */
                    height: 1.25rem; /* h-5 */
                    margin-right: 0.5rem; /* mr-2 */
                    color: #3b82f6; /* text-blue-500 */
                }

                .problem-card-details {
                    color: #4b5563; /* text-gray-600 */
                    font-size: 0.875rem; /* text-sm */
                }

                .problem-negated-status {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.25rem; /* mb-1 */
                }

                .problem-negated-status .icon-red {
                    width: 1rem; /* w-4 */
                    height: 1rem; /* h-4 */
                    margin-left: 0.5rem; /* ml-2 */
                    color: #ef4444; /* text-red-500 */
                }

                .problem-negated-status .icon-green {
                    width: 1rem; /* w-4 */
                    height: 1rem; /* h-4 */
                    margin-left: 0.5rem; /* ml-2 */
                    color: #22c55e; /* text-green-500 */
                }

                .modifiers-section {
                    margin-top: 0.5rem; /* mt-2 */
                }

                .modifiers-title {
                    font-weight: 500; /* font-medium */
                    color: #374151; /* text-gray-700 */
                }

                .modifiers-list {
                    list-style-type: disc;
                    list-style-position: inside;
                    margin-left: 1rem; /* ml-4 */
                }

                .modifier-item {
                    color: #4b5563; /* text-gray-600 */
                }

                .modifier-key {
                    font-weight: 600; /* font-semibold */
                    text-transform: capitalize;
                }

                .problems-grid {
                    display: grid;
                    grid-template-columns: 1fr; /* grid-cols-1 */
                    gap: 1.5rem; /* gap-6 */
                }

                @media (min-width: 640px) { /* sm */
                    .problems-grid {
                        grid-template-columns: repeat(2, 1fr); /* sm:grid-cols-2 */
                    }
                }

                @media (min-width: 1024px) { /* lg */
                    .problems-grid {
                        grid-template-columns: repeat(3, 1fr); /* lg:grid-cols-3 */
                    }
                }

                .no-data-message {
                    color: #6b7280; /* text-gray-500 */
                    text-align: center;
                    padding-top: 1rem; /* py-4 */
                    padding-bottom: 1rem; /* py-4 */
                }

                /* GAF Score Section */
                .gaf-summary {
                    background-color: #ecfdf5; /* bg-green-50 */
                    padding: 1rem; /* p-4 */
                    border-radius: 0.5rem; /* rounded-lg */
                    text-align: center;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
                    margin-bottom: 2rem; /* mb-8 */
                }

                .gaf-summary p {
                    font-size: 1.125rem; /* text-lg */
                    font-weight: 500; /* font-medium */
                    color: #374151; /* text-gray-700 */
                }

                .gaf-summary .gaf-score-value {
                    font-weight: 700; /* font-bold */
                    color: #047857; /* text-green-700 */
                    font-size: 1.5rem; /* text-2xl */
                }

                .gaf-summary .gaf-explanation {
                    font-size: 0.875rem; /* text-sm */
                    color: #4b5563; /* text-gray-600 */
                    margin-top: 0.5rem; /* mt-2 */
                }

                /* BPRS Scores Section */
                .bprs-summary {
                    background-color: #eff6ff; /* bg-blue-50 */
                    padding: 1rem; /* p-4 */
                    border-radius: 0.5rem; /* rounded-lg */
                    margin-bottom: 1.5rem; /* mb-6 */
                    text-align: center;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
                }

                .bprs-summary p {
                    font-size: 1.125rem; /* text-lg */
                    font-weight: 500; /* font-medium */
                    color: #374151; /* text-gray-700 */
                }

                .bprs-summary .bprs-total-sum {
                    font-weight: 700; /* font-bold */
                    color: #6366f1; /* text-indigo-600 */
                }

                .bprs-chart-container {
                    background-color: #f9fafb; /* bg-gray-50 */
                    padding: 1rem; /* p-4 */
                    border-radius: 0.5rem; /* rounded-lg */
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
                }
                `}
            </style>
            <div className="main-content-wrapper">
                <h1 className="main-title">
                    PsyMed Visualizer
                </h1>

                {/* File Upload Section */}
                <section className="upload-section">
                    <label htmlFor="json-upload" className="custom-file-input">
                        <UploadCloud className="lucide-icon" />
                        {loading ? 'Loading...' : 'Upload JSON File'}
                        <input
                            id="json-upload"
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            disabled={loading}
                            className="hidden-input"
                        />
                    </label>
                    {error && (
                        <p className="error-message">{error}</p>
                    )}
                    {!jsonData && !loading && !error && (
                        <p className="upload-message">
                            <FileText className="lucide-icon" />
                            Please upload a JSON file to see the analysis.
                        </p>
                    )}
                </section>

                {jsonData && (
                    <>
                        {/* Category Selection */}
                        <section className="category-selection">
                            <h2 className="section-title">
                                <Hash className="lucide-icon" />
                                Section Selection
                            </h2>
                            <div className="category-select-wrapper">
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className="category-select"
                                >
                                    {Object.keys(jsonData).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none">
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </section>

                        {/* Problems Section */}
                        <section className="mb-8">
                            <h2 className="section-title">
                                <Hash className="lucide-icon" />
                                Identified Problems ({currentCategoryData?.problems.length || 0})
                            </h2>
                            {currentCategoryData && currentCategoryData.problems.length > 0 ? (
                                <div className="problems-grid">
                                    {currentCategoryData.problems.map((problem, index) => (
                                        <ProblemCard key={index} problem={problem} />
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data-message">No problems identified for this category.</p>
                            )}
                        </section>

                        {/* GAF Score Section */}
                        <section className="mb-8">
                            <h2 className="section-title">
                                <TrendingUp className="lucide-icon" />
                                GAF Score
                            </h2>
                            <div className="gaf-summary">
                                <p>
                                    Global Assessment of Functioning (GAF): <span className="gaf-score-value">{currentCategoryData?.gafScore !== undefined ? currentCategoryData.gafScore : 'N/A'}</span>
                                </p>
                                <p className="gaf-explanation">
                                    (A higher score indicates better psychological, social, and occupational functioning.)
                                </p>
                            </div>
                        </section>

                        {/* BPRS Scores Section */}
                        <section>
                            <h2 className="section-title">
                                <Hash className="lucide-icon" />
                                BPRS Scores
                            </h2>
                            <div className="bprs-summary">
                                <p>
                                    Total BPRS Sum: <span className="bprs-total-sum">{currentCategoryData?.totalBPRSSum || 'N/A'}</span>
                                </p>
                            </div>

                            {bprsData.length > 0 ? (
                                <div className="bprs-chart-container">
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart
                                            data={bprsData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                                            <XAxis
                                                dataKey="name"
                                                angle={-45}
                                                textAnchor="end"
                                                interval={0}
                                                height={80}
                                                tick={{ fill: '#4a5568', fontSize: 12 }}
                                            />
                                            <YAxis
                                                tick={{ fill: '#4a5568', fontSize: 12 }}
                                                domain={[0, 7]} // BPRS scores typically range from 1 to 7
                                            />
                                            {/* Recharts Tooltip Customization using props, not external CSS classes */}
                                            <Tooltip
                                                cursor={{ fill: 'rgba(129, 140, 248, 0.2)' }}
                                                contentStyle={{ borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #e2e8f0', padding: '0.75rem' }}
                                                labelStyle={{ fontWeight: 'bold', color: '#1a202c' }}
                                                itemStyle={{ color: '#4a5568' }}
                                            />
                                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                            <Bar dataKey="score" fill="#6366f1" name="Score" radius={[10, 10, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <p className="no-data-message">No BPRS scores available for this category.</p>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
