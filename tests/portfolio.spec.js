import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5174';

async function openNavigation(page) {
  const toggle = page.getByRole('button', { name: 'Toggle menu', exact: true });
  if (await toggle.isVisible()) await toggle.click();
}

test.describe('Amanda Kreitzer Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('https://www.google.com/recaptcha/api.js?**', route =>
      route.fulfill({ contentType: 'application/javascript', body: '' })
    );
    // Set up console monitoring for each test
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`❌ Console error: ${msg.text()}`);
      }
    });
    
    page.on('pageerror', error => {
      console.log(`💥 Page error: ${error.message}`);
    });
  });

  test('Home page loads correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check page loads without errors (allowing for default Vite title)
    await expect(page).toHaveTitle(/Amanda Kreitzer|Vite/i);
    
    // Check main elements are present
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    
    // Check navigation links
    await openNavigation(page);
    await expect(page.locator('nav').getByRole('link', { name: 'Home', exact: true })).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Gallery', exact: true })).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'About', exact: true })).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Exhibitions', exact: true })).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
    
    // Check hero section
    await expect(page.locator('h1').first()).toContainText('Amanda Kreitzer');
  });

  test('Gallery page functionality', async ({ page }) => {
    await page.goto(`${BASE_URL}/gallery`);
    
    // Wait for gallery to load
    await page.waitForSelector('[data-testid="gallery-grid"], .gallery-grid, .grid', { timeout: 10000 });
    
    // Check gallery items are present
    const galleryItems = page.locator('.gallery-item, [data-testid="gallery-item"], .grid > div');
    await expect(galleryItems.first()).toBeVisible();
    
    // Count gallery items
    const itemCount = await galleryItems.count();
    expect(itemCount).toBeGreaterThan(0);
    console.log(`✅ Found ${itemCount} gallery items`);
    
    // Test image loading
    const firstImage = galleryItems.first().locator('img');
    await expect(firstImage).toBeVisible();
    
    // Check image has loaded properly
    const imageSrc = await firstImage.getAttribute('src');
    expect(imageSrc).toBeTruthy();
    
    // Test modal functionality
    await galleryItems.first().click();
    
    // Wait for modal to appear
    await page.waitForSelector('[role="dialog"], .modal, [data-testid="gallery-modal"]', { timeout: 5000 });
    const modal = page.locator('[role="dialog"], .modal, [data-testid="gallery-modal"]').first();
    await expect(modal).toBeVisible();
    
    // Check modal content
    const modalImage = modal.locator('img');
    await expect(modalImage).toBeVisible();
    
    // Test modal close functionality
    const closeButton = modal.locator('[aria-label*="close"], .close, button[aria-label="Close"]').first();
    if (await closeButton.isVisible()) {
      await closeButton.click();
    } else {
      // Try ESC key
      await page.keyboard.press('Escape');
    }
    
    // Verify modal is closed
    await expect(modal).not.toBeVisible();
  });

  test('Navigation between pages', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Test Gallery navigation
    await openNavigation(page);
    await page.locator('nav').getByRole('link', { name: 'Gallery', exact: true }).click();
    await expect(page).toHaveURL(`${BASE_URL}/gallery`);
    await expect(page.getByRole('heading', { name: 'Gallery', exact: true })).toBeVisible();
    
    // Test About navigation
    await openNavigation(page);
    await page.locator('nav').getByRole('link', { name: 'About', exact: true }).click();
    await expect(page).toHaveURL(`${BASE_URL}/about`);
    await expect(page.locator('h1').first()).toContainText(/About/i);
    
    // Test Exhibitions navigation
    await openNavigation(page);
    await page.locator('nav').getByRole('link', { name: 'Exhibitions', exact: true }).click();
    await expect(page).toHaveURL(`${BASE_URL}/exhibitions`);
    await expect(page.locator('h1').first()).toContainText(/Exhibition/i);
    
    // Test Contact navigation
    await openNavigation(page);
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page).toHaveURL(`${BASE_URL}/contact`);
    await expect(page.locator('h1').first()).toContainText(/Contact/i);
    
    // Return to home
    await openNavigation(page);
    await page.locator('nav').getByRole('link', { name: 'Home', exact: true }).click();
    await expect(page).toHaveURL(BASE_URL + '/');
  });

  test('About page content', async ({ page }) => {
    await page.goto(`${BASE_URL}/about`);
    
    // Check main content is present
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1').first()).toContainText(/About/i);
    
    // Check for artist image
    const artistImage = page.locator('img[alt*="Amanda"], img[src*="artist"]');
    if (await artistImage.count() > 0) {
      await expect(artistImage.first()).toBeVisible();
    }
    
    // Check for bio text
    await expect(page.locator('main')).toContainText(/artist|paint|art/i);
  });

  test('Contact page functionality', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    
    // Check contact form or information is present
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1').first()).toContainText(/Contact/i);
    
    // Check for contact information or form
    const contactContent = page.locator('main');
    const hasForm = await page.locator('form').count() > 0;
    const hasContactInfo = await contactContent.textContent();
    
    expect(hasForm || (hasContactInfo && hasContactInfo.includes('@'))).toBeTruthy();
  });

  test('Exhibitions page content', async ({ page }) => {
    await page.goto(`${BASE_URL}/exhibitions`);
    
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1').first()).toContainText(/Exhibition/i);
    
    // Check for exhibition content
    const mainContent = await page.locator('main').textContent();
    expect(mainContent.length).toBeGreaterThan(50); // Reasonable content length
  });

  test('Responsive design - Mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Check mobile navigation (hamburger menu or mobile nav)
    const mobileNav = page.locator('[aria-label*="menu"], .mobile-menu, .hamburger');
    const regularNav = page.locator('nav');
    
    // Either mobile nav should be visible or regular nav should adapt
    const hasVisibleNav = await regularNav.isVisible() || await mobileNav.count() > 0;
    expect(hasVisibleNav).toBeTruthy();
    
    // Test gallery on mobile
    await page.goto(`${BASE_URL}/gallery`);
    await page.waitForSelector('[data-testid="gallery-grid"], .gallery-grid, .grid');
    
    const galleryItems = page.locator('.gallery-item, [data-testid="gallery-item"], .grid > div');
    await expect(galleryItems.first()).toBeVisible();
  });

  test('Responsive design - Tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    
    // Check layout adapts properly
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // Test gallery grid on tablet
    await page.goto(`${BASE_URL}/gallery`);
    await page.waitForSelector('[data-testid="gallery-grid"], .gallery-grid, .grid');
    
    const galleryItems = page.locator('.gallery-item, [data-testid="gallery-item"], .grid > div');
    const itemCount = await galleryItems.count();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('Performance and accessibility basics', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check for basic accessibility
    const headings = page.locator('h1, h2, h3');
    expect(await headings.count()).toBeGreaterThan(0);
    
    // Check for alt text on images (on gallery page)
    await page.goto(`${BASE_URL}/gallery`);
    await page.waitForSelector('img', { timeout: 10000 });
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      const firstImage = images.first();
      const altText = await firstImage.getAttribute('alt');
      expect(altText).toBeTruthy();
    }
  });

  test('Gallery keyboard navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/gallery`);
    await page.waitForSelector('[data-testid="gallery-grid"], .gallery-grid, .grid');
    
    // Click first image to open modal
    await page.locator('main .grid > .group').first().click();
    
    // Wait for modal
    await page.waitForSelector('[role="dialog"], .modal, [data-testid="gallery-modal"]');
    
    // Test ESC key closes modal
    await page.keyboard.press('Escape');
    
    // Verify modal is closed
    const modal = page.locator('[role="dialog"], .modal, [data-testid="gallery-modal"]').first();
    await expect(modal).not.toBeVisible();
  });

  test('No console errors on any page', async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });
    
    const pages = ['/', '/gallery', '/about', '/contact', '/exhibitions'];
    
    for (const pagePath of pages) {
      await page.goto(`${BASE_URL}${pagePath}`);
      await page.waitForLoadState('networkidle');
      // Wait a bit for any async operations
      await page.waitForTimeout(1000);
    }
    
    // Report any errors found
    if (consoleErrors.length > 0) {
      console.log('Console errors found:', consoleErrors);
    }
    if (pageErrors.length > 0) {
      console.log('Page errors found:', pageErrors);
    }
    
    expect(consoleErrors.length).toBe(0);
    expect(pageErrors.length).toBe(0);
  });
});