package com.template.job;

import java.util.concurrent.Future;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class JobExample {
    
     // @Async(value = someExecutor) taskExecutor 또는 자바5 Executor 타입
    @Async
    public void doA(){
        // do something
    }
    // 인수 받을수 있고 Future 반환해야한다
    @Async
    public Future<String> doA(int a){
        // do something
        return new AsyncResult<String>(Integer.toString(a));
    }


    // @cheduled를 설정한 메서드는 무조건 void를 반환해야하며 그 어떠한 인수도 받아서는 안됨 그리고 cron, fixedRate, fixedDelay 중 하나를 반드시 지정해야함
    @Scheduled(cron ="0 0 9-17 * * MON-FRI")
    public void testJob(){
        // 회원탈퇴 상태인 계정 전원 삭제 등의 작업
        // Quartz 스케줄러를 스프링 애플리케이션에서 사용할때 스프링에서 제공하는 통합클래스 사용하면 편함
    }

}
