// View Transitions Test Suite
// Run this in the browser console to debug transition issues

class ViewTransitionsTest {
  constructor() {
    this.results = [];
  }

  log(message, status = "info") {
    const result = { message, status, timestamp: new Date().toISOString() };
    this.results.push(result);
    console.log(`[${status.toUpperCase()}] ${message}`);
  }

  // Test 1: Check if ViewTransitions are enabled
  testViewTransitionsEnabled() {
    this.log("=== Test 1: ViewTransitions Enabled ===");

    const astroMeta = document.querySelector(
      'meta[name="astro-view-transitions-enabled"]'
    );
    if (astroMeta) {
      this.log("✅ Astro ViewTransitions meta tag found", "pass");
    } else {
      this.log("❌ Astro ViewTransitions meta tag NOT found", "fail");
    }

    const viewTransitionsScript = document.querySelector(
      "script[data-astro-view-transitions]"
    );
    if (viewTransitionsScript) {
      this.log("✅ Astro ViewTransitions script found", "pass");
    } else {
      this.log("❌ Astro ViewTransitions script NOT found", "fail");
    }
  }

  // Test 2: Check browser support
  testBrowserSupport() {
    this.log("=== Test 2: Browser Support ===");

    if ("startViewTransition" in document) {
      this.log("✅ Browser supports View Transition API", "pass");
    } else {
      this.log("❌ Browser does NOT support View Transition API", "fail");
    }

    if (typeof document.startViewTransition === "function") {
      this.log("✅ document.startViewTransition is available", "pass");
    } else {
      this.log("❌ document.startViewTransition is NOT available", "fail");
    }
  }

  // Test 3: Check for transition elements
  testTransitionElements() {
    this.log("=== Test 3: Transition Elements ===");

    // Check for elements with transition names
    const transitionElements = document.querySelectorAll(
      "[data-astro-transition-scope]"
    );
    this.log(
      `Found ${transitionElements.length} elements with transition scopes`
    );

    transitionElements.forEach((el, i) => {
      const scope = el.getAttribute("data-astro-transition-scope");
      this.log(`Element ${i}: ${el.tagName} with scope "${scope}"`);
    });

    // Check specific test elements
    const testImage = document.querySelector(
      '[transition\\:name="test-image"]'
    );
    const testTitle = document.querySelector(
      '[transition\\:name="test-title"]'
    );
    const heroImage = document.querySelector(
      '[transition\\:name="hero-image"]'
    );

    if (testImage) this.log("✅ Test image element found", "pass");
    if (testTitle) this.log("✅ Test title element found", "pass");
    if (heroImage) this.log("✅ Hero image element found", "pass");

    if (!testImage && !testTitle && !heroImage) {
      this.log("❌ No transition elements found", "fail");
    }
  }

  // Test 4: Check Astro transition events
  testAstroEvents() {
    this.log("=== Test 4: Astro Transition Events ===");

    const events = [
      "astro:before-preparation",
      "astro:after-preparation",
      "astro:before-swap",
      "astro:after-swap",
    ];

    events.forEach((eventName) => {
      document.addEventListener(eventName, (e) => {
        this.log(`🎉 Astro event fired: ${eventName}`, "pass");
      });
    });

    this.log("Event listeners registered. Navigate to trigger them.");
  }

  // Test 5: Manual transition test
  testManualTransition() {
    this.log("=== Test 5: Manual Transition ===");

    if (typeof document.startViewTransition === "function") {
      try {
        document.startViewTransition(() => {
          this.log("✅ Manual view transition started successfully", "pass");
        });
      } catch (error) {
        this.log(`❌ Manual view transition failed: ${error.message}`, "fail");
      }
    } else {
      this.log("❌ Cannot test manual transition - API not available", "fail");
    }
  }

  // Test 6: Check for common issues
  testCommonIssues() {
    this.log("=== Test 6: Common Issues ===");

    // Check for JavaScript errors
    const errors = window.viewTransitionErrors || [];
    if (errors.length > 0) {
      this.log(`❌ JavaScript errors detected: ${errors.length}`, "fail");
      errors.forEach((error) => this.log(`Error: ${error}`, "fail"));
    } else {
      this.log("✅ No JavaScript errors detected", "pass");
    }

    // Check for duplicate transition names
    const transitionNames = new Map();
    document.querySelectorAll("[data-astro-transition-scope]").forEach((el) => {
      const scope = el.getAttribute("data-astro-transition-scope");
      if (transitionNames.has(scope)) {
        this.log(`❌ Duplicate transition name found: ${scope}`, "fail");
      } else {
        transitionNames.set(scope, el);
      }
    });

    if (transitionNames.size > 0) {
      this.log(
        `✅ Found ${transitionNames.size} unique transition names`,
        "pass"
      );
    }
  }

  // Run all tests
  runAllTests() {
    this.log("🚀 Starting View Transitions Test Suite");
    this.results = [];

    this.testViewTransitionsEnabled();
    this.testBrowserSupport();
    this.testTransitionElements();
    this.testAstroEvents();
    this.testManualTransition();
    this.testCommonIssues();

    this.generateReport();
  }

  // Generate test report
  generateReport() {
    this.log("=== Test Report ===");

    const passed = this.results.filter((r) => r.status === "pass").length;
    const failed = this.results.filter((r) => r.status === "fail").length;
    const total = passed + failed;

    this.log(
      `Tests completed: ${total} total, ${passed} passed, ${failed} failed`
    );

    if (failed === 0) {
      this.log(
        "🎉 All tests passed! View transitions should be working.",
        "pass"
      );
    } else {
      this.log("⚠️ Some tests failed. Check the issues above.", "fail");
    }

    // Store results globally for inspection
    window.viewTransitionTestResults = this.results;
    this.log("Full results saved to window.viewTransitionTestResults");
  }
}

// Make it globally available
window.ViewTransitionsTest = ViewTransitionsTest;
window.runTransitionTests = () => new ViewTransitionsTest().runAllTests();

// Auto-run basic tests if this script is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log(
      "View Transitions Test Script loaded. Run runTransitionTests() to start testing."
    );
  });
} else {
  console.log(
    "View Transitions Test Script loaded. Run runTransitionTests() to start testing."
  );
}
