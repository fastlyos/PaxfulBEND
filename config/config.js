if(process.env.NODE_ENV == 'devel')
{
	var environ = 'devel';
}
else
{
	var environ = 'prod';
}
module.exports = require("./"+environ+".js");