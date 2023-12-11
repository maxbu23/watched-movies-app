import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'; 
import axios from 'axios';
import "./../css/style.css"

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [details, setDetails] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [addNewUserModalIsOpen, setAddNewUserModalIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [addNewMovieModalIsOpen, setAddNewMovieModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [director, setDirector] = useState("");

  const openModal = (user) => {
    setModalIsOpen(true);
    setCurrentUser(user);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeAddNewUserModal = () => {
    setAddNewUserModalIsOpen(false);
    setEmail("");
    setFirstname("");
    setLastname("");
  }

  const closeAddNewMovieModal = () => {
    setAddNewMovieModalIsOpen(false);
    setName("");
    setDirector("");
  }

  const addMovieToLibrary = (movie) => {
    axios.post(
        "/api/v1/users/movies", 
        {
            userId: currentUser.id, 
            movieId: movie.id
        }
    ).then(response => {
        setModalIsOpen(false);
        handleUserClick(currentUser);
    }).catch(error => {
        alert("Movie has already been added");
    })
  };

  const fetchUsersData = () => {
    axios.get('/api/v1/users').then(response => {
      setUsers(response.data);
    });
  }

  const fetchMoviesData = () => {
    axios.get('/api/v1/allMovies').then(response => {
      setMovies(response.data);
    });
  }

  useEffect(() => {
    fetchUsersData();
    fetchMoviesData();
  }, []);

  const handleUserClick = user => {
    axios.get(`/api/v1/userMovies?userId=${user.id}`).then(response => {
      setDetails(response.data);
      setSelectedMovie(null);
    });
    setSelectedUser(user);
  };

  const handleMovieClick = movie => {
    axios.get(`/api/v1/users/movies?movieId=${movie.id}`).then(response => {
      setDetails(response.data);
      setSelectedUser(null);
    });
    setSelectedMovie(movie);
  };

  const handleDeleteMovieClick = movieId => {
    axios.delete(
      `/api/v1/users/movies?userId=${selectedUser.id}&movieId=${movieId}`
  ).then(response => {
      handleUserClick(selectedUser);
  })
  }

  const addNewUser = () => {
    axios.post(
        "/api/v1/users", 
        {
            email: email, 
            firstname: firstname, 
            lastname: lastname
        }
    ).then(response => {
      closeAddNewUserModal();
      fetchUsersData();
    }).catch(error => {
        alert("User already exists");
    })
  }

  const deleteUser = userId => {
    axios.delete(
      `/api/v1/users?userId=${userId}`
    ).then(
      response => {
        fetchUsersData();
        setDetails(null);
      }
    )
  }

  const addNewMovie = () => {
    axios.post(
        "/api/v1/movies", 
        {
            name: name, 
            director: director
        }
    ).then(response => {
      closeAddNewMovieModal();
      fetchMoviesData();
    }).catch(error => {
        alert("Movie already exists");
    })
  }

  const deleteMovie = movieId => {
    axios.delete(
      `/api/v1/movies?movieId=${movieId}`
    ).then(
      response => {
        fetchMoviesData();
        setDetails(null);
      }
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <h2>Users</h2>
          <ul>
            {users.map(user => (
            <li key={user.id} onClick={() => handleUserClick(user)}>
              {user.firstname + " " + user.lastname + " (" + user.email + ")"}
              &nbsp;&nbsp;
              <button className='delete-button' onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
          </ul>
        </div>
        <div>
          <h2>Movies</h2>
          <ul>
            {movies.map(movie => (
              <li key={movie.id} onClick={() => handleMovieClick(movie)}>
                {movie.name} &nbsp;&nbsp;
                <button className='delete-button' onClick={() => deleteMovie(movie.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            <li className="button" onClick={() => setAddNewUserModalIsOpen(true)}>Add new user</li>
            <li className="button" onClick={() => setAddNewMovieModalIsOpen(true)}>Add new movie</li>
          </ul>
        </div>
      </div>

      <div style={{width: "40%", margin: "auto"}}>
        {details ? <h2>Details</h2> : <></>}
        
      
        {details && selectedUser && <p>Movies watched by: <b>{selectedUser.firstname + " " + selectedUser.lastname + "  "}</b><button className="button" onClick={() => openModal(selectedUser)}>Add new movie</button></p>}
        {details && selectedMovie && <p>Users, that watched movie: <b>{selectedMovie.name}</b></p>}
        <ul>
        {details ? details.map(detail => (
           <li key={detail.id}>
            {detail.name || detail.firstname} &nbsp;&nbsp;
            {detail.name && (
              <button className="delete-button" onClick={() => handleDeleteMovieClick(detail.id)}>Delete</button>
            )}
          </li>
        )):<></>}
          
        </ul>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
            content: {
                width: '50%',
                margin: 'auto'
            }}
        }
      >
        <button className="close-button" onClick={closeModal}>
          <AiOutlineClose />
        </button>
        <h2>Add movie for user {currentUser && currentUser.firstname + " " + currentUser.lastname}</h2>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              {movie.name}
              <button className="button" onClick={() => addMovieToLibrary(movie)} style={{float: "right"}}>Add</button>
            </li>
          ))}
        </ul>
      </Modal>
      <Modal
        isOpen={addNewUserModalIsOpen}
        onRequestClose={closeAddNewUserModal}
        style={{
          content: {
              width: '50%',
              margin: 'auto'
          }}
      }
      >
        <button className="close-button" onClick={closeAddNewUserModal}>
          <AiOutlineClose />
        </button>
        <br></br>
        <div className="form">
          <div className="input-container">
              <label htmlFor='email'>Firstname: </label>
              <input 
                  type='text' 
                  id='firstname' 
                  value={firstname} 
                  onChange={e => setFirstname(e.target.value)}
              />
              <div className="input-container">
                  <label htmlFor='email'>Lastname: </label>
                  <input 
                      type='text' 
                      id='lastname' 
                      value={lastname} 
                      onChange={e => setLastname(e.target.value)}
                  />
              </div>
              <div className="input-container">
                  <label htmlFor='email'>Email: </label>
                  <input 
                      type='text' 
                      id='email' 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                  />
              </div>
              <div>
                <button className="button" style={{width: "100%"}} onClick={addNewUser}>Add</button>
              </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={addNewMovieModalIsOpen}
        onRequestClose={closeAddNewMovieModal}
        style={{
          content: {
              width: '50%',
              margin: 'auto'
          }}
      }
      >
        <button className="close-button" onClick={closeAddNewMovieModal}>
          <AiOutlineClose />
        </button>
        <br></br>
        <div className="form">
          <div className="input-container">
              <label htmlFor='name'>Title: </label>
              <input 
                  type='text' 
                  id='name' 
                  value={name} 
                  onChange={e => setName(e.target.value)}
              />
              <div className="input-container">
                  <label htmlFor='director'>Director: </label>
                  <input 
                      type='text' 
                      id='director' 
                      value={director} 
                      onChange={e => setDirector(e.target.value)}
                  />
              </div>
              <div>
                <button className="button" style={{width: "100%"}} onClick={addNewMovie}>Add</button>
              </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
