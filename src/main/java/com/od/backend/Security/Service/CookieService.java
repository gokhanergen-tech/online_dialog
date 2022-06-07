package com.od.backend.Security.Service;


import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class CookieService {

    public Cookie getCookie(String name,String value,Integer maxAge){
        if(name==null||value==null||maxAge==null)
            throw new IllegalArgumentException();

        Cookie cookie=new Cookie(name,value);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);
        cookie.setPath("/");


        return cookie;
    }

    public boolean addCookie(HttpServletResponse httpServletResponse,String name,String value,Integer maxAge) throws Exception{
        if(httpServletResponse==null)
            throw new IllegalArgumentException();

        Cookie cookie=getCookie(name,value,maxAge);

        httpServletResponse.addCookie(cookie);

        return true;
    }

    public Optional<Cookie> searchCookie(Stream<Cookie> cookieStream,String name){
        return cookieStream.filter(cookie->cookie.getName().equals(name)).findAny();
    }

}
