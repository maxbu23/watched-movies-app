package org.buczek.watchedmoviesapp.repository;

import org.buczek.watchedmoviesapp.model.Movie;
import org.buczek.watchedmoviesapp.model.Person;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface PersonRepository extends Neo4jRepository<Person, Long> {

//    @Query("MATCH (u:USER)-[r:WATCHED]->(m:MOVIE) return u")
    @Query("MATCH (p:Person) return p")
    Collection<Person> getAllUsers();

    @Query("MATCH (p:Person) WHERE ID(p) = $id RETURN p")
    Optional<Person> getPersonById(@Param("id") Long id);

    @Query("MATCH (p:Person) - [WATCHED] -> (m:Movie) WHERE ID(m) = $movieId RETURN p")
    Collection<Person> getPeopleByMovieId(@Param("movieId") Long movieId);

    @Query("MATCH (p: Person), (m: Movie) WHERE ID(m) = $movieId AND ID(p) = $userId CREATE (p) - [:WATCHED] -> (m)")
    void assignMovieToUser(@Param("userId") Long userId, @Param("movieId") Long movieId);

    @Query("MATCH (p:Person) - [r:WATCHED] -> (m:Movie) WHERE ID(m) = $movieId AND ID(p) = $userId DELETE r")
    void deleteAssignmentMovieToUser(@Param("userId") Long userId, @Param("movieId") Long movieId);
}
