
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const distFolder = "dist";

function runCommand(command, options = {}) {
    try {
        execSync(command, { stdio: "inherit", ...options });
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        process.exit(1);
    }
}

console.log("Building project...");
runCommand("npm run build");

const distPath = path.resolve(distFolder);

if (!fs.existsSync(distPath)) {
    console.error("Build failed: dist folder not found");
    process.exit(1);
}

process.chdir(distPath);

console.log("Initializing git...");
runCommand("git init");
runCommand('git config user.email "amritlal7200@gmail.com"');
runCommand('git config user.name "Amarjit"');
runCommand("git checkout -b gh-pages");
runCommand("git add -A");
runCommand('git commit -m "Deploy to GitHub Pages"');

console.log("Pushing to GitHub...");
runCommand("git push -f https://github.com/Amarjit99/TheContrractum.git gh-pages");

console.log("Deployed successfully!");
