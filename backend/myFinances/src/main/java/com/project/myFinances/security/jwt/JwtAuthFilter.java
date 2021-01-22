package com.project.myFinances.security.jwt;

import com.project.myFinances.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthFilter extends OncePerRequestFilter {

    private JwtService jwtService;

    private UserService userService;

    public JwtAuthFilter( JwtService jwtService, UserService userService ) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse,
            FilterChain filterChain) throws ServletException, IOException {

        String auth = httpServletRequest.getHeader("Authorization");

        if (auth != null) {
            boolean isValid = jwtService.validateToken(auth);

            if (isValid) {
                String user = jwtService.getUserLogged(auth);
                UserDetails userLogged = userService.loadUserByUsername(user);

                UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(
                        userLogged,null,userLogged.getAuthorities());

                userToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));

                SecurityContextHolder.getContext().setAuthentication(userToken);
            }
        }

        filterChain.doFilter(httpServletRequest,httpServletResponse);
    }
}
