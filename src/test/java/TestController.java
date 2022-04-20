import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class TestController {

    public List<String> getRooms(){
        RestTemplate template=new RestTemplate();
        ResponseEntity<List> listResponseEntity=template.getForEntity("http://localhost:8003/api/rooms", List.class);
        List<String> list=(List<String>) listResponseEntity.getBody();
        return list;
    }

    @Test
    public void testGetRooms(){
        Assertions.assertEquals(getRooms(),List.of("Hello"));
    }
}
