package org.buczek.watchedmoviesapp.model;

import lombok.*;
import org.springframework.data.neo4j.core.schema.*;

import java.util.List;

@Node("Person")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Person {

    @Id
    @GeneratedValue
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    @Relationship(value = "WATCHED", direction = Relationship.Direction.OUTGOING)
    private List<Movie> movies;

}
