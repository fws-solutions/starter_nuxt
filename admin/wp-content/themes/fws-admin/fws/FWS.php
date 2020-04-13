<?php
declare( strict_types = 1 );

use FWS\ACF\Hooks as ACFHooks;
use FWS\Config\Config;
use FWS\Singleton;
use FWS\Theme\Hooks as ThemeHooks;

/**
 * Singleton Class FWS
 *
 * @author Boris Djemrovski <boris@forwardslashny.com>
 */
class FWS extends Singleton
{

	/** @var FWS */
	protected static $instance;

	/** @var Config */
	private $config;

	/**
	 * This will automatically include and create a singleton
	 * instance for all class files in the ./src directory
	 */
	protected function __construct()
	{
		// Yaml Config
		$this->config = Config::init();

		// Theme hooks
		ThemeHooks::init();

		// ACF
		if ( function_exists( 'acf_add_options_sub_page' ) ) {
			ACFHooks::init();
		}
	}

	/**
	 * Calls wp_die() with a message about missing a required plugin
	 *
	 * @param string $pluginName
	 */
	private function wpDieMissingPlugin( string $pluginName ): void
	{
		wp_die( $pluginName . ' plugin is missing. Please check if it is installed and activated.' );
	}

	/**
	 * @return Config
	 */
	public function config(): Config
	{
		return $this->config;
	}
}
