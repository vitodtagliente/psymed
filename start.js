const launchAllProjects = require('./cli/run');

// --- Standard Projects Configuration ---
const projectsConfig = [
    { path: 'psymed', command: 'npm start' },
    { path: 'editor', command: 'npm start' },
    { path: 'visualizer', command: 'npm start' },
];
// ------------------------------------

launchAllProjects(projectsConfig);