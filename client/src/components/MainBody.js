import React,{Component} from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Tracklist from './tracklist';
import ItemModal from './itemModal';
import {Container,Row,Col} from 'reactstrap';
import {Loading } from './loading';

class MainBody extends Component{

 

    static propTypes={
        isAuthenticated:PropTypes.bool
    }

    
    render(){

           
        if (this.props.loading){
            return(
                <div className="container">
                    <div className="row loadingPad forfooter padding text-center">
                    <Loading/>
                    </div>
                </div>
            )
        }
        

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
                    
                    <div className="forfooter col-12 offset-md-3 padding">

                    

                    <h1>WELCOME TO TRACK BANK</h1>
                    <h6>A haven for YOUR musical concepts.</h6>


                    </div>
                }

            


            </div>
            </Container>

           

            


        )
    }


}

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated,
    loading:state.auth.isLoading
    
});

export default connect(mapStateToProps,null)(MainBody);
