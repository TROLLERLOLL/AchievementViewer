/*import { afterPatch, findInReactTree, getReactRoot } from "decky-frontend-lib"

const reactTree = getReactRoot(document.getElementById('root') as any);

const patchmenu = () => {
    const menuNode = findInReactTree(reactTree, (node) => node?.memoizedProps?.navID == 'QuickAccess-NA')
    if (!menuNode || !menuNode.return?.type) {
        console.log('Menu Patch', 'Failed to find main menu root node.')
        return () => { }
    }
    const orig = menuNode.return.type
    let patchedInnerMenu: any
    
    const menuWrapper = (props: any) => {
        const ret = orig(props)
        if (!ret?.props?.children?.props?.children?.[0]?.type) {
            console.log('Menu Patch', 'The main menu element could not be found at the expected location. Valve may have changed it.')
            return ret
        }
        if (patchedInnerMenu) {
            ret.props.children.props.children[0].type = patchedInnerMenu
        } else {
            afterPatch(ret.props.children.props.children[0], 'type', (_: any, ret: any) => {
                if (!ret?.props?.children || !Array.isArray(ret?.props?.children)) {
                    console.log('Menu Patch', 'Could not find menu items to patch.');
                    return ret
                }
                const itemIndexes = getMenuItemIndexes(ret.props.children)
                const menuItemElement = findInReactTree(ret.props.children, (x) =>
                    x?.type?.toString()?.includes('exactRouteMatch:'),
                );

                const newItem =
                    <MenuItemWrapper
                        route="/discord"
                        label='Discord'
                        onFocus={menuItemElement.props.onFocus}
                        MenuItemComponent={menuItemElement.type}
                    />

                const browserPosition = Number.parseInt(localStorage.getItem("DECKCORD_MENU_POSITION") || "3" as string);

                if (browserPosition === 9) ret.props.children.splice(itemIndexes[itemIndexes.length - 1] + 1, 0, newItem)
                else ret.props.children.splice(itemIndexes[browserPosition - 1], 0, newItem)

                return ret
            })
            patchedInnerMenu = ret.props.children.props.children[0].type
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
}*/