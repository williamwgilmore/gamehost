var axios = require('axios')

var helpers = {

  saveScore: function(userData) {
    console.log(userData)
    return axios.post('/save', userData)
  }
}

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers
