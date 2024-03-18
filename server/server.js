import express from 'express'
import { loginCheck,setData } from './database.js'
import formidable from 'express-formidable'

var app = express()

app.use(formidable())
app.use(express.json())

app.post("/Login", async (req,res)=>{

    let email = req.fields.Email
    let pass = req.fields.Password
    let id = await loginCheck(email,pass)
    console.log("Value of ID in POST: ",id)
    if (id>=0){
        res.send({status: true, data: id, message: "Login exists"})
    }
    else{
        res.send({status: false, message: "No such Login"})
    }
})

app.post("/Login/Register", async (req,res)=>{

    let fname = req.fields.Fname
    let lname = req.fields.Lname
    let email = req.fields.Email
    let pass = req.fields.Password

    let val = await setData(fname,lname,email,pass)

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