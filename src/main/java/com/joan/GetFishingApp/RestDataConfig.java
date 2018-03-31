package com.joan.GetFishingApp;

import com.joan.GetFishingApp.model.Lure;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class RestDataConfig extends RepositoryRestConfigurerAdapter{
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Lure.class);
    }
}
