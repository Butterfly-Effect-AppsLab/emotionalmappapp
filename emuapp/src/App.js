import React, {Component} from 'react';
import './App.css';
import News from './Components/News.js';
import Navbar from './Components/Navbar.js';

class App extends Component {

  state = {
    news: []
  }

  componentDidMount() {
    fetch('/news')
        .then(res => res.json())
        .then(data => {
          this.setState({ news: data.data });
        }).catch(resp => {
          console.error(resp);
      });
      }

  render() {
    console.log(this.state.news)
    return (
      <div>
        <Navbar/>
        <News news = {this.state.news} />
      </div>
      )
    }
  
}
export default App;
