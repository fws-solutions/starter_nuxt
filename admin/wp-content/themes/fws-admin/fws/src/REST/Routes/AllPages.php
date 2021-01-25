<?php
declare(strict_types=1);

namespace FWS\REST\Routes;

use FWS\REST\Helpers;

/**
 * Class AllPages
 *
 * @package FWS\REST\Routes
 */
class AllPages
{

    /**
     * @param string $namespace
     *
     * @uses AllPages::getPages()
     */
    public static function init(string $namespace): void
    {
        /**
         * Returns all pages with permalinks and slugs
         *
         * route: /wp-json/fws/all-pages
         * methods: GET
         */
        register_rest_route(
            $namespace,
            '/all-pages',
            [
                'description' => 'Returns all pages with permalinks and slugs.',
                'methods' => 'GET',
                'callback' => [self::class, 'getPages'],
            ]
        );
    }

    /**
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response
     */
    public static function getPages(\WP_REST_Request $request): \WP_REST_Response
    {
        $pages = new \WP_Query(
            [
                'post_type' => 'page',
                'posts_per_page' => -1,
            ]
        );

        $response = [];

        foreach ($pages->get_posts() as $page) {
            $response[$page->post_name] = [
                'pageId' => $page->ID,
                'title' => $page->post_title,
//                'link' => Helpers::stripAdminURL(get_permalink($page)),
//                'template' => get_post_meta($page->ID, '_wp_page_template', true)
            ];
        }

        return new \WP_REST_Response(['success' => true, 'data' => $response]);
    }

    private static function mapPage(\WP_Post $page): array
    {
        return [
            'pageId' => $page->ID,
            'title' => $page->post_title,
            'slug' => $page->post_name,
            'link' => Helpers::stripAdminURL(get_permalink($page)),
            'template' => get_post_meta($page->ID, '_wp_page_template', true)
        ];
    }
}
