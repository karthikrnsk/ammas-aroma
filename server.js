// import express from 'express';
"use strict";
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dao = require("./dbCon.js");
const loginService = require("./services/loginService.js");
let ChefMenuModel = require('./models/chef-menu');
let GetMenuModel = require('./models/get-menu');
let OrderMenuModel = require('./models/order-menu');

let mongo = require('./mongodbCon')


// import cors from 'cors';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';

//import Issue from './models/Issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect('mongodb://[server]/issues');

const connection = dao.connect();


router.route('/userlogin').post(async (req, res) => {
    
    
    con = dao.connect();
    let sql = "select * from aroma.user_details where username = "+con.escape(req.body.username) +"and password = "+con.escape(req.body.password);
   
    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length!=0) {
            console.log("auth");
            console.log(result);
            return res.status(200).json({"auth": "authenticated", "locality": result[0].locality, "contact": result[0].contact, "userid": result[0].user_id, "emailid": result[0].email_id, "name": result[0].name, "address": result[0].address});
        }
        else {
            console.log("not auth");
            return res.json({"auth": "unauthenticated"});
        }
    })
    con.end();   

});

router.route('/updateUserLocation').post(async (req, res) => {
    let con1 = dao.connect();
    let sql = "replace into aroma.user_location values("+con1.escape(req.body.userid)+","+con1.escape(req.body.latitude)+","+con1.escape(req.body.longitude)+");";
    con1.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("successfully updated location of user");
            return res.status(200).json({"latitude": 'updated'});
        }
    })
    con1.end();

});

router.route('/cheflogin').post(async (req, res) => {
    
    
    con = dao.connect();
    let sql = "select * from aroma.chef_details where username = "+con.escape(req.body.username) +" and password = "+con.escape(req.body.password);
   
    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length!=0) {
            console.log("auth");
            console.log(result);
            chefLoginUpdate(result[0].chef_id, req.body.lat, req.body.lon);
            return res.status(200).json({"auth": "authenticated", "foodstyle": result[0].food_style, "locality": result[0].locality, "contact": result[0].contact, "chefid": result[0].chef_id, "emailid": result[0].email_id, "name": result[0].name, "ismenuset": result[0].done_menu});
        }
        else {
            console.log("not auth");
            return res.json({"auth": "unauthenticated"});
        }
    })
    con.end();   

});

router.route('/updateChefLocation').post(async (req, res) => {
    let con1 = dao.connect();
    // let sql = "insert into aroma.chef_location values("+con1.escape(req.body.chefid)+","+con1.escape(req.body.latitude)+","+con1.escape(req.body.longitude)+") ON DUPLICATE KEY update aroma.chef_location set latitude="+con1.escape(req.body.latitude)+", longitude="+con1.escape(req.body.longitude)+" where chef_id="+con1.escape(req.body.chefid)+";";
    let sql = "replace into aroma.chef_location values("+con1.escape(req.body.chefid)+","+con1.escape(req.body.latitude)+","+con1.escape(req.body.longitude)+");";
    con1.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("successfully updated location of chef");
            return res.status(200).json({"data": 'updated'});
        }
    })
    con1.end();

});


router.route('/userRegister').post(async (req, res) => {
    
    
    con = dao.connect();
    let sql = "insert into aroma.user_details (name, username, password, locality, contact, email_id, address) values("+con.escape(req.body.name) +", "+con.escape(req.body.username) +", "+con.escape(req.body.password)+", "+con.escape(req.body.locality)+", "+con.escape(req.body.contact)+", "+con.escape(req.body.emailid)+", "+con.escape(req.body.address)+")";
   
    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length!=0) {
            console.log("reg");
            console.log(result);
            return res.status(200).json({"reg": "registered"});
        }
        else {
            console.log("not reg");
            return res.json({"reg": "notregistered"});
        }
    })
    con.end();   

});



router.route('/chefRegister').post(async (req, res) => {
    
    
    con = dao.connect();
    let sql = "insert into aroma.chef_details (name, username, password, locality, contact, email_id, food_style, status) values("+con.escape(req.body.name) +", " +con.escape(req.body.username) +", "+con.escape(req.body.password)+", "+con.escape(req.body.locality)+", "+con.escape(req.body.contact)+", "+con.escape(req.body.emailid)+", "+con.escape(req.body.foodstyle)+", 'available')";
   
    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length!=0) {
            console.log("reg");
            console.log(result);            
            return res.status(200).json({"reg": "registered"});
        }
        else {
            console.log("not reg");
            return res.json({"reg": "notregistered"});
        }
    })
    con.end();   

});

router.route('/getChefs').post(async (req, res) => {
    
    
    con = dao.connect();
    let sql = "select * from aroma.chef_details cd INNER JOIN aroma.chef_location cl ON cd.chef_id = cl.chef_id";
   
    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length!=0) {
            var iter = 0;
            var arr=[];
            for(var i=0;i<result.length;i++) {
                var diff = getDistanceFromLatLonInKm(req.body.latitude, req.body.longitude, result[i].latitude, result[i].longitude);
                console.log("Hello "+diff);
                if(diff <= 3 && result[i].status == 'available' && result[i].done_menu == 'yes') {
                    arr[iter] = result[i];
                    iter = iter + 1;
                }
            }
            // console.log(result.length);
            // console.log(result);
            return res.status(200).json({"data":arr});
        }
        else {
            console.log("not reg");
            return res.json({"data": "no chefs"});
        }
    })
    con.end();   

});

//for Chef Dashboard
router.route('/getBookings').post(async (req, res) => {
    
    
    con = dao.connect();
    let sql = "select * from (aroma.bookings bk INNER JOIN aroma.user_details ud ON bk.user_id=ud.user_id) where bk.chef_id="+con.escape(req.body.chefid);
   
    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length!=0) {
            console.log(result.length);
            console.log(result);
            return res.status(200).json({"data":result});
        }
        else {
            console.log("not reg");
            return res.json({"data": "no bookings"});
        }
    })
    con.end();   

});

//For User Dashboard
router.route('/getPrevBookings').post(async (req, res) => {
    
    
    con = dao.connect();
    let sql = "select * from (aroma.bookings bk INNER JOIN aroma.chef_details ud ON bk.chef_id=ud.chef_id) where bk.user_id="+con.escape(req.body.userid)+" and bk.status = 'completed'";
   
    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length!=0) {
            console.log(result.length);
            console.log(result);
            return res.status(200).json({"data":result});
        }
        else {
            console.log("getPrevBooking no data");
            return res.json({"data": "no bookings"});
        }
    })
    con.end();   

});

router.route('/storeMenu').post(async (req, res) => {

        let data = new ChefMenuModel({
        chef_id: req.body.chefid,
        menu: req.body.chefMenuArray
        })

        data.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })
            
        console.log('inside store menu');
        updateMenuisSet(req.body.chefid);
        return res.json({"data": "stored"});
});

router.route('/orderMenu').post(async (req, res) => {

    let data = new OrderMenuModel({
    chef_id: req.body.chefid,
    menu: req.body.orderedMenu,
    cost: req.body.cost,
    person_count: req.body.personcount
    })

    data.save()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })
        
    console.log('inside order menu');
    // updateMenuisSet(req.body.chefid);
    return res.json({"data": "stored"});
});

router.route('/getMenu').post(async (req, res) => {

    // let data = new GetMenuModel({
    // chef_id: req.body.chefid,    
    // })

    GetMenuModel.find({
        chef_id: req.body.chefid
    })
    .then(doc => {
        console.log(doc);
        return res.json({"data": doc});
    })
    .catch(err => {
        console.error(err)
        return res.json({"data": 'error'});
    })
        
    console.log('inside get menu');
    
    // return res.json({"data": });
});

router.route('/bookChef').post(async (req, res) => {
    
    var cfkey = 0;
    cfkey = Math.floor(Math.random() * 10000 + Math.random()*1000);
    console.log(cfkey);
    con = dao.connect();
    let sql = "insert into aroma.bookings (user_id, chef_id, status, date,cfkey) values("+con.escape(req.body.userid)+","+con.escape(req.body.chefid)+", 'booked','"+new Date().toISOString()+"',"+con.escape(cfkey)+");";
    // updateChefDetails(req.body.chefid);
    con.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("auth");
            console.log(result);
            updateChefDetails(req.body.chefid, res, cfkey);
            getUserMailDetails(req.body.chefid, req.body.emailid, req.body.userid, cfkey);
            // getChefMailDetails(req.body.userid);
            console.log("book chef completed");
            
        }
        
    })
    con.end();
    

});

router.route('/finishBooking').post(async (req, res) => {
    OrderMenuModel
  .findOneAndRemove({
    chef_id: req.body.chefid
  })
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })

    let con=dao.connect();
    let sql = "select * from aroma.bookings where status='booked' and chef_id= "+con.escape(req.body.chefid) +" and cfkey="+con.escape(req.body.cfkey);

    

    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length>0) {
            let con1 = dao.connect();
            sql = "update aroma.bookings set status='completed' where chef_id="+con1.escape(req.body.chefid)+" and cfkey="+con1.escape(req.body.cfkey);
            con1.query(sql, (err, result) => {
            if(err) throw err;
            else {
                
                console.log("success");
                updateChefFinish(req.body.chefid);
                return res.status(200).json({"data": "success"});
            }
        
        
            });
                    
            con1.end();
        }
        else {
            return res.status(200).json({'data': "failure"});
        }
    })
    con.end();
    

});

router.route('/updateChefProfile').post(async (req, res) => {
    
    
    con = dao.connect();
    let sql = "update aroma.chef_details set name="+con.escape(req.body.name)+", locality="+con.escape(req.body.locality)+", contact="+con.escape(req.body.contact)+", email_id="+con.escape(req.body.emailid)+", food_style="+con.escape(req.body.foodstyle)+" where chef_id = "+con.escape(req.body.chefid);
   
    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length!=0) {
            console.log("reg");
            console.log(result);            
            return res.status(200).json({"update": "updated"});
        }
        else {
            console.log("not reg");
            return res.json({"update": "notupdated"});
        }
    })
    con.end();   

});

router.route('/rateChef').post(async (req, res) => {
    
    
    con = dao.connect();
    let sql = "";
    if(req.body.rating == 'like') {
        sql = "select likes as rating from aroma.chef_details where chef_id="+con.escape(req.body.chefid);
        con.query(sql, (err, result) => {
            if(err) throw err;
            else if(result.length!=0) {
                console.log("reg");
                console.log(result);
                let newlikes = result[0].rating + 1;
                updateLikes(req.body.chefid, newlikes, res, req.body.bookingid);
                // return res.status(200).json({"update": "updated"});
            }
            else {
                console.log("not reg");
                return res.json({"data": "notupdated"});
            }
        })
    }
    else {
        sql = "select dislikes as rating from aroma.chef_details where chef_id="+con.escape(req.body.chefid);
        con.query(sql, (err, result) => {
            if(err) throw err;
            else if(result.length!=0) {
                console.log("reg");
                console.log(result);
                let newdislikes = result[0].rating + 1;
                updateDislikes(req.body.chefid, newdislikes, res, req.body.bookingid);
                // return res.status(200).json({"update": "updated"});
            }
            else {
                console.log("not reg");
                return res.json({"data": "notupdated"});
            }
        })
    }
   
    
    con.end();   

});

router.route('/updateUserProfile').post(async (req, res) => {
    
    
    con = dao.connect();
    let sql = "update aroma.user_details set name="+con.escape(req.body.name)+", locality="+con.escape(req.body.locality)+", contact="+con.escape(req.body.contact)+", email_id="+con.escape(req.body.emailid)+", address="+con.escape(req.body.address)+" where user_id = "+con.escape(req.body.userid);
   
    con.query(sql, (err, result) => {
        if(err) throw err;
        else if(result.length!=0) {
            console.log("reg");
            console.log(result);            
            return res.status(200).json({"update": "updated"});
        }
        else {
            console.log("not reg");
            return res.json({"update": "notupdated"});
        }
    })
    con.end();   

});

router.route('/logoutChef').post(async (req, res) => {
    let con1 = dao.connect();
    let sql = "update aroma.chef_details set status='away' where chef_id="+con1.escape(req.body.chefid);
    con1.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("successfully logged out");
            // console.log(result);
            return res.status(200).json({"logout": "success"});
        }
        
    });
    con1.end();

});

function updateMenuisSet(chefid) {
    con = dao.connect();    
    let sql = 'update aroma.chef_details set done_menu="yes" where chef_id='+con.escape(chefid);
    con.query(sql, (err, result) => {
        if(err) throw err;        
    })
}

function chefLoginUpdate(chefid, lat, lon) {
    console.log("inside login update fn");
    let con1 = dao.connect();
    let sql = "update aroma.chef_details set status='available' where chef_id="+con1.escape(chefid)+" and status='away'";
    con1.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("login success");
            // updateChefLocation(chefid, lat, lon);
        }
        
    });
    con1.end();

}

function updateChefDetails(chefid, res, cfkey) {

    let con1 = dao.connect();
    let sql = "update aroma.chef_details set status='booked' where chef_id="+con1.escape(chefid);
    con1.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("auth in updatechefdetails");
            // console.log(result);
            return getChefDetails(chefid, res, cfkey);
        }
        
    });
    con1.end();

}


function getChefDetails(chefid, res, cfkey) {

    let con2 = dao.connect();
    let sql = "select name,contact from aroma.chef_details where chef_id="+con2.escape(chefid);
    con2.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("auth in get chef details");
            //console.log(result);
            return res.status(200).json({"data": result, "cfkey": cfkey});            
        }
        
    });
    con2.end()

    // sendUserDetails()

}

function updateChefFinish(chefid, res) {

    let con1 = dao.connect();
    let sql = "update aroma.chef_details set status='available' where chef_id="+con1.escape(chefid);
    con1.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("updated")
            // return res.status(200).json({"data": "success"});
        }
        
    });
    con1.end();

}

function updateLikes(chefid, likes, res, bookingid) {

    let con1 = dao.connect();
    let sql = "update aroma.chef_details set likes="+con1.escape(likes)+" where chef_id="+con1.escape(chefid);
    con1.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("updated");
            updateRated(bookingid, res);
            // return res.status(200).json({"data": "updated"});
        }
        
    });
    con1.end();

}

function updateDislikes(chefid, dislikes, res, bookingid) {

    let con1 = dao.connect();
    let sql = "update aroma.chef_details set dislikes="+con1.escape(dislikes)+" where chef_id="+con1.escape(chefid);
    con1.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("updated chefdetails");
            updateRated(bookingid, res);
            // return res.status(200).json({"data": "updated"});
        }
        
    });
    con1.end();

}

function updateRated(bookingid, res) {
    let con = dao.connect();
    let sql = "update aroma.bookings set rated='true' where booking_id="+con.escape(bookingid);
    con.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("updated booking rated");
            return res.status(200).json({"data": "updated"});

        }
    })
    con.end();
}


function getUserMailDetails(chefid, usermail, userid, cfkey) {

    OrderMenuModel.find({
        chef_id: chefid
    })
    .then(doc => {
        console.log(doc);
        let con2 = dao.connect();
    let sql = "select name,contact,email_id from aroma.chef_details where chef_id="+con2.escape(chefid);
    con2.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("auth");
            console.log(result);
            sendUserMail(result[0].name, result[0].contact, result[0].email_id, usermail, cfkey, chefid, doc);    
            getChefMailDetails(userid, result[0].email_id, chefid, doc);        
        }
        
    });
    con2.end()
        
    })
    .catch(err => {
        console.error(err)
        return res.json({"data": 'error'});
    })
        
    console.log('inside get menu');


    // let con2 = dao.connect();
    // let sql = "select name,contact,email_id from aroma.chef_details where chef_id="+con2.escape(chefid);
    // con2.query(sql, (err, result) => {
    //     if(err) throw err;
    //     else {
    //         console.log("auth");
    //         console.log(result);
    //         sendUserMail(result[0].name, result[0].contact, result[0].email_id, usermail, cfkey, chefid);    
    //         getChefMailDetails(userid, result[0].email_id, chefid);        
    //     }
        
    // });
    // con2.end()

}

function getChefMailDetails(userid, chefmail, chefid, doc) {

    let con2 = dao.connect();
    let sql = "select name,contact,email_id,address from aroma.user_details where user_id="+con2.escape(userid);
    con2.query(sql, (err, result) => {
        if(err) throw err;
        else {
            console.log("auth");
            console.log(result);
            sendChefMail(result[0].name, result[0].contact, result[0].email_id, result[0].address, chefmail, chefid, doc);            
        }
        
    });
    con2.end()

}


async function sendUserMail(chefname, chefcontact, chefemailid, usermail, cfkey, chefid, doc) {
    // console.log(doc);
    let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail", // true for 465, false for other ports
    auth: {
      user: "ammasaroma1@gmail.com", // generated ethereal user
      pass: "aromakpr321" // generated ethereal password
    }
  });
  let doc1 = JSON.stringify(doc);
  doc = JSON.parse(doc1);
  let orderedmenu = "";
  for(var i=0;i<doc['0']['menu'].length;i++) {
      console.log(doc['0']['menu'][i])
      orderedmenu += "<p>"+doc['0']['menu'][i]['dish']+"</p>";
  }
  let htmstr = "<br><p><b>Chef Name: </b>"+chefname+"<br></p><p><b>Chef Contact: </b>"+chefcontact+"<br></p><p><b>Confirmation Key: </b>"+cfkey+"</p><br><p><b>Menu Ordered: </b>"+orderedmenu+"</p><p><b>Cost: </b>"+doc['0']['cost']+"</p><p><b>Person Count: </b>"+doc['0']['person_count']+"</p>";

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Ammas Aroma"<ammasaroma1@gmail.com>', // sender address
    to: usermail, // list of receivers
    subject: "Booking Confirmation", // Subject line
    text: "Booking", // plain text body
    html: htmstr // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}

async function sendChefMail(name, contact, emailid, address, chefmail, chefid, doc) {
    // console.log(doc);
    let account = await nodemailer.createTestAccount();
    let doc1 = JSON.stringify(doc);
    doc = JSON.parse(doc1);
    let orderedmenu = "";
    for(var i=0;i<doc['0']['menu'].length;i++) {
        console.log(doc['0']['menu'][i])
        orderedmenu += "<p>"+doc['0']['menu'][i]['dish']+"</p>";
    }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail", // true for 465, false for other ports
    auth: {
      user: "ammasaroma1@gmail.com", // generated ethereal user
      pass: "aromakpr321" // generated ethereal password
    }
  });

  let htmstr = "<br><p><b>Customer Name: </b>"+name+"<br></p><br><p><b>Contact: </b>"+contact+"<br></p><br><p><b>Address: </b>"+address+"<br></p><br><p><b>Menu Ordered: </b>"+orderedmenu+"</p><p><b>Cost: </b>"+doc['0']['cost']+"</p><p><b>Person Count: </b>"+doc['0']['person_count']+"</p>";

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Ammas Aroma"<ammasaroma1@gmail.com>', // sender address
    to: chefmail, // list of receivers
    subject: "Booking Confirmation", // Subject line
    text: "Booking", // plain text body
    html: htmstr // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {    

    var R = 6371e3; // metres
    var a1 = deg2rad(lat1);
    var a2 = deg2rad(lat2);
    var b1 = deg2rad(lat2-lat1);
    var b2 = deg2rad(lon2-lon1);
    var a = Math.sin(b1/2) * Math.sin(b1/2) +
            Math.cos(a1) * Math.cos(a2) *
            Math.sin(b2/2) * Math.sin(b2/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d/1000;
  }
  
function deg2rad(deg) {
    var pi = Math.PI;
  return deg * (pi/180);
  }


function getMenuOrder(chefid) {
    OrderMenuModel.find({
        chef_id: chefid
    })
    .then(doc => {
        console.log(doc);
        return Promise.resolve(doc);
    })
    .catch(err => {
        console.error(err)
        return res.json({"data": 'error'});
    })
        
    console.log('inside get menu');
}


app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));