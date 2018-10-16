import React, { Component } from 'react';
import { firebase } from "../../Firebase";
import FileUploader from "react-firebase-file-uploader";
import CircularProgress from "@material-ui/core/CircularProgress";

class Fileuploader extends Component {

  state = {
    name:"",
    isUploading: false,
    fileURL: ""
  }

  handleUploadStart = () => {
    this.setState({
      isUploading: true
    })
  }

  handleUploadError = () => {
    this.setState({
      isUploading: false
    })
  }

  handleUploadSuccess = (filename) => {

    this.setState({
      name: filename,
      isUploading: false
    });
    
    firebase.storage().ref(this.props.dir)
        .child(filename).getDownloadURL()
        .then( url => {
            this.setState({fileURL: url })
        })
    
    this.props.filename(filename);    //receive filename to parent
  }

  static getDerivedStateFromProps(props, state) {

    //eğer ki default bir image ile gelirse foto, yeni state aşağıdaki gibi olur.

    if(props.defaultImg) {
      return state = {
        name:props.defaultImgName,
        fileURL:props.defaultImg
      }
    }
    return null;
  }

  uploadAgain = () => {
    //bunu yaparak parent'ın state'indeki image objesinin içini sıfırlıyoruz.
    this.setState({
      name:"",
      isUploading: false,
      fileURL: ""
    })
    //bize props olarak iletilen resetImage() methodunu 
    //tetikliyoruz ki parent'daki resetImage() çalışsın.
    this.props.resetImage();
  }

  render() {

    // const storageRef = firebase.storage().ref(this.props.dir)

    const progressBar = this.state.isUploading ? (
      <div className="progress" style={{textAlign: "center", margin: "30px"}}>
        <CircularProgress style={{ color: "#98c6e9"}} thickness={7} />
      </div>
    ): null;

    console.log(this.state)
    const isFileUrlExist = !this.state.fileURL ? 
            <div>
              <div className="label_inputs">{this.props.tag}</div>
              <FileUploader
                  accept="image/*"
                  name="image"
                  randomizeFilename
                  storageRef={firebase.storage().ref(this.props.dir)}
                  onUploadStart={ this.handleUploadStart }
                  onUploadError={ this.handleUploadError }
                  onUploadSuccess={ this.handleUploadSuccess }
              />
            </div> 
            : <div className="image_upload_container">
                <img
                    style={{
                        width:'100%'
                    }}
                    src={this.state.fileURL}
                    alt={this.state.name}
                />
                <div className="remove" onClick={()=>this.uploadAgain()}>
                    Remove
                </div>
              </div>

    return (
      <div>
        { isFileUrlExist }
        { progressBar }
      </div>
    )
  }
}

export default Fileuploader;
