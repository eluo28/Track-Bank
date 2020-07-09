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
import { register} from '../redux/authActions';
import {clearErrors} from '../redux/errorActions';


class RegisterModal extends Component{

    state={
        username:"",
        email:"",
        password:"",
        msg:null,
        modal:false
    }

    static propTypes={
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        register:PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error,isAuthenticated}=this.props;
        if(error!==prevProps.error){
            //check register error
            if(error.id==='REGISTER_FAIL'){
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

        const {username,email,password}=this.state;

        const newUser={
            username,
            email,
            password
        };


        this.props.register(newUser);

 
    }


    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#" className="bigger">
                    Register
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                <ModalBody>
                    {this.state.msg?<Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" className="mb-3" name="username" id="username" placeholder="Username" onChange={this.onChange}/>

                            <Label for="email">Email</Label>
                            <Input type="text" className="mb-3" name="email" id="email" placeholder="Email" onChange={this.onChange}/>

                            <Label for="password">Password</Label>
                            <Input type="password" className="mb-3"  name="password" id="password" placeholder="Password" onChange={this.onChange}/>
                        
                            <Button color="dark" style={{marginTop:'2rem'}}  block>Register</Button>
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

export default connect(mapStateToProps,{register,clearErrors})(RegisterModal);