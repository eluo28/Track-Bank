

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

//import {connect} from 'react-redux';
//import {updateItem} from '../redux/itemActions';



class LyricsModal extends Component{


    constructor(props) {

        super(props);

        this.state = {
            newLyrics:this.props.lyrics,
            id:this.props.id
        }


    }    
    
 
    onChange=(e)=>{
        const targ=e.target;


        this.setState({[targ.name]: targ.value });
        
    }

    onSubmit=(e)=>{
        e.preventDefault();

        console.log(this.state.newLyrics)
        console.log(this.state.id)

        //const data=new FormData();
        //data.append('lyrics',this.state.newLyrics)
        
        //add item via updateItem action
        
        //this.props.updateItem(data)

        //close modal
        //this.props.toggleLyrics()
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
                                    <Input required type="text" name="newLyrics" id="newLyrics" defaultValue={this.props.lyrics} onChange={this.onChange}></Input>
                     
    
                                        <Button color="dark" style={{marginTop:'2rem'}}  block>Save</Button>
                                
                                    </FormGroup>
                                </Form>
                            </ModalBody>
    
                            </Modal>
            </div>
        )




    }


}

/*
const mapStateToProps=state=>({

    newLyrics:state.newLyrics
});*/


//export default connect(mapStateToProps,{updateItem})(LyricsModal);
export default LyricsModal;


