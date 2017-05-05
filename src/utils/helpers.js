var axios = require('axios')

var helpers = {

  saveScore: function(userData) {
    return axios.post('/save', userData)
  },

  getScore: function(){
    return axios.post('/findScore')
  }
}

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers
