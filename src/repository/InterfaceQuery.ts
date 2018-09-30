enum SORT_ORDER {
    'ASC',
    'DESC'
}

export interface InterfaceQuery {
    sortField: string,
    sortOrder: SORT_ORDER,
    page: number,
    size: number
}