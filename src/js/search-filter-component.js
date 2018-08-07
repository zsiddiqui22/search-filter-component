var Filter = function(){
	return {
		init: function($ele,$filterElem){
			var elem = $ele;//|| '#zaccord';
			var filterElem = $filterElem;// || '#filter';

			// Toggle For Parent
			$('body').on('click','.zaccord-wrap > ul.zaccord > li > .za-header',function(){
				$(this).closest('li').toggleClass('active');
			});

			// Toggle For Childern
			$('body').on('click','.zaccord-wrap .questions > li > .za-header',function(){
				if( $(this).closest('li').hasClass('active') ){
					$(this).closest('li').removeClass('active');
					
				}else{
					$(this).closest('li').addClass('active');
					$(this).closest('li').siblings('li').removeClass('active');
					$(this).closest('[data-type="category"]').siblings('li').find('li').removeClass('active');
				}
			});

			// Apply Data for Filter
			$('.questions').each(function(){
				var parentStageText = $(this).closest('.za-body').siblings('.za-header').find('.text').text();
				var splicText = parentStageText.replace(/ /g,'');
				$(this).find('li').attr('data-state', parentStageText);
			});

			// Active Parent
			//$('.zaccord-wrap > ul.zaccord > li').addClass('active');

			// Filter
			$('#filter').keyup(function () {
				var filter = $(this).val();
				var regExPattern = "gi";
				var regEx = new RegExp(filter, regExPattern);

				
					$('.questions > li').each(function (i) {					

						//if($(this).data('state')){
							console.log('Object :'+ new RegExp(filter, "i"));
							console.log('regEx '+regEx);
							console.log(filter.length);
							console.log('===================');
							if(filter.length > 1)
							{
								if ( 
									$(this).text().search(new RegExp(filter, "i")) < 0
									//&&
									//$(this).data('state').search(regEx) < 0							
								)
								{	
									// On False Condition
									$(this).addClass('displayNon');
		
								} else {
									// On True Condition
									$(this).removeClass('displayNon');
								}

								$('[data-type="category"]').each(function () {
									if ($(this).find('[data-type="question"]').length == $(this).find('.displayNon').length){
										$(this).addClass('displayNon');
									}
									else 
									{
										$(this).removeClass('displayNon');
									}
									
									//
									if($(this).css('display') == "list-item"  ||  $(this).css('display') == "block"){
										$(this).addClass('active');
									}
									else{
										$(this).removeClass('active');
									}
								});
								
							}
							/*else if(filter.length < 1 || filter.length == 1){
								$('.zaccord-wrap > ul.zaccord > li').addClass('active').addClass('displayNon');
								$('.zaccord-wrap .questions > li').addClass('active').addClass('displayNon');
							}
							else{
								$('.zaccord-wrap > ul.zaccord > li').removeClass('active').removeClass('displayNon');
								$('.zaccord-wrap .questions > li').removeClass('active').removeClass('displayNon');
							}*/
							
						//}

					});
				
				
                
				
				
				// Reset on no Text
				if($('#filter').val() == ""){
					//$(".zaccord-wrap .questions > li").removeClass('active').removeClass('displayNon');
					//$(".zaccord-wrap > ul.zaccord > li").show();
					$('.zaccord-wrap > ul.zaccord > li').removeClass('active').removeClass('displayNon');
					$('.zaccord-wrap .questions > li').removeClass('active').removeClass('displayNon');
				}

				

			});//filter

			// Reset on click Clear
			$(document).on('click','.clearable.onX',function(){
				$('.zaccord-wrap > ul.zaccord > li').removeClass('active').removeClass('displayNon');
				$('.zaccord-wrap .questions > li').removeClass('active').removeClass('displayNon');
			});
			

		}
	}
}(); // end filter

$(document).ready(function(){

		// Filter
		Filter.init();

		
		
}); // document ready


// CLEAR TEXT
function tog(v){
    return v?'addClass':'removeClass';
} 

$(document).on('input', '.clearable', function() {
    $(this)[tog(this.value)]('x');
}).on('mousemove', '.x', function(e) {
    $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');   
}).on('click', '.onX', function(){
    $(this).removeClass('x onX').val('').change();
});




