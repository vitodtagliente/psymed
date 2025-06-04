const launchAllProjects = require('./cli/run');

const projectsConfig = [
    { path: 'psymed', command: 'npm start' },
    { path: 'editor', command: 'npm start' },
    { path: 'visualizer', command: 'npm start' },
];

const run_async = true;
launchAllProjects(projectsConfig, run_async);