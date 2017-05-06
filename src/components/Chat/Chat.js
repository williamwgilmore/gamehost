import React from 'react'
// import { Link } from 'react-router'
import './Chat.css'

import serverCall from '../../utils/helpers.js'

// const Chat = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
class Chat extends React.Component {
  constructor(){
    super()
    this.state = {chatHistory: [''], newMessage: '', value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    this.getMessage()
  }

  getMessage(){
    serverCall.getMessage().then(function(response){
      this.setState({chatHistory: response.data})
    }.bind(this))
    // var objDiv = this.refs.chatbox
    // objDiv.scrollTop = objDiv.scrollHeight
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault()
    if (this.state.value === ''){
      return
    }
    var userData = {
      username: 'User',
      message: this.state.value
    }
    serverCall.saveMessage(userData).then(function(){
      this.getMessage()
    }.bind(this))
    this.setState({value: ''})
  }

  render(){
    return(
      <div>
      <h4 className= 'chatTitle text-center'>Chat</h4>
        <div id ='chat' ref='chatbox'>
          {this.state.chatHistory.map(function(message){
            return (
              <p key = {message._id}>{message.username}: {message.message}</p>
            )
          },this)}
        </div>
        <form>
          <div className="form-check">
            <label className="form-check-label">
              <input type="text" onChange={this.handleChange} value={this.state.value} className="form-control" placeholder="Enter message" />
            </label>
            <button className= 'btn' onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

// Chat.propTypes = {
//   chatHistory: React.PropTypes.string
//   score: React.PropTypes.array
//   isAuthenticated: React.PropTypes.bool.isRequired,
//   profile: React.PropTypes.object,
//   error: React.PropTypes.string,
//   onLoginClick: React.PropTypes.func.isRequired,
//   onLogoutClick: React.PropTypes.func.isRequired
// }

export default Chat