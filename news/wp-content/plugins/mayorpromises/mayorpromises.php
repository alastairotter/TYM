<?php 

/**
 * Plugin Name: Mayor's Promises
 * Plugin URI: http://mediahack.co.za
 * Description: A method for adding links to promises
 * Version: 1.0.0
 * Author: Alastair Otter
 * Author URI: http://dmediahack.co.za
 * License: GPL2
 */



//add_action( 'wp_enqueue_scripts', 'mayor_promises_enqueue_scripts' );
//function mayor_promises_enqueue_scripts() {
//	wp_enqueue_script( 'test', plugins_url( '/test.js', __FILE__ ), array('jquery'), '1.0', true );
//}



add_action( 'admin_footer', 'my_action_javascript' ); // Write our JS below here


function my_action_javascript() { ?>
	<script type="text/javascript" >
      
        
	jQuery(document).ready(function($) {
        
        
        // ADD MAYORS
        
        
        $.ajax({
            url: "http://localhost:8888/trackyourmayor/admin/api/all_data.php?section=promises&start=0&count=100",
            success: function( data ) {
                
                var mayors = data.mayors; 
                
                mayors.forEach( function(d) { 
                    jQuery("#mayor_select").append("<option value=" + d.mayor + ">" + d.mayor_name + "</option>");
                })
                
                jQuery("#mayor_select").on("change", function () { 
                    getPromises(this.value);
                })
                
                
            }});
        
        
        
        var getPromises = function (id) { 
		
        $.ajax({
            url: "http://localhost:8888/trackyourmayor/admin/api/all_data.php?section=promises&start=0&count=100&mayor="+ id,
            success: function( data ) {
//                alert( 'Your home page has ' + $(data).find('div').length + ' div elements.');
                
                delete data.mayors;
                delete data.parties;
                delete data.categories;
                delete data.municipalities;
                delete data.statuses;
                
                console.log(data);
                var count= Object.keys(data).length;
                console.log(count);
                
                // remove previous options
                jQuery("[name=voodoo_dropdown]").find("option").remove();
                
                for(var x = 0; x < count; x++) {
                    
                    jQuery('[name=voodoo_dropdown]').append("<option value=" + data[x].id + ">" + data[x].promise + "</option>");
                    
                }
                
//                data.forEach( function(d) { 
//                jQuery('[name=voodoo_dropdown]').append("<option value=" + d.id + ">" + d.promise + "</option>");
//                    
//                    
//                // get selected mayor
//                
//                
//                })
                
                jQuery("[name=voodoo_dropdown]").on("change", function () { 
                    console.log(this.value);
                })
                
//                jQuery("[name=voodoo_dropdown]").append("<option>Option</option>");
                
                
            }
	   })
            
        } // end getPromises function
        
        
	});
        
        

        
        
    
        

	</script> <?php
}




// dropdown


// action to add meta boxes
add_action( 'add_meta_boxes', 'voodoo_dropdown_metabox' );
// action on saving post
add_action( 'save_post', 'voodoo_dropdown_save' );

// function that creates the new metabox that will show on post
function voodoo_dropdown_metabox() {
    add_meta_box( 
        'voodoo_dropdown',  // unique id
        __( 'Add related promise', 'mytheme_textdomain' ),  // metabox title
        'voodoo_dropdown_display',  // callback to show the dropdown
        'post'   // post type
    );
}

// voodoo dropdown display
function voodoo_dropdown_display( $post ) {

  // Use nonce for verification
  wp_nonce_field( basename( __FILE__ ), 'voodoo_dropdown_nonce' );

  // get current value
  $dropdown_value = get_post_meta( get_the_ID(), 'related_promise', true );
    

    
    
    
    
    
    
  ?>
   
   
   <select name="mayor_select" id="mayor_select">
      <option value='0'>Mayors</option>
       
   </select>
   
   
    <select name="voodoo_dropdown" id="voodoo_dropdown">
    <option value='0'>Promises</option>
    
    
<!--
        <option value="USA" <?php if($dropdown_value == 'USA') echo 'selected'; ?>>USA</option>
        <option value="Canada" <?php if($dropdown_value == 'Canada') echo 'selected'; ?>>Canada</option>
        <option value="Mexico" <?php if($dropdown_value == 'Mexico') echo 'selected'; ?>>MEXICO</option>
-->
        
        

        
    </select>
    
    Clear related promsie: <input type="checkbox" name="reset_related" value='Yes'>
    
    <div id="related-promise" style="width: 95%; margin-top: 30px;">
    <h4>Related Promise:</h4>
    
    <script>
        var selected = <?php echo $dropdown_value; ?>;
        
        
        jQuery.ajax({
            url: "http://localhost:8888/trackyourmayor/api/get_promise.php?id="+ selected,
            success: function( data ) {
                
                jQuery("#related-promise").append(data[0].mayor_name + "<br />" + data[0].promise);
                
            }});
//        
    </script>
</div>
    
  <?php
    
   
}

// dropdown saving
function voodoo_dropdown_save( $post_id ) {

    // if doing autosave don't do nothing
  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) 
      return;

  // verify nonce
  if ( !wp_verify_nonce( $_POST['voodoo_dropdown_nonce'], basename( __FILE__ ) ) )
      return;


  // Check permissions
  if ( 'page' == $_POST['post_type'] ) 
  {
    if ( !current_user_can( 'edit_page', $post_id ) )
        return;
  }
  else
  {
    if ( !current_user_can( 'edit_post', $post_id ) )
        return;
  }

  // save the new value of the dropdown

    
  $new_value = $_POST['voodoo_dropdown'];
    if($new_value != 0) { 
  update_post_meta( $post_id, 'related_promise', $new_value );
    }
    
//reset
    if($_POST['reset_related'] == 'Yes') {
        
        delete_post_meta($post_id, 'related_promise'); 
        
        
    }
}


?>