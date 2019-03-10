
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

//pages
import Home from './pages/Home';
import Test from './pages/Test';
import ContactUs from './pages/ContactUs';
import About from './pages/About'
import Page404 from './pages/404Page';
import Tucker from './pages/Tucker';
import Oliver from './pages/Oliver';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
       
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/ContactUs' component={ContactUs} />
            <Route exact path='/About' component={About} />
            <Route exact path='/About/Tucker' component={Tucker} />
            <Route exact path='/About/Oliver' component={Oliver} />
            <Route exact path='/test' component={Test} />

            <Route component={Page404} /> 
          </Switch>
          
        </Router>
      </div>
    );
  }
}

export default App; 