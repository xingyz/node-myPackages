//utils.js
var http = require('http');
//call courier status api
module.exports = {
  fillStates: function(kuaidi, number){
    Array.prototype.push.apply(kuaidi.states,["arrived at Ottawa dispatch center","departed"]);
  },

  findStates: function(kuaidi,callback){
    var options = {
      host:'m.kuaidi100.com',
      method:'GET',
      path:'/queryvalid?type='+kuaidi.service_provider+'&postid='+kuaidi.tracking_number+"&id=1&valicode=''",
      headers: { 'Content-Type': 'application/json','charset':'utf-8'}
    }
    var json_response = '';
    var get =http.request(options, function(response){
      response.on('data', function(chunk){
        json_response += chunk;
      });
      response.on('end',function(){
        kuaidi.states = JSON.parse(json_response).data;
        callback(kuaidi);
      })
    });
    get.on('error',function(e){
      console.log(e);
    })
    get.end();
  }
}
