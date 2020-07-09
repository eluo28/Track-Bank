import React, { Component } from 'react';
import './App.css';
import NavComponent from './components/navbar';


import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './redux/store';
import MainBody from './components/MainBody';
import Footer from './components/footer';
import {loadUser} from './redux/authActions';


class App extends Component{




  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
    return (


      <div >
    <Provider store={store}>
      <NavComponent/>
<MainBody/>

<Footer/>

    </Provider>
    </div>
  );
}
}



export default App;
