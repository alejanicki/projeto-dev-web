package com.devweb.project.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

@Service
public class JwtAuthService {

    // Chave secreta para assinar e verificar o token
    private final Key secretKey = Jwts.SIG.HS256.key().build();

    // Método para gerar um token JWT
    public String generateToken(String email, String password) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);

        // Defina a data de expiração do token (por exemplo, 1 hora)
        Date expirationDate = new Date(System.currentTimeMillis() + 3600000); // 1 hora em milissegundos

        return Jwts.builder()
                .claims(claims)
                .subject(email)
                .expiration(expirationDate)
                .signWith(secretKey)
                .compact();
    }

    // Método para verificar e extrair informações do token JWT
    public Claims verifyToken(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}