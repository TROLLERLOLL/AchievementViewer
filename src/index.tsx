import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  QuickAccessTab,
  ServerAPI,
  staticClasses,
  Tabs,
  ToggleField,
} from "decky-frontend-lib";
import { VFC } from "react";
import { FaShip } from "react-icons/fa";

var currentid: number = 0;

const Content: VFC<{}> = ({}) => {
  
  return (
    <PanelSection>
      <PanelSectionRow>
        hhh {currentid}
      </PanelSectionRow>
    </PanelSection>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  var listener = SteamClient.GameSessions.RegisterForAppLifetimeNotifications((appstate) => {
    if (appstate.bRunning)
      currentid = appstate.unAppID;
    else 
      currentid = -1;
  })

  return {
    title: <div className={staticClasses.Title}>Achievement Viewer</div>,
    content: <Content/>,
    icon: <FaShip />,
    alwaysRender: true,
    onDismount() {
      listener.unregister();
    },
  };
});
