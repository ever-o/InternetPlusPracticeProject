import { GET, POST } from "./index";

export const getInfo = async (params) => POST('/getInfo', params)

export const getContent = async (id) => GET(`/getContent?id=${id}`)