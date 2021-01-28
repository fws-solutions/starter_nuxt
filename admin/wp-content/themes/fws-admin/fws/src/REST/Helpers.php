<?php
declare(strict_types=1);

namespace FWS\REST;

/**
 * Class Helpers
 *
 * @package FWS\REST
 * @author  Boris Djemrovski <boris@forwardslashny.com>
 */
class Helpers
{

    /**
     * @param string $url
     *
     * @return string
     */
    public static function stripAdminURL(string $url): string
    {
        return str_replace(site_url(), '', $url);
    }
}
