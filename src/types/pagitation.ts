export type PerPage = "6" | "10" | "20" | "50"

export interface Pagination {
  currentPage: string
  pokemonsPerPage: PerPage
}
