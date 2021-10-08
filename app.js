const nodemailer=require('nodemailer');
const multer=require('multer');
const bodyParser=require('body-parser')
const express=require('express');

const app=express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
var to;
var subject;
var body;



var Storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./images')
    },
    filename:function(req,file,callback){
        callback(null,file.fieldname+" "+Date.now()+file.originalname)
    }
})


var upload=multer({
    storage:Storage
}).single('images');



app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.sendFile('/index.html')
})

app.post('/sendemail',(req,res)=>{
    upload(req,res,function(err){
        if(err){
            console.log(err)
            return res.end('Something went wrong')
        }
        else{
            to=req.body.to
            subject=req.body.subject
            body=req.body.body
            

            console.log(to)
            console.log(subject)
            console.log(body)
            
            

            var transporter=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'akshaywohlig21@gmail.com',
                    pass:'Wohlig@123'
                }
            })

            var mailOptions={
                from:'akshaywohlig21@gmail.com',
                to:to,
                subject:subject,
                text:body,
               
                
                
            }
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log(err)
                }else{
                    console.log("Email Sent"+ info.response)

                    false.unlink(path,function(err){
                        if(err){
                            return res.end(err)
                        }
                        else{
                            console.log('deleted')
                            return res.redirect('/result.html')
                        }
                    })
                }
            })
        }
    })

})

app.listen(5000,()=>{
    console.log('App started on Port 5000')
})