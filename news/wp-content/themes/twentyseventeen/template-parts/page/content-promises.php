<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		<?php twentyseventeen_edit_link( get_the_ID() ); ?>
	</header><!-- .entry-header -->
	<div class="entry-content">
	
	
	
		<?php
        
        $promise_id = $_GET['id'];
        
        
        $querystr = "
            SELECT $wpdb->posts.* 
            FROM $wpdb->posts, $wpdb->postmeta
            WHERE $wpdb->posts.ID = $wpdb->postmeta.post_id 
            AND $wpdb->postmeta.meta_key = 'related_promise' 
            AND $wpdb->postmeta.meta_value = '$promise_id' 
            AND $wpdb->posts.post_status = 'publish' 
            AND $wpdb->posts.post_type = 'post'
            AND $wpdb->posts.post_date < NOW()
            ORDER BY $wpdb->posts.post_date DESC
         ";
        
        $pageposts = $wpdb->get_results($querystr, OBJECT);
        
        ?>
        
       <?php if ($pageposts): ?>
 <?php global $post; ?>
 <?php foreach ($pageposts as $post): ?>
 <?php setup_postdata($post); ?>
 
 <div class="post" id="post-<?php the_ID(); ?>">
 <h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>">
    <?php the_title(); ?></a></h2>
    <small><?php the_time('F jS, Y') ?> <!-- by <?php the_author() ?> --></small>
    <div class="entry">
       <?php the_content('Continue reading'); ?>
    </div>
<!--
    <p class="postmetadata">Posted in <?php the_category(', ') ?> | <?php edit_post_link('Edit', '', ' | '); ?>  
    <?php comments_popup_link('No Comments »', '1 Comment »', '% Comments »'); ?></p>
-->
 </div>
 <?php endforeach; ?>
 <?php else : ?>
    <h2 class="center">Not Found</h2>
    <p class="center">Sorry, but you are looking for something that isn't here.</p>
    <?php include (TEMPLATEPATH . "/searchform.php"); ?>
 <?php endif; ?>
       
       <?php
        
//			the_content();
        

//			wp_link_pages( array(
//				'before' => '<div class="page-links">' . __( 'Pages:', 'twentyseventeen' ),
//				'after'  => '</div>',
//			) );
		?>
	</div><!-- .entry-content -->
</article><!-- #post-## -->
