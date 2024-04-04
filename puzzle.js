   var correctCards = 0;
        jQuery( init );
        
        var imgPath = "/wp-content/uploads/sites/19/2024/04/";
        var popularFoods=[ {'image':'doro-wat','name':'Doro Wat'},
                           {'image':'matapa','name':'Matapa'},
                           {'image':'pizza','name':'Pizza'},
                           {'image':'pad-thai','name':'Pad Thai'},
                           {'image':'borscht','name':'Borscht'},
                           {'image':'pabellon-criollo','name':'Pabellón Criollo'}];
                           
        var popularDish=[ {'image':'injera','name':'Inerja'},
                          {'image':'zambezia-chicken','name':'Zabenzia Chicken'},
                          {'image':'bagel-lox','name':'Bagel with lox'},
                          {'image':'krapao','name':'Pad Krapao'},
                          {'image':'varenyky','name':'Varenyky'},
                          {'image':'arepas','name':'Arepas'}];
                          
        var popularDessert=[ {'image':'dabo','name':'Dabo'},
                             {'image':'bolo-polana','name':'Bolo Palana'},
                             {'image':'cheesecake','name':'Cheescake'},
                             {'image':'mango-rice','name':'Mango Rice'},
                             {'image':'syrniki','name':'Syrniki'},
                             {'image':'bienmesabe','name':'Bienmesabe'}];

        var countries=[ {'image':'ethiopia','name':'Ethiopia'},
                        {'image':'mozambique','name':'Mozambique'},
                        {'image':'newyork','name':'New York'},
                        {'image':'thailand','name':'Thailand'},
                        {'image':'ukraine','name':'Ukraine'},
                        {'image':'venezuela','name':'Venezuela'}];

        function init() {
        
          // Hide the success message
          jQuery('#successMessage').hide();
        
          // Reset the game
          correctCards = 0;
          jQuery('#cardPile').html( '' );
          jQuery('#cardSlots').html( '' );
        
          // Create the pile of shuffled cards
          popular.sort( function() { return Math.random() - 0.5; } );
        
          for ( var i=0; i<popularFoods.length; i++ ) {
            jQuery('<div class="'+popularFoods[i].image+' card'+i+' me-2"><img style="max-height:200px;" src="'+imgPath+'food-' + popularFoods[i].image + '.png"/><p>'+popularFoods[i].name+'</p></div>').data( 'string', popularFoods[i].name ).attr( 'id', 'card'+popularFoods[i].image ).appendTo( '#cardPile' ).draggable( {
              containment: '#quiz-content', 
              stack: '#cardPile div',
              cursor: 'move',
              revert: true
            } );
          }
        
          // Create the card slots
          for ( var j=0; j<countries.length; j++ ) {
            jQuery('<div class="me-2"><img style="max-height:200px;" src="'+imgPath+'countries-' + countries[i].image + '.png"/><p>'+countries[i].name+'</p><span class="error"><img src="'+imgPath+'x_mark_red.png" width="100%"/></span></div>').data( 'string', countries[i].image ).appendTo( '#cardSlots' ).droppable( {
              accept: '#cardPile div',
              hoverClass: 'hovered',
              drop: handleCardDrop
            } );
          }
        
        }
        
        function handleCardDrop( event, ui ) {
          var slotString = jQuery(this).data( 'string' );
          var cardString = ui.draggable.data( 'string' );
         
          // If the card was dropped to the correct slot,
          // change the card colour, position it directly
          // on top of the slot, and prevent it being dragged
          // again
         
          if ( slotString == cardString ) {
           
            ui.draggable.addClass( 'correct' );
            ui.draggable.draggable( 'disable' );
            jQuery(this).droppable( 'disable' );
            jQuery(this).addClass(ui.draggable[0].classList[0]);
            ui.draggable.position( { of: jQuery(this), my: 'left top', at: 'left top' } );
            ui.draggable.draggable( 'option', 'revert', false );
            correctCards++;
          } else {
        		jQuery(this).find('.error').fadeIn('slow', function () {
        			jQuery(this).delay(500).fadeOut('slow');
        		});
        	}
         
          // If all the cards have been placed correctly then display a message
          // and reset the cards for another go
        
          if ( correctCards == popular.length) {
            jQuery('#successMessage').show();
            jQuery('#successMessage').animate( {
              opacity: 1
            } );
          }
        
        }
