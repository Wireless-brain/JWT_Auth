import express from 'express'
//import { loginCheck,setData } from './database.js'
import formidable from 'express-formidable'
import cors from 'cors'
import bodyParser from 'body-parser'

var app = express()

app.use(express.json())

app.use(formidable())
app.use(express.json())
app.use(cors())

app.use(bodyParser.json())

app.post("/login", async (req,res)=>{

    console.log("post request worked")
    //let email = req.body.email
    //let pass = req.body.password
    //let email = req.email
    //let pass = req.password

    /*let id = await loginCheck(email,pass)
    if (id>=0){
        res.send({status: true, data: id, message: "Login exists"})
    }
    else{
        res.send({status: false, message: "No such Login"})
    }*/
    //console.log(email,pass)
    res.send({status: true, message: "Login exists"})
})

app.post("/Login/Register", async (req,res)=>{

    let fname = req.fields.Fname
    let lname = req.fields.Lname
    let email = req.fields.Email
    let pass = req.fields.Password

    //let val = await setData(fname,lname,email,pass)

    if (val == 1){
        res.send({status: true, message: "Login registered"})
    }
    else{
        res.send({status: true, message: "Login already exists"})
    }
})

app.listen(8080,()=>{
    console.log("Server is running on port: 8080")
})