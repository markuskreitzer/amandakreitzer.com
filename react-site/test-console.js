#!/usr/bin/env node

import { chromium } from 'playwright';

async function testSite() {
  console.log('🧪 Testing site for console errors...\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    consoleMessages.push({ type, text });
    
    if (type === 'error') {
      console.log(`❌ ERROR: ${text}`);
    } else if (type === 'warning') {
      console.log(`⚠️  WARNING: ${text}`);
    }
  });
  
  // Collect page errors
  page.on('pageerror', error => {
    console.log(`💥 PAGE ERROR: ${error.message}`);
  });
  
  // Test each page
  const pages = [
    { name: 'Home', url: 'http://localhost:5174/' },
    { name: 'Gallery', url: 'http://localhost:5174/gallery' },
    { name: 'About', url: 'http://localhost:5174/about' },
    { name: 'Exhibitions', url: 'http://localhost:5174/exhibitions' },
    { name: 'Contact', url: 'http://localhost:5174/contact' }
  ];
  
  for (const testPage of pages) {
    console.log(`\n📄 Testing ${testPage.name} page...`);
    
    try {
      await page.goto(testPage.url, { waitUntil: 'networkidle' });
      
      // Wait a bit for any async operations
      await page.waitForTimeout(2000);
      
      console.log(`✅ ${testPage.name} page loaded successfully`);
      
    } catch (error) {
      console.log(`❌ Failed to load ${testPage.name}: ${error.message}`);
    }
  }
  
  await browser.close();
  
  // Summary
  const errors = consoleMessages.filter(msg => msg.type === 'error');
  const warnings = consoleMessages.filter(msg => msg.type === 'warning');
  
  console.log('\n📊 Summary:');
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);
  
  if (errors.length > 0) {
    console.log('\n🔍 Error Details:');
    errors.forEach(error => console.log(`  - ${error.text}`));
  }
}

// Check if server is running first
async function checkServer() {
  try {
    const response = await fetch('http://localhost:5174/');
    if (response.ok) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

async function main() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Development server not running at http://localhost:5174/');
    console.log('Please start the server with: npm run dev');
    process.exit(1);
  }
  
  await testSite();
}

main().catch(console.error);