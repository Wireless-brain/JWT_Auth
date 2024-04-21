import express from 'express'
import {loginCheck, setData} from "./database.js"
import cors from 'cors'

var app = express()
app.use(express.json())

app.use(cors())

app.post("/login", async (req,res)=>{

    //console.log("Received post req: ",req.url)
    
    let mail = req.body.email
    let pass = req.body.password
    
    //console.log("Email: ",req.body.email," Password: ",req.body.password)
    
    let a = await loginCheck(mail,pass)
    if (a>0){
        console.log("Login Succesfull")
    }
    else{
        console.log("Login unsuccessfull")
    }

    res.status(201)

})

app.post("/signUp",async (req,res) => {

    let fname = req.body.fname
    let lname = req.body.lname
    let mail = req.body.email
    let pass = req.body.password
    //console.log("Inside server POST: ",fname,lname,mail,pass)
    let d = await setData(fname,lname,mail,pass)
    if (d == -1){
        console.log("User already exists")
    }
    else if (d == 1){
        console.log("User created successfully")
    }

})

app.listen(8080,()=>{
    console.log("Server is running on port: 8080")
})