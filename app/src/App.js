import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Feedback from './Feedback';
import About from './About';

const App = () => {
  return(
    <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/feedback" exact component={Feedback}/>
      <Route path="/about" exact component={About}/>
    </BrowserRouter>
  );
};

export default App;
