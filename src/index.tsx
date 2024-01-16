import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ServerAPI,
  staticClasses,
  Toggle,
} from "decky-frontend-lib";
import { VFC } from "react";
import { FaShip } from "react-icons/fa";

const Content: VFC<{ serverAPI: ServerAPI }> = ({}) => {
  return (
    <PanelSection title="Panel Section">
      <PanelSectionRow>
        <Toggle value={true}>Enabled</Toggle>
      </PanelSectionRow>
    </PanelSection>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  return {
    title: <div className={staticClasses.Title}>Achievement Viewer</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaShip />,
    onDismount() {
      
    },
  };
});
