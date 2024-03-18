import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

export async function setData(Fnam,Lnam,mail,pass){

    let qry2 = "SELECT * FROM REGWEB WHERE EMAIL=? AND PASSWORD=?"
    let [num] = await pool.query(qry2,[mail,pass])
    if (num.length>0){

        return -1
    }
    else{
        
        let qry = "INSERT INTO REGWEB(FNAME,LNAME,EMAIL,PASSWORD) VALUES(?,?,?,?)"
        await pool.query(qry,[Fnam,Lnam,mail,pass])
        return 1
    }
}

export async function loginCheck(mail,pass)
{
    let qry = "SELECT * FROM REGWEB WHERE EMAIL=? AND PASSWORD=?"
    let [num] = await pool.query(qry,[mail,pass])
    if (num.length>0){
        let qry1 = "SELECT ID FROM REGWEB WHERE EMAIL=? AND PASSWORD=?"
        let id = await pool.query(qry1,[mail,pass])
        return id[0][0].ID
    }
    else{
        return -1
    }
}