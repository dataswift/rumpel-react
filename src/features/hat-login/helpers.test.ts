import { isHmiLoading } from './helpers';
import TEST_HAT_APPLICATION from '../../testData/HatApplications';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import TEST_DATA_PLUG from '../../testData/DataPlug';
import TEST_HAT_TOOL from '../../testData/Tool';

describe('HmiLogin Helper', () => {
  it("is loading when the app is active and doesn't need updating", () => {
    const testApp = JSON.parse(JSON.stringify(TEST_HAT_APPLICATION)) as HatApplication;
    testApp.active = true;
    testApp.needsUpdating = false;
    testApp.enabled = true;
    testApp.setup = true;

    expect(isHmiLoading(testApp)).toEqual(true);
  });

  it('is not loading when the app needs updating', () => {
    const testApp = JSON.parse(JSON.stringify(TEST_HAT_APPLICATION)) as HatApplication;
    testApp.active = true;
    testApp.needsUpdating = true;
    testApp.enabled = true;
    testApp.setup = true;

    expect(isHmiLoading(testApp)).toEqual(false);
  });

  it('it returns false when the app is not active or needs updating', () => {
    const testApp = JSON.parse(JSON.stringify(TEST_HAT_APPLICATION)) as HatApplication;
    testApp.active = false;
    testApp.needsUpdating = false;
    testApp.enabled = true;
    testApp.setup = true;

    expect(isHmiLoading(testApp)).toEqual(false);
  });

  it('it returns false when all the app flags are false', () => {
    const testApp = JSON.parse(JSON.stringify(TEST_HAT_APPLICATION)) as HatApplication;
    testApp.active = false;
    testApp.needsUpdating = false;
    testApp.enabled = false;
    testApp.setup = false;

    expect(isHmiLoading(testApp)).toEqual(false);
  });

  it("is loading when all the app's dependencies are ready and app is active", () => {
    const testApp = JSON.parse(JSON.stringify(TEST_HAT_APPLICATION)) as HatApplication;
    testApp.active = true;
    testApp.needsUpdating = false;
    testApp.enabled = false;
    testApp.setup = false;
    testApp.application.dependencies = { plugs: ['2'], tools: [], contracts: [] };

    expect(isHmiLoading(testApp, [TEST_DATA_PLUG, TEST_HAT_APPLICATION])).toEqual(true);
  });

  it("doesn't loading when all the app's dependencies are empty arrays", () => {
    const testApp = JSON.parse(JSON.stringify(TEST_HAT_APPLICATION)) as HatApplication;
    testApp.active = false;
    testApp.needsUpdating = false;
    testApp.enabled = false;
    testApp.setup = false;
    testApp.application.dependencies = { plugs: [], tools: [], contracts: [] };

    expect(isHmiLoading(testApp, [TEST_DATA_PLUG, TEST_HAT_APPLICATION])).toEqual(false);
  });

  it("is not loading when all the app's dependencies are ready (tools)", () => {
    const testApp = JSON.parse(JSON.stringify(TEST_HAT_APPLICATION)) as HatApplication;
    testApp.active = false;
    testApp.needsUpdating = false;
    testApp.enabled = false;
    testApp.setup = false;
    testApp.application.dependencies = { plugs: [], tools: ['test-feed-counter'], contracts: [] };

    expect(isHmiLoading(testApp, [TEST_DATA_PLUG, TEST_HAT_APPLICATION], [TEST_HAT_TOOL])).toEqual(false);
  });

  it("is loading when all the app's tool dependencies are not ready", () => {
    const testApp = JSON.parse(JSON.stringify(TEST_HAT_APPLICATION)) as HatApplication;
    testApp.active = false;
    testApp.needsUpdating = false;
    testApp.enabled = false;
    testApp.setup = false;
    testApp.application.dependencies = { plugs: [], tools: ['different-tool-id'], contracts: [] };

    expect(isHmiLoading(testApp, [TEST_DATA_PLUG, TEST_HAT_APPLICATION], [TEST_HAT_TOOL])).toEqual(true);
  });

  it('is not loading when an app has dependencies and needs updating', () => {
    const testApp = JSON.parse(JSON.stringify(TEST_HAT_APPLICATION)) as HatApplication;
    testApp.active = true;
    testApp.needsUpdating = true;
    testApp.enabled = false;
    testApp.setup = false;
    testApp.application.dependencies = { plugs: [], tools: ['test-feed-counter'], contracts: [] };

    expect(isHmiLoading(testApp, [TEST_DATA_PLUG, TEST_HAT_APPLICATION], [TEST_HAT_TOOL])).toEqual(false);
  });
});
