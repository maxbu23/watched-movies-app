package org.buczek.watchedmoviesapp.model.request;


public record AddMovieToPersonRequest(Long userId, Long movieId) {}
