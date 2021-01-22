package com.project.myFinances.security.jwt;

import com.project.myFinances.models.entities.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class JwtService {

    private long expiration = 30;
    private String subsKey = "_my_finances_user_";

    public String generateToken(UserEntity user) {
        LocalDateTime timeExpiration = LocalDateTime.now().plusMinutes(expiration);
        Date date = Date.from(timeExpiration.atZone(ZoneId.systemDefault()).toInstant());
        return Jwts
                    .builder()
                    .setSubject(user.getEmail())
                    .setExpiration(date)
                    .signWith(SignatureAlgorithm.HS512, subsKey)
                    .compact();
    }

    private Claims getClaims(String token) throws ExpiredJwtException {
        return Jwts
                    .parser()
                    .setSigningKey(subsKey)
                    .parseClaimsJws(token)
                    .getBody();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = getClaims(token);
            Date date = claims.getExpiration();
            LocalDateTime timeExpiration = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            return !LocalDateTime.now().isAfter(timeExpiration);
        }catch(Exception e) {
            return false;
        }
    }

    public String getUserLogged(String token) throws ExpiredJwtException {
        return (String) getClaims(token).getSubject();
    }
}
