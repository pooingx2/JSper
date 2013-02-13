<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="CSS/ace_and_raphael.css" type="text/css" media="screen" />
</head>
<body id="allpage">
	<div id="left_text_section">
		<div id="editor">
function foo(items) { 
	var x = "All this is syntax highlighted"; 
	return x; 
}
		</div>
	</div>
	<div id="right_draw_section">
		<div id="holder"></div>
	</div>
	<button id="sendForm">변환하기</button>
</body>

<script src="JS/jquery.js"></script>
<script src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="JS/ace_controll.js" type="text/javascript"></script>
<script src="http://code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
<script src="JS/raphael-min.js"></script>
<script>
	var gender = [];
</script>

<c:set var="i" value="0" />
<c:forEach var="function" items="${fList}" >
    <c:if test="${i < fList.size()}">
        <script type="text/javascript">
        gender.push(["<c:out value="${fList.get(i).depth}"/>","<c:out value="${fList.get(i).name}"/>","<c:out value="${fList.get(i).parent}"/>","<c:out value="${fList.get(i).comment}"/>",[0,0]]);
        </script>
    </c:if> 
    <c:set var="i" value="${i + 1}" />
</c:forEach>


<script src="JS/graffle.js"></script>
<script src="JS/bootstrap.min.js"></script>
<script>
	$("#sendForm").click(function userViewSub(){
		  var k = editor.getSession().getValue();
		  $.ajax({   
			   type: "POST",  
			   url: "main",   
			   data: "param="+k,   //&a=xxx 식으로 나옴
			   success: function() {
				   console.log('success');
			   },
			   error:function() {
				   console.log('error');
			   }
		  });
	});
	
</script>
</html>

