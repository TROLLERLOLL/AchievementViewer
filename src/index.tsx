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
var state = -1;
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
  if (state != -1)
    return state;

  if (Router.MainRunningApp) {    
    SteamClient.Apps.RegisterForAppDetails((Router.MainRunningApp ? Router.MainRunningApp.appid : ""), (details) => {
      state = details.achievements.nAchieved;
      return state;
    })
  }
  return -1;
}
export default definePlugin((serverApi: ServerAPI) => {
  return {
    title: <div className={staticClasses.Title}>Achievement Viewer</div>,
    content: <Content/>,
    icon: <FaShip />,
    alwaysRender: true,
    onDismount() {
      
    },
  };
});
