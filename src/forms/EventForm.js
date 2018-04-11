import React, {Component} from 'react';

class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = { name: '', description: ''};
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
		let id = this.props.group_id
    let name = this.state.name.trim();
    let description = this.state.description.trim();
		let date = this.state.date.trim();
		let time = this.state.time.trim();
		let loc = this.state.loc.trim();
		let event = {name:name, description:description, date:date, time:time, loc:loc}
    if (!name || !description || !date || !time || !loc) {
      return;
    }
    this.props.onEventSubmit(event);
		// TODO: add admin update support
    this.setState({ name:'', description:'', date:'', time:'', loc:'', img:'' });
  }
  render() {
    return (
//page formatting
			<div id="divFont divCenter">
				<h2><form onSubmit={ this.handleSubmit} className="formStyle">
					Event Name:<br/>
					<input type="text" placeholder="Cat Party" value={ this.state.name} onChange={ this.handleNameChange }/><br/>
					Description:<br/>
					<textarea id="groupDesc" name="Description" placeholder="Lots of Cats." rows="7" cols="30" value={ this.state.description} onChange={ this.handleDescriptionChange }></textarea><br/>
					Date of Event:<br/>
					<input type="text" placeholder="05/16/2019" value={ this.state.date } onChange={ this.handleDateChange }/><br/>
					Time of Event:<br/>
					<input type="text" placeholder="5:30 PM" value={ this.state.time} onChange={ this.handleTimeChange }/><br/>
					Location of Event:<br/>
					<input type="text" placeholder="Not the Ocean" value={ this.state.loc} onChange={ this.handleLocChange }/><br/>
          Image of Event:<br/>
					<input type="file" name="bannerGroup" accept="image/*"/><br/>
					<input type="submit" value="Submit"/>
				</form></h2>
			</div>
    )
  }
}

export default EventForm;
