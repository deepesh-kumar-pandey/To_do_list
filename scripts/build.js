const fs = require('fs');
const path = require('path');
const { minify: minifyHTML } = require('html-minifier');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
const DIST_DIR = path.join(FRONTEND_DIR, 'dist');
const isProduction = process.env.NODE_ENV === 'production';

console.log('🚀 Building QuestLog for', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');

// Create dist directory
if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
    console.log('✅ Created dist directory');
}

async function minifyJavaScript() {
    console.log('📦 Minifying JavaScript...');

    const jsFiles = ['app.js', 'auth.js', 'boss_battles.js', 'config.js'];

    for (const file of jsFiles) {
        const inputPath = path.join(FRONTEND_DIR, file);
        const outputPath = path.join(DIST_DIR, file.replace('.js', '.min.js'));

        try {
            await execAsync(`npx terser ${inputPath} -o ${outputPath} --compress --mangle --comments false`);

            const originalSize = fs.statSync(inputPath).size;
            const minifiedSize = fs.statSync(outputPath).size;
            const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

            console.log(`  ✓ ${file}: ${originalSize} → ${minifiedSize} bytes (${savings}% smaller)`);
        } catch (error) {
            console.error(`  ✗ Failed to minify ${file}:`, error.message);
        }
    }
}

async function minifyCSS() {
    console.log('🎨 Minifying CSS...');

    const cssFiles = ['styles.css', 'boss_battles.css'];

    for (const file of cssFiles) {
        const inputPath = path.join(FRONTEND_DIR, file);
        const outputPath = path.join(DIST_DIR, file.replace('.css', '.min.css'));

        try {
            await execAsync(`npx cssnano ${inputPath} ${outputPath}`);

            const originalSize = fs.statSync(inputPath).size;
            const minifiedSize = fs.statSync(outputPath).size;
            const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

            console.log(`  ✓ ${file}: ${originalSize} → ${minifiedSize} bytes (${savings}% smaller)`);
        } catch (error) {
            console.error(`  ✗ Failed to minify ${file}:`, error.message);
        }
    }
}

function minifyHTMLFiles() {
    console.log('📄 Minifying HTML...');

    const htmlFiles = ['index.html', 'auth.html'];

    const minifyOptions = {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
    };

    htmlFiles.forEach((file) => {
        const inputPath = path.join(FRONTEND_DIR, file);
        const outputPath = path.join(DIST_DIR, file);

        try {
            const html = fs.readFileSync(inputPath, 'utf8');

            // Replace references to original files with minified versions
            let processedHTML = html
                .replace(/src="app\.js"/g, 'src="app.min.js"')
                .replace(/src="auth\.js"/g, 'src="auth.min.js"')
                .replace(/src="boss_battles\.js"/g, 'src="boss_battles.min.js"')
                .replace(/src="config\.js"/g, 'src="config.min.js"')
                .replace(/href="styles\.css"/g, 'href="styles.min.css"')
                .replace(/href="boss_battles\.css"/g, 'href="boss_battles.min.css"');

            const minified = minifyHTML(processedHTML, minifyOptions);
            fs.writeFileSync(outputPath, minified);

            const originalSize = html.length;
            const minifiedSize = minified.length;
            const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

            console.log(`  ✓ ${file}: ${originalSize} → ${minifiedSize} bytes (${savings}% smaller)`);
        } catch (error) {
            console.error(`  ✗ Failed to minify ${file}:`, error.message);
        }
    });
}

function copyAssets() {
    console.log('📁 Copying assets...');

    const assetsDir = path.join(FRONTEND_DIR, 'assets');
    const distAssetsDir = path.join(DIST_DIR, 'assets');

    if (fs.existsSync(assetsDir)) {
        if (!fs.existsSync(distAssetsDir)) {
            fs.mkdirSync(distAssetsDir, { recursive: true });
        }

        const files = fs.readdirSync(assetsDir);
        files.forEach((file) => {
            fs.copyFileSync(
                path.join(assetsDir, file),
                path.join(distAssetsDir, file)
            );
        });

        console.log(`  ✓ Copied ${files.length} asset file(s)`);
    } else {
        console.log('  ⚠ No assets directory found');
    }
}

function generateBuildInfo() {
    const buildInfo = {
        version: require('../package.json').version,
        buildDate: new Date().toISOString(),
        environment: isProduction ? 'production' : 'development',
        node: process.version,
    };

    fs.writeFileSync(
        path.join(DIST_DIR, 'build-info.json'),
        JSON.stringify(buildInfo, null, 2)
    );

    console.log('📝 Generated build info');
}

async function build() {
    try {
        const startTime = Date.now();

        await minifyJavaScript();
        await minifyCSS();
        minifyHTMLFiles();
        copyAssets();
        generateBuildInfo();

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);

        console.log(`\n✨ Build completed in ${duration}s`);
        console.log(`📦 Output directory: ${DIST_DIR}`);

        if (isProduction) {
            console.log('\n⚠️  PRODUCTION BUILD - Remember to:');
            console.log('  1. Set environment variables on your hosting platform');
            console.log('  2. Test the build before deploying');
            console.log('  3. Update CSP headers if deploying to a new domain');
        }
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

build();
