package de.creditreform.app.repository;

import de.creditreform.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface AuthorityRepository extends JpaRepository<User, Long> {
}
