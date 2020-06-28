import React from 'react';
import './App.css';
import NavComponent from './components/navbar';
import Tracklist from './components/tracklist';
import ItemModal from './components/itemModal';
import Searchbar from './components/searchbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './redux/store';
import {Container,Row,Col} from 'reactstrap';


function App() {


    return (
    <Provider store={store}>
      <NavComponent/>

<Container>
    <Row 
    style={{marginBottom:'2rem'}}
    >

    <Col>
    <ItemModal/>
    </Col>
    <Col>
    <Searchbar/>
    </Col>
    </Row>

<Tracklist/>
</Container>

    </Provider>
  );
}

export default App;
