import React, { Component}  from 'react';
import ReactDOM from 'react-dom';
import { 
    Container, 
    ListGroup, 
    ListGroupItem, 
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Media,
    Collapse,
    CardBody,
    Card,
    CardHeader
} from 'reactstrap';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../redux/itemActions';
import PropTypes from 'prop-types';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
//import {Loading } from './loading';

import LyricsModal from './lyricsModal';
import EditModal from './editModal';

import Recorder from './recorder';





class TrackList extends Component {



    state = {
        file:"",
        player:false,
        songName:"",
        lyricsModal:false,
        lyrics:"",
        title:"",
        descrip:"",
        id:null,
        producer:"",
        covImg:"",
        audFile:"",
        editModal:false,
        voiceMemo:"",
        recordOpen:false,
        recordId:""
 
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

    toggleRecorder=(voiceMemo,id)=>{


        if(this.state.recordId!==id){
            this.setState({
                recordId:id,
                voiceMemo:voiceMemo,
                recordOpen:true,
    
            })

        }else{
            this.setState({
                recordId:id,
                voiceMemo:voiceMemo,
                recordOpen: !this.state.recordOpen,
      
            })
    
        }
   

        


    }


    toggleLyrics=(lyrics,title,_id)=>{
        this.setState({
            lyricsModal:!this.state.lyricsModal,
            lyrics:lyrics,
            title:title,
            id:_id
        });
    }


    toggleEdit=(_id, title, producer, description,coverImage)=>{
        this.setState({
            editModal:!this.state.editModal,
            title:title,
            id:_id,
            descrip:description,
            producer:producer,
            covImg:coverImage
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

           
            <Container key={1}>
              
                <ListGroup className="forfooter scroll" id="style-11">
                    <TransitionGroup className="track-list">
                        {items.map(({ _id, title, producer, description,coverImage,audioFile,lyrics,voiceMemo}) => (
                         
                            
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                            <div className="mb-4">
                      
                                <ListGroupItem  className="d-flex align-items-center">
                                
                             
                
                                <Button
                                className="shadow-none"
                                style={{backgroundColor:"rgba(0,0,0,0)",border:"none",color:"black"}}
                                onClick={this.togglePlayer.bind(this, audioFile,title)}
                                >
                                    <i className="fas fa-play"></i>
                                </Button>


                              <Media object src={coverImage} className="col-1 hide-under"/>
                                <div className="col-3  overflow bigger">{title} <div className="smaller"> by {producer}</div></div>
                                <div className="col-5  overflow medium">{description}</div>


                        

                            
                                <Button
                                className="shadow-none ml-auto col-1"
                                style={{backgroundColor:"rgba(0,0,0,0)",border:"none",color:"black"}}
                                onClick={this.toggleRecorder.bind(this,voiceMemo,_id)}
                                >
                                    <i class="fas fa-microphone"></i>
                                </Button>



                        
                                <Button
                                className="shadow-none ml-auto col-1"
                                style={{backgroundColor:"rgba(0,0,0,0)",border:"none",color:"black"}}
                                onClick={this.toggleLyrics.bind(this,lyrics,title,_id)}
                                >
                                    <i className="fas fa-file-alt"></i>
                                </Button>


                          
                  
                      
                                <UncontrolledDropdown className="ml-auto">                      
                                    <DropdownToggle style={{backgroundColor:"rgba(0,0,0,0)",border:"none",color:"black"}} className="shadow-none col-1" > 
                                    <span>&#8942;</span>   
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem className="d-flex justify-content-center test"
                                        style={{outline:"none"}}
                                        onClick={this.toggleEdit.bind(this,_id, title, producer, description,coverImage)}>
                                        Edit
                                        </DropdownItem>

                                        <DropdownItem className="d-flex justify-content-center"
                                        style={{outline:"none"}}
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        >
                                        Delete                                    
                                    </DropdownItem>
                              
                                    </DropdownMenu>
                                    </UncontrolledDropdown>

                              
                                 
                                </ListGroupItem>
                                <Collapse isOpen={this.state.recordOpen}>
                   
                                {this.state.recordId===_id &&(
                                
                                
                                <Card >
                                <CardBody>
                                <Recorder
                                    voiceMemo={this.state.voiceMemo}
                                    id={this.state.recordId}
                         
                                    />

                                <div className="col-12 d-flex justify-content-center mt-2">
                                <AudioPlayer 
                                    src={voiceMemo}
                                    volume=".2"
                                    style={{
                                        backgroundColor:"white",
                                        justifyContent:"center",
                                        outline:"none",
                                        boxShadow:"none"
                              
                                    }}
                             
                                    />
                               
                                </div>
                                <Card>
                                    <CardHeader className=" d-flex justify-content-center">Lyrics</CardHeader>
                                    <CardBody className=" d-flex justify-content-center">
                                    {lyrics}
                                    </CardBody>
                                </Card>
                                
                                
                                </CardBody>
                                </Card>

                                )}  
                                </Collapse>
                                
                            </div>
                            </CSSTransition>
                            
                   
                        ))
                        
                        }
                    </TransitionGroup>
                    
                </ListGroup>

              
                <LyricsModal
                lyricsModal={this.state.lyricsModal}
                toggleLyrics={this.toggleLyrics}
                title={this.state.title}
                lyrics={this.state.lyrics}
                id={this.state.id}
                />

                <EditModal
                editModal={this.state.editModal}
                toggleEdit={this.toggleEdit}
                title={this.state.title}
                id={this.state.id}
                description={this.state.descrip}
                producer={this.state.producer}
                coverImage={this.state.covImg}
             
                />

              
                



                {this.state.player && (
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
      
                />

)}
    
        
    
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