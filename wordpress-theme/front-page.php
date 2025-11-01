<?php
/**
 * Front Page Template
 *
 * @package LIMA
 */

get_header();
?>

<!-- Hero Section -->
<section id="inicio" class="hero-section" style="background-image: url('<?php echo esc_url( get_theme_mod( 'lima_hero_background', get_template_directory_uri() . '/images/hero-background.jpg' ) ); ?>');">
    <div class="hero-overlay"></div>
    <div class="container">
        <div class="hero-content">
            <?php if ( has_custom_logo() ) : ?>
                <img src="<?php echo esc_url( wp_get_attachment_image_url( get_theme_mod( 'custom_logo' ), 'full' ) ); ?>" alt="<?php bloginfo( 'name' ); ?>" class="hero-logo">
            <?php endif; ?>
            
            <div class="hero-accent"></div>
            
            <p class="hero-text">
                <?php echo esc_html( get_theme_mod( 'lima_hero_text', 'Dedicados a servir la industria metal mecánica y fundición desde 1981' ) ); ?>
            </p>
            
            <div class="hero-buttons">
                <a href="#nosotros" class="btn-primary">Conocer Más</a>
                <a href="#contacto" class="btn-secondary">Contacto</a>
            </div>
        </div>
    </div>
</section>

<!-- About Section -->
<section id="nosotros" class="about-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Nuestra Historia</h2>
            <p class="section-subtitle">Más de 40 años de experiencia en limpieza de metales</p>
        </div>
        
        <div class="timeline">
            <?php
            // Get custom milestones from customizer or use defaults
            $milestones = array(
                array(
                    'year'  => '1981',
                    'title' => 'Fundación de LIMA',
                    'desc'  => 'Iniciamos nuestras operaciones especializándonos en limpieza de metales para la industria.'
                ),
                array(
                    'year'  => '1990',
                    'title' => 'Expansión de Servicios',
                    'desc'  => 'Ampliamos nuestra capacidad para atender a empresas de fundición a nivel nacional.'
                ),
                array(
                    'year'  => '2000',
                    'title' => 'Certificación ISO',
                    'desc'  => 'Obtuvimos certificaciones internacionales de calidad en nuestros procesos.'
                ),
                array(
                    'year'  => '2020',
                    'title' => 'Modernización',
                    'desc'  => 'Implementamos tecnología de punta para optimizar nuestros servicios.'
                )
            );

            foreach ( $milestones as $milestone ) :
                ?>
                <div class="milestone">
                    <div class="milestone-year"><?php echo esc_html( $milestone['year'] ); ?></div>
                    <h3 class="milestone-title"><?php echo esc_html( $milestone['title'] ); ?></h3>
                    <p><?php echo esc_html( $milestone['desc'] ); ?></p>
                </div>
                <?php
            endforeach;
            ?>
        </div>
    </div>
</section>

<!-- Services Section -->
<section id="servicios" class="services-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Nuestros Servicios</h2>
            <p class="section-subtitle">Soluciones profesionales para la industria metal mecánica</p>
        </div>
        
        <div class="services-grid">
            <?php
            $services = array(
                array(
                    'title' => 'Limpieza Industrial',
                    'desc'  => 'Servicios especializados de limpieza para todo tipo de metales y superficies industriales.'
                ),
                array(
                    'title' => 'Tratamiento de Superficies',
                    'desc'  => 'Preparación y tratamiento de superficies metálicas para procesos posteriores.'
                ),
                array(
                    'title' => 'Granallado',
                    'desc'  => 'Proceso de granallado para limpieza y preparación de piezas metálicas.'
                ),
                array(
                    'title' => 'Servicios a Fundiciones',
                    'desc'  => 'Servicios especializados para empresas del sector de fundición.'
                )
            );

            foreach ( $services as $service ) :
                ?>
                <div class="service-card">
                    <h3 class="service-title"><?php echo esc_html( $service['title'] ); ?></h3>
                    <p><?php echo esc_html( $service['desc'] ); ?></p>
                </div>
                <?php
            endforeach;
            ?>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contacto" class="contact-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Contacto</h2>
            <p class="section-subtitle">¿Tiene alguna pregunta? Estamos aquí para ayudarle</p>
        </div>
        
        <div class="contact-form">
            <?php echo do_shortcode( '[contact-form-7 id="1" title="Contact form"]' ); ?>
            
            <!-- Fallback form if Contact Form 7 is not installed -->
            <form action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post">
                <input type="hidden" name="action" value="lima_contact_form">
                <?php wp_nonce_field( 'lima_contact_form', 'lima_contact_nonce' ); ?>
                
                <div class="form-group">
                    <label for="name">Nombre</label>
                    <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="phone">Teléfono</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                
                <div class="form-group">
                    <label for="message">Mensaje</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                
                <button type="submit" class="btn-primary">Enviar Mensaje</button>
            </form>
        </div>
    </div>
</section>

<?php
get_footer();
