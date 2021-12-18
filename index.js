const express = require("express");
const app = express();
const dt = require("dotenv");
const bp = require("body-parser");
var cors=require("cors");
dt.config();
const router = express.Router();

router.use(bp.json());
router.use(bp.urlencoded({extended: true}));
app.use("/", router); 

/*let corsOptions={
    origin:'http://localhost:3030',
    method : 'GET,POST,PUT,DELETE'
}
router.use(cors(corsOptions));*/
router.use(cors());
//Connect database
const mysql=require('mysql2');
var dbCon = mysql.createConnection({
    host    : process.env.MYSQL_HOST,
    user    : process.env.MYSQL_USERNAME,
    password    : process.env.MYSQL_PASSWORD,
    database    : process.env.MYSQL_DATABASE
});
dbCon.connect(function(err){
    if(err) throw err;
    console.log("Connected DB: "+process.env.MYSQL_DATABASE);
});

//Update Student
/*  Testing update a student
    url: http://localhost:3030/index
    method : put
    body: raw JSON
    {
       "student_info":{
            "StudentID" : 6288120,
            "Firstname" : "Pimpavee",
            "Lastname":"Saisamorn",
            "Present":"False",
        } 
    }
*/
router.put('/index',function(req,res){
    let student_id = req.body.student_info.StudentID;
    let attend = req.body.student_info.Present;

    if(!student_id||!attend){
        return res.status(400).send({error:student,message: 'Please provide student information'});
    }
    dbCon.query("UPDATE student_info SET Present = ? WHERE StudentID = ?",[attend,student_id],function(error,results){
        if(error) throw error;
        return res.send({error:false,data:results.affectedRows,message:'Student has been updated successfully.'})
    });
});

//Select Student
router.get('/index/:id',function(req,res){
    let student_id = req.params.id;

    if(!student_id){
        return res.status(400).send({error:student,message: 'Please provide student id.'});
    }
    dbCon.query('SELECT * FROM student_info WHERE StudentID=?',student_id,function(error,results){
        if(error) throw error;
        return res.send({error:false,data:results[0],message:'Student retrieved'})
    });
});
//Select all students
router.get('/index',function(req,res){
    dbCon.query('SELECT * FROM student_info',function(error,results){
        if(error) throw error;
        return res.send({error:false,data:results,message:'Student list.'});
    });
});

/* Server listening */
app.listen(process.env.PORT, function () {
    console.log("Server listening at Port "+process.env.PORT);
});