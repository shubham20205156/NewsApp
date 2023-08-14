import './App.css';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import News from './components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

export default class App extends Component {
  pageSize = 9;

  // this is called setting enviromental variable advantage is that no one can see your api 
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={5}
            color='#f11946'
            progress={this.state.progress}
            
          />
          {/* pageSize is basically no. of news content will show in one page */}

          <Switch>
            <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" /></Route>
            <Route exact path="/general"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" /></Route>
            <Route exact path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" /></Route>
            <Route exact path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" /></Route>
            <Route exact path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health" /></Route>
            <Route exact path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science" /></Route>
            <Route exact path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" /></Route>
            <Route exact path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
