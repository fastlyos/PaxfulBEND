var express = require('express');
var router = express.Router();
var config = require("../config/config");
var users = require('../model/user');
var common = require('../helpers/common');
// var mailtemplate = require('../model/mailtemplate');
var mailhelper = require('../helpers/mailhelper');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
	try {
		var request = req.body
		var email = req.body.email_ID
		// console.log("request",request)
		users.findOne({"email_ID":request.email_ID}).exec(function(err, resData) {
			console.log (resData)
			if (!resData) {
				request.Password = common.encrypt(request.Password);
				var myObj = new users(request)
				// console.log("myData",myObj)
				myObj.save()

				.then(item => {		
				// console.log("item",item)
					mailhelper.sendMail( email );
							datas = {
								status : true,
								message : "Registered Successfully"
							};
					    res.json(datas)
				var response = { status: 1,	message: "Datas inserted Successfully" }
				// res.json(response)
				})
				.catch(err => {
				console.log("err",err)
				var response = { status: 1, message: "Something went wrong" }
				res.json(response)
				})
			}
			else{
				datas = {
							status  : false,
							message : "User Already Exist"
						};
				    res.json(datas)	
			}
		})

	}
		
	catch(e) {
		console.log(e)
	}
})


router.post('/login', (req, res) => {
	try {
		var request = req.body;
		users.findOne({"email_ID":request.email_ID}).exec(function(err, resData) {
			// console.log(resData)
			// console.log(request)
			if(resData) {
				// console.log(request.Password)
			// if(resData.active == 1) {
					var pass = common.decrypt(resData.Password);
					// console.log("TsPassword", pass)
					if( pass == request.Password) {
							// console.log(request.Password)

						// let origin = common.createPayload(resData._id);
						datas = {
							status : true,
							// token : origin,
							message : "Logged In Successfull"
						};
				    res.json(datas)
					}
					else {
						datas = {
							status  : false,
							message : "Please check your Password"
						};
				    res.json(datas)						
					}
			// 	}
			// 	else {
			// 		datas = {
			// 			status  : false,
			// 			message : "Activation mail sent to your registered Mail-ID. Please check and activate your account"
			// 		};
			//     res.json(datas)
			// 	}
			}
			else {
				datas = {
					status  : false,
					message : "User Not Exist"
				};
		    res.json(datas)
			}
		})
	}
	catch(e) {
		console.log(e)
	}
})

router.get('/activate',common.tokenMiddleware, (req, res) => {
	try {
		var user = req.userId;
		users.updateOne({"_id":user},{$set:{"active":1}}).exec(function(err, resData) {
			console.log(resData)
			if(resData.nModified) {
				datas = {
					status : true,
				};
		    res.json(datas)
			}
			else {
				datas = {
					status  : false,
					error : "activate null"
				};
		    res.json(datas)
			}
		})
	}
	catch(e) {
		console.log(e)
	}
})


module.exports = router;
