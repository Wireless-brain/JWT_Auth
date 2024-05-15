import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {getData} from './database.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.get('/admin/home', authorizeUser, async (req, res) => {

    let msg = req.user.user + ", You have been authorized"
    let retData = await getData(req.user.user)
    if (retData == null){
        res.status(401).send({message: "Data not found"})
    }
    res.send({message: msg, fname: retData.fname, lname: retData.lname})

})

function authorizeUser(req, res, next) {

    let authHead = req.headers['authorization']
    let token = authHead && authHead.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        //console.log("Name of the user: ", user)
        req.user = user
        next()
    })

}

app.listen(4000, (err) => {
    console.log("Authorization server working on PORT: 4000")
})