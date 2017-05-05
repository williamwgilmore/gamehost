import React from 'react'
// import { Link } from 'react-router'
// import './Chat.css'

// import serverCall from '../../utils/helpers.js'

// const Chat = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
class Chat extends React.Component {
  constructor(){
    super()
    this.state = {message: []}
  }

  render(){
    return(
      <div>
        <p>Thank you</p>
      </div>
    )
  }
}

// HighScore.propTypes = {
//   score: React.PropTypes.array
//   isAuthenticated: React.PropTypes.bool.isRequired,
//   profile: React.PropTypes.object,
//   error: React.PropTypes.string,
//   onLoginClick: React.PropTypes.func.isRequired,
//   onLogoutClick: React.PropTypes.func.isRequired
// }

export default Chat