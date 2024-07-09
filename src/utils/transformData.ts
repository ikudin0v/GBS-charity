import { ICategory, IBackendPartialOrganization, IPartialOrganization, IActiveFilters } from '../interfaces';

export function transformOrganizations(
  orgsData: IBackendPartialOrganization[],
  catsData: ICategory[]
): IPartialOrganization[] {
  let newOrganizations: IPartialOrganization[] = [];
  orgsData.forEach((org: IBackendPartialOrganization) => {
    let newCats: { [key: string]: string[] } = {};
    catsData.forEach((item: any) => (newCats[item.group] = []));
    org.categories.forEach((orgCat: string) => {
      catsData.forEach((cat: ICategory) => {
        if (orgCat === cat._id) {
          newCats[cat.group].push(orgCat);
        }
      });
    });
    let newOrg: IPartialOrganization = { _id: '', name: '', locations: [], categories: {}, persons: []};
    newOrg._id = org._id;
    newOrg.name = org.name;
    newOrg.locations = org.locations;
    newOrg.name = org.name;
    newOrg.categories = newCats;
		newOrg.persons = org.persons;
		newOrg.subnames = org.subnames;
    newOrganizations.push(newOrg);
  });
  return newOrganizations;
}

export function transformCategories(data: ICategory[]): { [key: string]: ICategory[] } {
  let newCategories: { [key: string]: ICategory[] } = {};
  data.forEach((item: ICategory) => {
    newCategories[item.group] ? newCategories[item.group].push(item) : (newCategories[item.group] = [item]);
  });
  return newCategories;
}

export function getActiveFilters(data: ICategory[]): IActiveFilters {
  let newActiveFilters: IActiveFilters = {};
  data.forEach((cat: ICategory) => {
    if (!newActiveFilters[cat.group]) {
      newActiveFilters[cat.group] = {};
    }
  });
  data.forEach((cat: ICategory) => {
    newActiveFilters[cat.group][cat._id] = false;
  });
  return newActiveFilters;
}
