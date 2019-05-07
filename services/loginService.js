const dao = require("../dbCon.js");

exports.userLogin = (username, password) => {
    con = dao.connect();
    let sql = "select * from aroma.user_login where username = "+con.escape(username) +"and password = "+con.escape(password);
    // let values = [
    //     {username, password}
    // ];
    new Promise((resolve,reject) => {
    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length!=0) {
            console.log("auth");
            console.log(result);
            return resolve("authenticated");
        }
        else {
            console.log("not auth");
            return resolve("unauthenticated");
        }
    })
});
}


exports.chefLogin = (username, password) => {
    con = dao.connect();
    let sql = "select * from aroma.chef_login where username = "+con.escape(username) +"and password = "+con.escape(password);
    // let values = [
    //     {username, password}
    // ];
    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length!=0) {
            console.log("auth");
            console.log(result);
            return result;
        }
        else {
            console.log("not auth");
            return "unauthenticated";
        }
    })
}