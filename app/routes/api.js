var Student = require('../models/student')
var Kuaidi = require('../models/kuaidi')
var utils = require('../utils')

module.exports = function(router){

  router.use(function(req,res,next){
    console.log('Server received an api request');
    next();
  });


  //////dub for creating new student
  router.route('/student')
      .post(function(req,res){
          var student = new Student();
          student.name = req.body.name;
          student.package_info = [];

          student.save(function(err){
            if(err)
              res.send(err);
            res.json({message:'student added'});
          });
      })
  //lists all students and their package info
      .get(function(req,res){
        Student.find(function(err,students){
          if(err)
            res.send(err);
          //get complete JSON response, including Kuaidi objects
          Student.find({})
                 .populate('package_info')
                 .exec(function(error,students){
                   res.json({results:students});
                 })
        });
      });
  /////end of student route

  router.route('/kuaidi')
  //defines creation of new kuaidi
      .post(function(req,res){
          if(!req.body.number){
            res.json({message:'package id is missing'});
            return;
          };
          if(!req.body.id){
            res.json({message:'student id is  missing'});
            return;
          };

          Student.findById(req.body.id, function(err, student){
            if(err)
              res.send(err);
            var kuaidi = new Kuaidi();
            kuaidi.student_id = student._id;
            kuaidi.student_name = student.name;
            kuaidi.tracking_number = req.body.number;
            kuaidi.service_provider = req.body.provider;
            console.log('____'+req.body.provider);
            utils.findStates(kuaidi,function(kuaidi){
              kuaidi.save(function(err){
                if(err)
                  res.send(err);
                res.json({message:'kuaidi added to kuaidi collection\n'});
              });
              //update student collections at the same time
              student.package_info.push(kuaidi);
              student.save(function(err){
                if(err)
                  res.send(err);
                res.json({message:'kuaidi added to Student collection'});
              });
            });
          });
      })
      .get(function(req,res){
        Kuaidi.find(function(err,kuaidis){
          if(err)
            res.send(err);
          res.charset = 'utf-8';
          res.json({results:kuaidis});
        });
      });

  //get single kuaidi's info by id
  router.route('/kuaidi/:kuaidi_id')
      .get(function(req,res){
        Kuaidi.findById(req.params.kuaidi_id,function(err,kuaidi){
          if(err)
            res.send(err);
          //res.writeHead(200,{'Content-Type':'Applications/json','charset':'utf-8'});
          res.charset='utf-8';
          res.json(kuaidi);
        });
      })
      //update single kuaidi info
      .put(function(req,res){
        Kuaidi.findById(req.params.kuaidi_id,function(err,kuaidi){
          if(err)
            res.send(err);
            console.log('!!!!!!'+JSON.stringify(req.body));
          if(req.body.number){
            kuaidi.tracking_number = req.body.number;
            console.log('______'+req.body.number);
          }
          kuaidi.save(function(err){
            if(err)
              res.send(err);
            res.json({message:'Kuaidi updated'});
          });
        });
      });
};
