package de.creditreform.app.repository;

import de.creditreform.app.model.Game;
import de.creditreform.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface GameRepository extends JpaRepository<Game, Long> {

    Optional<Game> findOneByName(@Param("name") String name);

}
