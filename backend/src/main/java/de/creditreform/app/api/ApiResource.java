package de.creditreform.app.api;

import de.creditreform.app.impl.AuthBuilder;
import de.creditreform.app.impl.AuthRespBuilder;
import de.creditreform.app.model.Game;
import de.creditreform.app.model.jwt.JwtResponse;
import de.creditreform.app.repository.AuthorityRepository;
import de.creditreform.app.model.User;
import de.creditreform.app.repository.GameRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
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

    @Autowired
    AuthBuilder authJWT;

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

            return Response.ok(r.get()).build();
        }

        return Response.status(Response.Status.UNAUTHORIZED.getStatusCode(),"Wrong username or password").build();
    }

    @POST
    @Path("/users/jwt")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response loginJWT(
            @FormParam("client_id") String clientId,
            @FormParam("username") String user,
            @FormParam("password") String pwd,
            @FormParam("grant_type") String grantType,
            @FormParam("client_secret") String secret
            ) {
        Optional<User> r = repo.findOneByUsername(user);
        if (r.isPresent() && Objects.equals(r.get().getPassword(), pwd)) {
            try {
                JwtResponse resp = authJWT.onSuccess(r.get());
                return Response.ok(resp).build();
            } catch (Exception e) {
                Response.status(Response.Status.UNAUTHORIZED).entity(authJWT.onError("tech_error", e.getMessage())).build();
            }
        }

        return Response.status(Response.Status.UNAUTHORIZED.getStatusCode()).entity(authJWT.onNotAuthorized()).build();
    }


    @GET
    @Path("/games")
    public Response games() {
        List<Game> ret = games.findAll();
        return Response.ok(ret).build();
    }

    @GET
    @Path("/games/{id}")
    public Response getGame(@PathParam("id") long id) {
        Optional<Game> ret = games.findById(id);
        if (ret.isPresent()) {
            return Response.ok(ret.get()).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

    }

    @DELETE
    @Path("/games/{id}")
    public Response deleteGame(@PathParam("id") long id) {
        games.deleteById(id);
        return Response.status(Response.Status.OK).build();

    }

    @PUT
    @Path("/games")
    public Response saveGame(Game game) {
        games.save(game);
        return Response.status(Response.Status.CREATED).build();

    }



    @Override
    public void afterPropertiesSet() throws Exception {

    }
}
