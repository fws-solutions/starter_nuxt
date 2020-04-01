/**
 * Menus Store Module
 *
 * @description Store state, mutations, actions and getters for menus.
 */

export const state = () => ({
    menuItems: [
        {
            url: 'http://admin.starter-nuxt.local/home/',
            label: 'Home',
            childItems: {
                nodes: []
            }
        },
        {
            url: 'http://admin.starter-nuxt.local/sample-page/',
            label: 'Sample Page',
            childItems: {
                nodes: []
            }
        },
        {
            url: 'http://admin.starter-nuxt.local/page-b/',
            label: 'Page B',
            childItems: {
                nodes: []
            }
        },
        {
            url: 'http://admin.starter-nuxt.local/page-a/',
            label: 'Page A',
            childItems: {
                nodes: [
                    {
                        label: 'Level 2b',
                        url: 'http://admin.starter-nuxt.local/level-1/level-2b/',
                        childItems: {
                            nodes: []
                        }
                    },
                    {
                        label: 'Level 2a',
                        url: 'http://admin.starter-nuxt.local/level-1/level-2a/',
                        childItems: {
                            nodes: [
                                {
                                    label: 'Level 3b',
                                    url: 'http://admin.starter-nuxt.local/level-1/level-2/level-3b/'
                                },
                                {
                                    label: 'Level 3a',
                                    url: 'http://admin.starter-nuxt.local/level-1/level-2/level-3a/'
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            url: 'http://admin.starter-nuxt.local/about/',
            label: 'About The Tests',
            childItems: {
                nodes: [
                    {
                        label: 'Page Markup And Formatting',
                        url: 'http://admin.starter-nuxt.local/about/page-markup-and-formatting/',
                        childItems: {
                            nodes: []
                        }
                    },
                    {
                        label: 'Page Image Alignment',
                        url: 'http://admin.starter-nuxt.local/about/page-image-alignment/',
                        childItems: {
                            nodes: []
                        }
                    },
                    {
                        label: 'Clearing Floats',
                        url: 'http://admin.starter-nuxt.local/about/clearing-floats/',
                        childItems: {
                            nodes: []
                        }
                    }
                ]
            }
        }
    ]
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
