package de.creditreform.app.appsensor.response;

import java.util.Optional;

import javax.inject.Named;

import org.owasp.appsensor.core.Response;
import org.owasp.appsensor.core.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;

import de.creditreform.app.model.User;
import de.creditreform.app.repository.AuthorityRepository;

@Named
@Primary
public class PortalResponseHandler implements ResponseHandler {

	@Autowired
    AuthorityRepository repo;

	/**
	 * {@inheritDoc}
	 */
	public void handle(Response response) {
		if (response.getAction().equals(DISABLE_COMPONENT_FOR_SPECIFIC_USER)) { 
			Optional<User> r = repo.findOneByUsername(response.getUser().getUsername());
			if (r.isPresent()) {
				String newRoles = r.get().getRoles().replace("view-profile", "");
				r.get().setRoles(newRoles);
			}
		} else if (response.getAction().equals(LOG)) { 
			// TODO implement a log
		}
	}

}
