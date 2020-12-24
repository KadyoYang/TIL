<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width", initial-scale="1">
<title>Admin page</title>
</head>
<body>
<h1>Admin page</h1>
<p>this is Admin page</p>
<!-- https://www.baeldung.com/spring-security-taglibs 참고 -->
<sec:authorize access="isAuthenticated()">
	<li><a href="#">회원정보수정</a></li>
	<li><a href="/logout">로그아웃</a></li>
	<li><sec:authentication property="name" />님 안녕하세요</li>
	<sec:authorize access="hasRole('ADMIN')">
		<li>ADMIN 권한입니다</li>
	</sec:authorize>
	<sec:authorize access="hasRole('USER')">
		<li>USER 권한입니다</li>
	</sec:authorize>
</sec:authorize>
<sec:authorize access="!isAuthenticated()">
	<li><a href="/login">로그인</a></li>
	<li><a href="/signup">회원가입</a></li>
</sec:authorize>
<ul>
	<li><a href="/home">go to HOME page</a></li>
	
	<li><a href="/login">go to LOGIN page</a></li>
	<li><a href="/signup">go to SIGNUP page</a></li>
	
	<li><a href="/welcome">go to WELCOME page</a></li>
	<li><a href="/admin">go to ADMIN page</a></li>
</ul>


</body>
</html>