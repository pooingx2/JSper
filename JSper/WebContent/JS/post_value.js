	$("#sendForm").click(function userViewSub(){
		  var k = "function foo(items) { 	var x = 3; return x; }";
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
