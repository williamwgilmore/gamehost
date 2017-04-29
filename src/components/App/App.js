import React from 'react'
import { HeaderContainer } from '../../containers'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  render() {
    return(
      <div>
        <HeaderContainer />
        <div className = 'container'>
          <div className = 'row'>
            <div className = 'col-md-12'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  checkLogin: React.PropTypes.func.isRequired
}

export default App
