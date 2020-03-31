export interface IAPIGatewayResponse {
  statusCode: number;
  body: object | string;
  isBase64Encoded: boolean;
  headers: object;
}

export function GatewayResponse(body: object, statusCode: number = 200,  headers: object = {}, isBase64Encoded: boolean = false): IAPIGatewayResponse {
  return {
    body,
    statusCode,
    headers,
    isBase64Encoded
  };
}
