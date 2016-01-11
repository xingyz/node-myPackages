var http = require('http');

module.exports = function(router){

  router.use(function(req,res,next){
    console.log('Server received a html request');
    next();
  });

  router.route('/kuaidi')
    .get(function(req,res){
      var options = {
        host:'localhost',
        port:'8080',
        method:'GET',
        path:'/api/kuaidi',
        headers: { 'Content-Type': 'application/json','charset':'utf-8' }
      }
      var json_response = '';
      var req =http.request(options, function(response){
        response.on('data', function(chunk){
          json_response += chunk;
        });
        response.on('end',function(){
          var parsed_json = JSON.parse(json_response);
          res.render('index',{title:'Kuaidi',message:parsed_json});
        })
      });
      req.on('error',function(e){
        console.log(e);
      })
      req.end();
  })
   .post(function(req,res){
     var data = JSON.stringify(req.body);
     var options = {
       host:'localhost',
       port:'8080',
       method:'POST',
       path:'/api/kuaidi',
       headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'charset':'utf-8'
       }
     };
     var json_response = '';
     var post =http.request(options, function(response){
       response.on('data', function(chunk){
         json_response += chunk;
       });
       response.on('end',function(){
         res.redirect('/kuaidi');
       })
     });
     post.on('error',function(e){
       console.log(e);
     })
     post.write(data);
     post.end();
   });

  router.route('/kuaidi/:id')
    .get(function(req,res){
      var options = {
        host:'localhost',
        port:'8080',
        method:'GET',
        path:'/api/kuaidi/'+req.params.id,
        headers: { 'Content-Type': 'application/json','charset':'utf-8' }
      }
      var json_response = '';
      var req =http.request(options, function(response){
        response.on('data', function(chunk){
          json_response += chunk;
        });
        response.on('end',function(){
          var parsed_json = JSON.parse(json_response);
          res.render('edit',{message:parsed_json});
        })
      });
      req.on('error',function(e){
        console.log(e);
      });
      req.end();
    })
    .put(function(req,res){
      var data = JSON.stringify(req.body);
      var options = {
        host:'localhost',
        port:'8080',
        method:'PUT',
        path:'/api/kuaidi/'+req.params.id,
        headers: {
         'Content-Type': 'application/json',
         'Content-Length': Buffer.byteLength(data),
         'charset':'utf-8'
        }
      }
      var json_response = '';
      //console.log('_____'+req.params.id);
      var put =http.request(options, function(response){
        response.on('data', function(chunk){
          json_response += chunk;
        });
        response.on('end',function(){
          res.redirect('/kuaidi/'+ req.params.id);
        })
      });
      put.on('error',function(e){
        console.log(e);
      });
      put.write(data);
      put.end();
    });
};
