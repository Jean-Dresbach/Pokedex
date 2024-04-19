export type PerPage = 6 | 10 | 20 | 50

export interface Pagination {
  currentPage: {
    number: number
    url: string
  }
  prevPage: null | string
  nextPage: string | null
  perPage: PerPage
}
