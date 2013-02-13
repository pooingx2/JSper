	$("#sendForm").click(function userViewSub(){
		  var k = editor.getSession().getValue();
		  $.ajax({   
			   type: "POST",  
			   url: "main",   
			   data: "param="+k,   //&a=xxx ½ÄÀ¸·Î ³ª¿È
			   success: function() {
				   console.log('success');
			   },
			   error:function() {
				   console.log('error');
			   }
		  });
	});
