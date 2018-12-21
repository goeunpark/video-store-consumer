import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Library from './components/Library';
import CustomerList from './components/CustomerList';
import Search from './components/Search';
import Home from './components/Home';
import './App.css';

class App extends Component {

  constructor(){
    super();

    this.state = {
      selectedCustomer: "None"
    }
  }

  selectCustomer = (fullName) => {
    this.setState({selectedCustomer: {fullName}});
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar selectedCustomer={this.state.selectedCustomer} />
          </header>

          <Route path="/" exact component={Home} />
          <Route path="/library/" component={Library} />
          <Route path="/search/" component={Search} />
          <Route path="/customers/" render={() => <CustomerList selectCustomerCallback={this.selectCustomer}/> } />
        </div>

      </Router>

    );
  }
}

export default App;
