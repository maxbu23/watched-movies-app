CREATE (janusz:Person{firstname: "Janusz", lastname: "Kowalski", email: "janusz.kowalski@gmail.com"}),
       (kamil:Person{firstname: "Kamil", lastname: "Nowak", email: "kamil.nowak@gmail.com"}),
       (mateusz:Person{firstname: "Mateusz", lastname: "Kowal", email: "mateusz.nowak@gmail.com"}),
       (theGodfather:Movie{name: "The Godfather"}),
       (homeAlone:Movie{name: "Home Alone"}),
       (janusz) - [:WATCHED] -> (theGodfather),
       (mateusz) - [:WATCHED] -> (theGodfather),
       (mateusz) - [:WATCHED] -> (homeAlone)
