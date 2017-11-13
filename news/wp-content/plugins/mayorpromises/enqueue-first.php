<?php 
add_action( 'wp_enqueue_scripts', 'mayor_promises_enqueue_scripts' );
function mayor_promises_enqueue_scripts() {
	wp_enqueue_script( 'test', plugins_url( '/test.js', __FILE__ ), array('jquery'), '1.0', true );
}
?>