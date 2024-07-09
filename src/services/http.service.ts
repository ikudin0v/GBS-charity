import axios from "axios"
import { toast } from "react-toastify"

const myAxios = axios.create()

myAxios.interceptors.request.use(
	async function (config: any) {
		return config
	},
	function (err) {
		return Promise.reject(err)
	}
)

myAxios.interceptors.response.use(
	(res) => {
		return res
	},
	(err) => {
		if (err.response && err.response.status >= 400 && err.response.status < 600) {
			console.log("Unexpected error: " + err.response.data.error.message)
			toast.error("Ошибка сервера [" + err.response.status + "].\n" + err.response.data.error.message)
		}
		return Promise.reject(err)
	}
)

const httpService = {
	get: myAxios.get,
	post: myAxios.post,
	put: myAxios.put,
	patch: myAxios.patch,
	delete: myAxios.delete
}
export default httpService