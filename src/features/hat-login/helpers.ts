import { HatApplication } from "@dataswift/hat-js/lib/interfaces/hat-application.interface";
import { HatTool } from "../tools/hat-tool.interface";

export const isHmiLoading = (app: HatApplication, dependencyPlugs?: HatApplication[], dependencyTools?: HatTool[]) => {
  // In case an app is active and doesn't need updating, we need to display the loading screen to the user.
  const isParentAppActive = app.active && !app.needsUpdating;

  // Check if the app has 1 or more plug dependencies.
  const hasPlugDependencies = app.application.dependencies && app.application.dependencies?.plugs.length > 0;
  // Check if the app has 1 or more tool dependencies.
  const hasToolDependencies = app.application.dependencies && app.application.dependencies?.tools.length > 0;

  // Search for the app's dependency plugs and if they are currently available.
  const foundDependencyPlugs =
      dependencyPlugs?.filter(a => app.application.dependencies?.plugs?.indexOf(a.application.id) !== -1);

  // Check if the data plugs and app's dependency plugs are ready.
  const isDependencyPlugsReady = app.application.dependencies?.plugs &&
      foundDependencyPlugs?.length ===  app.application.dependencies?.plugs.length;

  // Search for the app's dependency tools and if they are currently available.
  const foundDependencyTools =
      dependencyTools?.filter(t => app.application.dependencies?.tools?.indexOf(t.id) !== -1);

  // Check if the tools and app's dependency tools are ready.
  const isDependencyToolsReady = app.application.dependencies?.tools &&
      foundDependencyTools?.length ===  app.application.dependencies?.tools.length;

  return (
    isParentAppActive ||
    (hasPlugDependencies && !isDependencyPlugsReady) ||
    (hasToolDependencies && !isDependencyToolsReady)
  );
};
