package com.od.backend.Security.Service;


import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class CookieService {

    public Cookie getCookie(String name,String value){
        if(name==null||value==null)
            throw new IllegalArgumentException();

        Cookie cookie=new Cookie(name,value);
        cookie.setHttpOnly(true);
        return cookie;
    }

    public boolean addCookie(HttpServletResponse httpServletResponse,String name,String value) throws Exception{
        if(httpServletResponse==null)
            throw new IllegalArgumentException();

        Cookie cookie=getCookie(name,value);

        httpServletResponse.addCookie(cookie);

        return true;
    }

    public Optional<Cookie> searchCookie(Stream<Cookie> cookieStream){
        return cookieStream.filter(cookie->cookie.getName().equals("accessToken")).findAny();
    }

}
