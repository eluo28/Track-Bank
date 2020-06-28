import React,{Component} from 'react';
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
import {addItem} from '../redux/itemActions';


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



class ItemModal extends Component{

    state = {
        modal:false,
        title:'',
        description:'',
        producer:'',
        coverImage:'',
        lyrics:'',
        audioFile:null
      
    }

    toggle=()=>{
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



        const formData=new FormData();
        formData.append('audio',this.state.audioFile)
        formData.append('title',this.state.title)
        formData.append('description',this.state.description)
        formData.append('producer',this.state.producer)
        formData.append('coverImage',this.state.coverImage)
        formData.append('lyrics',this.state.lyrics)
        //add item via addItem action
        this.props.addItem(formData)

        //close modal
        this.toggle();
    }

    render(){
        return(
            <div>
                <Button style={{backgroundColor:"#2E2E2E",border:"none"}} onClick={this.toggle}>
                    Add Item
                </Button>

                <Modal isOpen={this.state.modal} toggle = {this.toggle}>
                <ModalHeader toggle = {this.toggle}>Add Track</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>

                        <Label for="title">Title</Label>
                            <Input required type="text" name="title" id="title" placeholder="Title" onChange={this.onChange}></Input>
                            <Label for="producer" className="mt-4">Producer</Label>
                            
                            <Input required type="text" name="producer" id="producer"placeholder="Producer" onChange={this.onChange}></Input>
                            
                            <Label for="description" className="mt-4">Description</Label>
                            <Input required type="text" name="description" id="description"  placeholder="Description" onChange={this.onChange}></Input>
                            <Label for="lyrics" className="mt-4">Lyrics</Label>
                            <Input type="text" name="lyrics" id="lyrics"placeholder="Lyrics" onChange={this.onChange}></Input>
                     
                            <FilePond

                            maxFiles={1}
                            imageResizeTargetWidth="75"
                            imageResizeTargetHeight="75"
                            allowMultiple={false}
                            className="mt-4"
                            name="coverImage"
                            acceptedFileTypes={['image/*']}
                            imageResizeMode="force"
                            required
                            
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


                            <FilePond
                            maxFiles={1}
                            allowMultiple={false}
                            className="mt-3"
                            acceptedFileTypes={['audio/*']}
                            required

                            onaddfile={(err,item)=>{
                                if (err) {
                                    console.warn(err);
                                    return;
                                }
                                this.setState({
                                    audioFile: item.file

                                    });
                                }}
                            labelIdle="BEAT"

                            />


                            <Button color="dark" style={{marginTop:'2rem'}}  block>Add Track</Button>
              
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

export default connect(mapStateToProps,{addItem})(ItemModal);
