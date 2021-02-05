/**
 * Menus Store Module
 *
 * @description Store state, mutations, actions and getters for menus.
 */

export const state = () => ({
    menuItems: []
});

export const mutations = {
    setMenu(state, menuItems) {
        state.menuItems = menuItems;
    }
};

export const getters = {
    getMenuItems(state) {
        return state.menuItems;
    }
};
