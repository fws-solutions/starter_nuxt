<?php
declare(strict_types=1);

namespace FWS\REST;

use FWS\REST\Routes\AllPages;
use FWS\REST\Routes\Me;
use FWS\REST\Routes\Menu;
use FWS\REST\Routes\Page;
use FWS\SingletonHook;

/**
 * Class Routes
 *
 * @package FWS\REST
 */
class RouteRegister extends SingletonHook
{

    protected static $instance;

    /** @var string */
    private const NAMESPACE = 'fws';

    /**
     * Set the Init action
     */
    protected function hooks(): void
    {
        add_action('rest_api_init', [$this, 'initRestRoutes']);
        add_filter('jwt_auth_whitelist', [$this, 'whitelistEndpoints']);
    }

    /**
     * Whitelist custom endpoints which don't require authentication
     *
     * @param array $endpoints
     *
     * @return string[]
     */
    public function whitelistEndpoints(array $endpoints): array
    {
        return $endpoints + [
                '/wp-json/fws/all-pages',
                '/wp-json/fws/menu',
            ];
    }

    /**
     * Register custom REST Api routes
     */
    public function initRestRoutes()
    {
        /**
         * Returns all pages with permalinks and slugs
         *
         * route: /wp-json/fws/all-pages
         * methods: GET
         */
        AllPages::init(self::NAMESPACE);

        /**
         * Returns all menu items with nested children
         *
         * route: /wp-json/fws/page/(?P<id>\d+)
         * methods: GET
         */
        Page::init(self::NAMESPACE);

        /**
         * Returns all menu items with nested children
         *
         * route: /wp-json/fws/menu/(?P<menu>[a-zA-Z0-9-_]+)
         * methods: GET
         */
        Menu::init(self::NAMESPACE);

        /**
         * Returns all menu items with nested children
         *
         * route: /wp-json/fws/me
         * methods: GET
         */
        Me::init(self::NAMESPACE);
    }
}
