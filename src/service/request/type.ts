interface IResponse<T = any> {
  code: string;
  msg: string;
  data: T;
}

export default IResponse;
