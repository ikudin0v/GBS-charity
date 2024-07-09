import API from "../api";
import { CONFIG } from "../config";
import { ICategory } from "../interfaces";
import httpService from "./http.service";


const endpoint = CONFIG.API_URL + "category/"

const categoriesService = {
	fetchAll: async () => {
		if (CONFIG.IS_SERVER) {
			const {data} = await httpService.get(endpoint)
			return data
		} else {
			const data = (await API.categories.fetchAll()) as ICategory[]
			return data
		}
	}
}

export default categoriesService