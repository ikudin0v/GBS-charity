import API from "../api";
import { CONFIG } from "../config";
import { IPartialPerson, IPerson } from "../interfaces";
import httpService from "./http.service";


const endpoint = CONFIG.API_URL + "person/"

const personsService = {
	fetchAll: async () => {
		if (CONFIG.IS_SERVER) {
			const {data} = await httpService.get(endpoint)
			return data
		} else {
			const data = (await API.persons.fetchAll()) as IPartialPerson[]
			return data
		}
	}, 
	getById: async (id:string) => {
		if (CONFIG.IS_SERVER) {
			const {data} = await httpService.get(endpoint + id)
			return data
		} else {
			const data = (await API.persons.getById(id)) as IPerson
			return data
		}
	}
}

export default personsService