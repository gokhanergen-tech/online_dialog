package com.od.backend.Usecases.Api.Util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public abstract class CryptoMessage {
    public static byte[] cryptoWithSha256(String value) throws NoSuchAlgorithmException {
        MessageDigest messageDigest=MessageDigest.getInstance("SHA-256");
        byte[] bytes=messageDigest.digest((value).getBytes(StandardCharsets.UTF_8));
        return bytes;
    }

    public static String bytesToHexString(byte[] bytes){
        StringBuffer stringBuffer=new StringBuffer();
        for (byte num:bytes){
            stringBuffer.append(Integer.toHexString(num&0xff));
        }
        return stringBuffer.toString();
    }

}
