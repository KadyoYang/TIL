<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width", initial-scale="1">
<title>signin</title>
</head>
<body>
<h1>login</h1>
<p>this is login page</p>
<ul>
	<li><a href="/home">go to HOME page</a></li>
	
	<li><a href="/login">go to LOGIN page</a></li>
	<li><a href="/signup">go to SIGNUP page</a></li>
	
	<li><a href="/welcome">go to WELCOME page</a></li>
	<li><a href="/admin">go to ADMIN page</a></li>
</ul>

<div>
<form method="post" action="/login/proc">
    <h1>Login</h1>
    <input type="text" placeholder="ID" name="userEmail"/>
    <input type="password" placeholder="PASSWORD" name="userPw"/>
    <button type="submit">login</button>
  </form>
</div>
</body>
</html>