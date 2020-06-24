import React from 'react';
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


export const LyricsModal=(props)=>{
    return(
        <div>
              <Modal isOpen={props.lyricsModal} toggle = {props.toggleLyrics} size="lg">
                        <ModalHeader toggle = {props.toggleLyrics}>{props.title}</ModalHeader>
                        <ModalBody>
                            
                            <Form>
                                <FormGroup>
                     
                                <Label for="descrip">Description</Label>
                                <Input required type="text" name="descrip" id="descrip" className="mb-3" defaultValue={props.descrip}></Input>
                      

                    
                                <Label for="lyrics">Lyrics</Label>
                                <Input required type="text" name="lyrics" id="lyrics" defaultValue={props.lyrics}></Input>
                 

                                    <Button color="dark" style={{marginTop:'2rem'}}  block>Save</Button>
                            
                                </FormGroup>
                            </Form>
                        </ModalBody>

                        </Modal>
        </div>
    )
}



