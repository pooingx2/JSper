<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>Insert title here</title>
	</head>
	<body>
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
</html>

