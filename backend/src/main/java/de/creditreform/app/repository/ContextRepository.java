package de.creditreform.app.repository;

import de.creditreform.app.model.Context;
import de.creditreform.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface ContextRepository extends JpaRepository<Context, Long> {

    Optional<Context> findOneByUsername(@Param("username") String username);

}
