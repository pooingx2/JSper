<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.util.*"  import="java.sql.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<script type="text/javascript">

	</script>
</head>
<body>
	${test}
 	<form method="POST">
 		<div class="control-group">
 			<textarea rows="100" placeholder="content" name="param"></textarea>
		</div>
		<div>
			<button type="submit">저장</button>
 		</div>
	</form>
	${fList.get(0).name }
</body>
</html>