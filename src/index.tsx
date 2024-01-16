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


const Content: VFC<{}> = ({}) => {
  
  return (
    <PanelSection>
      <PanelSectionRow>
        
      </PanelSectionRow>
    </PanelSection>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  var listener = SteamClient.GameSessions.RegisterForAppLifetimeNotifications((appstate) => {
    serverApi.toaster.toast({title: appstate.unAppID.toString(), body: "HI"});
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
