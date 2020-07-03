import React,{ Component } from "react";
import{
    Navbar,
    Container
} from 'reactstrap';




class Footer extends Component {
    render(){
        return( 
            <div className="footer">  
            <Navbar >
                <Container>
                    <div className="mx-auto smaller mt-2">me@edwinluo.com</div>
                </Container>
            </Navbar>
        </div>
        )
        
    }
}

export default Footer;