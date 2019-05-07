var mysql = require("mysql");

exports.connect = () => {
    con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root"
});
return con;
}
    