import {
  afterPatch,
  definePlugin,
  Navigation,
  PanelSection,
  PanelSectionRow,
  Router,
  ServerAPI,
  SideMenu,
  staticClasses,
  wrapReactType,
} from "decky-frontend-lib";
import { ReactElement, VFC } from "react";
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
  var p = serverApi.routerHook.addPatch("/steamweb", (props: { path: string; children: ReactElement }) => {
    afterPatch(
      props.children.props,
      'renderFunc',
      (_: Record<string, unknown>[], ret1: ReactElement) => {
          
          
            wrapReactType(ret1.props.children);
            afterPatch(
                ret1.props.children.type,
                'type',
                (_1: Record<string, unknown>[], ret2: ReactElement) => {
                    const componentToSplice =
                        ret2.props.children?.[1]?.props.children.props
                            .children;
                    // This always seems to be -1
                    const hltbComponentIndex =
                        componentToSplice?.findIndex(
                            (child: ReactElement) => {
                                return (
                                    child?.props?.id === 'hltb-for-deck'
                                );
                            }
                        );

                    // We want to splice into the component before this point

                    const component = (
                        <h1>aaaa</h1>
                    );

                    componentToSplice?.splice(
                      1,
                      0,
                      component
                  );
                    return ret2;
                }
            );
            return ret1;
        }
    );
    return props;
  })
  return {
    title: <div className={staticClasses.Title}>Achievement Viewer</div>,
    content: <Content/>,
    icon: <FaShip />,
    alwaysRender: true,
    onDismount() {
      serverApi.routerHook.removePatch("/steamweb", p);
    },
  };
});
