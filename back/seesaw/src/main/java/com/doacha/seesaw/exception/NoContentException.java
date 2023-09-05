package com.doacha.seesaw.exception;

public class NoContentException extends RuntimeException{
    public NoContentException(){
        super("존재하지 않는 그룹입니다.");
    }
}

