var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost', //host地址
    port:3306, //端口号
    user: 'root', //连接数据库时的账号
    password: 'root',//连接数据库时的密码
    database: 'uniapp' ,//需要连接的数据库
	timezone: '+08:00', // 明确设置时区
	dateStrings: true   // 禁用日期类型自动转换 
});
module.exports = connection;
// module.exports = connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.message);
//     return;
//   }
//   console.log('Connected to the MySQL database.');
// });
