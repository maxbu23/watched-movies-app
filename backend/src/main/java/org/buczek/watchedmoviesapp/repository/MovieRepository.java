package org.buczek.watchedmoviesapp.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.buczek.watchedmoviesapp.model.Movie;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface MovieRepository extends Neo4jRepository<Movie, Long> {

    @Query("MATCH (m:Movie) return m")
    Collection<Movie> findAllMovies();

    @Query("MATCH (p:Person) - [WATCHED] -> (m:Movie) WHERE ID(p) = $userId RETURN m")
    Collection<Movie> getAllMoviesByUserId(@Param("userId") Long userId);
}
