package de.creditreform.app.api;

import de.creditreform.app.impl.AuthBuilder;
import de.creditreform.app.model.Context;
import de.creditreform.app.model.Game;
import de.creditreform.app.model.jwt.JwtResponse;
import de.creditreform.app.repository.AuthorityRepository;
import de.creditreform.app.model.User;
import de.creditreform.app.repository.ContextRepository;
import de.creditreform.app.repository.GameRepository;

import org.owasp.appsensor.core.AppSensorServer;
import org.owasp.appsensor.core.DetectionPoint;
import org.owasp.appsensor.core.DetectionSystem;
import org.owasp.appsensor.core.Event;
import org.owasp.appsensor.core.configuration.client.ClientConfiguration;
import org.owasp.appsensor.core.event.EventManager;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
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
import org.springframework.context.annotation.FilterType;

@XmlAccessorType(XmlAccessType.NONE)
@Path("")
@Service
@Produces("application/json")
@CrossOrigin
@Configuration
@EnableAutoConfiguration
@ComponentScan(value="org.owasp.appsensor", excludeFilters = @ComponentScan.Filter(value = AppSensorServer.class, type = FilterType.ASSIGNABLE_TYPE))
public class ApiResource implements InitializingBean {

    @Autowired
    AuthorityRepository repo;

    @Autowired
    GameRepository games;

    @Autowired
    AuthBuilder authJWT;

    @Autowired
    ContextRepository ctx;
    
    private DetectionSystem detectionSystem = new DetectionSystem("myclientapp");
	
	@Autowired
	EventManager eventManager;
	
	@Autowired
	ClientConfiguration configuration;

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

    @GET
    @Path("/context/all")
    public Response allUsersContext() {
        List<Context> users = ctx.findAll();
        return Response.ok(users).build();
    }

    @GET
    @Path("/context")
    public Response usersContext(@QueryParam("name") String name) {
        Optional<Context> ret = ctx.findOneByUsername(name);
        if (!ret.isPresent()) {
            Context newCtx = new Context();
            newCtx.setUsername(name);
            ctx.saveAndFlush(newCtx);
            return Response.ok(newCtx).build();
            //return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(ret.get()).build();
    }

    @POST
    @Path("/context")
    public Response updateContext(Context ctxObj) {
        Optional<Context> ret = ctx.findOneByUsername(ctxObj.getUsername());

        if (!ret.isPresent()) {
            ctx.saveAndFlush(ctxObj);
            return Response.status(Response.Status.CREATED).build();
        } else {
            Context res = ret.get();
            res.setText(ctxObj.getText());
            ctx.save(res);
            return Response.ok(Response.Status.OK).build();
        }
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
                // TODO check for SE1 Modifying Existing Cookie 
                DetectionPoint se1 = new DetectionPoint(DetectionPoint.Category.SESSION_MANAGEMENT, "SE1");
                signalAppSensor(user, se1);
            }
        }
        
        this.signalAuthentication(user);
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
        	// ACE1 Modifying URL Argument Within a GET for Direct Object Access Attempt
        	DetectionPoint ace1 = new DetectionPoint(DetectionPoint.Category.ACCESS_CONTROL, "ACE1");
        	signalAppSensor(null, ace1);
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

	private void signalAuthentication(String userName) {
		// 8 in 50 seconds (1 every 6.25 seconds is an attack)
		DetectionPoint ae4 = new DetectionPoint(DetectionPoint.Category.AUTHENTICATION, "AE4");
		org.owasp.appsensor.core.User loginUser = new org.owasp.appsensor.core.User(userName);
		Event event = new Event(loginUser, ae4, detectionSystem);
		eventManager.addEvent(event);
	}
	
	private void signalAppSensor(String userName, DetectionPoint dp) {
		org.owasp.appsensor.core.User loginUser = new org.owasp.appsensor.core.User(userName);
		Event event = new Event(loginUser, dp, detectionSystem);
		eventManager.addEvent(event);
	}
	

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}
