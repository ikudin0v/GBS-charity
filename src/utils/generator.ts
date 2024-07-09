import { ILocation } from '../interfaces';
import { getRandomInt, getRandomFloat } from './helpers';

export function generateOrgs(orgsAmount: number, locsAmount: number) {
  let orgs = [];
  for (let i = 1; i <= orgsAmount; i++) {
    orgs.push({
      _id: i.toString(),
      name: i + '_name',
      locations: [getRandomInt(1, locsAmount).toString()],
      categories: [getRandomInt(1, 3).toString(), '1' + getRandomInt(1, 4).toString()],
      info: i + '_info',
    });
  }
  return orgs;
}

export function generateLocs(locsAmount: number) {
  let locs: ILocation[] = [];
  for (let i = 1; i <= locsAmount; i++) {
    let loc: ILocation = { _id: '', adress: '', info: '', geo: '' };
    loc._id = i.toString();
    loc.adress = i + '_adress';
    loc.info =
      'Сквозной участок приобретён Обществом для постройки двух зданий, второе располагалось по адресу Можайская ул., д. 8. Деревянный дом, выходящий фасадом на ул. Рузовскую, перестроен в каменный по проекту архитектора Зайцева Д. Д. Здание в стиле эклектики позднее надстроено до 4 этажей. В нём располагался приют для девочек';
    loc.geo = getRandomFloat(59.86, 60.0) + ', ' + getRandomFloat(30.19, 30.54);
    if (getRandomInt(0, 1) === 1) {
      loc.image =
        'https://charity.lbspb.ru/system/pages/000/013/55/images/small/d34fd6d0472be9d7ccc415d86404e582df3b2fa5.jpg?1701963195';
    }
    locs.push(loc);
  }
  return locs;
}
