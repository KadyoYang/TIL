package com.template.config.security.utils;

import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import com.template.domain.SampleAccount;
import com.template.domain.types.AccountRoleType;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TokenUtils {
    private static final String secretKey = "thisistestSecretKeyforJwtExample";

    public static String generateJwtToken(SampleAccount account){
        JwtBuilder builder = Jwts.builder()
            .setSubject(account.getEmail())
            .setHeader(createHeader())
            .setClaims(createClaims(account))
            .setExpiration(createExpireDateForOneYear())
            .signWith(SignatureAlgorithm.HS256, createSigningKey());

        return builder.compact();
    }

    public static boolean isValidToken(String token){
        if(token == null) return false;
        try{
            Claims claims = getClaimsFromToken(token);
            log.info("isValidToekn()");
            log.info("expireTime : " + claims.getExpiration());
            log.info("email" + claims.get("email"));
            log.info("role" + claims.get("role"));
            return true;
        }catch(ExpiredJwtException e){
            log.error("Token Expired");
            return false;
        }catch(JwtException e){
            log.error("Token Tampered");
            return false;
        }catch(NullPointerException e){
            log.error("Token is null");
            return false;
        }
    }

    /**
     * HTTP HEADER에 있는 TOKEN을 추출
     * @param header
     * @return jwt token
     */
    public static String getTokenFromHeader(String header){
        log.info("getToekenFromHeader = " + header);
        String separatedHeader[] = header.split(" ");
        if(separatedHeader.length == 1) return null;
        else return separatedHeader[1];
    }

    public static String getUserEmailFromToken(String token){
        Claims claims = getClaimsFromToken(token);
        return (String)claims.get("email");
    }
    public static AccountRoleType getRoleFromToken(String token){
        Claims claims = getClaimsFromToken(token);
        return AccountRoleType.valueOf((String)claims.get("role"));
    }






    private static Date createExpireDateForOneYear(){
        // 토큰 만료시간 30일
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DATE, 30);
        return c.getTime();
    }

    private static Map<String, Object> createHeader(){
        Map<String, Object> header = new HashMap<String, Object>();
        header.put("type", "JWT");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    private static Map<String, Object> createClaims(SampleAccount account){
        // 공개 클레임에 사용자의 이름과 이메일을 설정하여 정보조회 가능
        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("id", account.getId());
        claims.put("nickname", account.getNickname());
        claims.put("email", account.getEmail());
        claims.put("role", account.getRoleType().name());
        return claims;
    }

    private static Key createSigningKey(){
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secretKey);
        return new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    private static Claims getClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).parseClaimsJws(token).getBody();
    }



}
