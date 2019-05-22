package de.creditreform.app.appsensor.response;

import java.util.Optional;

import javax.inject.Named;

import org.owasp.appsensor.core.response.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;

import de.creditreform.app.model.User;
import de.creditreform.app.repository.AuthorityRepository;

@Named
@Primary
public class PortalUserManager implements UserManager {
	
	@Autowired
    AuthorityRepository repo;

	/**
	 * Logout user
	 */
	public void logout(org.owasp.appsensor.core.User user) {
		Optional<User> r = repo.findOneByUsername(user.getUsername());
		if (r.isPresent()) {
			// TODO implement Logout method
			r.get().setToken(null);
		}
	}

	/**
	 * Remove all roles to disable access
	 */
	public void disable(org.owasp.appsensor.core.User user) {
		Optional<User> r = repo.findOneByUsername(user.getUsername());
		if (r.isPresent()) {
			r.get().setRoles("");
		}
		
	}

}
