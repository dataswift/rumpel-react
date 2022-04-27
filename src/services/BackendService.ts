export const get = async <T>(
  path: string,
  args: RequestInit = { method: 'get' },
): Promise<IHttpResponse<T>> => http<T>(new Request(path, args));

export const post = async <T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'post', body: JSON.stringify(body) },
): Promise<IHttpResponse<T>> => http<T>(new Request(path, args));

export const put = async <T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'put', body: JSON.stringify(body) },
): Promise<IHttpResponse<T>> => http<T>(new Request(path, args));

export const http = <T>(request: RequestInfo): Promise<IHttpResponse<T>> =>
  new Promise((resolve, reject) => {
    let response: IHttpResponse<T>;

    fetch(request)
      .then((res) => {
        response = res;
        return res.json();
      })
      .then((body) => {
        if (response.ok) {
          response.parsedBody = body;
          resolve(response);
        } else {
          reject(body);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

export interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}
