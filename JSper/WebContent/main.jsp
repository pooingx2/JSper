<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<!-- ace -->
<link type="text/css" rel="stylesheet" href="CSS/twilight.css">
<link rel="stylesheet" href="CSS/layout-default.css" type="text/css" media="screen" />
<link rel="stylesheet" href="CSS/layout.css" type="text/css" media="screen" />
<!-- jquert.layout -->
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
	,	west__size:				350
	//,	east__size:				125
	,	north__size:			80
	,	south__size:			30
	,	spacing_open:			8  // ALL panes
	,   south__spacing_open:	5
	,	spacing_closed:			12 // ALL panes
	,	north__maxSize:			200
	//,	south__maxSize:			200
	});

});

</script>

</head>
<body id="allpage">
	<div class="outer-center">
 		<div id="holder"></div> 
	</div>

	<div class="outer-west">
	<div class="textCode">TEST></div>
		<div id="editor">
function foo(items) { 
	function test(){};
	function test1(){
		function test2(){};
	};
	var x = "All this is syntax highlighted"; 
	var k = 0;
}
		</div>
</div>
<!-- <div class="outer-east">Outer East</div> -->

<!-- <div class="ui-layout-north">Outer North</div> -->
<div class="ui-layout-south">
	<button id="sendForm">변환하기</button>
</div>
</body>


<!-- ace -->

<script type="text/javascript" src="JS/ace/ace.js" charset="utf-8"></script>
<script type="text/javascript" src="JS/ace/ace-controll.js" charset="utf-8"></script>
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

<script src="JS/raphael-min.js"></script>
<script src="JS/graffle.js"></script>
<script type="text/javascript">
	$("#sendForm").click(function userViewSub(){
		  var k = editor.getValue();
		  $.ajax({   
			   type: "POST",  
			   url: "main",   
			   data: "param="+k,   //&a=xxx 식으로 나옴
			   success: function(value) {
				   console.log('success');
				   $("#allpage").html(value);
				   editor.setValue(k);
			   },
			   error:function() {
				   console.log('error');
			   }
		  });
	});
</script>
</html>
