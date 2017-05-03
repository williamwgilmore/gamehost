import React from 'react'
// import { Link } from 'react-router'
// import './Header.css'

import serverCall from '../../utils/helpers.js'

// const Chat = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
class HighScore extends React.Component {
  request(){
    serverCall.showScore()
    .then(function(response){
      console.log('response')
      console.log(response.data)
    }.bind(this))
  }

  ComponentWillMount(){
    this.request()
  }
  //Tutorial at
	//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
  render(){
    return(
      <div onClick={this.request}>
        HighScore
      </div>
    )
  }
}

// HighScore.propTypes = {
//   isAuthenticated: React.PropTypes.bool.isRequired,
//   profile: React.PropTypes.object,
//   error: React.PropTypes.string,
//   onLoginClick: React.PropTypes.func.isRequired,
//   onLogoutClick: React.PropTypes.func.isRequired
// }

export default HighScore