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

  const QuickAccessVisibleState = React.createContext(false);
  const QuickAccessVisibleStateProvider = ({ children, tab }) => {
      const initial = tab.initialVisibility;
      const [visible, setVisible] = React.useState(initial);
      // HACK but i can't think of a better way to do this
      tab.qAMVisibilitySetter = (val) => {
          if (val != visible)
              setVisible(val);
      };
      return window.SP_REACT.createElement(QuickAccessVisibleState.Provider, { value: visible }, children);
  };

  // TabsHook for versions after the Desktop merge
  class TabsHook {
      constructor() {
          //super('TabsHook');
          // private keys = 7;
          this.tabs = [];
          //this.log('Initialized');
          window.__TABS_HOOK_INSTANCE?.deinit?.();
          window.__TABS_HOOK_INSTANCE = this;
      }
      init() {
          const tree = deckyFrontendLib.getReactRoot(document.getElementById('root'));
          let qAMRoot;
          const findQAMRoot = (currentNode, iters) => {
              if (iters >= 80) {
                  // currently 67
                  return null;
              }
              if (typeof currentNode?.memoizedProps?.visible == 'boolean' &&
                  currentNode?.type?.toString()?.includes('QuickAccessMenuBrowserView')) {
                  //this.log(`QAM root was found in ${iters} recursion cycles`);
                  return currentNode;
              }
              if (currentNode.child) {
                  let node = findQAMRoot(currentNode.child, iters + 1);
                  if (node !== null)
                      return node;
              }
              if (currentNode.sibling) {
                  let node = findQAMRoot(currentNode.sibling, iters + 1);
                  if (node !== null)
                      return node;
              }
              return null;
          };
          (async () => {
              qAMRoot = findQAMRoot(tree, 0);
              while (!qAMRoot) {
                  await deckyFrontendLib.sleep(5000);
                  qAMRoot = findQAMRoot(tree, 0);
              }
              this.qAMRoot = qAMRoot;
              let patchedInnerQAM;
              this.qamPatch = deckyFrontendLib.afterPatch(qAMRoot.return, 'type', (_, ret) => {
                  try {
                      if (!qAMRoot?.child) {
                          qAMRoot = findQAMRoot(tree, 0);
                          this.qAMRoot = qAMRoot;
                      }
                      if (qAMRoot?.child && !qAMRoot?.child?.type?.decky) {
                          deckyFrontendLib.afterPatch(qAMRoot.child, 'type', (_, ret) => {
                              try {
                                  const qamTabsRenderer = deckyFrontendLib.findInReactTree(ret, (x) => x?.props?.onFocusNavDeactivated);
                                  if (patchedInnerQAM) {
                                      qamTabsRenderer.type = patchedInnerQAM;
                                  }
                                  else {
                                      deckyFrontendLib.afterPatch(qamTabsRenderer, 'type', (innerArgs, ret) => {
                                          const tabs = deckyFrontendLib.findInReactTree(ret, (x) => x?.props?.tabs);
                                          this.render(tabs.props.tabs, innerArgs[0].visible);
                                          return ret;
                                      });
                                      patchedInnerQAM = qamTabsRenderer.type;
                                  }
                              }
                              catch (e) {
                                  //this.error('Error patching QAM inner', e);
                              }
                              return ret;
                          });
                          qAMRoot.child.type.decky = true;
                          qAMRoot.child.alternate.type = qAMRoot.child.type;
                      }
                  }
                  catch (e) {
                      //this.error('Error patching QAM', e);
                  }
                  return ret;
              });
              if (qAMRoot.return.alternate) {
                  qAMRoot.return.alternate.type = qAMRoot.return.type;
              }
              //this.log('Finished initial injection');
          })();
      }
      deinit() {
          this.qamPatch?.unpatch();
          this.qAMRoot.return.alternate.type = this.qAMRoot.return.type;
      }
      add(tab) {
          //this.debug('Adding tab', tab.id, 'to render array');
          this.tabs.push(tab);
      }
      removeById(id) {
          //this.debug('Removing tab', id);
          this.tabs = this.tabs.filter((tab) => tab.id !== id);
      }
      render(existingTabs, visible) {
          let deckyTabAmount = existingTabs.reduce((prev, cur) => (cur.decky ? prev + 1 : prev), 0);
          if (deckyTabAmount == this.tabs.length) {
              for (let tab of existingTabs) {
                  if (tab?.decky) {
                      if (tab?.qAMVisibilitySetter) {
                          tab?.qAMVisibilitySetter(visible);
                      }
                      else {
                          tab.initialVisibility = visible;
                      }
                  }
              }
              return;
          }
          for (const { title, icon, content, id } of this.tabs) {
              const tab = {
                  key: id,
                  title,
                  tab: icon,
                  decky: true,
                  initialVisibility: visible,
              };
              tab.panel = window.SP_REACT.createElement(QuickAccessVisibleStateProvider, { tab: tab }, content);
              existingTabs.push(tab);
          }
      }
  }

  const Content = ({}) => {
      return (window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { label: "Enabled", checked: true }));
  };
  var index = deckyFrontendLib.definePlugin((serverApi) => {
      serverApi.toaster.toast({ title: "Test toast", body: "Hi this is a test toast" });
      var hook = new TabsHook();
      hook.init();
      hook.add({
          id: 100,
          title: null,
          content: (window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { label: "Hi", checked: true })),
          icon: (window.SP_REACT.createElement(FaShip, null)),
      });
      return {
          title: window.SP_REACT.createElement("div", { className: deckyFrontendLib.staticClasses.Title }, "Achievement Viewer"),
          content: window.SP_REACT.createElement(Content, null),
          icon: window.SP_REACT.createElement(FaShip, null),
          onDismount() {
          },
      };
  });

  return index;

})(DFL, SP_REACT);
