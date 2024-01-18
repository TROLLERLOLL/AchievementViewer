import { afterPatch, findInReactTree, getReactRoot } from "decky-frontend-lib"

const reactTree = getReactRoot(document.getElementById('root') as any);

export default () => {
    const menuNode = findInReactTree(reactTree, (node) => node?.memoizedProps?.navID == 'MainNavMenuContainer')
    if (!menuNode || !menuNode.return?.type) {
        console.log('Menu Patch', 'Failed to find main menu root node.')
        return () => { }
    }
    const orig = menuNode.return.type
    let patchedInnerMenu: any

    const menuWrapper = (props: any) => {
        const ret = orig(props)
        if (!ret?.props?.children?.props?.children?.[1]?.type) {
            console.log('Menu Patch', 'The main menu element could not be found at the expected location. Valve may have changed it.')
            return ret
        }
        if (patchedInnerMenu) {
            ret.props.children.props.children[1].type = patchedInnerMenu
        } else {
            afterPatch(ret.props.children.props.children[1], 'type', (_: any, ret: any) => {
                if (!ret?.props?.children || !Array.isArray(ret?.props?.children)) {
                    console.log('Menu Patch', 'Could not find menu items to patch.');
                    return ret
                }
                //ret.props.children.props.children[0]

                const newItem =
                    (<h1>Hi</h1>)


                ret.props.children.props.children[0].splice(0, 0, newItem)

                return ret
            })
            patchedInnerMenu = ret.props.children.props.children[1].type
        }
        return ret;
    }
    menuNode.return.type = menuWrapper
    if (menuNode.return.alternate) {
        menuNode.return.alternate.type = menuNode.return.type;
    }

    return () => {
        menuNode.return.type = orig
        menuNode.return.alternate.type = menuNode.return.type;
    }
}

function getMenuItemIndexes(items: any[]) {
    return items.flatMap((item, index) => (item && item.$$typeof && item.type !== 'div') ? index : [])
}