// const express = require("express")
// const app = express()
// const userLogin = require("./user_login.json")

// /*为app添加中间件处理跨域请求*/
// app.use(function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*")
// 	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With")
// 	res.header("Access-Control-Allow-Headers", "Content-Type")
// 	next()
// })
// // get方式监听/login请求
// app.post("/login", (req, res) => {
// 	// res.status(200),
// 	// 	//json格式
// 	// 	res.json(data)
// 	//在这里做点什么
// 	res.send(userLogin)
// })

// // 监听3300端口
// var server = app.listen(3300, function () {
// 	// var host = server.address().address
// 	var port = server.address().port

// 	console.log("服务器启动成功了端口是", port)
// })

// 引入express
const express = require("express")
//这个组件用于接收post数据
const bodyParser = require("body-parser")
// 创建服务器对象
const app = express()
const mysql = require("mysql")
const conn = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "root",
	database: "node",
	multipleStatements: true,
})
var query = function (sql, options, callback) {
	conn.getConnection(function (err, conne) {
		if (err) {
			callback(err, null, null)
		} else {
			conne.query(sql, options, function (err, results, fields) {
				//事件驱动回调
				callback(err, results, fields)
			})
			//释放连接，需要注意的是连接释放需要在此处释放，而不是在查询回调里面释放
			conne.release()
		}
	})
}

module.exports = query

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json({ type: "application/*+json" }))
//解决跨域
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Content-Type")
	res.header("Access-Control-Allow-Methods", "*")
	res.header("Content-Type", "application/json;charset=utf-8")
	next()
})
// 处理get请求
app.get("/data", (req, res) => {
	const sqlStr = "select * from user"
	conn.query(sqlStr, (err, results) => {
		if (err) return res.json({ err_code: 1, message: "数据不存在", affextedRow: 0 })
		res.json({ success_code: 200, message: results, affextedRow: results.affextedRow })
	})
})
app.get("/data/list", (req, res) => {
	const sqlStr = "select * from app_list"
	conn.query(sqlStr, (err, results) => {
		if (err) return res.json({ err_code: 1, message: "查找失败", affextedRow: 0 })
		res.json({ success_code: 200, message: results, affextedRow: results.affextedRow })
	})
})

//post请求
app.post("/user", (req, res) => {
	const user = req.body
	const sqlStr = "insert into user set ?"
	conn.query(sqlStr, user, (err, results) => {
		if (err) return res.json({ err_code: 1, message: "添加失败", affextedRow: 0 })
		res.json({
			err_code: 0,
			msg: "添加成功",
		})
	})

	console.log("接收", req.body)
})
app.post("/app_list", (req, res) => {
	const appList = req.body
	const sqlStr = "insert into app_list set ?"
	conn.query(sqlStr, appList, (err, results) => {
		if (err) return res.json({ err_code: 1, message: "添加失败", affextedRow: 0 })
		res.json({
			err_code: 0,

			msg: "添加成功",
		})
	})

	console.log("接收", req.body)
})
//delete请求
app.delete("/data/user/delete/:id", (req, res) => {
	const sqlStr = `delete from user where Id=${parseInt(req.params.id)}`
	console.log(req.params.id)
	conn.query(sqlStr, (err, results) => {
		if (err) return res.json({ err_code: 1, message: "删除失败", affextedRow: 0 })
		res.json({
			err_code: 0,
			msg: "删除成功",
		})
	})

	console.log("接收", req.body)
})

app.post("/data/user/update", (req, res) => {
	let users = req.body
	const sqlStr = `UPDATE user SET name = '${users.name}', age = '${users.age}', sex = '${users.sex}' WHERE Id = '${users.Id}'`
	console.log(users.Id)
	conn.query(sqlStr, (err, results) => {
		if (err) return res.json({ err_code: 1, message: "修改失败", affextedRow: 0 })

		res.json({
			err_code: 0,
			msg: "修改成功",
		})
	})

	console.log("接收", req.body)
})
//开启监听
app.listen(4000, () => {
	console.log("4000端口已经启动。。。")
})
