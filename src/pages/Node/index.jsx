import React, { useState, useEffect, useRef } from "react"
import { TextField, Button, Box } from "@mui/material"
import { useRequest } from "ahooks"
import { getUser, addUser, deleteUser, updateUser } from "../../api/user/index"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import DialogIn from "../components/Dialog"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import AppList from "../appList/index"
import { message, Popconfirm } from "antd"
// import $ from "jquery"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
}
function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	}
}
export default function NodeTest() {
	const [list, setList] = useState([])
	const [current, setCurrent] = useState(1)
	const [open, setOpen] = useState(false)
	const [popOpen, setPopOpen] = useState(false)
	const [update, setUpdate] = useState(false)
	const [userInfo, setUserInfo] = useState()
	const [id, setId] = useState("")
	const [loginInfo, setLoginInfo] = useState({
		Id: "",
		name: "",
		age: "",
		sex: "",
	})
	const [value, setValue] = React.useState(0)

	const handleChange = (e) => {
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
		console.log(e.target.value)
	}
	const handleOnChange = (event, newValue) => {
		setValue(newValue)
	}
	// $.get("http://localhost:4000/data", function (data) {
	// 	console.log(data)
	// })
	// getUser().then((res) => {
	// 	console.log(res)
	// })
	const ipt1 = useRef(null)
	const { run } = useRequest(addUser, {
		manual: true,
		onSuccess: (res) => {
			if (res.data.err_code === 0) {
				console.log(res.data)
				message.success(res.data.msg)
			} else {
				console.log(res.data)
				message.error(res.data.message)
			}
		},
	})
	const { run: run2, data } = useRequest(getUser, {
		onSuccess: (res) => {
			console.log(res.data)
			setList(res.data.message)
		},
	})

	const { run: run1 } = useRequest(deleteUser, {
		manual: true,
		onSuccess: (res) => {
			console.log(res.data)
			setCurrent(current + 1)
			if (res.data.err_code === 0) {
				console.log(res.data)
				message.success(res.data.msg)
			} else {
				console.log(res.data)
				message.error(res.data.message)
			}
		},
	})
	const { run: run3 } = useRequest(updateUser, {
		manual: true,
		onSuccess: (res) => {
			console.log(res.data)
			if (res.data.err_code === 0) {
				console.log(res.data)
				message.success(res.data.msg)
			} else {
				console.log(res.data)
				message.error(res.data.message)
			}
		},
	})
	const handleInsert = (item) => {
		run({ Id: item.Id, name: item.name, age: item.age, sex: item.sex })
	}

	const handleDelete = (index) => {
		console.log(index)
		setPopOpen(true)
	}
	const handleUpdate = (index) => {
		console.log(index)

		setId(String(index.Id))
		setUpdate(true)
		setUserInfo(index)
	}
	const onOk = (item) => {
		console.log(item)

		run3({ Id: id, name: item?.name, age: item?.age, sex: item?.sex })
		setUpdate(false)
	}
	const cancel = (e) => {
		message.error("取消删除")
	}
	useEffect(() => {
		run2()
	}, [current, open, update])
	const handleClose = () => {
		setOpen(false)
		setUpdate(false)
	}
	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			<Box sx={{ width: "50%" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs value={value} onChange={handleOnChange} aria-label="basic tabs example">
						<Tab label="用户管理" {...a11yProps(0)} />
						<Tab label="商品管理" {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<Box sx={{ width: "900px" }}>
						<div style={{ width: "500px" }}>
							<Button
								variant="contained"
								color="success"
								onClick={() => {
									setOpen(true)
								}}
							>
								添加人员
							</Button>
						</div>
						<DialogIn
							isOpen={open}
							onClose={() => handleClose()}
							onOk={(item) => {
								console.log(item)
								handleInsert(item)
								setOpen(false)
							}}
						/>
						<Dialog open={update} onClose={handleClose}>
							<DialogTitle id="responsive-dialog-title">修改</DialogTitle>
							<br />
							<DialogContent>
								<Box sx={{ width: "400px", height: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
									<TextField label="姓名" variant="outlined" name="name" onChange={(e) => handleChange(e)} />
									<TextField label="年龄" variant="outlined" name="age" onChange={(e) => handleChange(e)} />
									<TextField label="性别" variant="outlined" name="sex" onChange={(e) => handleChange(e)} />
								</Box>
							</DialogContent>
							<DialogActions>
								<Button
									autoFocus
									variant="outlined"
									onClick={() => {
										onOk(userInfo)
										setUserInfo("")
									}}
								>
									确定
								</Button>
								<Button onClick={() => handleClose()} autoFocus variant="outlined" color="error">
									取消
								</Button>
							</DialogActions>
						</Dialog>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 700 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="center">Id</TableCell>
										<TableCell align="center">姓名</TableCell>
										<TableCell align="center">年龄</TableCell>
										<TableCell align="center">性别</TableCell>
										<TableCell align="center">操作</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{list.map((item, index) => (
										<TableRow key={item.Id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
											<TableCell align="center">{item.Id}</TableCell>
											<TableCell align="center">{item.name}</TableCell>
											<TableCell align="center">{item.age}</TableCell>
											<TableCell align="center">{item.sex}</TableCell>
											<TableCell align="center">
												<Popconfirm
													title="确定删除吗"
													onConfirm={() => {
														run1({ id: item.Id })
														setCurrent(current + 1)
													}}
													onCancel={cancel}
													okText="Yes"
													cancelText="No"
												>
													<Button variant="outlined" color="error" size="small" onClick={() => handleDelete(item.Id)}>
														删除
													</Button>
												</Popconfirm>
												<Button variant="outlined" color="secondary" size="small" onClick={() => handleUpdate(item)}>
													修改
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<AppList />
				</TabPanel>
			</Box>
		</div>
	)
}
