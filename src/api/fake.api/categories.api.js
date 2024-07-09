import { delay } from '../../utils/helpers';

export const categoriesAsObject = {
	cat1:{
			"_id": "17adca3eeb7f6ffeedfff001",
			"group": "Доступность",
			"name": "Доступно",
			"color": "#1BAD03",
			"__v": 0
	},
	cat2:{
			"_id": "17adca3eeb7f6ffeedfff002",
			"group": "Доступность",
			"name": "Недоступно",
			"color": "#ED4543",
			"__v": 0
	},
	cat3:{
			"_id": "17adca3eeb7f6ffeedfff003",
			"group": "Доступность",
			"name": "Частично",
			"color": "#294DF5",
			"__v": 0
	},
	cat11:{
			"_id": "17adca3eeb7f6ffeedfff011",
			"group": "Тип учреждения",
			"name": "Библиотеки",
			"__v": 0
	},
	cat12:{
			"_id": "17adca3eeb7f6ffeedfff012",
			"group": "Тип учреждения",
			"name": "Музеи",
			"__v": 0
	},
	cat13:{
			"_id": "17adca3eeb7f6ffeedfff013",
			"group": "Тип учреждения",
			"name": "Театры",
			"__v": 0
	},
	cat14:{
			"_id": "17adca3eeb7f6ffeedfff014",
			"group": "Тип учреждения",
			"name": "Концертные организации",
			"__v": 0
	},
	cat15:{
			"_id": "17adca3eeb7f6ffeedfff015",
			"group": "Тип учреждения",
			"name": "Другое",
			"__v": 0
	},
	cat21:{
			"_id": "17adca3eeb7f6ffeedfff021",
			"group": "Категория ОВЗ",
			"name": "Нарушения зрения",
			"__v": 0
	},
	cat22:{
			"_id": "17adca3eeb7f6ffeedfff022",
			"group": "Категория ОВЗ",
			"name": "Нарушения слуха",
			"__v": 0
	},
	cat23:{
			"_id": "17adca3eeb7f6ffeedfff023",
			"group": "Категория ОВЗ",
			"name": "Нарушения опорно-двигательного аппарата",
			"__v": 0
	},
	cat24:{
			"_id": "17adca3eeb7f6ffeedfff024",
			"group": "Категория ОВЗ",
			"name": "Ментальные нарушения",
			"__v": 0
	}
};

const categories = Object.keys(categoriesAsObject).map((key) => ({ ...categoriesAsObject[key] }));

// возвращает целиком все данные categories
const fetchAll = async () => {
	// if (CONFIG.IS_SERVER) {
	// 	const {data} = await httpService.get(CONFIG.API_URL + "category")
	// 	return data
	// } else {
		await delay(50);
		return categories;
	// }

};

export default {
  fetchAll,
};
