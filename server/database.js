const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

export function setData(Fnam,Lnam,mail,pass){

    var qry = "INSERT INTO REGWEB(FNAME,LNAME,EMAIL,PASSWORD) VALUES(?,?,?,?)"
    pool.query(qry,[Fnam,Lnam,mail,pass])
    return null
}

export function loginCheck(mail,pass)
{
    var qry = "SELECT * FROM REGWEB WHERE EMAIL=? AND PASSWORD=?"
    var [num] = pool.query(qry,[mail,pass])

    if (num.length>0){
        var qry1 = "SELECT ID FROM REGWEB WHERE EMAIL=? AND PASSWORD=?"
        var id = pool.query(qry1,[mail,pass])
        return id
    }
    else{
        return false
    }
}