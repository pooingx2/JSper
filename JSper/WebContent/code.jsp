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

function foo(items) { 
	var x = "All this is syntax highlighted"; 
	return x; 
}
		</div>
	<button id="sendForm">변환하기</button>
	</div>
	<div class="ui-layout-north"></div>
	<div class="ui-layout-south">JSPer</div>
</body>


<script src="JS/jquery.js"></script>
<!-- 
<script
	src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js"
	type="text/javascript" charset="utf-8"></script>
<script src="JS/ace/ace.js" type="text/javascript"></script>
<script src="JS/ace_controll.js" type="text/javascript"></script>
 -->
<script src="lib/codemirror.js"></script>
<link rel="stylesheet" href="../lib/codemirror.css">
<script src="mode/javascript/javascript.js"></script>

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
<script type="text/javascript" src="JS/layout.js"></script>

</html>

