export interface PathParams {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}