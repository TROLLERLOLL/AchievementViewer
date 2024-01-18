import {
  definePlugin,
  Navigation,
  PanelSection,
  PanelSectionRow,
  Router,
  ServerAPI,
  SideMenu,
  staticClasses,
} from "decky-frontend-lib";
import { VFC } from "react";
import { FaShip } from "react-icons/fa";
import PauseMenu from "./PauseMenu";
var state: AppAchievements;
const Content: VFC<{}> = ({}) => {
  
  return (
    <PanelSection>
      <PanelSectionRow>
       <strong>{(Router.MainRunningApp ? Router.MainRunningApp?.display_name : "NONE")}</strong>
       <p>{(Router.MainRunningApp ? Router.MainRunningApp?.appid : "0")}</p>
       <p></p>
      </PanelSectionRow>
    </PanelSection>
  );
};
function getState() {
  if (Router.MainRunningApp && state != null) {
    if (state.vecHighlight != null) {
      var data = "";
      for (var i = 0; i < state.vecHighlight.length; i++)
        data += state.vecHighlight[i] + "\n";
    }
      
  }
  return "NULL";
}
export default definePlugin((serverApi: ServerAPI) => {
  var runner;
  SteamClient.GameSessions.RegisterForAppLifetimeNotifications(() => {
    runner = PauseMenu();
  })
  var statetracker = SteamClient.Apps.RegisterForAppDetails((Router.MainRunningApp ? Router.MainRunningApp.appid : ""), (details) => {
    state = details.achievements;
  })
  return {
    title: <div className={staticClasses.Title}>Achievement Viewer</div>,
    content: <Content/>,
    icon: <FaShip />,
    alwaysRender: true,
    onDismount() {
      statetracker.unregister();
    },
  };
});
