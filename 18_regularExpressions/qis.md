# 아이디
```java
@NotBlank
@Pattern(regexp = "^[a-z0-9_-]{4,20}$", message = "uid rule violation")
```

# 패스워드
```java
@NotBlank
@Pattern(regexp = "^(?=.*[A-Za-z$@$!%*#?&])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,20}$", message = "upassword rule violation")
```

# 이름/닉네임
```java
@NotBlank
@Size(min=2, max=20)
```

# 휴대폰번호
```java
@NotBlank
@Pattern(regexp = "^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$", message = "phoneNumber rule violation")

```

# 기타문자열(String.trim())
```java
@NotBlank
```