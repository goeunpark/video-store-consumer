import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import axios from 'axios';
import Movie from './Movie';
import './styles/Library.css';


class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount () {
    const URL = 'http://localhost:3000/movies';
    this.setState({alert: 'Loading library...'});

    axios.get(URL)
    .then((response) => {
      const allMovies = response.data.map((movie, i) => {
        return <Movie key={i} selectMovieCallback={this.selectRental} message="Select for rental"  {...movie}/>
      });

      const alertMessage = `Successfully loaded ${response.data.length} movies from the rental library`
      this.setState({
        movies: allMovies,
        alert: alertMessage
      });
    })
    .catch((error) => {
      this.setState({error: error.message});
    });
  }


  selectRental = (movie) => {
    console.log(`Selected a movie to rent: ${movie.title}, id ${movie.id}`);
    const movieClicked = movie.id;
    // this.setState({
    //   selectedMovieId: movieClicked
    // });
    // this.props.displaySelectedMovie(this.state.selectedMovieId);
    this.props.displaySelectedMovie(movieClicked);
  }


  render () {
    return (
      <div className="movie-container">
        <Alert color="success">{this.state.alert}</Alert>
        <div>
          {this.state.movies}
        </div>
      </div>

    );
  }
}

Library.propTypes = {
  displaySelectedMovie: PropTypes.func,
}

export default Library;
