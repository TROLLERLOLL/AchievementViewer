import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  QuickAccessTab,
  Router,
  ServerAPI,
  staticClasses,
  Tabs,
  ToggleField,
} from "decky-frontend-lib";
import { VFC } from "react";
import { FaShip } from "react-icons/fa";
var state: any = {};
const Content: VFC<{}> = ({}) => {
  
  return (
    <PanelSection>
      <PanelSectionRow>
       <strong>{(Router.MainRunningApp ? Router.MainRunningApp?.display_name : "NONE")}</strong>
       <p>{(Router.MainRunningApp ? Router.MainRunningApp?.appid : "0")}</p>
       <p>{getState()}</p>
      </PanelSectionRow>
    </PanelSection>
  );
};
function getState() {
  if (Router.MainRunningApp) {    
    return JSON.stringify(state);
  }
  return "NULL";
}
export default definePlugin((serverApi: ServerAPI) => {
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
