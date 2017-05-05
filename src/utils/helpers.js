var axios = require('axios')

var helpers = {

  saveScore: function(userData) {
    return axios.post('/save', userData)
  },

  getScore: function(){
    return axios.post('/findScore')
  },

  saveMessage: function(userData) {
    return axios.post('/saveMessage', userData)
  },

  getMessage: function(){
    return axios.post('/getMessage')
  }
}

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers
