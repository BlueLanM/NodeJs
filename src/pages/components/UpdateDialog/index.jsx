import React, { useState, useEffect, useRef } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import { TextField, Box } from "@mui/material"

import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"

import { useRequest } from "ahooks"
import { addUser } from "../../../api/user/index"

export default function index({ isOpen = false, onOk, onClose, getUserInfo }) {
	const [loginInfo, setLoginInfo] = useState()
	// console.log(getUserInfo)
	const handleClose = () => {
		// setOpen(false)
		if (typeof onClose === "function") {
			onClose()
		}
	}

	const handleChange = (e) => {
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })

		console.log(e.target.value)
	}
	return (
		<div>
			<Dialog open={isOpen} onClose={handleClose}>
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
						onClick={() => {
							onOk(loginInfo)
							setLoginInfo("")
						}}
					>
						确定
					</Button>
					<Button onClick={() => onClose()} autoFocus>
						取消
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
