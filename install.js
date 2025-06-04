const launchAllProjects = require('./cli/run');

const projectsConfig = [
    { path: 'psymed', command: 'npm update' },
    { path: 'editor', command: 'npm update' },
    { path: 'visualizer', command: 'npm update' },
];

const run_async = false;
launchAllProjects(projectsConfig, run_async);