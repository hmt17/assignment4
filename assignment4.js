//Hannah Tarzian
(function() {
  // Magic!
  console.log('Keepin\'n it clean with an external script!');
	var global_input = $(".flexsearch-input").after("<ul class='flexsearch-results'></ul>");
 	// results/messages container
 	var glob_output = $(".flexsearch-results");
 	
 	// empty array
 	var words = [];
 
 	//parse words
 	$.when(
 		$.getJSON( 'http://www.mattbowytz.com/simple_api.json?data=programming', function(response){
 			$.each( response, function(key, val) {
 				console.log(val);
 				if(val !== 10 && val !== 200 && val.length > 2){
 					words =  words.concat(val);
 				}
 			});
 		}),
 
 		$.getJSON( 'http://www.mattbowytz.com/simple_api.json?data=interests', function(response){
 			$.each( response, function(key, val) {
 				if(val !== 9 && val !== 200 && val.length > 2){
 					words =  words.concat(val);
 				}
 			});
 		})
  
 	).then(function() {
 		//clear and show all results
 		for(var i = 0; i < words.length; i++) {
 			glob_output.append("<li class='flexsearch-result'>" + words[i] + "</li>");
 		}
 
 		// autocomplete
 		global_input.on("keyup", function(event){
 
 			var input = global_input.val().toLowerCase();
 			var output = [];
 
 			for(var i  = 0; i < words.length; i++) {
 				// if substring is part of word, print
 				var tmp = words[i].toLowerCase();
 				
 				if(tmp.includes(input)) {
 					output.push(words[i]);
 				}
 			}
 
 			//clear results
 			glob_output.html("");
 			
			//show output
 			if(output.length) {
 				for(i = 0; i < output.length; i++) {
 					glob_output.append("<li class='flexsearch-result'>" + output[i] + "</a></li>");
 				}
 			}
 		});
 	});
  
})();
