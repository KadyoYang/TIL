package io.temp.board.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import io.temp.board.controller.exception.Ex3TestException;
import io.temp.board.controller.exception.Ex3TestRuntimeException;

@ControllerAdvice
public class Ex3ControllerAdvice extends ResponseEntityExceptionHandler{
    
    @ExceptionHandler(value = {Ex3TestException.class})
    public ResponseEntity<Object> handleSome(Exception ex, WebRequest request){
        String bodyOfResponse = "Exception handle";
        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(value = {Ex3TestRuntimeException.class})
    public ResponseEntity<Object> handleSome(RuntimeException ex, WebRequest request){
        String bodyOfResponse = "RuntimeException handle";
        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }
}
