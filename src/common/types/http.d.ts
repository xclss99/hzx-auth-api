declare namespace Http {
  interface ResponseBody<T> {
    code?: number
    data?: T
    message: string
  }
}