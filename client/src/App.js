import React, { Component } from 'react';
import './App.css';
import NavComponent from './components/navbar';
import Tracklist from './components/tracklist';
import ItemModal from './components/itemModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './redux/store';
import {Container,Row,Col} from 'reactstrap';
import Footer from './components/footer';
import {loadUser} from './redux/authActions';


class App extends Component{




  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
    return (


      <div className="main">
    <Provider store={store}>
      <NavComponent/>

<Container>
    <Row 
    style={{marginBottom:'2rem'}}
    
    >
<Col xs="1" >
    <ItemModal />
    </Col>
    </Row>

<Tracklist/>
</Container>
<Footer/>

    </Provider>
    </div>
  );
}
}


export default App;
