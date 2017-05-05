import React from 'react'
// import { Link } from 'react-router'
import './HighScore.css'

// import serverCall from '../../utils/helpers.js'

// const Chat = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
class HighScore extends React.Component {
  constructor(props){
    super(props)
  }

  //Tutorial at
	//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
  render(){
    return(
      <div>
        <table className = 'table'>
          <thead>
            <td className= 'title text-center' colSpan= '2'>High Scores</td>
          </thead>
          <tbody>
            {this.props.score.map(function(score){
              console.log(score)
              return (
                <tr key = {score._id}><td>{score.username}</td><td>{score.score}</td></tr>
              )
            },this)}
          </tbody>
        </table>
      </div>
    )
  }
}

HighScore.propTypes = {
  score: React.PropTypes.array
//   isAuthenticated: React.PropTypes.bool.isRequired,
//   profile: React.PropTypes.object,
//   error: React.PropTypes.string,
//   onLoginClick: React.PropTypes.func.isRequired,
//   onLogoutClick: React.PropTypes.func.isRequired
}

export default HighScore