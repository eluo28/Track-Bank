import React,{Component} from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Tracklist from './tracklist';
import ItemModal from './itemModal';
import {Container,Row,Col} from 'reactstrap';

class MainBody extends Component{

 

    static propTypes={
        isAuthenticated:PropTypes.bool
    }

    
    render(){

      
        

        return(

            <Container>

            <div>
                {this.props.isAuthenticated ?

                    <div >
                    <Row 
                    style={{marginBottom:'2rem'}}

                    >
                    <Col xs="1" >
                    <ItemModal />
                    </Col>
                    </Row>



                    <Tracklist/>
                    </div>
                    :
                    
                    <div>Login</div>
                }

            


            </div>
            </Container>

           

            


        )
    }


}

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
    
});

export default connect(mapStateToProps,null)(MainBody);
