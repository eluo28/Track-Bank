import React,{Component} from 'react';
import{
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

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
                    <div>Track Bank</div>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className = "ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Account</NavLink>
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