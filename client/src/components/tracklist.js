import React, { Component}  from 'react';
import ReactDOM from 'react-dom';
import { Container, ListGroup, ListGroupItem, Button,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,Media,

    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input


} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../redux/itemActions';
import PropTypes from 'prop-types';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
//import {Loading } from './loading';
import FocusLock from 'react-focus-lock';

//import {lyricsModal} from './lyricsModal';




class TrackList extends Component {



    state = {
        file:"",
        player:false,
        songName:"",
        lyricsModal:false,
        lyrics:""
      
    }


    componentDidMount() {
        this.props.getItems();
    }




    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }   

    togglePlayer=(audioFile,title)=>{


        if(this.state.player===false){
            this.setState({file:audioFile,player:!this.state.player,songName:title})
        }
        else{
            this.setState({file:audioFile,songName:title})
            
        }


    }


    toggleLyrics=(lyrics)=>{


        this.setState({
            lyricsModal:!this.state.lyricsModal,
            lyrics:lyrics
        });

    }


    render() {
        const { items } = this.props.item;

        /*
        if (this.props.loading){
            return(
                <div className="container">
                    <div className="row loadingPad forfooter text-center">
                    <Loading/>
                    </div>
                </div>
            )
        }*/


        
        

        return (
  
            <Container key={1} >

                <ListGroup className="forfooter">
                    <TransitionGroup className="track-list">
                        {items.map(({ _id, title, producer, description,coverImage,audioFile,lyrics}) => (
                         
                            
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem style={{ backgroundColor: "#2E2E2E", color: "white",border:"none" }} className="d-flex align-items-center mb-2 ">
                                    
                            
                                <Button
                                className="shadow-none"
                                style={{backgroundColor:"rgba(0,0,0,0)",border:"none",color:"white"}}
                                onClick={this.togglePlayer.bind(this, audioFile,title)}
                                >
                                    <i class="fas fa-play"></i>
                                </Button>

                          
                              <Media object src={coverImage} className="col-1 hide-under"/>
                                <div className="col-3  overflow">{title} - {producer}</div>
                                <div className="col-6  overflow">{description}</div>

                        
                                <Button
                                className="shadow-none col-1 ml-auto"
                                style={{backgroundColor:"rgba(0,0,0,0)",border:"none",color:"white"}}
                                onClick={this.toggleLyrics.bind(this,lyrics)}
                                >
                                    <i class="fas fa-file-alt"></i>
                                </Button>
                            
                      
                                <UncontrolledDropdown className="ml-auto">                      
                                    <DropdownToggle style={{backgroundColor:"rgba(0,0,0,0)",border:"none"}} className="shadow-none col-1" > 
                                    <span>&#8942;</span>   
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem className="d-flex justify-content-center">
                                            <Button
                                            style={{backgroundColor:"rgba(0,0,0,0)",border:"none",color:"black"}}>
                                           
                                            Edit
                                            </Button>
                                        </DropdownItem>

                                        <DropdownItem className="d-flex justify-content-center">
                                            <Button 
                                                style={{backgroundColor:"rgba(0,0,0,0)",border:"none",color:"black"}}
                                                
                                                onClick={this.onDeleteClick.bind(this, _id)}
                                            >Delete
                                            </Button>
                                    </DropdownItem>
                              
                                    </DropdownMenu>
                                    </UncontrolledDropdown>
                                 
                                </ListGroupItem>
                                
                            </CSSTransition>
                            
                   
                        ))
                        
                        }
                    </TransitionGroup>
                </ListGroup>


            


            {this.state.player && (

            <FocusLock
            persistentFocus="true">

                <AudioPlayer 
                className="sticky"
                ref="player"
                autoPlay
                onPlay={e => {if(this.state.player===true){
                    ReactDOM.findDOMNode(this.refs.player).focus()}
                }}
                src={this.state.file}
                volume=".2"
                style={{
                    backgroundColor:"white",
                    justifyContent:"center",
                    outline:"none"
                }}

                header={this.state.songName}
                />
            </FocusLock>
     
            )}


                <Modal isOpen={this.state.lyricsModal} toggle = {this.toggleLyrics}>
                        <ModalHeader toggle = {this.toggleLyrics}>Lyrics</ModalHeader>
                        <ModalBody>
                            <Form >
                                <FormGroup>
                                    <Input required type="text" name="title" id="title" placeholder="lyrics">{this.state.lyrics}</Input>
                                            

                                    <Button color="dark" style={{marginTop:'2rem'}}  block>Add Track</Button>
                            
                                </FormGroup>
                            </Form>
                        </ModalBody>
                </Modal>
           

            


                
            

                


            </Container>

  



        );

        
        
    }
    
}


TrackList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}




const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(TrackList);