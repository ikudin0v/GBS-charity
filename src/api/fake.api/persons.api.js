import { CONFIG } from '../../config';
import { delay } from '../../utils/helpers';
import httpService from '../../services/http.service';

export const personsAsObject = {
  doctor: {
    _id: '1',
    name: 'Доктор Иванов',
    info: 'Протоиерей Русской православной церкви, один из самых авторитетных миссионеров в Российской империи, профессор Московской духовной академии.С 1910 года наряду с Благотворительным обществом в приходе Матфиевской церкви на Петербургской стороне под председательством Боголюбова Д.И. действовало миссионерское Общество ревнителей веры и православия во имя Распятого Христа, а с 1914 года Братство Воскресения Христа.',
    persons: ['2'],
    links: [
      'Попечительство императрицы Марии Фёдоровны о глухонемых : [историческая справка]$http://encspb.ru/object/2815811872?lc=ru',
      'Векслер А.Ф. Попечитель // Родина. 1992. № 11/12. С. 123-128$https://ya.ru',
    ],
    gallery: [
      'https://charity-old.lbspb.ru/system/pages/000/012/67/images/small/051168e8c4c4d69664e59b3afbd011a9fdd74925.jpg?1674309681',
    ],
  },
  waiter: {
    _id: '2',
    name: 'Официант Петров',
    info: 'Государственный и общественный деятель, основатель и создатель системы попечения над слепыми в России.Был самарским губернатором (1853-1861), членом Государственного совета (1870-1882); возглавлял образованную в его составе Комиссию о тюремной реформе (1877) и Главное Попечительство о семьях воинов, образованное в связи с русско-турецкой войной (1877-1880); управлял Канцелярией Ведомства учреждений Императрицы Марии (1882-1885); председательствовал в Попечительском совете заведений общественного призрения в Санкт-Петербурге (1883-1885) и пр.Последние годы жизни посвятил организации попечительства о слепых в России. По его инициативе 13 февраля 1881 г. было организовано Попечительство императрицы Марии Александровны о слепых, которое он возглавлял до 1895 г.Изучал иностранный опыт в этой области. Основал Александро-Мариинское училище слепых (1880), организовал мастерские для взрослых слепых (1893), которые расположились в здании, выстроенном на его собственные средства. К концу его деятельности в России работали: 21 училище для слепых, мастерские для взрослых, 2 приюта и 3 лечебницы для слепых. Его именем названа улица в Санкт-Петербурге',
    persons: ['1'],
    links: [
      'Попечительство императрицы Марии Фёдоровны о глухонемых : [историческая справка]$http://encspb.ru/object/2815811872?lc=ru',
      'Векслер А.Ф. Попечитель // Родина. 1992. № 11/12. С. 123-128$https://ya.ru',
    ],
    gallery: [
      'https://charity-old.lbspb.ru/system/pages/000/012/58/images/small/9a764fe279e1b8a2397244b4596ab51cddd373e6.jpg?1669640979',
      'https://charity-old.lbspb.ru/system/pages/000/012/48/images/small/9a2b86cfd66688829144b860f22a6fe463a4febd.jpg?1666792303',
    ],
  },
  physics: {
    _id: '3',
    name: 'Физик Сидоров',
    info: 'Филантроп, основатель и первый редактор благотворительной газеты «Русский инвалид», масон, член ложи «Полярная звезда» в Санкт-Петербурге (1809-10).В январе 1813 г. задумал издавать газету «Русский Инвалид», с тем чтобы весь доход от издания, за вычетом издержек, «употребить на вспоможение инвалидам, солдатским вдовам и сиротам». Участие в создании газеты приняли многие известные сановники империи и члены императорской фамилии. 1 февраля 1813 г. первый номер газеты увидел свет. Вскоре число подписчиков увеличилось до 800 человек. Крупные пожертвования, стекавшиеся в руки Пезаровиуса, побудили его образовать неприкосновенный инвалидный капитал, составивший через год 395 000 рублей. Капитал этот он передал в 1814 г. в учрежденный Александром I комитет о раненых, членом которого он был назначен. К концу 1815 г. на основе инвалидного капитала постоянное пособие получали уже 1200 инвалидов. Император Александр I 21 февраля 1815 г. удостоил Пезаровиуса рескриптом и орденом Св. Анны 2-й степени с алмазами, распорядился продолжать издание газеты, а капитал передать в Комитет для вспомоществования неимущим изувеченным воинам. Указом от 21 декабря 1815 г. 1200 раненых нижних чинов передавались на попечение Комитета с выплатой пособий в размерах, установленных Пезаровиусом. Будучи введен в состав комитета, Пезаровиус оставался редактором газеты до 1822 г. В 1833–1847 гг. Пезаровиус состоял президентом Санкт-Петербургской Евангелическо-лютеранской консистории, вице-президентом которой он был с 1819 г. Похоронен на лютеранском Смоленском кладбище Санкт-Петербурга с воинскими почестями по указанию императора Николая I. Имел российский орден Св. Станислава 1-й степени.',
    persons: ['1', '2'],
    links: [
      'Попечительство императрицы Марии Фёдоровны о глухонемых : [историческая справка]$http://encspb.ru/object/2815811872?lc=ru',
      'Векслер А.Ф. Попечитель // Родина. 1992. № 11/12. С. 123-128$https://ya.ru',
    ],
    gallery: [
      'https://charity-old.lbspb.ru/system/pages/000/013/33/images/small/449bbbf7ae0f95c652d2b2725e00d21ed893b965.jpg?1699626566',
    ],
  },
  engineer: {
    _id: '4',
    name: 'Инженер Кукушкина',
    info: 'Супруга российского императора Николая I, мать Александра II, императрица российская.С 1828 года под её покровительством находился Дом призрения бедных, которому ежегодно выделяла на содержание 12 тысяч рублей. После её смерти стал называться Домом Императрицы Александры Фёдоровны для призрения бедных.',
    gallery: [
      'https://charity-old.lbspb.ru/system/pages/000/013/33/images/small/449bbbf7ae0f95c652d2b2725e00d21ed893b965.jpg?1699626566',
    ],
  },
  actor: {
    _id: '5',
    name: 'Актер Михалков',
    info: 'Светлейший князь Александр Аркадьевич Суворов — русский государственный, общественный и военный деятель, генерал от инфантерии. В 1848—1861 годах — генерал-губернатор Прибалтийского края и военный губернатор Риги, в 1861—1866 годах — санкт-петербургский военный генерал-губернатор, позднее — генерал-инспектор пехоты. Внук генералиссимуса Александра Васильевича Суворова. Был председателем Попечительского совета заведений общественного призрения в Санкт-Петербурге (1861—1882; жертвовал заведениям личные средства), почётным членом Демидовского дома трудящихся, почётным членом Академии наук, действительным членом Императорского человеколюбивого общества, председателем российского общества покровительства животных и пр.',
    links: [
      'Попечительство императрицы Марии Фёдоровны о глухонемых : [историческая справка]$http://encspb.ru/object/2815811872?lc=ru',
    ],
  },
  cook: {
    _id: '6',
    name: 'Повар Газманов',
    info: 'Священнослужитель Православной российской церкви, митрофорный протоиерей, редактор ведущих церковных журналов, публицист, деятель трезвеннического движения, действительный член Императорского Православного Палестинского Обществ.',
    persons: ['1', '2', '3', '4'],
  },
};

const persons = Object.keys(personsAsObject).map((key) => ({ ...personsAsObject[key] }));

// возвращает все persons в усечённом варианте (_id, name)
const fetchAll = async () => {
	// if (CONFIG.IS_SERVER) {
	// 	const {data} = await httpService.get(CONFIG.API_URL + "person")
	// 	return data
	// } else {
		await delay(50);
		let newArr = [];
		persons.forEach((o) => newArr.push({ _id: o._id, name: o.name }));
		return persons;
	// }
};

// возвращает полные данные об одной персоне
const getById = async (id) => {
	// if (CONFIG.IS_SERVER) {
	// 	const {data} = await httpService.get(CONFIG.API_URL + "person/" + id)
	// 	return data
	// } else {
		await delay(50);
		return persons.find((user) => user._id === id);
	// }
};

export default {
  fetchAll,
  getById,
};
