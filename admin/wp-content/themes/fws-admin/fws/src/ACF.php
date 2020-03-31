<?php
declare( strict_types=1 );

namespace FWS;

use WP_Term;

/**
 * Singleton Class ACF. No methods are available for direct calls.
 *
 * @package FWS
 * @author  Boris Djemrovski <boris@forwardslashny.com>
 */
class ACF
{

	use Main;

	/** @var int */
	private $flexContentCounter = 0;

	/**
	 * Main constructor.
	 */
	private function __construct()
	{
		// Bail if ACF plugin isn't activated
		if ( ! function_exists( 'acf' ) ) {
			return;
		}

		$this->hooks();
	}

	/**
	 * Drop your hooks here.
	 */
	private function hooks(): void
	{
		// Actions
		add_action( 'init', [ $this, 'acfInit' ] );
		add_action( 'admin_init', [ $this, 'automaticJsonSync' ] );
		add_action( 'admin_menu', [ $this, 'fieldGroupCategorySubmenu' ] );
		add_action( 'admin_notices', [ $this, 'editNotAllowedNotice' ] );
		add_action( 'pre_post_update', [ $this, 'preventEditingGroups' ], 10, 2 );
		add_action( 'acf/import_field_group', [ $this, 'loadGroupCategoryJson' ] );
		add_action( 'manage_acf-field-group_posts_custom_column', [ $this, 'fieldGroupCategoryColumnHtml' ], 10, 2 );

		// Filters
		add_filter( 'acf/fields/flexible_content/layout_title', [ $this, 'flexibleContentLayoutTitle' ], 10, 1 );
		add_filter( 'acf/prepare_field_group_for_export', [ $this, 'saveGroupCategoryJson' ] );
		add_filter( 'parent_file', [ $this, 'fieldGroupCategorySubmenuHighlight' ] );
		add_filter( 'manage_edit-acf-field-group_columns', [ $this, 'fieldGroupCategoryColumn' ], 11 );
		add_filter( 'views_edit-acf-field-group', [ $this, 'fieldGroupCategoryViews' ], 9 );
		add_filter( 'acf/get_taxonomies', [ $this, 'fieldGroupCategoryExclude' ], 10, 1 );
	}

	public function fieldGroupCategoryExclude( $taxonomies )
	{
		if ( empty( $taxonomies ) ) {
			return $taxonomies;
		}

		foreach ( $taxonomies as $k => $taxonomy ) {

			if ( $taxonomy != 'acf-field-group-category' ) {
				continue;
			}

			unset( $taxonomies[ $k ] );

		}

		return $taxonomies;
	}

	public function fieldGroupCategoryViews( $views ): array
	{
		if ( ! $terms = get_terms( 'acf-field-group-category', [ 'hide_empty' => false ] ) ) {
			return $views;
		}

		foreach ( $terms as $term ) {

			$groups = get_posts( [
				'post_type' => 'acf-field-group',
				'posts_per_page' => - 1,
				'suppress_filters' => false,
				'post_status' => [ 'publish', 'acf-disabled' ],
				'taxonomy' => 'acf-field-group-category',
				'term' => $term->slug,
				'fields' => 'ids',
			] );

			$count = count( $groups );

			$html = '';
			if ( $count > 0 ) {
				$html = ' <span class="count">(' . $count . ')</span>';
			}

			global $wp_query;
			$class = '';
			if ( isset( $wp_query->query_vars['acf-field-group-category'] ) && $wp_query->query_vars['acf-field-group-category'] === $term->slug ) {
				$class = ' class="current"';
			}

			$views[ 'category-' . $term->slug ] = '<a href="' . admin_url( 'edit.php?acf-field-group-category=' . $term->slug . '&post_type=acf-field-group' ) . '" ' . $class . '>' . $term->name . $html . '</a>';
		}

		return $views;
	}

	public function fieldGroupCategoryColumnHtml( $column, $post_id ): void
	{
		if ( $column === 'acf-field-group-category' ) {
			if ( ! $terms = get_the_terms( $post_id, 'acf-field-group-category' ) ) {
				echo '—';

				return;
			}

			$categories = [];
			foreach ( $terms as $term ) {
				$categories[] = '<a href="' . admin_url( 'edit.php?acf-field-group-category=' . $term->slug . '&post_type=acf-field-group' ) . '">' . $term->name . '</a>';
			}

			echo implode( ' ', $categories );
		}
	}

	public function fieldGroupCategoryColumn( array $columns ): array
	{
		$new_columns = [];
		foreach ( $columns as $key => $value ) {
			if ( $key === 'acf-fg-status' ) {
				$new_columns['acf-field-group-category'] = __( 'Categories' );
			}

			$new_columns[ $key ] = $value;
		}

		return $new_columns;
	}

	public function fieldGroupCategorySubmenuHighlight( string $parentFile ): string
	{
		global $current_screen, $pagenow;

		if ( $current_screen->taxonomy === 'acf-field-group-category' && ( $pagenow === 'edit-tags.php' || $pagenow === 'term.php' ) ) {
			$parentFile = 'edit.php?post_type=acf-field-group';
		}

		return $parentFile;
	}

	public function fieldGroupCategorySubmenu(): void
	{
		if ( ! acf_get_setting( 'show_admin' ) ) {
			return;
		}

		add_submenu_page(
			'edit.php?post_type=acf-field-group',
			__( 'Categories' ),
			__( 'Categories' ),
			acf_get_setting( 'capability' ),
			'edit-tags.php?taxonomy=acf-field-group-category'
		);

	}

	/**
	 * Init stuff
	 */
	public function acfInit(): void
	{
		register_taxonomy( 'acf-field-group-category',
			[ 'acf-field-group' ],
			[
				'hierarchical' => true,
				'public' => false,
				'show_ui' => 'ACFE',
				'show_admin_column' => true,
				'show_in_menu' => true,
				'show_in_nav_menus' => true,
				'show_tagcloud' => false,
				'rewrite' => false,
				'labels' => [
					'name' => _x( 'Categories', 'Category' ),
					'singular_name' => _x( 'Categories', 'Category' ),
					'search_items' => __( 'Search categories', 'acfe' ),
					'all_items' => __( 'All categories', 'acfe' ),
					'parent_item' => __( 'Parent category', 'acfe' ),
					'parent_item_colon' => __( 'Parent category:', 'acfe' ),
					'edit_item' => __( 'Edit category', 'acfe' ),
					'update_item' => __( 'Update category', 'acfe' ),
					'add_new_item' => __( 'Add New category', 'acfe' ),
					'new_item_name' => __( 'New category name', 'acfe' ),
					'menu_name' => __( 'category', 'acfe' ),
				],
			] );

		// Register Options page
		acf_add_options_page( [
			'page_title' => 'Theme Settings',
			'menu_title' => 'Theme Settings',
			'menu_slug' => 'asl-settings',
			'capability' => 'edit_posts',
			'redirect' => false,
		] );


		// Add sub page.
		acf_add_options_sub_page( [
			'page_title' => __( 'Top Menu' ),
			'menu_title' => __( 'Top Menu' ),
			'parent_slug' => 'asl-settings',
		] );

		// Mega menu
		acf_add_options_sub_page( [
			'page_title' => 'Mega Menu',
			'menu_title' => 'Mega Menu',
			'parent_slug' => 'asl-settings',
		] );

		// Add Flexible content group from all Flexible Content groups
		$this->addMainFlexContentGroup();
	}

	/**
	 * Register new flexible content field group.
	 *
	 * @param string $fieldName
	 * @param array  $location
	 * @param array  $layouts
	 * @param array  $hideOnScreen
	 */
	public function registerFlexContent( string $fieldName, array $location, array $layouts, array $hideOnScreen = [] ): void
	{
		$key = 'flexible_content_' . $this->flexContentCounter ++;

		$args = [
			'key' => $key,
			'title' => $fieldName,
			'fields' => [
				[
					'key' => "field_$key",
					'label' => '',
					'name' => str_replace( '-', '_', sanitize_title( $fieldName ) ),
					'type' => 'flexible_content',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => [
						'width' => '',
						'class' => '',
						'id' => '',
					],
					'layouts' => [],
					'button_label' => 'Add Section',
					'min' => '',
					'max' => '',
				],
			],
			'location' => [
				[
					[
						'param' => $location['param'],
						'operator' => '==',
						'value' => $location['value'],
					],
				],
			],
			'menu_order' => 0,
			'position' => 'normal',
			'style' => 'default',
			'label_placement' => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen' => $hideOnScreen,
			'active' => true,
			'description' => '',
			'modified' => 1567782198,
		];

		foreach ( $layouts as $layout ) {
			$label = $layout['label'];
			$name = $layout['name'];
			$key = $layout['clone_group_key'];

			$args['fields'][0]['layouts']["layout_$key"] = [
				'key' => "layout_$key",
				'name' => $name,
				'label' => $label,
				'display' => 'block',
				'sub_fields' => [
					[
						'key' => "layout_field_$key",
						'label' => '',
						'name' => $name,
						'type' => 'clone',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => [
							'width' => '',
							'class' => '',
							'id' => '',
						],
						'acfe_permissions' => '',
						'clone' => [
							0 => $layout['clone_group_key'],
						],
						'display' => 'seamless',
						'layout' => 'block',
						'prefix_label' => 0,
						'prefix_name' => 0,
					],
				],
				'min' => '',
				'max' => '',
			];
		}

		acf_add_local_field_group( $args );
	}

	/**
	 * Add Flexible content group from all Flexible Content groups
	 */
	private function addMainFlexContentGroup(): void
	{
		$groups = array_filter( acf_get_local_field_groups(), [ $this, 'filterACFGroupsFlexContent' ] );

		$layouts = array_map( function ( array $group ) {
			$label = trim( str_replace( 'FC ', '', $group['title'] ) );
			$name = str_replace( '-', '_', sanitize_title( $label ) );

			return [
				'label' => $label,
				'name' => $name,
				'clone_group_key' => $group['key'],
			];
		},
			array_reverse( $groups, true ) );

		$this->registerFlexContent(
			'Content',
			[
				'param' => 'page_template',
				'value' => 'default',
			],
			$layouts,
			[ 'the_content' ]
		);
	}

	/**
	 * @param array $group
	 *
	 * @return bool
	 */
	private function filterACFGroupsFlexContent( array $group ): bool
	{
		if ( ! isset( $group['acf-field-group-category'] ) || ! is_array( $group['acf-field-group-category'] ) ) {
			return false;
		}

		foreach ( $group['acf-field-group-category'] as $category ) {
			if ( $category['slug'] === 'flexible-content' ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Customize Flexible Content Title
	 *
	 * @param string $title
	 *
	 * @return string
	 */
	public function flexibleContentLayoutTitle( string $title ): string
	{
		$newTitle = '';
		$newTitle .= '<h4 class="acf-fc-title">' . $title . '</h4>';

		return $newTitle;
	}

	/**
	 * Automatic ACF group sync on admin page open
	 */
	public function automaticJsonSync(): void
	{
		// Bail if not on the right admin page
		if ( acf_maybe_get_GET( 'post_type' ) !== 'acf-field-group'
		     && get_post_type( acf_maybe_get_GET( 'post' ) ) !== 'acf-field-group' ) {
			return;
		}

		// Bail to prevent redirect loop
		if ( acf_maybe_get_GET( 'acfsynccomplete' ) ) {
			return;
		}

		// Remove hook to prevent redirect loop
		remove_action( 'pre_post_update', [ $this, 'preventEditingGroups' ], 10 );

		$sync = [];

		$groups = acf_get_field_groups();

		// Bail if no field groups
		if ( empty( $groups ) ) {
			return;
		}

		// Find JSON field groups which have not yet been imported
		foreach ( $groups as $group ) {

			$local = acf_maybe_get( $group, 'local', false );
			$modified = acf_maybe_get( $group, 'modified', 0 );
			$private = acf_maybe_get( $group, 'private', false );

			// Ignore if is private.
			if ( $private ) {
				continue;

			} // Ignore not local "json".
			elseif ( $local !== 'json' ) {
				continue;

			} // Append to sync if not yet in database.
			elseif ( ! $group['ID'] ) {
				$sync[ $group['key'] ] = $group;

			} // Append to sync if "json" modified time is newer than database.
			elseif ( $modified && $modified > get_post_modified_time( 'U', true, $group['ID'], true ) ) {
				$sync[ $group['key'] ] = $group;
			}
		}

		// Bail if nothing to sync
		if ( empty( $sync ) ) {
			return;
		}

		// Disable filters to ensure ACF loads raw data from DB
		acf_disable_filters();
		acf_enable_filter( 'local' );

		// Disable JSON
		// - this prevents a new JSON file being created and causing a 'change' to theme files - solves git anoyance
		acf_update_setting( 'json', false );

		$new_ids = [];

		// Do the sync
		foreach ( $sync as $group ) {

			// Append fields.
			$group['fields'] = acf_get_fields( $group );

			// Import field group.
			$group = acf_import_field_group( $group );

			// Append imported ID.
			$new_ids[] = $group['ID'];
		}

		// Redirect with a notice
		wp_redirect( admin_url( 'edit.php?post_type=acf-field-group&acfsynccomplete=' . implode( ',', $new_ids ) ) );
		exit;
	}

	/**
	 * Display Admin error notice on ACF group pages on any server but local
	 */
	public function editNotAllowedNotice(): void
	{
		global $current_screen;

		// Show only on ACF group edit page
		if ( $current_screen->post_type !== 'acf-field-group' ) {
			return;
		}

		$allowedHosts = [
			'.local',
			'localhost/',
			'.lndo.site',
		];

		// Bail if in localhost server
		foreach ( $allowedHosts as $host ) {
			if ( strpos( home_url(), $host ) !== false ) {
				return;
			}
		} ?>

		<div class="notice notice-error">
			<p><strong>You are not allowed to edit ACF fields on any server but local!</strong></p>
			<p>Your local changes will be synced with this server through GIT/theme deployment.</p>
		</div>
		<?php
	}

	/**
	 * Prevent editing ACF groups on any server byt local
	 *
	 * @param int   $post_ID
	 * @param array $data
	 */
	public function preventEditingGroups( int $post_ID, array $data ): void
	{
		$allowedHosts = [
			'.local',
			'localhost/',
			'.lndo.site',
		];

		// Bail if in localhost server
		foreach ( $allowedHosts as $host ) {
			if ( strpos( home_url(), $host ) !== false ) {
				return;
			}
		}

		// Bail if on wrong post_type page
		if ( $data['post_type'] !== 'acf-field-group' ) {
			return;
		}

		// Redirect to prevent saving post data
		wp_redirect( admin_url( 'edit.php?post_type=acf-field-group' ) );

		// Die, just in case
		die( 'Obey the rules or risk finding yourself in a deep, dark place.' );
	}

	/**
	 * Save ACF Extended field group category in JSON while syncing
	 *
	 * @param array $field_group
	 *
	 * @return array
	 */
	public function saveGroupCategoryJson( array $field_group ): array
	{
		$post_ids = get_posts( [
			'name' => $field_group['key'],
			'post_type' => 'acf-field-group',
			'post_status' => 'acf-disabled',
			'posts_per_page' => 1,
			'fields' => 'ids',
		] );

		if ( ! isset( $post_ids[0] ) ) {
			return $field_group;
		}

		$terms = wp_get_object_terms( $post_ids[0], [ 'acf-field-group-category' ], [ 'hide_empty' => true ] );

		if ( count( $terms ) ) {

			$terms = array_map( function ( WP_Term $term ) {
				return [
					'slug' => $term->slug,
					'name' => $term->name,
				];
			},
				$terms );

			$field_group['acf-field-group-category'] = $terms;
		}

		return $field_group;
	}

	/**
	 * Load ACF Extended field group category from JSON while syncing
	 *
	 * This will create the categories that doesn't exist already.
	 * Matching is done by slug.
	 *
	 * @param array $field_group
	 */
	public function loadGroupCategoryJson( array $field_group ): void
	{
		if ( empty( $field_group['acf-field-group-category'] ) ) {
			return;
		}

		$post_ids = get_posts( [
			'name' => $field_group['key'],
			'post_type' => 'acf-field-group',
			'post_status' => 'acf-disabled',
			'posts_per_page' => 1,
			'fields' => 'ids',
		] );

		if ( ! isset( $post_ids[0] ) ) {
			return;
		}

		foreach ( $field_group['acf-field-group-category'] as $category ) {
			$term = get_term_by( 'slug', $category['slug'], 'acf-field-group-category' );

			// Create the term if doesn't exist
			if ( ! $term instanceof WP_Term ) {
				$term_res = wp_insert_term( $category['name'], 'acf-field-group-category' );
				$term_id = $term_res['term_id'];
			} else {
				$term_id = $term->term_id;
			}

			wp_add_object_terms( $post_ids[0], $term_id, 'acf-field-group-category' );
		}
	}
}

return ACF::getInstance();
