# Testing Guide

This project includes comprehensive end-to-end tests using Playwright to ensure the portfolio website functions correctly across different browsers and devices.

## Test Coverage

The test suite covers:

- ✅ **Page Loading**: All pages load without errors
- ✅ **Navigation**: Menu navigation works correctly
- ✅ **Gallery Functionality**: Image grid, modal lightbox, keyboard navigation
- ✅ **Responsive Design**: Mobile and tablet layouts
- ✅ **Accessibility**: Basic accessibility requirements
- ✅ **Performance**: Page load performance and console error detection

## Running Tests

### Quick Commands

```bash
# Run tests (Chrome only, fastest)
npm run test

# Run with visual UI
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Debug mode (step through tests)
npm run test:debug

# View latest test report
npm run test:report
```

### Custom Test Runner

```bash
# Run in Chrome only (default)
node run-tests.js

# Run in all browsers (Chrome, Firefox, Safari, Mobile)
node run-tests.js --full

# Run with Playwright UI
node run-tests.js --ui

# Run in debug mode
node run-tests.js --debug

# Run in headed mode
node run-tests.js --headed
```

## Test Structure

```
tests/
└── portfolio.spec.js    # Main test suite
```

### Tests Include:

1. **Home Page Tests**
   - Page loads and displays correctly
   - Navigation menu is present and functional
   - Hero section with artist name

2. **Gallery Tests**
   - Gallery grid displays artwork
   - Images load correctly
   - Modal lightbox functionality
   - Keyboard navigation (ESC to close)

3. **Page Navigation Tests**
   - All navigation links work
   - URL routing functions correctly
   - Page content loads appropriately

4. **Content Tests**
   - About page displays artist information
   - Contact page has contact details
   - Exhibitions page shows exhibition content

5. **Responsive Design Tests**
   - Mobile viewport (375x667)
   - Tablet viewport (768x1024)
   - Layout adapts correctly

6. **Performance & Quality Tests**
   - No console errors
   - Basic accessibility compliance
   - Image alt text present

## Regression Testing

These tests are designed to catch regressions when making changes to the site. Run them:

- **Before deploying** new changes
- **After updating dependencies**
- **When adding new features**
- **As part of CI/CD pipeline**

## Test Configuration

The tests are configured in `playwright.config.js`:

- **Base URL**: http://localhost:5174 (development server)
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Screenshots**: Taken on test failures
- **Videos**: Recorded for failed tests
- **Reports**: HTML report generated automatically

## Debugging Failed Tests

When tests fail:

1. **View Screenshots**: Check `test-results/` directory for failure screenshots
2. **Watch Videos**: Failed test videos show exactly what happened
3. **Use Debug Mode**: `node run-tests.js --debug` to step through tests
4. **Check Console**: Look for console errors in test output

## Adding New Tests

To add new tests:

1. Open `tests/portfolio.spec.js`
2. Add new test within the `test.describe('Amanda Kreitzer Portfolio')` block
3. Follow existing patterns for page navigation and assertions
4. Run tests locally to verify they work
5. Update this documentation if adding new test categories

## Continuous Integration

For CI/CD pipelines, use:

```bash
# Run all tests with CI optimizations
CI=true npm run test
```

This will:
- Use only 1 worker for stability
- Generate JSON report for parsing
- Retry failed tests twice
- Take screenshots and videos of failures