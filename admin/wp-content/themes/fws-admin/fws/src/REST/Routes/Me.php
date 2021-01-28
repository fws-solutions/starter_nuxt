<?php
declare(strict_types=1);

namespace FWS\REST\Routes;

/**
 * Class Me
 *
 * @package FWS\REST\Routes
 */
class Me
{

    /**
     * @param string $namespace
     */
    public static function init(string $namespace): void
    {
        /**
         * Returns all menu items with nested children
         *
         * route: /wp-json/fws/menu
         * methods: GET
         */
        register_rest_route(
            $namespace,
            '/me',
            [
                'description' => 'Returns currently logged in user.',
                'methods' => 'GET',
                'callback' => [self::class, 'getMe'],
            ]
        );
    }

    /**
     * @return \WP_REST_Response
     */
    public static function getMe(): \WP_REST_Response
    {
        $user = wp_get_current_user();

        $data = [
            'id' => $user->ID,
            'email' => $user->user_email,
            'nicename' => $user->user_nicename,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'displayName' => $user->display_name,
            'avatar' => get_avatar_data($user->ID)
        ];

        return new \WP_REST_Response([
            'success' => true,
            'statusCode' => 200,
            'data' => $data
        ]);
    }
}
