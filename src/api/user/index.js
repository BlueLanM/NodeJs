import api from "../../utils/service"

export function getUser(params) {
	return api({
		url: "http://localhost:4000/data",
		method: "get",
		params,
	})
}

export function getList(params) {
	return api({
		url: "http://localhost:4000/data/list",
		method: "get",
		params,
	})
}

export function addUser(data) {
	return api({
		url: "http://localhost:4000/user",
		method: "post",
		data,
	})
}

export function addList(data) {
	return api({
		url: "http://localhost:4000/app_list",
		method: "post",
		data,
	})
}

export function deleteUser(params) {
	return api({
		url: `http://localhost:4000/data/user/delete/${JSON.stringify(params.id)}`,
		method: "delete",
		params,
	})
}
export function deleteList(params) {
	return api({
		url: `http://localhost:4000/data/list/delete/${JSON.stringify(params.id)}`,
		method: "delete",
		params,
	})
}

export function updateUser(data) {
	return api({
		url: `http://localhost:4000/data/user/update`,
		method: "post",
		data,
	})
}
export function updateList(data) {
	return api({
		url: `http://localhost:4000/data/list/update`,
		method: "post",
		data,
	})
}
