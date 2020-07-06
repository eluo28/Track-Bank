import React,{Component,Fragment} from 'react';
import{
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import RegisterModal from './RegisterModal';
import LoginModal from './Login';
import Logout from './Logout';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class NavComponent extends Component{
    
    state={
        isOpen:false 
    }

    static propTypes={
        auth:PropTypes.object.isRequired
    }

    toggle=()=>{
        this.setState({
            isOpen:!this.state.isOpen
        });
    }


    render(){
        const {isAuthenticated,user}=this.props.auth

        const authLinks=(
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.username}`:''} </strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        )

        const guestLinks=(
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )

        return( 
            <div>

            <Navbar  light expand="sm" className="mb-5">
                <Container>
                    <div className="bigger">Track Bank</div>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className = "ml-auto" navbar>
                            {isAuthenticated ?authLinks:guestLinks}
                            
                        </Nav>
                    </Collapse>

                </Container>

            </Navbar>
        </div>
        )
        
    }

}

const mapStateToProps=state=>({
    auth: state.auth
});



export default connect(mapStateToProps,null)(NavComponent);