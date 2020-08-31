import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';
import MainComponent from './components/MainComponent';

const store = ConfigureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <MainComponent />
          </div>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
