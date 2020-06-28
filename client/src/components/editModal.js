

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

//Filepond
import {FilePond, registerPlugin} from "react-filepond";
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";


registerPlugin(FilePondPluginImagePreview,FilePondPluginFileEncode,
    FilePondPluginImageResize,FilePondPluginImageTransform,FilePondPluginFileValidateSize,FilePondPluginFileValidateType);



class EditModal extends Component{




    state = {
            title:null,
            description:null,
            producer:null,
            coverImage:null
        }


    
    
 
    onChange=(e)=>{
        const targ=e.target;


        this.setState({[targ.name]: targ.value });

        
    }

    onSubmit=(e)=>{
        e.preventDefault();

    
        const data={
            title: this.state.title,
            description: this.state.description,
            producer: this.state.producer,
            coverImage: this.state.coverImage,
            id:this.props.id
        }
        
        //update item via updateItem action
        this.props.updateItem(data)

        //close modal
        
        this.props.toggleEdit()
    }




    render(){



        return(
            <div>
                  <Modal isOpen={this.props.editModal} toggle = {this.props.toggleEdit} size="lg">
                            <ModalHeader toggle = {this.props.toggleEdit}>{this.props.title}</ModalHeader>
                            <ModalBody>
                                
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup>
                         
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" defaultValue={this.props.title} onChange={this.onChange}></Input>
                            <Label for="producer" className="mt-4">Producer</Label>
                            <Input  type="text" name="producer" id="producer"  defaultValue={this.props.producer} onChange={this.onChange}></Input>
                            <Label for="description" className="mt-4">Description</Label>
                            <Input  type="text" name="description" id="description" defaultValue={this.props.description} onChange={this.onChange}></Input>
              
                            <FilePond

                            maxFiles={1}
                            imageResizeTargetWidth="75"
                            imageResizeTargetHeight="75"
                            allowMultiple={false}
                            className="mt-4"
                            name="coverImage"
                            acceptedFileTypes={['image/*']}
                            imageResizeMode="force"
                 
                            
                            onaddfile={(err,item)=>{
                                if (err) {
                                    console.warn(err);
                                    return;
                                }

                                    this.setState({
                                        coverImage: item.getFileEncodeDataURL()
    
                                        });
                                }}


                            labelIdle="COVER ART"
                            
                            />
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


export default connect(mapStateToProps,{updateItem})(EditModal);


