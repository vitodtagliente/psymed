import React, { useState } from 'react'; // Import useState hook
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, XCircle, Info, Hash, UploadCloud, FileText } from 'lucide-react'; // Added UploadCloud and FileText icons

// Component to display a single problem
const ProblemCard = ({ problem }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-500" />
            {problem.text}
        </h3>
        <div className="text-sm text-gray-600 mt-2">
            <p className="flex items-center">
                Negated: {problem.isNegated ? <XCircle className="w-4 h-4 ml-1 text-red-500" /> : <CheckCircle className="w-4 h-4 ml-1 text-green-500" />}
            </p>
            {Object.keys(problem.modifiers).length > 0 && (
                <div className="mt-2">
                    <p className="font-medium">Modifiers:</p>
                    <ul className="list-disc list-inside ml-4">
                        {Object.entries(problem.modifiers).map(([key, values]) => (
                            <li key={key}>
                                <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {values.join(', ')}
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
    // State to hold the loaded JSON data
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle file selection
    const handleFileChange = (event) =>
    {
        const file = event.target.files[0];
        if (!file)
        {
            return;
        }

        setLoading(true);
        setError(null); // Clear previous errors

        const reader = new FileReader();

        reader.onload = (e) =>
        {
            try
            {
                const parsedData = JSON.parse(e.target.result);
                // Basic validation for expected structure
                if (parsedData.problems && parsedData.bprsScores && typeof parsedData.totalBPRSSum === 'number')
                {
                    setJsonData(parsedData);
                } else
                {
                    setError("Invalid JSON structure. Please ensure it contains 'problems', 'bprsScores', and 'totalBPRSSum'.");
                    setJsonData(null); // Clear data if structure is invalid
                }
            } catch (parseError)
            {
                setError(`Error parsing JSON file: ${parseError.message}`);
                setJsonData(null); // Clear data on parse error
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
        };

        reader.readAsText(file); // Read the file as text
    };

    // Prepare BPRS data for the chart if jsonData is available
    const bprsData = jsonData ? Object.entries(jsonData.bprsScores).map(([key, value]) => ({
        name: value.name,
        score: value.score,
    })) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8 font-sans text-gray-900">
            <style>
                {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .recharts-default-tooltip {
          border-radius: 0.5rem !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
          background-color: rgba(255, 255, 255, 0.9) !important;
          border: 1px solid #e2e8f0 !important;
          padding: 0.75rem !important;
        }
        .recharts-tooltip-label {
          font-weight: 600 !important;
          color: #1a202c !important;
        }
        .recharts-tooltip-item {
          color: #4a5568 !important;
        }
        /* Custom file input styling */
        .custom-file-input {
          display: inline-block;
          cursor: pointer;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          color: #ffffff;
          background-color: #6366f1; /* Indigo-500 */
          transition: background-color 0.3s ease, transform 0.2s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .custom-file-input:hover {
          background-color: #4f46e5; /* Indigo-600 */
          transform: translateY(-1px);
        }
        .custom-file-input:active {
          background-color: #4338ca; /* Indigo-700 */
          transform: translateY(0);
        }
        .custom-file-input input[type="file"] {
          display: none;
        }
        `}
            </style>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-10">
                <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
                    PsyMed NLP Analysis
                </h1>

                {/* File Upload Section */}
                <section className="mb-10 text-center">
                    <label htmlFor="json-upload" className="custom-file-input flex items-center justify-center mx-auto max-w-xs">
                        <UploadCloud className="w-5 h-5 mr-2" />
                        {loading ? 'Loading...' : 'Upload JSON File'}
                        <input
                            id="json-upload"
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            disabled={loading}
                        />
                    </label>
                    {error && (
                        <p className="text-red-600 mt-4 text-sm font-medium">{error}</p>
                    )}
                    {!jsonData && !loading && !error && (
                        <p className="text-gray-500 mt-4 text-md flex items-center justify-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Please upload a JSON file to see the analysis.
                        </p>
                    )}
                </section>

                {jsonData && (
                    <>
                        {/* Problems Section */}
                        <section className="mb-10">
                            <h2 className="text-3xl font-bold text-indigo-600 mb-6 border-b-2 border-indigo-200 pb-2 flex items-center">
                                <Hash className="w-7 h-7 mr-3 text-indigo-500" />
                                Identified Problems ({jsonData.problems.length})
                            </h2>
                            {jsonData.problems.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {jsonData.problems.map((problem, index) => (
                                        <ProblemCard key={index} problem={problem} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 italic">No problems identified in the text.</p>
                            )}
                        </section>

                        {/* BPRS Scores Section */}
                        <section>
                            <h2 className="text-3xl font-bold text-indigo-600 mb-6 border-b-2 border-indigo-200 pb-2 flex items-center">
                                <Hash className="w-7 h-7 mr-3 text-indigo-500" />
                                BPRS Scores
                            </h2>
                            <div className="bg-blue-50 p-6 rounded-lg shadow-inner mb-6 text-center">
                                <p className="text-2xl font-bold text-blue-800">
                                    Total BPRS Sum: <span className="text-indigo-700">{jsonData.totalBPRSSum}</span>
                                </p>
                            </div>

                            {bprsData.length > 0 ? (
                                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 overflow-x-auto">
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
                                            <Tooltip
                                                cursor={{ fill: 'rgba(129, 140, 248, 0.2)' }}
                                                contentStyle={{ borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                                labelStyle={{ fontWeight: 'bold', color: '#1a202c' }}
                                                itemStyle={{ color: '#4a5568' }}
                                            />
                                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                            <Bar dataKey="score" fill="#6366f1" name="Score" radius={[10, 10, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <p className="text-gray-600 italic">No BPRS scores available.</p>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
