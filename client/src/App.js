import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavComponent from './components/navbar';
import Tracklist from './components/tracklist';
import ItemModal from './components/itemModal';
import {Container} from 'reactstrap';
import {Provider} from 'react-redux';
import store from './redux/store';


function App() {


    return (
    <Provider store={store}>
    <div className="App">
      <NavComponent/>

      <Container>
      <ItemModal/>
      <Tracklist/>
      </Container>


      
      
    </div>
    </Provider>
  );
}

export default App;
