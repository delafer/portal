package de.creditreform.app.config;

import de.creditreform.app.api.ApiResource;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletProperties;
import org.springframework.context.annotation.Configuration;

import javax.ws.rs.ApplicationPath;

@Configuration
@ApplicationPath("/api")
public class JaxRsJerseyConfig extends ResourceConfig {
    public JaxRsJerseyConfig() {
        super();
        registerEndpoints();
    }

    private void registerEndpoints() {

        register(ApiResource.class);
       // property(ServletProperties.FILTER_FORWARD_ON_404, true);


    }

//    @Autowired
//    public JaxRsJerseyConfig(ObjectMapper objectMapper) {
//        // register jackson for json
//        register(new ObjectMapperContextResolver(objectMapper));
//    }
//
//    @Provider
//    public static class ObjectMapperContextResolver implements ContextResolver<ObjectMapper> {
//
//        private final ObjectMapper mapper;
//
//        public ObjectMapperContextResolver(ObjectMapper mapper) {
//            this.mapper = mapper;
//        }
//
//        @Override
//        public ObjectMapper getContext(Class<?> type) {
//            return mapper;
//        }
//    }
}
