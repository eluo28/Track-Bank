import React from 'react';
import './App.css';
import NavComponent from './components/navbar';
import Tracklist from './components/tracklist';
import ItemModal from './components/itemModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './redux/store';
import {Container,Row,Col} from 'reactstrap';



function App() {


    return (


      <div className="main">
    <Provider store={store}>
      <NavComponent/>

<Container>
    <Row 
    style={{marginBottom:'2rem'}}
    >

    <Col xs="1">
    <ItemModal/>
    </Col>
    <Col xs="1">
    </Col>
    </Row>

<Tracklist/>
</Container>

    </Provider>
    </div>
  );
}

export default App;
