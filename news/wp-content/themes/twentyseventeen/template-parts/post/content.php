<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.2
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php
	if ( is_sticky() && is_home() ) :
		echo twentyseventeen_get_svg( array( 'icon' => 'thumb-tack' ) );
	endif;
	?>
	<header class="entry-header">
		<?php
		if ( 'post' === get_post_type() ) {
			echo '<div class="entry-meta">';
				if ( is_single() ) {
					twentyseventeen_posted_on();
				} else {
					echo twentyseventeen_time_link();
					twentyseventeen_edit_link();
				};
			echo '</div><!-- .entry-meta -->';
		};

		if ( is_single() ) {
			the_title( '<h1 class="entry-title">', '</h1>' );
		} elseif ( is_front_page() && is_home() ) {
			the_title( '<h3 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h3>' );
		} else {
			the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
		}
		?>
	</header><!-- .entry-header -->

	<?php if ( '' !== get_the_post_thumbnail() && ! is_single() ) : ?>
		<div class="post-thumbnail">
			<a href="<?php the_permalink(); ?>">
				<?php the_post_thumbnail( 'twentyseventeen-featured-image' ); ?>
			</a>
		</div><!-- .post-thumbnail -->
	<?php endif; ?>

	<div class="entry-content">
	
	
		<?php
        
        if ( is_single() ) {
        
        $meta = get_post_meta($post->ID, 'related_promise');
        $meta_count = count($meta);
        if($meta_count > 0) { 
            ?>
            
            
        <div class="related-card">
              <div class="head"></div>
              <div class="details">
              </div>
              <div class="promise"> 
              <b>Promise:</b> 
              </div>
              <div class="status">
                  <b>Status:</b> <span class="c-status"></span>
              </div>
              <div class="progress">
                  
              </div>
              <div class="links">
                 
              </div>
               
           </div>
           
           
            <script>
            var relatedPromise = <?php echo $meta[0]; ?>;
            console.log(relatedPromise);
                
            jQuery.ajax({
            url: "http://localhost:8888/trackyourmayor/api/get_promise.php?id=" + relatedPromise,
            success: function( data ) {
                console.log(data);
                
                jQuery(".head").append(data[0].mayor_name);
                jQuery(".details").append(data[0].municipality_name + "<br/>" + data[0].party_abbr);
                jQuery(".promise").append(data[0].promise);
                jQuery(".c-status").append(data[0].status);
                if(data[0].status === "Kept") { 
                    jQuery(".progress").append("<img src='http://dev.mediahack.co.za/trackmymayor/images/speedo_kept.png'>");
                }
                if(data[0].status === "Broken") { 
                    jQuery(".progress").append("<img src='http://dev.mediahack.co.za/trackmymayor/images/speedo_broken.png'>");
                }
                if(data[0].status === "In progress") { 
                    jQuery(".progress").append("<img src='http://dev.mediahack.co.za/trackmymayor/images/speedo_progress.png'>");
                }
                
                if(data[0].status === "Kept in part") { 
                    jQuery(".progress").append("<img src='http://dev.mediahack.co.za/trackmymayor/images/speedo_part.png'>");
                }
                
                jQuery(".links").append("<a href='http://localhost:8888/trackyourmayor/#!/record/" + data[0].mayor + "/1/Yes'>Other promises by <b>" + data[0].mayor_name + "</b></a>");
                
                
                
            }});
                
        </script>
           
           
            
            
            <?php
        }
            
        }
        
		/* translators: %s: Name of current post */
		the_content( sprintf(
			__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'twentyseventeen' ),
			get_the_title()
		) );

		wp_link_pages( array(
			'before'      => '<div class="page-links">' . __( 'Pages:', 'twentyseventeen' ),
			'after'       => '</div>',
			'link_before' => '<span class="page-number">',
			'link_after'  => '</span>',
		) );
		?>
	</div><!-- .entry-content -->

	<?php
	if ( is_single() ) {
		twentyseventeen_entry_footer();
	}
	?>

</article><!-- #post-## -->
