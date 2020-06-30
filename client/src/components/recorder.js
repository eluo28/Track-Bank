import React,{ Component}  from 'react';
import {
    Button
} from 'reactstrap';

import {connect} from 'react-redux';
import {updateItem} from '../redux/itemActions';
import { ReactMic } from 'react-mic';
import ReactAudioPlayer from 'react-audio-player';

class Recorder extends Component{
    
    state = {
        record:false

    }

    startRecording = () => {
        this.setState({ record: true });
      }
     
      stopRecording = () => {
        this.setState({ record: false });
      }
     

      onStop=(recordedBlob) =>{
        console.log('recordedBlob is: ', recordedBlob);

        


        const data={
            voiceMemo:recordedBlob.blobURL,
            id:this.props.id
        }

        
        //update item via updateItem action
        this.props.updateItem(data)

      }

    
    render(){



        return(
            <div><ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="#000000"
            backgroundColor="#FF4081" />
            <Button onClick={this.startRecording} type="button">Start</Button>
            <Button onClick={this.stopRecording} type="button">Stop</Button>


            <ReactAudioPlayer
            src={this.props.voiceMemo}
            autoPlay
            controls
            />
 
            </div>
        )




    }

}



const mapStateToProps=state=>({
    item: state.item
    });
    
export default connect(mapStateToProps,{updateItem})(Recorder);
    