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
import Paper from "@mui/material/Paper"
import Dialog from "../components/Dialog"
import UpDialog from "../components/UpdateDialog"
import Tooltip from "@mui/material/Tooltip"

// import $ from "jquery"

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
			console.log(res.data)
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
		},
	})
	const { run: run3 } = useRequest(updateUser, {
		manual: true,
		onSuccess: (res) => {
			console.log(res.data)
		},
	})
	const handleInsert = (item) => {
		run({ Id: item.Id, name: item.name, age: item.age, sex: item.sex })
	}
	const handleTooltipClose = () => {
		setPopOpen(false)
	}

	const handleDelete = (index) => {
		console.log(index)
		setPopOpen(true)
		run1({ id: index })
	}
	const handleUpdate = (index) => {
		console.log(index)

		setId(String(index.Id))
		setUpdate(true)
		setUserInfo(index)
	}
	const handleOk = (item) => {
		console.log(item)
		if (item.name === undefined || item.age === undefined || item.sex === undefined) {
			alert("不能为空")
		} else {
			run3({ Id: id, name: item?.name, age: item?.age, sex: item?.sex })
			setUpdate(false)
		}
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
			<Box sx={{ width: "900px" }}>
				<div style={{ width: "500px" }}>
					<Button
						variant="contained"
						onClick={() => {
							setOpen(true)
						}}
					>
						添加人员
					</Button>
				</div>
				<Dialog
					isOpen={open}
					onClose={() => handleClose()}
					onOk={(item) => {
						console.log(item)
						handleInsert(item)
						setOpen(false)
					}}
				/>
				<UpDialog isOpen={update} onClose={() => handleClose()} onOk={(item) => handleOk(item)} getUserInfo={userInfo} />
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
										<Button onClick={() => handleDelete(item.Id)}>删除</Button>

										<Button onClick={() => handleUpdate(item)}>修改</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</div>
	)
}
