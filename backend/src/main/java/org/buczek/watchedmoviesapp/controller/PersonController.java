package org.buczek.watchedmoviesapp.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.buczek.watchedmoviesapp.model.Movie;
import org.buczek.watchedmoviesapp.model.Person;
import org.buczek.watchedmoviesapp.model.request.AddMovieToPersonRequest;
import org.buczek.watchedmoviesapp.repository.PersonRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@CrossOrigin("*")
@Slf4j
public class PersonController {

    private final PersonRepository personRepository;

    @GetMapping
    public Collection<Person> getAllUsers() {
        return personRepository.getAllUsers();
    }

    @GetMapping("/movies")
    public Collection<Person> getAllPeopleThatWatchedMovieByMovieId(@RequestParam("movieId") Long movieId) {
        Collection<Person> allPeople = personRepository.getPeopleByMovieId(movieId);
        log.info("Peopole that watched movie with id: {} : {}", movieId, allPeople);
        return allPeople;
    }

    @PostMapping
    public void addNewUser(@RequestBody Person person) {
        personRepository.save(person);
    }

    @DeleteMapping
    public void deleteUser(@RequestParam("userId") Long userId) {
        personRepository.deleteById(userId);
    }

    @PostMapping("/movies")
    public ResponseEntity<Void> addMovieToUserLibrary(@RequestBody AddMovieToPersonRequest request) {
        if (movieIsAlreadyAssigned(request.userId(), request.movieId())) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(409));
        }
        personRepository.assignMovieToUser(request.userId(), request.movieId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/movies")
    public void removeMovieFromUserLibrary(@RequestParam("userId") Long userId, @RequestParam("movieId") Long movieId) {
        personRepository.deleteAssignmentMovieToUser(userId, movieId);
    }

    private boolean movieIsAlreadyAssigned(Long userId, Long movieId) {

        Optional<Person> personOptional = personRepository.findById(userId);
        if (personOptional.isPresent()) {
            Movie movie = personOptional.get().getMovies().stream().filter(m -> m.getId().equals(movieId)).findFirst().orElse(null);
            if (movie == null) {
                return false;
            }
            return true;
        }
        return true;
    }

}
