import { GET, POST } from "./index";

export const getInfo = async () => GET('mockUrl1')

export const getContent = async (searchParams) => POST('mockUrl2', searchParams)