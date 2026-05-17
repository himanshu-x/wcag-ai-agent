import { Severity } from "../constants/severity";

export const ruleDefinitions: any = {

  "missing-label": {
    title:
      "Input Missing Label",

    severity:
      Severity.CRITICAL,

    wcag:
      "WCAG 1.3.1",

    why:
      "Screen reader users cannot understand the purpose of the input field without an accessible label.",

    impact:
      "Users relying on assistive technologies may be unable to complete forms correctly.",

    fix:
      "Add a visible label, aria-label, or aria-labelledby to the input.",

    example:
      '<input aria-label="Email Address" />',
  },

  "missing-alt": {
    title:
      "Image Missing Alt Text",

    severity:
      Severity.CRITICAL,

    wcag:
      "WCAG 1.1.1",

    why:
      "Images without alternative text are inaccessible to screen reader users.",

    impact:
      "Important visual information may not be announced.",

    fix:
      "Add meaningful alt text describing the image.",

    example:
      '<img alt="Company logo" />',
  },

  "clickable-div": {
    title:
      "Clickable Div Detected",

    severity:
      Severity.SERIOUS,

    wcag:
      "WCAG 2.1.1",

    why:
      "Div elements are not keyboard accessible by default.",

    impact:
      "Keyboard users may not be able to interact with the element.",

    fix:
      "Use semantic button elements instead of clickable divs.",

    example:
      "<button>Submit</button>",
  },

  "generic-link": {
    title:
      "Generic Link Text",

    severity:
      Severity.SERIOUS,

    wcag:
      "WCAG 2.4.4",

    why:
      "Generic links do not provide meaningful context.",

    impact:
      "Screen reader users cannot understand where the link goes.",

    fix:
      "Use descriptive link text.",

    example:
      '<a>View pricing plans</a>',
  },

  "keyboard-trap": {
    title:
      "Keyboard Trap",

    severity:
      Severity.CRITICAL,

    wcag:
      "WCAG 2.1.2",

    why:
      "Keyboard users may become trapped inside a component.",

    impact:
      "Users may not be able to navigate away from the element.",

    fix:
      "Avoid blocking keyboard behavior using preventDefault improperly.",

    example:
      "Allow Tab and Escape navigation.",
  },

  "aria-hidden-interactive": {
    title:
      "Interactive Element Hidden",

    severity:
      Severity.CRITICAL,

    wcag:
      "WCAG 4.1.2",

    why:
      "Interactive elements should not be hidden from assistive technologies.",

    impact:
      "Screen reader users cannot access controls.",

    fix:
      "Remove aria-hidden from interactive elements.",

    example:
      '<button>Save</button>',
  },

  "missing-table-headers": {
    title:
      "Missing Table Headers",

    severity:
      Severity.SERIOUS,

    wcag:
      "WCAG 1.3.1",

    why:
      "Tables require header cells for accessibility.",

    impact:
      "Screen reader users cannot understand table structure.",

    fix:
      "Add th elements inside tables.",

    example:
      "<th>Name</th>",
  },

  "missing-focus": {
    title:
      "Focus Indicator Removed",

    severity:
      Severity.SERIOUS,

    wcag:
      "WCAG 2.4.7",

    why:
      "Keyboard users need visible focus indicators.",

    impact:
      "Users may lose track of keyboard navigation.",

    fix:
      "Avoid removing outline styles unless replaced accessibly.",

    example:
      "outline: 2px solid blue",
  },
};