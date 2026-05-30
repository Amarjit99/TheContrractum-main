const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const frontendDir = path.join(rootDir, 'frontend');
const backendDir = path.join(rootDir, 'backend');

// Try to load archiver from root or backend node_modules
let archiverModule;
try {
  archiverModule = require('archiver');
} catch (e) {
  try {
    const backendArchiverPath = path.join(backendDir, 'node_modules', 'archiver');
    archiverModule = require(backendArchiverPath);
  } catch (err) {
    console.error("❌ Error: 'archiver' npm package is not installed.");
    console.error("Please run 'npm install' in the root or 'npm install archiver' in backend.");
    process.exit(1);
  }
}
const { ZipArchive } = archiverModule;

// Helper to run commands
function runCommand(command, cwd) {
  try {
    console.log(`Running: "${command}" in ${cwd}...`);
    execSync(command, { stdio: 'inherit', cwd });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    process.exit(1);
  }
}

// Step 1: Clean previous builds and caches
console.log('--- Step 1: Cleaning previous builds and caches ---');
const distPath = path.join(frontendDir, 'dist');
if (fs.existsSync(distPath)) {
  console.log('Removing old dist folder...');
  fs.rmSync(distPath, { recursive: true, force: true });
}
const viteCachePath = path.join(frontendDir, 'node_modules', '.vite');
if (fs.existsSync(viteCachePath)) {
  console.log('Removing Vite cache...');
  fs.rmSync(viteCachePath, { recursive: true, force: true });
}

console.log('Building Frontend...');
runCommand('npm run build', frontendDir);

// Step 2: Verify .htaccess is in build output
const htaccessSource = path.join(frontendDir, 'public', '.htaccess');
const htaccessDest = path.join(frontendDir, 'dist', '.htaccess');

if (fs.existsSync(htaccessSource)) {
  if (!fs.existsSync(htaccessDest)) {
    console.log('Copying .htaccess to build directory...');
    fs.copyFileSync(htaccessSource, htaccessDest);
  }
} else {
  console.log('⚠️ Warning: .htaccess not found in frontend/public.');
}

// Step 3: Zip Frontend
console.log('\n--- Step 2: Packaging Frontend ---');
const frontendZipPath = path.join(rootDir, 'frontend_build.zip');
const backendZipPath = path.join(rootDir, 'backend_upload.zip');

function zipDirectory(sourceDir, outPath, excludeFilter) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outPath);
    const archive = new ZipArchive({ zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`✅ Created ${path.basename(outPath)} (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Apply custom filtering if provided
    if (excludeFilter) {
      archive.directory(sourceDir, false, (entry) => {
        if (excludeFilter(entry.name)) {
          return false;
        }
        return entry;
      });
    } else {
      archive.directory(sourceDir, false);
    }

    archive.finalize();
  });
}

zipDirectory(path.join(frontendDir, 'dist'), frontendZipPath)
  .then(() => {
    // Step 4: Zip Backend
    console.log('\n--- Step 3: Packaging Backend ---');

    // Filter to exclude node_modules, local .env (except example), .git, zip files, and user uploads
    const backendFilter = (entryName) => {
      // Normalize path separators to forward slash
      const normalizedName = entryName.replace(/\\/g, '/');

      // Exclusions
      if (
        normalizedName.includes('node_modules/') ||
        normalizedName.startsWith('node_modules/') ||
        normalizedName.includes('.git/') ||
        normalizedName.startsWith('.git/') ||
        (normalizedName.startsWith('.env') && normalizedName !== '.env.example' && normalizedName !== '.env.production') ||
        normalizedName.endsWith('.zip') ||
        normalizedName === 'survey_responses.xlsx'
      ) {
        return true;
      }
      return false;
    };

    return zipDirectory(backendDir, backendZipPath, backendFilter);
  })
  .then(() => {
    console.log('\n🎉 Packaging complete! Ready for Hostinger:');
    console.log(`   - Frontend build: ${frontendZipPath}`);
    console.log(`   - Backend sources: ${backendZipPath}`);
  })
  .catch((err) => {
    console.error('❌ Zip error:', err);
    process.exit(1);
  });
