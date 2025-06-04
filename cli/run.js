// run-projects.js
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Funzione per lanciare un comando npm in una directory specifica.
 * @param {object} project - Un oggetto contenente il percorso del progetto e il comando.
 * @param {string} project.path - Il percorso della sottocartella del progetto.
 * @param {string} project.command - Il comando npm da eseguire (es. 'npm start', 'npm run dev').
 */
function runNpmCommand({ path: projectDir, command })
{
    const fullPath = path.join(__dirname, '..' ,projectDir);

    // Check if the project folder exists before trying to launch it
    if (!fs.existsSync(fullPath))
    {
        console.error(`[ERROR] Project folder "${projectDir}" does not exist at: ${fullPath}`);
        return; // Skip this project
    }

    console.log(`Launching "${command}" in: ${fullPath}`);
    const child = exec(command, { cwd: fullPath });

    child.stdout.on('data', (data) =>
    {
        // Prepend output with project name for clarity
        console.log(`[${projectDir}] stdout: ${data.trim()}`);
    });

    child.stderr.on('data', (data) =>
    {
        // Prepend error with project name for clarity
        console.error(`[${projectDir}] stderr: ${data.trim()}`);
    });

    child.on('close', (code) =>
    {
        console.log(`[${projectDir}] process terminated with code ${code}`);
    });

    child.on('error', (err) =>
    {
        console.error(`[${projectDir}] Error starting process: ${err}`);
    });
}

/**
 * Avvia più progetti Node.js in parallelo basandosi su una configurazione fornita.
 * @param {Array<object>} projectsConfig - Un array di oggetti configurazione progetto.
 */
function launchAllProjects(projectsConfig)
{
    console.log(`\n--- Starting Projects ---`);

    if (projectsConfig.length === 0)
    {
        console.warn("No projects defined in the configuration. The script will do nothing.");
    } 
    else
    {
        projectsConfig.forEach(project => runNpmCommand(project));
    }

    console.log('\n--- All processes have been started. ---');
    console.log('Press Ctrl+C to terminate all processes.');
}

// Export the function to be used by other scripts
module.exports = launchAllProjects;