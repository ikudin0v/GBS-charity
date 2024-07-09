import API from "../api";
import { CONFIG } from "../config";
import { IBackendPartialOrganization, IFullOrganization, IPartialOrganization } from "../interfaces";
import httpService from "./http.service";


const endpoint = CONFIG.API_URL + "organization/"

const organizationsService = {
	fetchAll: async () => {
		if (CONFIG.IS_SERVER) {
			const {data} = await httpService.get(endpoint)
			return data
		} else {
			const data = (await API.organizations.fetchAll()) as IBackendPartialOrganization[]
			return data
		}
	}, 
	getById: async (id:string) => {
		if (CONFIG.IS_SERVER) {
			const {data} = await httpService.get(endpoint + id)
			return data
		} else {
			const data = (await API.organizations.getById(id)) as IFullOrganization
			return data
		}
	},
	search: async (text:string) => {
		if (CONFIG.IS_SERVER) {
			const {data} = await httpService.get(endpoint + "search?q=" + text)
			return data
		} else {
			const data = (await API.organizations.search(text)) as string[]
			return data
		}
	}
}

export default organizationsService