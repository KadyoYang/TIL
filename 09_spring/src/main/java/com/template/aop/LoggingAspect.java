package com.template.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
public class LoggingAspect {
    
    // example execution("반환타입 클래스.메소드(인수)")
    // 인수 아무거나 가능하고 메서드는 * 그 클래스는 Service가 뒤에 붙어야한다
    @Pointcut(value = "execution(sample.spring.chapter11.vbankapp.service.*Service.*(..))")
    private void invokeServiceMethods(){}
    // 메소드 아규먼트를 어드바이스에게 전달하고싶으면 
    // *(..)) && args(fiexdDepositDTO)
    // invokeServiceMethods(fixedDepositDTO dto)

    // value = "invokeServiceMethods(dto)"
    // log(JointPoint jointPoint, FixedDepositDTO dto)
    @Before(value = "invokeServiceMethods()")
    public void log(JoinPoint joinPoint){

    }


    // 빈 포인트컷 지정자 
    // @PointCut(value = "bean(someBean)")

    // 애너테이션 기반 포인트컷 
    // 이렇게도 가능할듯 @Around("@annotation(somehing) && "+ "args(aDTO)")
    // jointPoint, ADTO aDTO) ...
    @Around("@annotation(LogExecutionTime)")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        StopWatch stopWatch = new StopWatch();

        stopWatch.start();
        Object ret = joinPoint.proceed();
        stopWatch.stop();
        return ret;
    }


    // 어드바이스 유형 
    // before, after, after returning, after throwing, around


}
