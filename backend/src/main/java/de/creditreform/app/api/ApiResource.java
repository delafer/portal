package de.creditreform.app.api;

import de.creditreform.app.repository.AuthorityRepository;
import de.creditreform.app.model.User;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.util.List;

@XmlAccessorType(XmlAccessType.NONE)
@Path("")
@Service
@Produces("application/json")
public class ApiResource implements InitializingBean {

    @Autowired
    AuthorityRepository repo;

    @GET
    @Path("/test")
    public String test() {
        return "Hello world!";
    }

    @GET
    @Path("/users")
    public Response users() {
        List<User> users = repo.findAll();
        return Response.ok(users).build();
    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}
