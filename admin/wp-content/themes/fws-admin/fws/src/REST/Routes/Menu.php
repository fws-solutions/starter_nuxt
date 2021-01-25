<?php
declare(strict_types=1);

namespace FWS\REST\Routes;

use FWS\REST\Helpers;

/**
 * Class Menu
 *
 * @package FWS\REST\Routes
 */
class Menu
{

    /** @var \WP_Term */
    private static $menu;

    /** @var array */
    private static $menuItemsIDs;

    /**
     * @param string $namespace
     *
     * @uses AllPages::getPages()
     */
    public static function init(string $namespace): void
    {
        /**
         * Returns all menu items with nested children
         *
         * route: /wp-json/fws/menu/(?P<menu>[a-zA-Z0-9-_]+)
         * methods: GET
         */
        register_rest_route(
            $namespace,
            '/menu/(?P<menu>[a-zA-Z0-9-_]+)',
            [
                'description' => 'Returns all pages with permalinks and slugs.',
                'methods' => 'GET',
                'callback' => [self::class, 'getMenu'],
                'args' => self::menuRouteArguments(),
            ]
        );
    }

    /**
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response
     */
    public static function getMenu(\WP_REST_Request $request): \WP_REST_Response
    {
        self::$menuItemsIDs = get_objects_in_term(self::$menu->term_id, 'nav_menu');

        // Get the top level menu items
        $menuItems = self::getMenuItems();

        $response = array_map([self::class, 'mapMenu'], $menuItems);

        return new \WP_REST_Response(['success' => true, 'data' => $response]);
    }

    /**
     * @param int $parentID
     *
     * @return int[]
     */
    private static function getMenuItems(int $parentID = 0): array
    {
        $args = [
            'order' => 'ASC',
            'orderby' => 'menu_order',
            'post_type' => 'nav_menu_item',
            'post_status' => 'publish',
            'output' => ARRAY_A,
            'output_key' => 'menu_order',
            'nopaging' => true,
            'include' => self::$menuItemsIDs,
            'meta_query' => [
                [
                    'key' => '_menu_item_menu_item_parent',
                    'value' => $parentID
                ]
            ]
        ];

        return get_posts($args);
    }

    /**
     * @param \WP_Post $item
     *
     * @return array
     */
    private static function mapMenu(\WP_Post $item): array
    {
        $children = self::getMenuItems($item->ID);

        if ($children) {
            $children = array_map([self::class, 'mapMenu'], $children);
        }

        $itemObjectID = get_post_meta($item->ID, '_menu_item_object_id', true);
        $itemLabel = $item->post_title ?: get_the_title($itemObjectID);
        $itemUrl = get_post_meta($item->ID, '_menu_item_url', true) ?: get_permalink($itemObjectID);

        return [
            'id' => $item->ID,
            'url' => Helpers::stripAdminURL($itemUrl),
            'label' => $itemLabel,
            'childItems' => $children,
        ];
    }

    /**
     * /entries GET arguments
     *
     * @return array[]
     *
     * @uses Menu::sanitizeMenu()
     */
    private static function menuRouteArguments(): array
    {
        return [
            'menu' => [
                'required' => true,
                'validate_callback' => [self::class, 'validateMenu']
            ],
        ];
    }

    /**
     * Validate if menu exists
     *
     * @param $param
     * @param \WP_REST_Request $request
     * @param string $key
     *
     * @return \WP_Error|null
     */
    public static function validateMenu($param, \WP_REST_Request $request, string $key): ?\WP_Error
    {
        if (is_numeric($param)) {
            $param = absint($param);
        } else {
            $param = sanitize_title($param);
        }

        $menu = wp_get_nav_menu_object($param);

        if ($menu instanceof \WP_Term) {
            self::$menu = $menu;

            return null;
        }

        return new \WP_Error('menu_not_found', "Menu with the ID `${param}` doesn't exist.");
    }
}
