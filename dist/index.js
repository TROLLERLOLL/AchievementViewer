(function (deckyFrontendLib, React) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  var DefaultContext = {
    color: undefined,
    size: undefined,
    className: undefined,
    style: undefined,
    attr: undefined
  };
  var IconContext = React__default["default"].createContext && React__default["default"].createContext(DefaultContext);

  var __assign = window && window.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __rest = window && window.__rest || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  };
  function Tree2Element(tree) {
    return tree && tree.map(function (node, i) {
      return React__default["default"].createElement(node.tag, __assign({
        key: i
      }, node.attr), Tree2Element(node.child));
    });
  }
  function GenIcon(data) {
    // eslint-disable-next-line react/display-name
    return function (props) {
      return React__default["default"].createElement(IconBase, __assign({
        attr: __assign({}, data.attr)
      }, props), Tree2Element(data.child));
    };
  }
  function IconBase(props) {
    var elem = function (conf) {
      var attr = props.attr,
        size = props.size,
        title = props.title,
        svgProps = __rest(props, ["attr", "size", "title"]);
      var computedSize = size || conf.size || "1em";
      var className;
      if (conf.className) className = conf.className;
      if (props.className) className = (className ? className + " " : "") + props.className;
      return React__default["default"].createElement("svg", __assign({
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: "0"
      }, conf.attr, attr, svgProps, {
        className: className,
        style: __assign(__assign({
          color: props.color || conf.color
        }, conf.style), props.style),
        height: computedSize,
        width: computedSize,
        xmlns: "http://www.w3.org/2000/svg"
      }), title && React__default["default"].createElement("title", null, title), props.children);
    };
    return IconContext !== undefined ? React__default["default"].createElement(IconContext.Consumer, null, function (conf) {
      return elem(conf);
    }) : elem(DefaultContext);
  }

  // THIS FILE IS AUTO GENERATED
  function FaShip (props) {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 640 512"},"child":[{"tag":"path","attr":{"d":"M496.616 372.639l70.012-70.012c16.899-16.9 9.942-45.771-12.836-53.092L512 236.102V96c0-17.673-14.327-32-32-32h-64V24c0-13.255-10.745-24-24-24H248c-13.255 0-24 10.745-24 24v40h-64c-17.673 0-32 14.327-32 32v140.102l-41.792 13.433c-22.753 7.313-29.754 36.173-12.836 53.092l70.012 70.012C125.828 416.287 85.587 448 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24 61.023 0 107.499-20.61 143.258-59.396C181.677 487.432 216.021 512 256 512h128c39.979 0 74.323-24.568 88.742-59.396C508.495 491.384 554.968 512 616 512c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24-60.817 0-101.542-31.001-119.384-75.361zM192 128h256v87.531l-118.208-37.995a31.995 31.995 0 0 0-19.584 0L192 215.531V128z"}}]})(props);
  }

  const reactTree = deckyFrontendLib.getReactRoot(document.getElementById('root'));
  var PauseMenu = () => {
      const menuNode = deckyFrontendLib.findInReactTree(reactTree, (node) => node?.memoizedProps?.navID == 'MainNavMenuContainer');
      if (!menuNode || !menuNode.return?.type) {
          console.log('Menu Patch', 'Failed to find main menu root node.');
          return () => { };
      }
      const orig = menuNode.return.type;
      let patchedInnerMenu;
      const menuWrapper = (props) => {
          const ret = orig(props);
          if (!ret?.props?.children?.props?.children?.[0]?.type) {
              console.log('Menu Patch', 'The main menu element could not be found at the expected location. Valve may have changed it.');
              return ret;
          }
          if (patchedInnerMenu) {
              ret.props.children.props.children[0].type = patchedInnerMenu;
          }
          else {
              deckyFrontendLib.afterPatch(ret.props.children.props.children[0], 'type', (_, ret) => {
                  if (!ret?.props?.children || !Array.isArray(ret?.props?.children)) {
                      console.log('Menu Patch', 'Could not find menu items to patch.');
                      return ret;
                  }
                  //ret.props.children.props.children[0]
                  const newItem = (window.SP_REACT.createElement("h1", null, "Hi"));
                  ret.props.children.props.children[0].splice(0, 0, newItem);
                  return ret;
              });
              patchedInnerMenu = ret.props.children.props.children[0].type;
          }
          return ret;
      };
      menuNode.return.type = menuWrapper;
      if (menuNode.return.alternate) {
          menuNode.return.alternate.type = menuNode.return.type;
      }
      return () => {
          menuNode.return.type = orig;
          menuNode.return.alternate.type = menuNode.return.type;
      };
  };

  const Content = ({}) => {
      return (window.SP_REACT.createElement(deckyFrontendLib.PanelSection, null,
          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
              window.SP_REACT.createElement("strong", null, (deckyFrontendLib.Router.MainRunningApp ? deckyFrontendLib.Router.MainRunningApp?.display_name : "NONE")),
              window.SP_REACT.createElement("p", null, (deckyFrontendLib.Router.MainRunningApp ? deckyFrontendLib.Router.MainRunningApp?.appid : "0")),
              window.SP_REACT.createElement("p", null))));
  };
  var index = deckyFrontendLib.definePlugin((serverApi) => {
      SteamClient.GameSessions.RegisterForAppLifetimeNotifications(() => {
          PauseMenu();
      });
      var statetracker = SteamClient.Apps.RegisterForAppDetails((deckyFrontendLib.Router.MainRunningApp ? deckyFrontendLib.Router.MainRunningApp.appid : ""), (details) => {
          details.achievements;
      });
      return {
          title: window.SP_REACT.createElement("div", { className: deckyFrontendLib.staticClasses.Title }, "Achievement Viewer"),
          content: window.SP_REACT.createElement(Content, null),
          icon: window.SP_REACT.createElement(FaShip, null),
          alwaysRender: true,
          onDismount() {
              statetracker.unregister();
          },
      };
  });

  return index;

})(DFL, SP_REACT);
