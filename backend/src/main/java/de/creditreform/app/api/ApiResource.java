package de.creditreform.app.api;

import de.creditreform.app.model.Game;
import de.creditreform.app.repository.AuthorityRepository;
import de.creditreform.app.model.User;
import de.creditreform.app.repository.GameRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.ws.rs.*;
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
@CrossOrigin
public class ApiResource implements InitializingBean {

    @Autowired
    AuthorityRepository repo;


    @Autowired
    GameRepository games;

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
    public Response login(@FormParam("username") String user, @FormParam("password") String pwd) {
        Optional<User> r = repo.findOneByUsername(user);
        if (r.isPresent() && Objects.equals(r.get().getPassword(), pwd)) {
            r.get().setToken("fake-jwt-token");
            return Response.ok(r.get()).build();
        }

        return Response.status(Response.Status.UNAUTHORIZED.getStatusCode(),"Wrong username or password").build();
    }

    @GET
    @Path("/games")
    public Response games() {
        List<Game> ret = games.findAll();
        return Response.ok(ret).build();
    }


    @Override
    public void afterPropertiesSet() throws Exception {

    }
}
