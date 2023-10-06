package com.doacha.seesawbank.exception;

public class NoContentException extends RuntimeException{
    public NoContentException(String content){
        super("존재하지 않는 "+content+"입니다.");
    }
}

