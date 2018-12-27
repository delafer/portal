package de.creditreform.app.api;

import de.creditreform.app.repository.AuthorityRepository;
import de.creditreform.app.model.User;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

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

    @POST
    @Path("/users/authenticate")
    public Response login(String user, String pwd) {
        Optional<User> r = repo.findOneByUsername(user);
        if (r.isPresent() && Objects.equals(r.get().getPassword(), pwd)) {
            r.get().setToken("fake-jwt-token");
            return Response.ok(r.get()).build();
        }

        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}
