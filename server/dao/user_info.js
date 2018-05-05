const allConfig=require("../config")
const config=allConfig.database
const mysql=require("mysql")

const pool=mysql.createPool({
  
    user:config.USERNAME,
    password : config.PASSWORD,
    database : config.DATABASE
})
let query = function( sql, values ) {

    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          resolve( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  
  }
  
  let insertData = function( table, values ) {
    let _sql = "INSERT INTO ?? SET ?"
    console.log(table+"-------"+values)
    return query( _sql, [ table, values ] )
  }
  let select=function(table,keys){
    let  _sql =  "SELECT ?? FROM ?? "
    console.log(table+"---+++----"+keys)
    return query( _sql, [ keys, table ] )
  }
module.exports={
    query,
    insertData

}