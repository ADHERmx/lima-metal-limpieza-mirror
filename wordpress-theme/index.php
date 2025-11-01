<?php
/**
 * The main template file
 *
 * @package LIMA
 */

get_header();
?>

<main id="primary" class="site-main">
    <?php
    // Load front-page template if exists
    if ( is_front_page() && file_exists( get_template_directory() . '/front-page.php' ) ) {
        get_template_part( 'front-page' );
    } else {
        // Default loop for other pages
        if ( have_posts() ) :
            while ( have_posts() ) :
                the_post();
                ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <header class="entry-header">
                        <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                    </header>

                    <div class="entry-content">
                        <?php
                        the_content();
                        ?>
                    </div>
                </article>
                <?php
            endwhile;
        else :
            ?>
            <p><?php esc_html_e( 'No se encontró contenido.', 'lima' ); ?></p>
            <?php
        endif;
    }
    ?>
</main>

<?php
get_footer();
