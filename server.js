//1. npm intiation (express , express-validator, mysql2)
//npm init --yes

//2. create server
const express = require('express');
const app = express();

//3.roating server | the fathe file name website_wafa
app.use('/', express.static('./website')); //Root : ('/')

//help to send to database to read it
app.use(express.urlencoded({extended:false})); 

//help with the validation berore sending the form to the database
const {check, validationResult}=require('express-validator');


//5 read user inout
const formValidat = formValidate();  //upload.array("file"),
app.post('/server', formValidat,  (request, response)=>{
    //what comes from html
    const errors = validationResult(request);
    if(!errors.isEmpty()){

        const msg = "<h1>Your submission Have Error</h1>" + printErrors( errors.array() );
    
        response.send(msg);
    }
    else{

        const fname = request.body.fname;
        const gender = request.body.gender;
        const birth = request.body.birth;
        const language = request.body.language;
        const email = request.body.email;
        const mobile = request.body.contact;
        const service = request.body.service;
        const duedate = request.body.duedate;
        const message = request.body.detailReq;
        

        addUser(fname, gender, birth, language, email, mobile, service, duedate, message);

        //showes in a new page
        const msg="<h1>Your Information is submitted</h1><br><p>First Name: "+fname+ "<p>Gender: </p>"+gender+
        "<p>Birth Date: </p>"+birth+"<br><p>Email: </p>"+email+ "<p>Mobile: </p>"+mobile+"<br><p>Language: </p>"+language+
        "<p>Service: </p>"+service+"<p>Due Date: </p>"+duedate+ "<p>Details: </p>"+ message;

        response.send(msg);

    }

});


//4.server listening
app.listen(5500 , ()=>{
    console.log("This is Wafa Ali server !!!");
});

// to print error message all witj the app.post
function printErrors(errArray){
    let errors = [];

    for (let index = 0; index < errArray.length; index++) {

        let err = errArray[index]["msg"];

        let msg = "<p>-"+err+"</p>";

        errors.push(msg);
    }

    return errors.join("");
}

//CALLING NEXT MIDDLEWARE
// function formValidate(){
function formValidate(req,res,next){
    return[
        check('fname')
        .isLength({min:1, max:100})
        .withMessage('Firstname must be between 1 and 100')//length
        .trim().escape(),

        check('mobile')
        .isLength({min:12,max:12})
        .withMessage('Mobile must be exactly 12 digits')//length
        .isNumeric().withMessage('Mobile must consist of numbers only')//type
        .matches('966[0-9]{9}').withMessage('Mobile must be exactly 12 digits and start with 966')
        .trim().escape(), //sanitize and clean

        check('email')
        .isLength({min:2,max:100}).withMessage('Email must be between 2 and 100 chars in length')//length
        .trim()
        .escape(),

        next()
    ];

}

//7. connect to db
function addUser(fname, lname, gender, birth, language, email, mobile, service, duedate, message){
    
    //create connection with mysql
    const mysql = require("mysql2");

    let con=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        port: '3306',
        database: "forms",
    })
    con.connect(function(err){
        if(err) throw err;
        console.log("Database Connected Successfully")
        let sql="INSERT INTO `userform`(`fname`, `lname`, `email`, `contact`, `gender`, `language`, `birth`, `service`, `duedate`, `detailReq`) VALUES ('"+fname+"','"+lname+"','"+email+"','"+mobile+"','"+gender+"','"+language+"','"+birth+"','"+service+"','"+duedate+"','"+message+"')";
        con.query(sql,function(err){
            if(err) throw err;
            console.log("Data Inserted")
        })
    })

}