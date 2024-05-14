import mysql from 'mysql2'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

export async function setData(mail, pass, Fnam, Lnam){

    let qry2 = "SELECT * FROM angularPrjt WHERE EMAIL=?"
    let [num] = await pool.query(qry2,[mail])
    //console.log("Value in num: ", num[0])
    //console.log("Value of lenght: ",num.length)
    if (num.length>0){

        return 1
    }
    else{
        try {

            //let salt = await bcrypt.genSalt()
            let newPass = await bcrypt.hash(pass, 10)
            
            //console.log("Salt and newPAss: ",salt, newPass)
            let qry = "INSERT INTO angularPrjt(FNAME, LNAME, EMAIL, PASSWORD) VALUES(?,?,?,?)"
            await pool.query(qry,[Fnam,Lnam,mail,newPass])
            //console.log("Data inserte")
            let qry2 = "INSERT INTO tknHldr(EMAIL, TOKEN) VALUES(?, ?)"
            await pool.query(qry2, [mail, null])
    
        }
        catch{
            //console.log("Error in inserting data")
            return 2
        }
        return 3
    }
}

export async function loginCheck(mail,pass)
{
    let qry = "SELECT PASSWORD FROM ANGULARPRJT WHERE EMAIL=?"
    let [num] = await pool.query(qry,[mail])
    console.log("Password from the DB: ", num[0].PASSWORD)
    try{
        if (await bcrypt.compare(pass, num[0].PASSWORD)){
    
            return 1
            // let qry1 = "SELECT ID FROM REGWEB WHERE EMAIL=? AND PASSWORD=?"
            // let id = await pool.query(qry1,[mail,pass])
            // return id[0][0].ID
        }
        else{
            return -1
        }
    }
    catch{
        return 0
    }
}

export async function storeToken(mail, refTkn) {

    let qy = "UPDATE TKNHLDR SET TOKEN=? WHERE EMAIL=?"
    await pool.query(qy, [refTkn, mail], (err) =>{
        if (err){
            return -1
        }
    })

    return 1
}

export async function ifTknValid(refTk){

    let qre = "SELECT EMAIL FROM TKNHLDR WHERE TOKEN=?"
    let [ml] = await pool.query(qre, [refTk])
    console.log("Mail id: ", ml[0])
    if (ml[0] != null){
        return ml[0].EMAIL
    }
    else{
        return null
    }
}

export async function dltToken(mail){
    let qre = "UPDATE TKNHLDR SET TOKEN=? WHERE EMAIL=?"
    await pool.query(qre, [null, mail], (err) => {
        if (err) return -1
    })
    return 1
}