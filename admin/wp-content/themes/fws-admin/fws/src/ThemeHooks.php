<?php
declare( strict_types=1 );

namespace FWS;

use GraphQL\Error\Error;
use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use WPGraphQL\Data\DataSource;
use WPGraphQL\JWT_Authentication\Auth;

/**
 * Theme Hooks. No methods are available for direct calls.
 *
 * @package FWS
 * @author  Boris Djemrovski <boris@forwardslashny.com>
 */
class ThemeHooks
{

	use Main;

	/**
	 * Drop your hooks here.
	 */
	private function hooks(): void
	{
		add_action( 'admin_init', [ $this, 'preventPluginUpdate' ] );
		add_action( 'wp_head', [ $this, 'pingbackHeader' ] );
		add_action( 'fws_admin_before_main_content', [ $this, 'pageWrapperBefore' ] );
		add_action( 'fws_admin_after_main_content', [ $this, 'pageWrapperAfter' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'addAdminStyles' ] );
		add_action( 'login_enqueue_scripts', [ $this, 'addAdminStyles' ] );
		add_action( 'login_form', [ $this, 'addLoginTitle' ] );
		add_action( 'admin_notices', [ $this, 'dependenciesNotice' ] );
		add_action( 'graphql_register_types', [ $this, 'mutations' ] );
		add_action( 'graphql_process_http_request_response', [ $this, 'editResponseBeforeSending' ], 10, 1 );

		// Remove RSS Feed from WP head
		remove_action( 'wp_head', 'feed_links_extra', 3 );
		remove_action( 'wp_head', 'feed_links', 2 );

		// Remove REST API link from WP head
		remove_action('wp_head', 'rest_output_link_wp_head', 10);
		remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
		remove_action('template_redirect', 'rest_output_link_header', 11);

		// Remove XML-RPC RSD link from WP head
		remove_action ('wp_head', 'rsd_link');

		// Remove WordPress version number from WP head
		add_filter('the_generator', [ $this, 'removeWpVersion' ]);

		// Remove wlwmanifest link from WP head
		remove_action( 'wp_head', 'wlwmanifest_link');

		// Remove shortlink from WP head
		remove_action( 'wp_head', 'wp_shortlink_wp_head');

		// Removing prev and nex article links from WP head
		remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');

		// Disable the emoji's
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );

		// Remove from TinyMCE
		add_filter( 'tiny_mce_plugins', [ $this, 'disableEmojisTinymce' ] );

		// Remove login error shake
		remove_action( 'login_head', 'wp_shake_js', 12 );

		add_filter( 'body_class', [ $this, 'bodyClasses' ] );
		add_filter( 'login_headerurl', [ $this, 'loginLogoLink' ] );
		add_filter( 'recovery_mode_email', [ $this, 'recoveryModeEmail' ] );
	}

	/**
	 * Only users logged in with email 'forwardslashny.com' are allowed to add/update/remove plugins
	 */
	public function preventPluginUpdate(): void
	{
		$user = wp_get_current_user();

		if ( ! $user->user_email || strpos( $user->user_email, 'forwardslashny.com' ) === false ) {
			add_filter( 'file_mod_allowed', '__return_false' );
		}
	}

	/**
	 * Add a pingback url auto-discovery header for singularly identifiable articles.
	 */
	public function pingbackHeader(): void
	{
		if ( is_singular() && pings_open() ) {
			echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
		}
	}

	/**
	 * Default page wrapper BEFORE
	 */
	public function pageWrapperBefore(): void
	{
		?>
		<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
		<?php
	}

	/**
	 * Default page wrapper AFTER
	 */
	public function pageWrapperAfter(): void
	{
		?>
		</main><!-- #main -->
		</div><!-- #primary -->
		<?php
	}

	/**
	 * Add custom stylesheet to login and admin dashboard
	 */
	public function addAdminStyles(): void
	{
		wp_enqueue_style( 'fws_admin-admin-style', get_template_directory_uri() . '/dist/admin.css' );
		wp_enqueue_script( 'fws_admin-admin-script', get_template_directory_uri() . '/dist/admin.js', [ 'jquery' ], '', true );
	}

	/**
	 * Add login title
	 */
	public function addLoginTitle(): void
	{
		echo '<span class="login-title">fws_admin login</span>';
	}

	/**
	 * Plugin dependencies
	 */
	public function dependenciesNotice(): void
	{
		if ( ! function_exists( 'get_field' ) ) {
			echo '<div class="error"><p>' . __( 'Warning: The theme needs ACF Pro plugin to function', 'fws_admin' ) . '</p></div>';
		}
	}

	/**
	 * Adds custom classes to the array of body classes.
	 *
	 * @param array $classes Classes for the body element.
	 *
	 * @return array
	 */
	public function bodyClasses( array $classes ): array
	{
		// Adds a class of hfeed to non-singular pages.
		if ( ! is_singular() ) {
			$classes[] = 'hfeed';
		}

		return $classes;
	}

	/**
	 * Change logo link url
	 *
	 * @param $url
	 *
	 * @return string
	 */
	public function loginLogoLink( string $url ): string
	{
		$url = esc_url( home_url( '/' ) );

		return $url;
	}

	/**
	 * Change the fatal error handler email address from admin's to our internal
	 *
	 * @param array $data
	 *
	 * @return array
	 */
	public function recoveryModeEmail( array $data ): array
	{
		$data['to'] = [
			'hello@forwardslashny.com',
			'nick@forwardslashny.com',
			'boris@forwardslashny.com',
		];

		return $data;
	}

	/**
	 * Filter out the tinymce emoji plugin.
	 */
	public function disableEmojisTinymce( $plugins ) {
		if ( is_array( $plugins ) ) {
			return array_diff( $plugins, array( 'wpemoji' ) );
		} else {
			return array();
		}
	}

	/**
	 * Remove WP version link
	 */
	public function removeWpVersion() {
		return '';
	}

	public function editResponseBeforeSending( $response )
	{
		if ( ! isset( $response->errors ) || ! is_array( $response->errors ) ) {
			return;
		}

		$errors = [];

		foreach ( $response->errors as $error ) {
			$errors[] = new Error( $error->getMessage(), $error->getNodes(), $error->getSource(), $error->getPositions(), $error->getPath(), null, $error->getExtensions() );
		}

		$response->errors = $errors;
	}

	public function mutations()
	{
		if ( ! function_exists( 'register_graphql_mutation' ) ) {
			return;
		}

		// fws_login
		register_graphql_mutation( 'me', [
			'description' => __( 'Get User based on authToken', 'fws_admin' ),
			'inputFields'         => [
				'authToken' => [
					'type'        => 'String',
					'description' => __( 'Optional, authToken (if not being sent as the Bearer through the headers)', 'fws_admin' ),
				]
			],
			'outputFields' => [
				'user' => [
					'type' => 'User',
					'description' => __( 'The user that is logged in', 'fws_admin' ),
				],
			],
			'mutateAndGetPayload' => function( $input, AppContext $context, ResolveInfo $info ) {

				$authToken = ! empty( $input['authToken'] ) ? $input['authToken'] : null;

				$token = Auth::validate_token( $authToken );

				$user_id = $token->data->user->id ?? 0;

				if ( $token === null ) {
					add_filter( 'graphql_response_status_code', function() {
						return 403;
					});
					throw new UserError( __( 'missing-secret-key | Auth Token not provided.', 'fws_admin' ) );
				}

				if ( ! $user_id ) {
					add_filter( 'graphql_response_status_code', function() {
						return 401;
					});
					throw new UserError( __( 'invalid-secret-key | Auth Token invalid.', 'fws_admin' ) );
				}

				return [
					'user' => DataSource::resolve_user( $user_id, \WPGraphQL::get_app_context() ),
				];
			},
		] );

		register_graphql_mutation(
			'refreshToken',
			[
				'description'         => __( 'Use a valid JWT Refresh token to retrieve a new JWT Auth Token', 'fws_admin' ),
				'inputFields'         => [
					'jwtRefreshToken' => [
						'type'        => [ 'non_null' => 'String' ],
						'description' => __( 'A valid, previously issued JWT refresh token. If valid a new Auth token will be provided. If invalid, expired, revoked or otherwise invalid, a new AuthToken will not be provided.', 'fws_admin' ),
					],
				],
				'outputFields'        => [
					'authToken' => [
						'type'        => 'String',
						'description' => __( 'JWT Token that can be used in future requests for Authentication', 'fws_admin' ),
					]
				],
				'mutateAndGetPayload' => function( $input ) {
					$refresh_token = ! empty( $input['jwtRefreshToken'] ) ? Auth::validate_token( $input['jwtRefreshToken'] ) : null;

					$id = isset( $refresh_token->data->user->id ) || 0 === $refresh_token->data->user->id ? absint( $refresh_token->data->user->id ) : 0;
					if ( empty( $id ) ) {
						add_filter( 'graphql_response_status_code', function() {
							return 401;
						});
						throw new UserError( __( 'The provided refresh token is invalid', 'fws_admin' ) );
					}

					$user = new \WP_User( $id );
					$auth_token = Auth::get_token( $user, false );

					return [
						'authToken' => $auth_token
					];
				},
			]
		);
	}
}

return ThemeHooks::getInstance();
