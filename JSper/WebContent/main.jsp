<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Insert title here</title>
		<link rel="stylesheet" href="test.css" type="text/css" media="screen" />
		<style type="text/css" media="screen">
			#holder {
				-moz-border-radius: 10px;
				-webkit-border-radius: 10px;
				position: relative;
				top: -5%;
				width: 100%;
				height: 100%;
			}
			
			p {
				text-align: center;
			}
		</style>
		<style type="text/css" media="screen">
			#editor {
				position: relative;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				width: 100%;
				height : 80%;
				font-size : 11px;
			}
			
			#left_text_section {
				display: block;
				width: 25%;
				height: 100%;
				float: left;
			}
			
			#right_draw_section {
				display: block;
				width: 75%;
				height: 100%;
				float: left;
			}
		</style>
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

		------------ test ------------ <br/>
		${fList.get(0).name}
		${fList.get(0).depth}
		${fList.get(0).parent}
		${fList.get(0).comment} <br/><br/>
		
		<c:forEach var="function" items="${fList}">
			name : ${ function.name } <br/>
			depth : ${ function.depth }  <br/>
			parent : ${ function.parent } <br/>
			comment : ${ function.comment } <br/> <br/>
		</c:forEach>
	</body>

	<script src="jquery.js"></script>
	<script
		src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js"
		type="text/javascript" charset="utf-8"></script>
	<script>
		var editor = ace.edit("editor");
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode("ace/mode/javascript");
	</script>
	<script src="http://code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
	<script src="raphael-min.js"></script>
	<script src="graffle.js"></script>
	<script src="bootstrap.min.js"></script>
</html>

