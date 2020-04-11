import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store'
import { Provider } from 'react-redux'
import Landing from './Components/Landing'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MainPage from './Components/MainPage';
import CheckOut from './Components/CheckOut';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App overflow-hidden" >
          <BrowserRouter>
            <Landing />

            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/checkout' component={CheckOut} />
            </Switch>

          </BrowserRouter>
        </div>
      </Provider>

    )
  }
}



export default App
