<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width", initial-scale="1">
<title>signup</title>
</head>
<body>
<h1>signup</h1>
<p>this is signup page</p>
<ul>
	<li><a href="/home">go to HOME page</a></li>
	
	<li><a href="/login">go to LOGIN page</a></li>
	<li><a href="/signup">go to SIGNUP page</a></li>
	
	<li><a href="/welcome">go to WELCOME page</a></li>
	<li><a href="/admin">go to ADMIN page</a></li>
</ul>

<div>
<form method="post" action="/signup/proc">
    <div id="login-box">
      <h1>Sign up</h1>
      <input type="text" name="email" placeholder="E-mail" />
      <input type="password" name="pw" maxlength="15" min="8" placeholder="Password" />

      <span>
            <button type="submit">Sign up</button>
      </span>
    </div>
  </form>
</div>

</body>
</html>