<?php
declare(strict_types=1);

namespace FWS\REST\Routes;

use FWS\REST\Helpers;
use FWS\REST\Validator;

/**
 * Class Page
 *
 * @package FWS\REST\Routes
 */
class Page
{

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
         * route: /wp-json/fws/page/(?P<id>\d+)
         * methods: GET
         */
        register_rest_route(
            $namespace,
            '/page/(?P<page>\d+)',
            [
                'description' => 'Returns all pages with permalinks and slugs.',
                'methods' => 'GET',
                'callback' => [self::class, 'getPage'],
                'args' => [
                    'page' => [
                        'type' => 'integer',
                        'required' => true,
                        'validate_callback' => [Validator::class, 'postID'],
                    ]
                ],
            ]
        );
    }

    /**
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response
     */
    public static function getPage(\WP_REST_Request $request): \WP_REST_Response
    {
        $page = get_post($request->get_param('page'));

        $page->acf = get_fields($page);

        return new \WP_REST_Response(['success' => true, 'data' => $page]);
    }
}
