export type PerPage = 6 | 10 | 20 | 50

export interface IPagination {
  totalOfPage: number
  currentPage: number
  perPage: PerPage
}
