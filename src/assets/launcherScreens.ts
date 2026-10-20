import home from "./launcher/home-screen.png";
import library from "./launcher/Library.png";
import instanceCreation from "./launcher/instance-creation.png";
import instanceSettings from "./launcher/Instance-settings.png";
import appearanceSettings from "./launcher/Launchersettings-appearance.png";
import discover from "./launcher/discover-screen.png";

export const fableLogo = "/assets/fable-logo.png";
export const homeScreen = home;

export const launcherScreens = {
  home,
  library,
  instanceCreation,
  instanceSettings,
  appearanceSettings,
  discover,
} as const;
