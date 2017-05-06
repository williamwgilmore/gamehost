import React from 'react'
// import { Link } from 'react-router'
import './HighScore.css'

// import serverCall from '../../utils/helpers.js'

// const Chat = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
class HighScore extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <table className = 'table'>
          <thead>
            <tr>
              <th className= 'title text-center' colSpan= '2'>High Scores</th>
            </tr>
          </thead>
          <tbody>
            {this.props.score.map(function(score){
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