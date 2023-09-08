package com.doacha.seesaw.exception;

public class NoContentException extends RuntimeException{
    public NoContentException(){
        super("존재하지 않는 컨텐츠 입니다.");
    }
}

