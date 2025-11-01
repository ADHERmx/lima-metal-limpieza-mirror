<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'lima' ); ?></a>

    <header id="masthead" class="site-header">
        <div class="container">
            <div class="site-logo">
                <?php
                if ( has_custom_logo() ) {
                    the_custom_logo();
                } else {
                    ?>
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
                        <?php bloginfo( 'name' ); ?>
                    </a>
                    <?php
                }
                ?>
            </div>

            <nav id="site-navigation" class="main-navigation">
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'primary',
                        'menu_id'        => 'primary-menu',
                        'container'      => false,
                        'fallback_cb'    => false,
                    )
                );
                
                // Fallback menu if no menu is set
                if ( ! has_nav_menu( 'primary' ) ) {
                    ?>
                    <ul id="primary-menu">
                        <li><a href="#nosotros">Nosotros</a></li>
                        <li><a href="#servicios">Servicios</a></li>
                        <li><a href="#galeria">Galería</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </ul>
                    <?php
                }
                ?>
            </nav>
        </div>
    </header>
