import React, {Component} from 'react';

class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = { name: this.props.data.name, description: this.props.data.description, date: this.props.data.date, time: this.props.data.time, loc: this.props.data.loc, img: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleLocChange = this.handleLocChange.bind(this);
		this.handleImgChange = this.handleImgChange.bind(this);
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
  handleImgChange(e) {
      this.setState({ img: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let description = this.state.description.trim();
		let date = this.state.date.trim();
		let time = this.state.time.trim();
		let loc = this.state.loc.trim();
    let img = this.state.img
		let event = {name:name, description:description, date:date, time:time, loc:loc, img: img}
    if (!name || !description || !date || !time || !loc) {
      return;
    }
    this.props.onEventSubmit(event);
    this.setState({ name:'', description:'', date:'', time:'', loc:'', img:'' });
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
  					<input type="file" name="thumbnail" accept="image/*"/><br/>
  					<input type="submit" value="Submit"/>
  				</form></h2>
        </div>
			</div>
    )
  }
}

export default EventForm;
