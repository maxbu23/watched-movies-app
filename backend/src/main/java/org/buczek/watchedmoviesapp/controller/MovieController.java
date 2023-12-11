package org.buczek.watchedmoviesapp.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.buczek.watchedmoviesapp.model.Movie;
import org.buczek.watchedmoviesapp.repository.MovieRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("*")
public class MovieController {

    private final MovieRepository movieRepository;

    @GetMapping("allMovies")
    public Collection<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @PostMapping("/movies")
    public void addNewMovie(@RequestBody Movie movie) {
        movieRepository.save(movie);
    }

    @DeleteMapping("/movies")
    public void deleteMovie(@RequestParam("movieId") Long movieId) {
        movieRepository.deleteById(movieId);
    }

    @GetMapping("userMovies")
    public Collection<Movie> getAllMoviesByUserId(@RequestParam("userId") Long userId) {
        Collection<Movie> allMoviesByUserId = movieRepository.getAllMoviesByUserId(userId);
        log.info("Movies watched by user with id: {} : {}", userId, allMoviesByUserId);
        return allMoviesByUserId;
    }

}
