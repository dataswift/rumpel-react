import {
  HatApplicationDescription,
  HatApplicationDeveloper,
  HatApplicationGraphics,
} from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { BundleStructure } from '@dataswift/hat-js/lib/interfaces/bundle.interface';

export interface HatTool {
  id: string;
  info: HatToolInfo;
  developer: HatApplicationDeveloper;
  status: HatToolStatus;
  dataBundle: BundleStructure;
  trigger: HatToolTrigger;
}

interface HatToolInfo {
  version: string;
  versionReleaseDate: string;
  name: string;
  headline: string;
  description: HatApplicationDescription;
  termsUrl: string;
  supportContact: string;
  graphics: HatApplicationGraphics;
  dataPreviewEndpoint: string;
}

interface HatToolStatus {
  available: boolean;
  enabled: boolean;
  lastExecution?: string;
  executionStarted?: string;
}

interface HatToolTrigger {
  period?: string;
  triggerType: string;
}
