

import React,{ Component}  from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

import {connect} from 'react-redux';
import {updateItem} from '../redux/itemActions';



class LyricsModal extends Component{




    state = {
            newLyrics:"",

        }


    
    
 
    onChange=(e)=>{
        const targ=e.target;


        this.setState({[targ.name]: targ.value });

        
    }

    onSubmit=(e)=>{
        e.preventDefault();

    
        const data={
            lyrics:this.state.newLyrics,
            id:this.props.id
        }
        console.log(data)
        
        //update item via updateItem action
        this.props.updateItem(data)

        //close modal
        this.props.toggleLyrics()
    }




    render(){



        return(
            <div>
                  <Modal isOpen={this.props.lyricsModal} toggle = {this.props.toggleLyrics} size="lg">
                            <ModalHeader toggle = {this.props.toggleLyrics}>{this.props.title}</ModalHeader>
                            <ModalBody>
                                
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup>
                         
                                   
                          
    
                        
                                    <Label for="newLyrics">Lyrics</Label>
                                    <Input required  rows="20" type="textarea" name="newLyrics" id="newLyrics" defaultValue={this.props.lyrics} onChange={this.onChange}></Input>
                                   
    
                                        <Button color="dark" style={{marginTop:'2rem'}}  block>Save</Button>
                                
                                    </FormGroup>
                                </Form>
                            </ModalBody>
    
                            </Modal>
            </div>
        )




    }


}


const mapStateToProps=state=>({
item: state.item
});


export default connect(mapStateToProps,{updateItem})(LyricsModal);


