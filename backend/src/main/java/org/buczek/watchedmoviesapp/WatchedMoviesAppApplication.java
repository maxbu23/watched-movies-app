package org.buczek.watchedmoviesapp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.buczek.watchedmoviesapp.model.Movie;
import org.buczek.watchedmoviesapp.model.Person;
import org.buczek.watchedmoviesapp.repository.MovieRepository;
import org.buczek.watchedmoviesapp.repository.PersonRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Optional;

@SpringBootApplication
@RequiredArgsConstructor
@Slf4j
public class WatchedMoviesAppApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(WatchedMoviesAppApplication.class, args);
    }

    private final PersonRepository personRepository;
    private final MovieRepository movieRepository;

    @Override
    public void run(String... args) throws Exception {
//        movieRepository.deleteAll();
//        personRepository.deleteAll();
//        Person person = Person.builder()
//                .firstname("Jan")
//                .lastname("Kowalski")
//                .build();
//
//        personRepository.save(person);

//        Person personById = personRepository.findById(0L).get();
//        log.info("Person: {}", personById);

//        Optional<Person> personById = personRepository.getPersonById(0L);
//        log.info("Person by id: {}", personById.get());

//        List<Person> all = personRepository.findAll();
//        log.info("All persons: {}", all);
    }
}
