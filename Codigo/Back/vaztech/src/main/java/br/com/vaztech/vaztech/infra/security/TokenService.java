package br.com.vaztech.vaztech.infra.security;

import br.com.vaztech.vaztech.entity.Usuario;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
  @Value("${api.security.token.secret}")
  private String segredo;

  public String generateToken(Usuario usuario) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(segredo);

      String token = JWT.create()
          .withIssuer("vaztech")
          .withSubject(usuario.getId().toString())
          .withExpiresAt(this.generateExpirationDate())
          .sign(algorithm);
      return token;
    } catch (JWTCreationException exception) {
      throw new RuntimeException("Erro enquanto autenticar token");
    }
  }

  public String validateToken(String token) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(segredo);
      return JWT.require(algorithm)
          .withIssuer("vaztech")
          .build()
          .verify(token)
          .getSubject();
    } catch (JWTVerificationException exception) {
      return null;
    }
  }

  private Instant generateExpirationDate() {
    return LocalDateTime.now().plusHours(9).toInstant(ZoneOffset.of("-03:00"));
  }
}
