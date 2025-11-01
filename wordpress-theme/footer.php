    <footer id="colophon" class="site-footer">
        <div class="container">
            <?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
                <div class="footer-widgets">
                    <?php dynamic_sidebar( 'footer-1' ); ?>
                </div>
            <?php endif; ?>

            <div class="footer-info">
                <p>&copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'Todos los derechos reservados.', 'lima' ); ?></p>
                <?php
                $email = get_theme_mod( 'lima_contact_email' );
                $phone = get_theme_mod( 'lima_contact_phone' );
                
                if ( $email || $phone ) :
                    ?>
                    <p>
                        <?php
                        if ( $email ) {
                            echo '<a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a>';
                        }
                        if ( $email && $phone ) {
                            echo ' | ';
                        }
                        if ( $phone ) {
                            echo '<a href="tel:' . esc_attr( preg_replace( '/[^0-9+]/', '', $phone ) ) . '">' . esc_html( $phone ) . '</a>';
                        }
                        ?>
                    </p>
                    <?php
                endif;
                ?>
            </div>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
