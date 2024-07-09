export function paginate<T>(list:T[], currentPage: number, pageSize: number): T[] {
	return list.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize)
}