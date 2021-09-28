import { AnalyticsEvent } from "hmi";

export const AnalyticsClickEvents: { [key: string]: AnalyticsEvent } = {
  browserBackButton: {
    category: '',
    action: 'Go Back Button',
    label: 'browser',
  },
  closeBrowserWindow: {
    category: '',
    action: 'Close Window Button',
    label: 'browser',
  },
  newsletterOptin: {
    category: 'PDA Auth Landing page',
    action: 'Opt-in to data news',
    label: 'checkbox',
  },
  signupNextButton: {
    category: 'PDA Auth Landing page',
    action: 'Go to next step',
    label: 'button',
  },
  backToPreviousStepButton: {
    category: 'PDA Auth Landing page',
    action: 'Go back to previous step',
    label: 'link',
  },
  backToDeveloperSiteButton: {
    category: 'PDA Auth Landing page',
    action: 'Go back to developer site',
    label: 'link',
  },
  continueToApplicationButton: {
    category: 'PDA account ready',
    action: 'Continue to application',
    label: 'button',
  },
  registrationErrorTimePerformance: {
    category: 'PDA account errored',
    action: 'Registration error time',
    label: 'performance',
  },
  registrationTimePerformance: {
    category: 'PDA account ready',
    action: 'Registration time',
    label: 'performance',
  },
  openFAQButton: {
    category: 'PDA account ready',
    action: 'Open FAQ',
    label: 'link',
  },
  resendEmailActivationButton: {
    category: 'PDA account ready',
    action: 'Resend email activation',
    label: 'button',
  }
};
