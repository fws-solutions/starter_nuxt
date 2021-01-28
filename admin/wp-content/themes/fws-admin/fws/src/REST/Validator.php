<?php
declare(strict_types=1);

namespace FWS\REST;

/**
 * Class Validator
 *
 * @package FWS\REST
 */
class Validator
{

    /**
     * Validate numeric argument
     *
     * @param mixed $param
     * @param \WP_REST_Request $request
     * @param string $key
     *
     * @return \WP_Error|null
     */
    public static function numeric($param, \WP_REST_Request $request, string $key): ?\WP_Error
    {
        if (is_numeric($param) && floatval($param) > 0) {
            return null;
        }

        return new \WP_Error('non_numeric', 'Must be a numeric non-zero value.');
    }

    /**
     * Validate numeric argument in range 1-12
     *
     * @param mixed $param
     * @param \WP_REST_Request $request
     * @param string $key
     *
     * @return \WP_Error|null
     */
    public static function numericMonth($param, \WP_REST_Request $request, string $key): ?\WP_Error
    {
        if (is_numeric($param) && in_array($param, range(1, 12))) {
            return null;
        }

        return new \WP_Error('non_numeric', 'must be a numeric value between 1 and 12');
    }

    /**
     * Validate Date format and value
     *
     * @param $param
     * @param \WP_REST_Request $request
     * @param string $key
     *
     * @return \WP_Error|null
     */
    public static function date($param, \WP_REST_Request $request, string $key): ?\WP_Error
    {
        try {
            $date = (new \DateTime($param))->format('Y-m-d');

            if ($date === $param) {
                return null;
            }

            return new \WP_Error('wrong_date', "Date is not in valid format. Got '${param}', parsed into '${date}'.");

        } catch (\Exception $e) {
            return new \WP_Error('wrong_date', $e->getMessage());
        }
    }

    /**
     * Validate if term exists
     *
     * @param $param
     * @param \WP_REST_Request $request
     * @param string $key
     *
     * @return \WP_Error|null
     */
    public static function termID($param, \WP_REST_Request $request, string $key): ?\WP_Error
    {
        $taxonomy = str_replace('ID', '', $key);

        if (get_term($param, $taxonomy, ['fields' => 'ids'])) {
            return null;
        }

        return new \WP_Error('term_not_found', ucfirst($taxonomy)." with the ID ${param} doesn't exist.");
    }

    /**
     * Validate if post exists
     *
     * @param $param
     * @param \WP_REST_Request $request
     * @param string $key
     *
     * @return \WP_Error|null
     */
    public static function postID($param, \WP_REST_Request $request, string $key): ?\WP_Error
    {
        $postType = str_replace('ID', '', $key);

        if (get_post($param)) {
            return null;
        }

        return new \WP_Error('post_not_found', ucfirst($postType)." with the ID ${param} doesn't exist.");
    }
}
