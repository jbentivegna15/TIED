import Dropzone from 'react-dropzone';
import request from 'superagent';
import React, {Component} from 'react';


const CLOUDINARY_UPLOAD_PRESET = 'krtg46pi';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dcvhojee9/image/upload';

export default class EventForm extends Component {
  constructor(props) {
    super(props)
    
	  
	this.state = { name: this.props.data.name, description: this.props.data.description, date: this.props.data.date, time: this.props.data.time, loc: this.props.data.loc, img:'', uploadedFile: Buffer};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
	this.handleDateChange = this.handleDateChange.bind(this);
	this.handleTimeChange = this.handleTimeChange.bind(this);
	this.handleLocChange = this.handleLocChange.bind(this);
  }


  handleNameChange(e) {
	this.setState({ name: e.target.value });
  }
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }
  handleDateChange(e) {
	this.setState({ date: e.target.value });
  }
  handleTimeChange(e) {
	this.setState({ time: e.target.value });
  }
  handleLocChange(e) {
	this.setState({ loc: e.target.value });
  }
  onImageDrop(files){
	this.setState({
		uploadedFile: files[0]
		});

	this.handleImageUpload(files[0]);
  }

  handleImageUpload(file){
	  let upload = request.post(CLOUDINARY_UPLOAD_URL)
			.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
			.field('file', file);
	  upload.end((err,response)=> {
		  if(err) {
			  console.error(err);
		  }
		  if(response.body.secure_url !== ''){
			  this.setState({
				  img: response.body.secure_url
			  });
		  }
	  });
  }
  
	handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let description = this.state.description.trim();
		let date = this.state.date.trim();
		let time = this.state.time.trim();
		let loc = this.state.loc.trim();
		let img = this.state.img;
		let event = {name:name, description:description, date:date, time:time, loc:loc , img:img}
    if (!name || !description || !date || !time || !loc) {
      return;
    }
    this.props.onEventSubmit(event);
    this.setState({ name:'', description:'', date:'', time:'', loc:'', img:''});
  }
  render() {
    return (
//page formatting
			<div className="divFont divCenter">
        <div id="right">
  				<h2><form onSubmit={ this.handleSubmit} className="formStyle">
  					Event Name:<br/>
  					<input type="text" placeholder="Cat Party" value={ this.state.name} onChange={ this.handleNameChange } required="required"/><br/>
  					Description:<br/>
  					<textarea id="groupDesc" name="Description" placeholder="Lots of Cats." rows="7" cols="30" value={ this.state.description} onChange={ this.handleDescriptionChange } required="required"></textarea><br/>
  					Date of Event:<br/>
  					<input type="date" value={ this.state.date } onChange={ this.handleDateChange } required="required"/><br/>
  					Time of Event:<br/>
  					<input type="time" value={ this.state.time } onChange={ this.handleTimeChange } required="required"/><br/>
  					Location of Event:<br/>
  					<input type="text" placeholder="Not the Ocean" value={ this.state.loc} onChange={ this.handleLocChange } required="required"/><br/>
            Image of Event:<br/>
					<Dropzone  multipe={false} accept="image/*" onDrop={this.onImageDrop.bind(this)}>
					<p> Drop an image or click to select a file to upload.</p>
					</Dropzone>
  					<input type="submit" value="Submit"/>
  				</form></h2>
			</div>

			<div>
				{this.state.img ==='' ? null: 
				<div className='divFront divCenter'>
					<p>{this.state.uploadedFile.name}</p>
					<img src = {this.state.img} alt='' />
				</div>}
			</div>
		</div>
    )
  }
}

