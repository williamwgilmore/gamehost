var axios = require('axios')

var helpers = {

  saveScore: function(userData) {
    console.log(userData)
    return axios.post('/save', userData)
  },

  showScore: function(){
    return axios.get('/highscores')
  }
}

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers
