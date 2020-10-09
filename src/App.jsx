import React from 'react';
import './App.css';
import { loadToken } from './api/requests';
import Gallery from './components/gallery/gallery.component';

class App extends React.Component {
  async componentDidMount() {
    try {
      const { token } = await loadToken();
      localStorage.setItem('token', token);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Gallery />
    );
  }
}

export default App;
