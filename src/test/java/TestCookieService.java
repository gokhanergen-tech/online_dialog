import com.od.backend.Security.Service.CookieService;
import org.junit.Test;

import javax.servlet.http.Cookie;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Stream;
import static org.junit.jupiter.api.Assertions.*;

public class TestCookieService {

    public Stream<Cookie> getCookieStream(){
        return Arrays.stream(new Cookie[]{
                new Cookie("accessToken","a"),
                new Cookie("secure","b"),
                new Cookie("secure_1","c")
        });
    }

    @Test
    public void testCookieSearch(){
        CookieService cookieService=new CookieService();
        Stream<Cookie> cookieStream=getCookieStream();
        Optional<Cookie> cookieOptional=cookieService.searchCookie(cookieStream,"accessToken");
        Cookie cookie=cookieOptional.orElse(new Cookie("notfound","notfound"));

        assertEquals("accessToken",cookie.getName());

    }

}
