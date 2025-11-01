<?php
/**
 * LIMA Theme Functions
 *
 * @package LIMA
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Theme setup
 */
function lima_setup() {
    // Add theme support
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ) );
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ) );

    // Register navigation menus
    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'lima' ),
    ) );
}
add_action( 'after_setup_theme', 'lima_setup' );

/**
 * Enqueue scripts and styles
 */
function lima_scripts() {
    // Theme stylesheet
    wp_enqueue_style( 'lima-style', get_stylesheet_uri(), array(), '1.0.0' );
    
    // Google Fonts (Avenir alternative)
    wp_enqueue_style( 'lima-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), null );
    
    // Theme scripts
    wp_enqueue_script( 'lima-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '1.0.0', true );
    
    // Smooth scroll
    wp_enqueue_script( 'lima-smooth-scroll', get_template_directory_uri() . '/js/smooth-scroll.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'lima_scripts' );

/**
 * Register widget areas
 */
function lima_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Footer', 'lima' ),
        'id'            => 'footer-1',
        'description'   => __( 'Add widgets here to appear in your footer.', 'lima' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );
}
add_action( 'widgets_init', 'lima_widgets_init' );

/**
 * Customizer settings
 */
function lima_customize_register( $wp_customize ) {
    // Hero Section
    $wp_customize->add_section( 'lima_hero_section', array(
        'title'    => __( 'Hero Section', 'lima' ),
        'priority' => 30,
    ) );

    // Hero Background Image
    $wp_customize->add_setting( 'lima_hero_background', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ) );

    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'lima_hero_background', array(
        'label'    => __( 'Hero Background Image', 'lima' ),
        'section'  => 'lima_hero_section',
        'settings' => 'lima_hero_background',
    ) ) );

    // Hero Text
    $wp_customize->add_setting( 'lima_hero_text', array(
        'default'           => 'Dedicados a servir la industria metal mecánica y fundición desde 1981',
        'sanitize_callback' => 'sanitize_textarea_field',
    ) );

    $wp_customize->add_control( 'lima_hero_text', array(
        'label'    => __( 'Hero Text', 'lima' ),
        'section'  => 'lima_hero_section',
        'type'     => 'textarea',
    ) );

    // Contact Section
    $wp_customize->add_section( 'lima_contact_section', array(
        'title'    => __( 'Contact Information', 'lima' ),
        'priority' => 40,
    ) );

    // Email
    $wp_customize->add_setting( 'lima_contact_email', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_email',
    ) );

    $wp_customize->add_control( 'lima_contact_email', array(
        'label'    => __( 'Email', 'lima' ),
        'section'  => 'lima_contact_section',
        'type'     => 'email',
    ) );

    // Phone
    $wp_customize->add_setting( 'lima_contact_phone', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'lima_contact_phone', array(
        'label'    => __( 'Phone', 'lima' ),
        'section'  => 'lima_contact_section',
        'type'     => 'text',
    ) );

    // Address
    $wp_customize->add_setting( 'lima_contact_address', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_textarea_field',
    ) );

    $wp_customize->add_control( 'lima_contact_address', array(
        'label'    => __( 'Address', 'lima' ),
        'section'  => 'lima_contact_section',
        'type'     => 'textarea',
    ) );
}
add_action( 'customize_register', 'lima_customize_register' );

/**
 * Custom excerpt length
 */
function lima_excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', 'lima_excerpt_length' );
