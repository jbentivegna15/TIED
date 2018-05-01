import React, {Component} from 'react';
import axios from 'axios';
import { APICONST } from '../urlConst'
//import styles from "../components/bootstrap.min.css"
//import other_styles from "./public/styles.css"

class MessageForm extends Component{

	constructor(props){
		super(props)
		this.state = {body:'', data:[]};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleBodyChange = this.handleBodyChange.bind(this);
		}

		handleBodyChange(e){
			this.setState({body: e.target.value});
		}

		handleSubmit(e){
			e.preventDefault();
			let to = this.state.data;
			let subject = 'NEW EVENT NOTICE FROM : ' + this.props.data.name;
			let body = this.state.body.trim();
			if (!body){
				alert('Please Enter a Message Before Sending.')
				return;
			}
			let data = {to:to, subject:subject, body:body}
			this.props.onMessageSubmit(data);
			this.setState = {subject:'', body:''};
		}

		async componentDidMount() {
			const unique = await [...new Set(this.props.data.attendees.map(attendees => attendees))]
			const userNodes = unique.map(async (attendees) => {
				const response = await axios.get(`${APICONST}/users/${attendees}`);
				return response.data.email;
			});
			const users = await Promise.all(userNodes);
			await this.setState({ data:users});
		}

	render(){
		return(
			<div className="divFont divCenter">
				<div id = 'right'>

					<h1>Event Emailer</h1>
					<form>
					<textarea cols="30" rows="7" required = 'required' name="body" value={this.state.body} placeholder="Enter your message here." onChange={this.handleBodyChange}></textarea>

					<div className="row">
						<div className="col-md-4"></div>
						<div className="form-group col-md-4">
							<button type="submit" onClick={this.handleSubmit} className="pageButton">Send</button>
						</div>
					</div>
					</form>
				</div>
			</div>
		)
	}
}

export default MessageForm;
