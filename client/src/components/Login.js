import React, { Component}  from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input,
    Label,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login} from '../redux/authActions';
import {clearErrors} from '../redux/errorActions';


class LoginModal extends Component{

    state={
        email:"",
        password:"",
        msg:null,
        modal:false
    }

    static propTypes={
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        login:PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error,isAuthenticated}=this.props;
        if(error!==prevProps.error){
            //check register error
            if(error.id==='LOGIN_FAIL'){
                this.setState({msg:error.msg.msg});

            }
            else{
                this.setState({msg:null});
            }
        }

        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
            
        }
       
    }

    toggle=()=>{
        //clear errors
        this.props.clearErrors();

        this.setState({
            modal:!this.state.modal
        });
    }

    onChange=(e)=>{
        const targ=e.target;
        this.setState({[targ.name]: targ.value });
    }

    onSubmit=(e)=>{
        e.preventDefault();

        const {email,password}=this.state;

        const user={
            email,
            password
        };

        //login
        this.props.login(user);

 
    }


    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="# " className="bigger">
                    Login
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                <ModalBody>
                    {this.state.msg?<Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            
                            <Label for="email">Email</Label>
                            <Input type="text" className="mb-3" name="email" id="email" placeholder="Email" onChange={this.onChange}/>

                            <Label for="password">Password</Label>
                            <Input type="password" className="mb-3"  name="password" id="password" placeholder="Password" onChange={this.onChange}/>
                        
                            <Button color="dark" style={{marginTop:'2rem'}}  block>Login</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
                </Modal>


            </div>

        )
    }


}


const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated,
    error:state.error
    
});

export default connect(mapStateToProps,{login,clearErrors})(LoginModal);