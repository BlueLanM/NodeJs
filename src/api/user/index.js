import api from "../../utils/service"

export function getUser(params) {
	return api({
		url: "http://localhost:4000/data",
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

export function deleteUser(params) {
	return api({
		url: `http://localhost:4000/data/user/delete/${JSON.stringify(params.id)}`,
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
