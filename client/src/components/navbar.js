import React,{Component} from 'react';
import{
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import RegisterModal from './RegisterModal';
import Logout from './Logout';

class NavComponent extends Component{
    
    state={
        isOpen:false 
    }

    toggle=()=>{
        this.setState({
            isOpen:!this.state.isOpen
        });
    }


    render(){
        return( 
            <div>

            <Navbar  light expand="sm" className="mb-5">
                <Container>
                    <div className="bigger">Track Bank</div>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className = "ml-auto" navbar>
                            <NavItem>
                                <RegisterModal/>
                            </NavItem>
                            <NavItem>
                                <Logout/>
                            </NavItem>
                        </Nav>
                    </Collapse>

                </Container>

            </Navbar>
        </div>
        )
        
    }

}



export default NavComponent;