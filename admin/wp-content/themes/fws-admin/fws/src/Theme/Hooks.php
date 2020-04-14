<?php
declare( strict_types = 1 );

namespace FWS\Theme;

use FWS\SingletonHook;
use GraphQL\Error\Error;
use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use WPGraphQL\Data\DataSource;
use WPGraphQL\JWT_Authentication\Auth;


/**
 * Theme Hooks. No methods are available for direct calls.
 *
 * @package FWS\Theme
 * @author  Boris Djemrovski <boris@forwardslashny.com>
 */
class Hooks extends SingletonHook
{

	/** @var self */
	protected static $instance;

	/**
	 * Only users logged in with declared email domain are allowed to add/update/remove plugins
	 */
	public function preventPluginUpdate(): void
	{
		if ( fws()->config()->preventPluginUpdate() ) {
			$user = wp_get_current_user();

			if ( ! $user->user_email || strpos( $user->user_email, fws()->config()->pluginUpdatesAllowedDomain() ) === false ) {
				add_filter( 'file_mod_allowed', '__return_false' );
			}
		}
	}

	/**
	 * Add custom stylesheet to login and admin dashboard
	 */
	public function addAdminStyles(): void
	{
		wp_enqueue_style( 'fws_starter_nuxt-admin-style', get_template_directory_uri() . '/dist/admin.css' );
		wp_enqueue_script( 'fws_starter_nuxt-admin-script', get_template_directory_uri() . '/dist/admin.js', [ 'jquery' ], '', true );
	}

	/**
	 * Add login title
	 */
	public function addLoginTitle(): void
	{
		echo '<span class="login-title">' . fws()->config()->themeName() . ' login</span>';
	}

	/**
	 * Plugin dependencies
	 */
	public function dependenciesNotice(): void
	{
		if ( ! function_exists( 'acf_add_options_sub_page' ) ) {
			echo '<div class="error"><p>' . __( 'Warning: The theme needs ACF Pro plugin to function', 'fws_starter_nuxt' ) . '</p></div>';
		}
	}

	/**
	 * Change logo link url
	 *
	 * @return string
	 */
	public function loginLogoLink(): string
	{
		return esc_url( home_url( '/' ) );
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
		if ( ! empty( fws()->config()->recoveryModeEmails() ) ) {
			$data['to'] = fws()->config()->recoveryModeEmails();
		}

		return $data;
	}

	public function editResponseBeforeSending( $response )
	{
		if ( ! isset( $response->errors ) || ! is_array( $response->errors ) ) {
			return;
		}

		$errors = [];

		/** @var Error $error */
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

	/**
	 * Drop your hooks here.
	 */
	protected function hooks()
	{
		add_action( 'admin_init', [ $this, 'preventPluginUpdate' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'addAdminStyles' ] );
		add_action( 'login_enqueue_scripts', [ $this, 'addAdminStyles' ] );
		add_action( 'login_form', [ $this, 'addLoginTitle' ] );
		add_action( 'admin_notices', [ $this, 'dependenciesNotice' ] );
		add_action( 'graphql_register_types', [ $this, 'mutations' ] );
		add_action( 'graphql_process_http_request_response', [ $this, 'editResponseBeforeSending' ], 10, 1 );

		remove_action( 'login_head', 'wp_shake_js', 12 );
		add_filter( 'login_headerurl', [ $this, 'loginLogoLink' ] );
		add_filter( 'recovery_mode_email', [ $this, 'recoveryModeEmail' ] );
	}
}
