package com.template.config.cache;

import java.util.ArrayList;
import java.util.List;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.concurrent.ConcurrentMapCacheFactoryBean;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {

    // 캐시매니저
    @Bean
    public CacheManager cacheManager(){
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        List<ConcurrentMapCache> caches = new ArrayList<>();

        caches.add(fixedDepositListCache().getObject());
        caches.add(fixedDepositCache().getObject());

        cacheManager.setCaches(caches);
        return cacheManager();
    }


    // 캐시저장소
    @Bean
    public ConcurrentMapCacheFactoryBean fixedDepositListCache(){
        ConcurrentMapCacheFactoryBean fixedDepositListBean = new ConcurrentMapCacheFactoryBean();
        fixedDepositListBean.setName("fixedDepositList");
        return fixedDepositListBean;
    }

    // 캐시저장소
    @Bean
	public ConcurrentMapCacheFactoryBean fixedDepositCache() {
		ConcurrentMapCacheFactoryBean fixedDepositBean = new ConcurrentMapCacheFactoryBean();
		fixedDepositBean.setBeanName("fixedDeposit");
		return fixedDepositBean;
	}
    
}
