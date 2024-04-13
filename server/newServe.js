import express from 'express'

import cors from 'cors'

var app = express()
app.use(express.json())

app.use(cors())

app.post("/login", (req,res)=>{

    console.log("Received post req: ",req.url)
    
    console.log("Email: ",req.body.email," Password: ",req.body.password)

    
    //res.send("Hallo World")
    res.status(201)

})

app.listen(8080,()=>{
    console.log("Server is running on port: 8080")
})