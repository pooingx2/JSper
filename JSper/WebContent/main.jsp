<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="CSS/ace_and_raphael.css" type="text/css" media="screen" />
<link rel="stylesheet" href="CSS/layout-default.css" type="text/css" media="screen" />
<link rel="stylesheet" href="CSS/layout.css" type="text/css" media="screen" />
</head>
<body id="allpage">
	<div class="outer-center">
		<div id="holder"></div>
	</div>

	<div class="outer-west">
		<div id="editor">
<<<<<<< HEAD
function foo(items) { 
	var x = "All this is syntax highlighted"; 
	return x; 
}</div>
		<button id="sendForm">변환하기</button>

	</div>

	<div class="ui-layout-north"></div>
	<div class="ui-layout-south">JSPer</div>
=======
			function foo(items) {
				var x = "All this is syntax highlighted"; 
				return x;
			}
		</div>
	</div>
	<div id="right_draw_section">
		<div id="holder"></div>
	</div>






	------------ test ------------
	<br /> 
	${fList.get(0).name} ${fList.get(0).depth}
	${fList.get(0).parent} ${fList.get(0).comment}
	<br />
	<br />

	<c:forEach var="function" items="${fList}">
			name : ${ function.name } <br />
			depth : ${ function.depth }  <br />
			parent : ${ function.parent } <br />
			comment : ${ function.comment } <br />
		<br />
	</c:forEach>
	
	<button id="sendForm">변환하기</button>
>>>>>>> tt
</body>


<script src="JS/jquery.js"></script>
<<<<<<< HEAD
<script
	src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js"
	type="text/javascript" charset="utf-8"></script>
<script src="JS/ace_controll.js" type="text/javascript"></script>
<script src="http://code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
<script src="JS/raphael-min.js"></script>
<script>
	var gender = [];
</script>

<c:set var="i" value="0" />
<c:forEach var="function" items="${fList}">
	<c:if test="${i < fList.size()}">
		<script type="text/javascript">
        gender.push(["<c:out value="${fList.get(i).depth}"/>","<c:out value="${fList.get(i).name}"/>","<c:out value="${fList.get(i).parent}"/>","<c:out value="${fList.get(i).comment}"/>",[0,0]]);
        </script>
	</c:if>
	<c:set var="i" value="${i + 1}" />
</c:forEach>
<script src="JS/graffle.js"></script>
<script src="JS/bootstrap.min.js"></script>
<script src="JS/post_value.js"></script>
<script type="text/javascript" src="JS/jquery-latest.js"></script>
<script type="text/javascript" src="JS/jquery-ui-latest.js"></script>
<script type="text/javascript" src="JS/jquery.layout-latest.js"></script>

<script type="text/javascript">

	$(document).ready(function () {

		// OUTER-LAYOUT
		$('body').layout({
			center__paneSelector:	".outer-center"
		,	west__paneSelector:		".outer-west"
		//,	east__paneSelector:		".outer-east"
		,	west__size:				300
		//,	east__size:				125
		,	north__size:			80
		,	south__size:			30
		,	spacing_open:			8  // ALL panes
		//,   south__spacing_open:	5
		,	spacing_closed:			12 // ALL panes
		,	north__maxSize:			200
		//,	south__maxSize:			200
		});

	});

	</script>
=======
<script src="http://code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
<script src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="JS/ace.js" type="text/javascript"></script>
<script src="JS/raphael-min.js"></script>
<script src="JS/graffle.js"></script>
<script>
	
	$("#sendForm").click(function userViewSub(){
		  
		  var k = editor.getSession().getValue();
		  
		  $.ajax({   
			   type: "POST",  
			   url: "main",   
			   data: "param="+k,
			   success: function() {
				   console.log('success');
			   },
			   error:function() {
				   console.log('error');
			   }
		  });
	});
	
</script>
>>>>>>> tt
</html>

