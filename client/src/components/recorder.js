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
        record:false,
        srrc:""

    }

    startRecording = () => {
        this.setState({ record: true });
      }
     
      stopRecording = () => {
        this.setState({ record: false });
      }
     



    blobToBase64 = blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
            resolve(reader.result);
            };
        });
        };

      onStop=(recordedBlob) =>{
        console.log('recordedBlob is: ', recordedBlob);

   
        this.blobToBase64(recordedBlob.blob).then(res => {
  
            const data={
                voiceMemo:res,
                id:this.props.id
            }
    
    
            console.log(data)
            //update item via updateItem action
            this.props.updateItem(data)


          });

        
        

      }

    
    render(){



        return(
            <div><ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="#000000"
            backgroundColor="#FF4081" 
            mimeType="audio/mp3"/>
            <Button onClick={this.startRecording} type="button">Start</Button>
            <Button onClick={this.stopRecording} type="button">Stop</Button>


            
            <ReactAudioPlayer
            src={this.props.voiceMemo}
            controls
            />
    {this.props.voiceMemo}
            </div>
        )




    }

}



const mapStateToProps=state=>({
    item: state.item
    });
    
export default connect(mapStateToProps,{updateItem})(Recorder);
    