import home from "./launcher/home-screen-placeholder.svg";
import instances from "./launcher/instances-screen-placeholder.svg";
import discover from "./launcher/discover-screen-placeholder.svg";
import java from "./launcher/java-manager-placeholder.svg";
import desktop from "./launcher/desktop-screen-placeholder.svg";
import interfaceScreen from "./launcher/interface-screen-placeholder.svg";
import settings from "./launcher/settings-screen-placeholder.svg";

export const fableLogo = "/assets/fable-logo.png";
export const homeScreen = home;

export const launcherScreens = {
  home,
  instances,
  discover,
  java,
  desktop,
  interface: interfaceScreen,
  settings,
} as const;
