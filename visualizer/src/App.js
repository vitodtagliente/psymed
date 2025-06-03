import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, XCircle, Info, Hash, UploadCloud, FileText } from 'lucide-react';

// Component to display a single problem
const ProblemCard = ({ problem }) => (
    // Using custom CSS class names defined in src/index.css
    <div className="problem-card">
        <h3 className="problem-card-title">
            {/* Lucide icon, styled via CSS class or inline style */}
            <Info className="icon-blue" />
            {problem.text}
        </h3>
        <div className="problem-card-details">
            <p>
                Negated: {problem.isNegated ? <XCircle className="icon-red" /> : <CheckCircle className="icon-green" />}
            </p>
            {Object.keys(problem.modifiers).length > 0 && (
                <div className="modifiers-section">
                    <p>Modifiers:</p>
                    <ul>
                        {Object.entries(problem.modifiers).map(([key, values]) => (
                            <li key={key}>
                                <span>{key.replace(/_/g, ' ')}:</span> {values.join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
);

// Main App component
const App = () => {
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Handles file selection and parsing
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        setLoading(true);
        setError(null);

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const parsedData = JSON.parse(e.target.result);
                // Check if the parsed data has the new category structure
                if (Object.keys(parsedData).length > 0 && Object.values(parsedData).every(
                    category => category.problems && category.bprsScores && typeof category.totalBPRSSum === 'number'
                )) {
                    setJsonData(parsedData);
                    // Automatically select the first category if available
                    setSelectedCategory(Object.keys(parsedData)[0]);
                } else {
                    setError("Invalid JSON structure. Please ensure it contains categories with 'problems', 'bprsScores', and 'totalBPRSSum'.");
                    setJsonData(null);
                    setSelectedCategory(null);
                }
            } catch (parseError) {
                setError(`Error parsing JSON file: ${parseError.message}`);
                setJsonData(null);
                setSelectedCategory(null);
            } finally {
                setLoading(false);
            }
        };

        reader.onerror = () => {
            setError("Error reading file. Please try again.");
            setLoading(false);
            setJsonData(null);
            setSelectedCategory(null);
        };

        reader.readAsText(file);
    };

    // Handles category selection
    const handleCategoryChange = (event) => {
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
        // Main application container with responsive styling
        <div className="app-container min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="main-content-wrapper bg-white shadow-xl rounded-lg p-6 sm:p-8 lg:p-10 w-full max-w-4xl">
                <h1 className="main-title text-4xl font-extrabold text-gray-800 text-center mb-8">
                    PsyMed NLP Analysis
                </h1>

                {/* File Upload Section */}
                <section className="upload-section bg-blue-50 p-6 rounded-lg mb-8 flex flex-col items-center justify-center">
                    <label htmlFor="json-upload" className="custom-file-input bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full cursor-pointer flex items-center shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                        <UploadCloud className="w-5 h-5 mr-3" />
                        {loading ? 'Loading...' : 'Upload JSON File'}
                        <input
                            id="json-upload"
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            disabled={loading}
                            className="hidden"
                        />
                    </label>
                    {error && (
                        <p className="error-message text-red-600 mt-4 text-center">{error}</p>
                    )}
                    {!jsonData && !loading && !error && (
                        <p className="upload-message text-gray-600 mt-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Please upload a JSON file to see the analysis.
                        </p>
                    )}
                </section>

                {jsonData && (
                    <>
                        {/* Category Selection */}
                        <section className="category-selection mb-8">
                            <h2 className="section-title text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                                <Hash className="w-7 h-7 mr-3 text-indigo-600" />
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
                            </div>
                        </section>

                        {/* Problems Section */}
                        <section className="mb-8">
                            <h2 className="section-title text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                                <Hash className="w-7 h-7 mr-3 text-indigo-600" />
                                Identified Problems ({currentCategoryData?.problems.length || 0})
                            </h2>
                            {currentCategoryData && currentCategoryData.problems.length > 0 ? (
                                <div className="problems-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentCategoryData.problems.map((problem, index) => (
                                        <ProblemCard key={index} problem={problem} />
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data-message text-gray-500 text-center py-4">No problems identified for this category.</p>
                            )}
                        </section>

                        {/* BPRS Scores Section */}
                        <section>
                            <h2 className="section-title text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                                <Hash className="w-7 h-7 mr-3 text-indigo-600" />
                                BPRS Scores
                            </h2>
                            <div className="bprs-summary bg-blue-50 p-4 rounded-lg mb-6 text-center">
                                <p className="text-lg font-medium text-gray-700">
                                    Total BPRS Sum: <span className="font-bold text-indigo-600">{currentCategoryData?.totalBPRSSum || 'N/A'}</span>
                                </p>
                            </div>

                            {bprsData.length > 0 ? (
                                <div className="bprs-chart-container bg-gray-50 p-4 rounded-lg shadow-md">
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
                                <p className="no-data-message text-gray-500 text-center py-4">No BPRS scores available for this category.</p>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
