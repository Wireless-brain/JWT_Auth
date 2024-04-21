import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotnev from 'dotenv'

dotnev.config()
const app = express()
app.use(express.json())
app.use(cors())

let refTokens = []

app.post('/login',(req, res) => {

    console.log(req.url)

    let username = req.body.username
    let password = req.body.password

    console.log(username,password)

    let token = generateToken(username)
    let refToken = jwt.sign({ user: username }, process.env.REFRESH_TOKEN)
    refTokens.push(refToken)

    res.status(201).send({reqToken: token, refreshToken: refToken})
})

app.post('/token', (req, res) => {

    let refTok = req.body.token
    if (refTok == null) return res.sendStatus(401)
    if (!refTokens.includes(refTok)) return res.sendStatus(403)

    jwt.verify(refTok, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403)
    let newReqTok = generateToken(user.user)
    res.send({reqToken: newReqTok})

    })
})

app.post('/logout', (req, res) => {

    let refTo = req.body.token

    if (!refTokens.includes(refTo)) return res.sendStatus(403)
    refTokens.pop(refTo)

    res.send({message: "Sucess"}).status(200)
})

function generateToken(user) {
    return jwt.sign({ user: user }, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '20s'})
}

app.listen(3000, (err) => {
    
    if (!err){
        console.log("Authentication server working on PORT: 3000")
    }
})