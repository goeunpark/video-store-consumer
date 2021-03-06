import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import axios from 'axios';
import Movie from './Movie';
import './styles/Library.css';
import ScrollUpButton from "react-scroll-up-button";


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
        return <Movie key={i}
          selectMovieCallback={this.props.displaySelectedMovie}
          message="Select for rental"  {...movie}/>
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


  render () {
    return (
      <div className="movie-container">
        <Alert color="success">{this.state.alert}</Alert>
        <div>
          {this.state.movies}
        </div>
        <ScrollUpButton/>
      </div>
      
    );
  }
}

Library.propTypes = {
  displaySelectedMovie: PropTypes.func,
}

export default Library;
