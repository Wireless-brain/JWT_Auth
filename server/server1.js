import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotnev from 'dotenv'
import {setData, loginCheck, storeToken, ifTknValid, dltToken} from './database.js'
import cookieParser from 'cookie-parser'

dotnev.config()
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))

app.use(express.static('frontEnd'))

app.post('/login', async (req, res) => {

    //console.log(req.url)

    let username = req.body.email
    let password = req.body.password
    //console.log(username,password)

    let retVal = await loginCheck(username, password)
    //console.log("Value returned by loginCheck(): ", retVal)
    if (retVal == 1) {

        let token = generateToken(username)
        let refToken = jwt.sign({ user: username }, process.env.REFRESH_TOKEN)
        //refTokens.push(refToken)

        const tme = 100 * 365 * 24 * 60 * 60 * 1000


        let resL= await storeToken(username, refToken)
        if (resL == 1){
            res.cookie("refToken",refToken, {
                expires: new Date(Date.now() + tme),
                httpOnly: true
            }).status(201).send({status: true, reqToken: token})
        }
        else{
            res.status(401).send({message: "Token storage error"})
        }
        //res.status(201).send({"message": "Sign in Successful"})
    }
    else if (retVal == -1){
        res.status(401).send({status: false, message: "Inavalid username or password"})
    }
    else {
        res.status().send({status: false, reqToken: "", refreshToken: ""})
    }


})

app.post('/signUp', async (req, res) => {
   // console.log("Requested URL: ",req.url)

    let email = req.body.email
    let pass = req.body.password
    let fname = req.body.fname
    let lname = req.body.lname
    let prof = req.body.profile
    let abt = req.body.about
    let mob = req.body.mobile

    let rslt = await setData(email, pass, fname, lname, prof, abt, mob)
    //console.log("Value returend by function: ",rslt)
    if (rslt == 3){
        res.status(201).send({status: true, message: "Sign up Successfull"})
    }
    else if (rslt == 2){
        res.status(401).send({status: false, message: "Error during insertion"})
    }
    else{
        res.status(400).send({status: false, message: "User already exists"})
    }
})

app.post('/token', async (req, res) => {

    //console.log(req.url)
    let refTok = req.cookies.refToken
    if (refTok == null) {
        //console.log("No valid token, it is null: ", refTok)
        return res.status(401).send({message: "No valid token"})
    } 
    // if (!refTokens.includes(refTok)) return res.sendStatus(403)
    //console.log("Token in cookie for refresh: ", refTok)
    let vl = await ifTknValid(refTok)
    //console.log("Value returned by ifTknValid(): ", vl)
    if (vl != null){

        jwt.verify(refTok, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.status(403).send({message: "Verification of token failed"})
        if (user.user == vl){ 
            let newReqTok = generateToken(user.user)
            res.status(200).send({status: true, message: "New access token",reqToken: newReqTok})
        }
        else{
            res.status(401).send({message: "User of refresh token not matching"})
        }
    
        })
    }
    else{
        res.status(401).send({message: "Token not matching the user"})
    }

})

app.post('/logout', async (req, res) => {

    // let refTo = req.body.token

    let refTo = req.cookies.refToken
    //console.log(req.url)
    //console.log("Cookies: ", req.cookies)
    // if (!refTokens.includes(refTo)) return res.sendStatus(403)
    // refTokens.pop(refTo)
    let nvl = await ifTknValid(refTo)

    if (nvl != null){
        jwt.verify(refTo, process.env.REFRESH_TOKEN, async (err, user) => {
            if (err) return res.status(401).send({message: "Verification error"})
            //console.log("Value in /logout from ifValidTkn(): ", nvl)
            //console.log("Value of user in /logout from verify: ", user)

            if (nvl == user.user){
                let nlv = await dltToken(user.user)
                if (nlv == 1){
                    res.cookie("refToken", '', {
                        expires: new Date(0),
                        httpOnly: true
                    })
                    .send({message: "Logout Sucess"}).status(200)
                }
                else{
                    res.send({message: "Logout unsuccessfull"}).status(401)
                }
            }
            else{
                res.status(400).send({message: "Invalid Refresh Token"})
            }
        })
    }

})

function generateToken(user) {
    return jwt.sign({ user: user }, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '20s'})
}


app.listen(3000, (err) => {
    
    if (!err){
        console.log("Authentication server working on PORT: 3000")
    }
})