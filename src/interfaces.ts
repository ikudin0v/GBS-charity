export interface IPartialOrganization {
  _id: string;
  name: string;
  locations: string[];
  categories: { [key: string]: string[] };
	persons?: string[];
	subnames?: string[];
}

export interface IBackendPartialOrganization {
  _id: string;
  name: string;
  locations: string[];
  categories: string[];
	persons?: string[];
	subnames?: string[];
}

export interface IFullOrganization {
  _id: string;
  name: string;
  locations: string[];
  categories: string[];
  alt_names?: string[];
  info: string;
  persons?: string[];
  organizations?: string[];
  links?: string[];
  gallery?: string[];
	subnames?: string[];
}

export interface IPartialLocation {
  _id: string;
  adress: string;
  geo: string;
	persons?: string[];
}

export interface ILocation {
  _id: string;
  adress: string;
  info: string;
  geo: string;
  image?: string;
  dates?: string;
  alt_names?: string[];
  persons?: string[];
  links?: string[];
}

export interface ICategory {
  _id: string;
  name: string;
  group: string;
  color?: string;
}

export interface IActiveFilters {
  [key: string]: { [key: string]: boolean };
}

export interface ITheme {
  primary: string;
  secondary: string;
  active: string;
  hover: string;
  logoColor: string;
  logoText: string;
  styleButton: string;
  pointerItemBg: string;
  // pointerItem: string,
  redBorder: string;
  searchButton: string;
}

export interface IPartialPerson {
  _id: string;
  name: string;
}

export interface IPerson {
  _id: string;
  name: string;
  info: string;
  links?: string[];
  gallery?: string[];
	persons?: string[]
  organizations?: string[];
}

export interface IUseData {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  organizations: IPartialOrganization[];
  setOrganizations: React.Dispatch<React.SetStateAction<IPartialOrganization[]>>;
  locations: ILocation[];
  setLocations: React.Dispatch<React.SetStateAction<ILocation[]>>;
  categories: { [key: string]: ICategory[] };
  setCategories: React.Dispatch<React.SetStateAction<{ [key: string]: ICategory[] }>>;
  activeFilters: IActiveFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<IActiveFilters>>;
  filteredOrganizations: IPartialOrganization[];
  setFilteredOrganizations: React.Dispatch<React.SetStateAction<IPartialOrganization[]>>;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  theme: ITheme;
  setTheme: React.Dispatch<React.SetStateAction<ITheme>>;
  persons: IPerson[];
  setPersons: React.Dispatch<React.SetStateAction<IPerson[]>>;
  searchRes: boolean;
  setSearchRes: React.Dispatch<React.SetStateAction<boolean>>;
	searchReq: string
	setSearchReq: React.Dispatch<React.SetStateAction<string>>;
	findedItemsCount: number
	setFindedItemsCount: React.Dispatch<React.SetStateAction<number>>;
}
