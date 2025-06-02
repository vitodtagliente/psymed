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
const App = () =>
{
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
                if (parsedData.problems && parsedData.bprsScores && typeof parsedData.totalBPRSSum === 'number')
                {
                    setJsonData(parsedData);
                } else
                {
                    setError("Invalid JSON structure. Please ensure it contains 'problems', 'bprsScores', and 'totalBPRSSum'.");
                    setJsonData(null);
                }
            } catch (parseError)
            {
                setError(`Error parsing JSON file: ${parseError.message}`);
                setJsonData(null);
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

        reader.readAsText(file);
    };

    const bprsData = jsonData ? Object.entries(jsonData.bprsScores).map(([key, value]) => ({
        name: value.name,
        score: value.score,
    })) : [];

    return (
        // Using custom CSS class names defined in src/index.css
        <div className="app-container">
            <div className="main-content-wrapper">
                <h1 className="main-title">
                    PsyMed NLP Analysis
                </h1>

                {/* File Upload Section */}
                <section className="upload-section">
                    <label htmlFor="json-upload" className="custom-file-input">
                        {/* Lucide icon, styled with inline style for precise control */}
                        <UploadCloud style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
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
                        <p className="error-message">{error}</p>
                    )}
                    {!jsonData && !loading && !error && (
                        <p className="upload-message">
                            {/* Lucide icon, styled with inline style */}
                            <FileText style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                            Please upload a JSON file to see the analysis.
                        </p>
                    )}
                </section>

                {jsonData && (
                    <>
                        {/* Problems Section */}
                        <section>
                            <h2 className="section-title">
                                {/* Lucide icon, styled with inline style */}
                                <Hash style={{ width: '1.75rem', height: '1.75rem', marginRight: '0.75rem', color: '#6366f1' }} />
                                Identified Problems ({jsonData.problems.length})
                            </h2>
                            {jsonData.problems.length > 0 ? (
                                <div className="problems-grid">
                                    {jsonData.problems.map((problem, index) => (
                                        <ProblemCard key={index} problem={problem} />
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data-message">No problems identified in the text.</p>
                            )}
                        </section>

                        {/* BPRS Scores Section */}
                        <section>
                            <h2 className="section-title">
                                {/* Lucide icon, styled with inline style */}
                                <Hash style={{ width: '1.75rem', height: '1.75rem', marginRight: '0.75rem', color: '#6366f1' }} />
                                BPRS Scores
                            </h2>
                            <div className="bprs-summary">
                                <p>
                                    Total BPRS Sum: <span>{jsonData.totalBPRSSum}</span>
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
                                <p className="no-data-message">No BPRS scores available.</p>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
