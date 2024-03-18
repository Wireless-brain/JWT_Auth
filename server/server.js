import express from 'express'
import mysql from 'mysql2'
import formidable from 'express-formidable'

var app = express()

app.use(formidable())
app.use(express.json())

app.post("/login", async (req,res)=>{

    var email = req.body.email
    var pass = req.body.pass
    
})