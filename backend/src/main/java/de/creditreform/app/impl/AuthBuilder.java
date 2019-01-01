package de.creditreform.app.impl;

import de.creditreform.app.model.User;
import de.creditreform.app.model.jwt.JwtError;
import de.creditreform.app.model.jwt.JwtResponse;
import org.springframework.context.annotation.Bean;

public interface AuthBuilder {
    JwtResponse onSuccess(User data) throws Exception;

    JwtError onError(String err, String desc);

    JwtError onNotAuthorized();
}
