/**
 * Menus Store Module
 *
 * @description Store state, mutations, actions and getters for menus.
 */

export const state = () => ({
    menuItems: [],
    menuItemsSecondary: []
});

export const mutations = {
    setMenu(state, menuItems) {
        state.menuItems = menuItems;
    },
    setMenuSecondary(state, menuItems) {
        state.menuItemsSecondary = menuItems;
    }
};

export const getters = {
    getMenuItems(state) {
        return state.menuItems;
    },
    getMenuItemsSecondary(state) {
        return state.menuItemsSecondary;
    }
};
