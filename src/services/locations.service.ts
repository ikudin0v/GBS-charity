import API from "../api";
import { CONFIG } from "../config";
import { ILocation } from "../interfaces";
import httpService from "./http.service";


const endpoint = CONFIG.API_URL + "location/"

const locationsService = {
	fetchAll: async () => {
		if (CONFIG.IS_SERVER) {
			const {data} = await httpService.get(endpoint)
			return data
		} else {
			const data = (await API.locations.fetchAll()) as ILocation[]
			return data
		}
	}, 
	getById: async (id:string) => {
		if (CONFIG.IS_SERVER) {
			const {data} = await httpService.get(endpoint + id)
			return data
		} else {
			const data = (await API.locations.getById(id)) as ILocation
			return data
		}
	}
}

export default locationsService