	$("#sendForm").click(function userViewSub(){
		  var k = editor.getSession().getValue();
		  $.ajax({   
			   type: "POST",  
			   url: "main",   
			   data: "param="+k,   //&a=xxx ������ ����
			   success: function() {
				   console.log('success');
			   },
			   error:function() {
				   console.log('error');
			   }
		  });
	});
