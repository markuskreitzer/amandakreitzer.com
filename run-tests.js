#!/usr/bin/env node

/**
 * Test runner for Amanda Kreitzer Portfolio
 * 
 * Usage:
 *   node run-tests.js              # Run all tests in Chrome
 *   node run-tests.js --full       # Run tests in all browsers
 *   node run-tests.js --ui          # Run with Playwright UI
 *   node run-tests.js --debug      # Run in debug mode
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);

// Default configuration
let playwrightArgs = ['test', '--project=chromium', '--reporter=list'];

// Parse command line arguments
if (args.includes('--full')) {
  playwrightArgs = ['test', '--reporter=list'];
} else if (args.includes('--ui')) {
  playwrightArgs = ['test', '--ui'];
} else if (args.includes('--debug')) {
  playwrightArgs = ['test', '--debug', '--project=chromium'];
} else if (args.includes('--headed')) {
  playwrightArgs = ['test', '--headed', '--project=chromium'];
}

console.log('🧪 Running Amanda Kreitzer Portfolio Tests...\n');
console.log(`Command: npx playwright ${playwrightArgs.join(' ')}\n`);

// Run Playwright tests
const playwright = spawn('npx', ['playwright', ...playwrightArgs], {
  stdio: 'inherit',
  cwd: __dirname
});

playwright.on('close', (code) => {
  console.log(`\n🏁 Tests completed with exit code ${code}`);
  
  if (code === 0) {
    console.log('✅ All tests passed!');
    console.log('\n📊 To view detailed test report, run: npm run test:report');
  } else {
    console.log('❌ Some tests failed.');
    console.log('\n🔍 For more details:');
    console.log('  - Run with --ui flag: node run-tests.js --ui');
    console.log('  - Run with --debug flag: node run-tests.js --debug');
    console.log('  - View test report: npm run test:report');
  }
  
  process.exit(code);
});

playwright.on('error', (error) => {
  console.error('❌ Error running tests:', error.message);
  process.exit(1);
});