import React, { useState, useEffect, useRef } from "react"
import { Button } from "@mui/material"
import { useRequest } from "ahooks"
import { Space, Table, Tag, Modal, Form, Input, message, Popconfirm } from "antd"
import { getList, addList, deleteList, updateList } from "../../api/user/index"

export default function index() {
	const [list, setList] = useState([])
	const [open, setOpen] = useState(false)
	const [update, setUpdate] = useState(false)
	const [current, setCurrent] = useState(1)
	const [listInfo, setListInfo] = useState({ Id: "", name: "", price: "", number: "" })
	const { run, data } = useRequest(getList, {
		manual: false,
		onSuccess: (res) => {
			console.log(res.data)
			setList(res.data.message)
		},
	})
	const { run: run1 } = useRequest(addList, {
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
	const { run: run2 } = useRequest(deleteList, {
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
	const { run: run4 } = useRequest(updateList, {
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
	const cancel = (e) => {
		message.error("取消删除")
	}
	const columns = [
		{
			title: "Id",
			dataIndex: "Id",
			key: "id",
			align: "center",
		},
		{
			title: "名称",
			dataIndex: "name",
			key: "name",
			align: "center",
		},
		{
			title: "价格",
			dataIndex: "price",
			key: "price",
			align: "center",
		},
		{
			title: "数量",
			key: "number",
			dataIndex: "number",
			align: "center",
		},
		{
			title: "操作",
			width: 300,
			key: "action",
			render: (_, record) => (
				<Space size="small">
					<Popconfirm
						title="确定删除吗"
						onConfirm={() => {
							setCurrent(current + 1)
							run2({ id: record.Id })
						}}
						onCancel={cancel}
						okText="Yes"
						cancelText="No"
					>
						<Button variant="outlined" color="error" size="small">
							删除
						</Button>
					</Popconfirm>

					<Button
						variant="outlined"
						color="secondary"
						size="small"
						onClick={() => {
							console.log(record)
							setListInfo(record)
							setUpdate(true)
						}}
					>
						修改
					</Button>
				</Space>
			),
			align: "center",
		},
	]

	const handleCancel = () => {
		setOpen(false)
		setUpdate(false)
	}
	const onFinish = (values) => {
		console.log(listInfo)
		run1({ Id: listInfo.Id, name: listInfo.name, price: listInfo.price, number: listInfo.number })
		setOpen(false)
	}
	const onFinishUpdate = (values) => {
		// console.log(listInfo)
		run4({ Id: listInfo.Id, name: listInfo.name, price: listInfo.price, number: listInfo.number })
		setUpdate(false)
		setCurrent(current + 1)
	}
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo)
	}
	useEffect(() => {
		run()
	}, [open, current])
	return (
		<div>
			<Button
				variant="contained"
				color="success"
				onClick={() => {
					setOpen(true)
				}}
			>
				添加商品
			</Button>
			<Modal title="添加商品" open={open} onOk={onFinish} onCancel={handleCancel}>
				<Form
					name="basic"
					labelCol={{
						span: 5,
					}}
					wrapperCol={{
						span: 18,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Id"
						name="Id"
						rules={[
							{
								required: true,
								message: "不可为空",
							},
						]}
					>
						<Input
							name="Id"
							onChange={(e) => {
								console.log([e.target.name])
								setListInfo({ ...listInfo, [e.target.name]: e.target.value })
							}}
						/>
					</Form.Item>

					<Form.Item
						label="名称"
						name="name"
						rules={[
							{
								required: true,
								message: "不可为空",
							},
						]}
					>
						<Input
							name="name"
							onChange={(e) => {
								console.log(e.target.value)
								setListInfo({ ...listInfo, [e.target.name]: e.target.value })
							}}
						/>
					</Form.Item>
					<Form.Item
						label="价格"
						name="price"
						rules={[
							{
								required: true,
								message: "不可为空",
							},
						]}
					>
						<Input
							name="price"
							onChange={(e) => {
								console.log(e.target.value)
								setListInfo({ ...listInfo, [e.target.name]: e.target.value })
							}}
						/>
					</Form.Item>
					<Form.Item
						label="数量"
						name="number"
						rules={[
							{
								required: true,
								message: "不可为空",
							},
						]}
					>
						<Input
							name="number"
							onChange={(e) => {
								console.log(e.target.value)
								setListInfo({ ...listInfo, [e.target.name]: e.target.value })
							}}
						/>
					</Form.Item>
				</Form>
			</Modal>
			<Modal title="修改商品" open={update} onOk={onFinishUpdate} onCancel={handleCancel}>
				<Form
					name="basic"
					labelCol={{
						span: 5,
					}}
					wrapperCol={{
						span: 18,
					}}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						label="名称"
						name="name"
						rules={[
							{
								required: true,
								message: "不可为空",
							},
						]}
					>
						<Input
							name="name"
							onChange={(e) => {
								console.log(e.target.value)
								setListInfo({ ...listInfo, [e.target.name]: e.target.value })
							}}
						/>
					</Form.Item>
					<Form.Item
						label="价格"
						name="price"
						rules={[
							{
								required: true,
								message: "不可为空",
							},
						]}
					>
						<Input
							name="price"
							onChange={(e) => {
								console.log(e.target.value)
								setListInfo({ ...listInfo, [e.target.name]: e.target.value })
							}}
						/>
					</Form.Item>
					<Form.Item
						label="数量"
						name="number"
						rules={[
							{
								required: true,
								message: "不可为空",
							},
						]}
					>
						<Input
							name="number"
							onChange={(e) => {
								console.log(e.target.value)
								setListInfo({ ...listInfo, [e.target.name]: e.target.value })
							}}
						/>
					</Form.Item>
				</Form>
			</Modal>
			<Table columns={columns} dataSource={list} />
		</div>
	)
}
