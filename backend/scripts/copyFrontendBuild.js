const fs = require("fs");
const path = require("path");

const backendRoot = path.resolve(__dirname, "..");
const sourceDir = path.resolve(backendRoot, "../frontend/dist");
const targetDir = path.resolve(backendRoot, "public");

if (!fs.existsSync(sourceDir)) {
    console.error(`Frontend build not found at ${sourceDir}`);
    process.exit(1);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Copied frontend build from ${sourceDir} to ${targetDir}`);
