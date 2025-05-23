# Test Suite Documentation

This document describes the comprehensive test suite for the Self-Care Dashboard Electron application.

## Test Structure

The test suite is organized into several categories:

```
tests/
├── main/               # Main process tests
├── renderer/           # Renderer process tests  
├── integration/        # Integration tests
├── e2e/               # End-to-end tests
├── security/          # Security tests
├── performance/       # Performance tests
├── fixtures/          # Test data and fixtures
├── mocks/            # Mock implementations
└── README.md         # This file
```

## Test Categories

### 1. Unit Tests

#### Main Process Tests (`tests/main/`)
- **main.test.js**: Tests for main application lifecycle, window management, and menu creation
- **preload.test.js**: Tests for preload script security and API exposure

**Coverage**: 
- Application startup and shutdown
- Window creation and management
- Menu system functionality
- Security configuration (context isolation, node integration)

#### Renderer Process Tests (`tests/renderer/`)
- **SelfCareToolkit.test.jsx**: Tests for the main React component
- **localStorage.test.js**: Tests for data persistence and storage

**Coverage**:
- Component rendering and interactions
- State management
- Task completion and progress tracking
- Date navigation
- Local storage operations
- Error handling

### 2. Integration Tests (`tests/integration/`)

#### IPC Communication Tests (`tests/integration/ipc.test.js`)
- Preload script communication
- Security boundaries
- Context isolation validation

#### Application Lifecycle Tests (`tests/integration/app-lifecycle.test.js`)
- Startup and shutdown sequences
- Window management scenarios
- Platform-specific behavior
- Error recovery

### 3. End-to-End Tests (`tests/e2e/`)

#### Application Tests (`tests/e2e/app.spec.js`)
- Complete application launch and basic functionality
- User interface interactions
- Data persistence across sessions

#### Workflow Tests (`tests/e2e/workflow.spec.js`)
- Complete user journeys
- Multi-day progress tracking
- Complex interaction scenarios

### 4. Security Tests (`tests/security/`)

#### Security Validation (`tests/security/security.test.js`)
- Context isolation enforcement
- Preload script security
- Content Security Policy validation
- Data validation and sanitization
- File system security
- Memory security

### 5. Performance Tests (`tests/performance/`)

#### Performance Metrics (`tests/performance/performance.test.js`)
- Application startup time
- Memory usage monitoring
- Rendering performance
- Data operation efficiency
- Scalability testing

## Test Configuration

### Jest Configuration (`jest.config.js`)

The Jest configuration uses multiple projects to separate concerns:

```javascript
{
  projects: [
    {
      displayName: 'main',        // Main process tests
      testEnvironment: 'node'
    },
    {
      displayName: 'renderer',    // Renderer process tests
      testEnvironment: 'jsdom'
    },
    {
      displayName: 'integration', // Integration tests
      testEnvironment: 'node'
    }
  ]
}
```

### Playwright Configuration (`playwright.config.js`)

E2E tests use Playwright with Electron support:
- Cross-browser testing (Chromium, Firefox, WebKit)
- Screenshot and video capture on failure
- Trace collection for debugging

## Mock Data and Fixtures

### Test Fixtures (`tests/fixtures/mockData.js`)
- Sample daily task data
- Journal entries
- User preferences
- Streak data
- Weekly and monthly statistics

### Electron Mocks (`tests/mocks/electronMocks.js`)
- Complete Electron API mocking
- BrowserWindow mock implementation
- IPC communication mocks
- App lifecycle mocks

## Running Tests

### All Tests
```bash
npm test           # Run unit and integration tests
npm run test:all   # Run all tests including E2E
```

### Specific Test Categories
```bash
npm run test:main         # Main process tests only
npm run test:renderer     # Renderer process tests only
npm run test:integration  # Integration tests only
npm run test:e2e          # End-to-end tests only
npm run test:security     # Security tests only
npm run test:performance  # Performance tests only
```

### Test Monitoring
```bash
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report
```

## Test Data Management

### Local Storage Testing
Tests use a mock localStorage implementation that:
- Simulates browser localStorage behavior
- Allows inspection of stored data
- Supports data validation testing

### Date Testing
Tests use fixed dates to ensure consistency:
- Base test date: 2024-01-15
- Consistent week/month calculations
- Predictable date navigation testing

## Coverage Requirements

The test suite maintains the following coverage thresholds:
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

Coverage reports are generated in:
- `coverage/main/` - Main process coverage
- `coverage/renderer/` - Renderer process coverage
- `coverage/integration/` - Integration test coverage

## Security Testing

Security tests validate:
- Context isolation is properly configured
- Node.js APIs are not exposed to renderer
- Preload script only exposes safe APIs
- Data sanitization prevents XSS
- File system access is restricted
- Memory doesn't leak sensitive information

## Performance Benchmarks

Performance tests ensure:
- Application starts within 5 seconds
- Memory usage stays under 300MB
- UI interactions respond within 100ms
- Large datasets process within 1 second
- No significant memory leaks during operation

## Continuous Integration

Tests are designed to run reliably in CI environments:
- No external dependencies required
- Deterministic test results
- Proper cleanup between tests
- Cross-platform compatibility

## Debugging Tests

### Test Debugging Tips
1. Use `jest --verbose` for detailed output
2. Add `console.log` statements in test files
3. Use `debugger` statements with `--inspect-brk`
4. Check coverage reports for untested code paths

### Common Test Failures
1. **Timing Issues**: Use `waitFor` in async tests
2. **Mock Issues**: Ensure mocks are reset between tests
3. **Environment Issues**: Check test environment setup
4. **Async Issues**: Properly handle promises and async/await

## Contributing to Tests

When adding new features:
1. Add unit tests for new components/functions
2. Update integration tests for IPC changes
3. Add E2E tests for new user workflows
4. Include security tests for new data handling
5. Add performance tests for potentially slow operations

### Test Writing Guidelines
- Use descriptive test names
- Group related tests in `describe` blocks
- Include both positive and negative test cases
- Test edge cases and error conditions
- Keep tests isolated and independent
- Use appropriate assertions (prefer specific matchers)

## Test Maintenance

Regular maintenance tasks:
1. Update test dependencies
2. Review and update mock data
3. Check for flaky tests
4. Optimize slow-running tests
5. Update documentation for new test patterns

This comprehensive test suite ensures the Self-Care Dashboard is reliable, secure, and performant across all platforms and use cases.