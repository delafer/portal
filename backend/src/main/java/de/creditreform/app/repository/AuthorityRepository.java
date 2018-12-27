package de.creditreform.app.repository;

import de.creditreform.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface AuthorityRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByUsername(@Param("username") String username);

}
