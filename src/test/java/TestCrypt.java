import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.mockito.Mockito;
import org.postgresql.shaded.com.ongres.scram.common.bouncycastle.base64.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.SecureRandom;

public class TestCrypt {



    @Test
    public void run(){
        PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
        String salt=Base64.toBase64String(SecureRandom.getSeed(32));
        String encoded=passwordEncoder.encode("fsdf"+salt);

        Assertions.assertTrue(passwordEncoder.matches("fsdf"+salt,encoded));
    }

}
