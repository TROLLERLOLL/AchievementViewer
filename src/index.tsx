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
import TabsHook from "./TabsHook";


const Content: VFC<{}> = ({}) => {
  return (
    <ToggleField label={"Enabled"} checked={true}/>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  serverApi.toaster.toast({title: "Test toast", body: "Hi this is a test toast"});
  var hook = new TabsHook();
  hook.init();
  

  hook.add({
    id: 100,
    title: null,
    content: (
      <ToggleField label={"Hi"} checked={true}/>
    ),
    icon: (
      <FaShip/>
    ),
  });

  return {
    title: <div className={staticClasses.Title}>Achievement Viewer</div>,
    content: <Content/>,
    icon: <FaShip />,
    onDismount() {
      
    },
  };
});
