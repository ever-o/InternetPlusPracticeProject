const baseUrl = ''

// url 是资源地址，args是资源配置，包括method，body等
export const fetcher = async (path, args) => {
  const response = await fetch(baseUrl + path, {
    ...args,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return await response.json()
}

export const GET = async (path, args) => {
  return fetcher(path, {
    method: "GET",
    ...args
  })
}

export function POST(
  path,
  body,
  args,
) {
  return fetcher(path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    ...args,
  })
}