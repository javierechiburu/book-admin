import Config from '@/lib/flow-config';
import CryptoJS from 'crypto-js'

interface ApiResponse {
  output: string;
  info: {
    http_code: number;
  };
}

export default class FlowApi {
  private apiKey: string;
  private secretKey: string;

  constructor() {
    this.apiKey = Config.get("APIKEY");
    this.secretKey = Config.get("SECRETKEY");
  }

  async send(service: string, params: Record<string, any>, method: string = "GET"): Promise<any> {
    method = method.toUpperCase();
    const url = `${Config.get("APIURL")}/${service}`;
    params = { ...params, apiKey: this.apiKey };
    params.s = this.sign(params);

    let response: ApiResponse;

    if (method === "GET") {
      response = await this.httpGet(url, params);
    } else {
      response = await this.httpPost(url, params);
    }

    if (response.info.http_code !== 200 && response.info.http_code !== 400 && response.info.http_code !== 401) {
      throw new Error(`Unexpected error occurred. HTTP_CODE: ${response.info.http_code}`);
    }

    const body = JSON.parse(response.output);
    return body;
  }

  setKeys(apiKey: string, secretKey: string): void {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  private sign(params: Record<string, any>): string {
    const keys = Object.keys(params).sort();
    let toSign = "";
    keys.forEach((key) => {
      toSign += key + params[key];
    });
    return CryptoJS.HmacSHA256(toSign, this.secretKey).toString();
  }

  private async httpGet(url: string, params: Record<string, any>): Promise<ApiResponse> {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${queryString}`);
    const output = await response.text();
    return { output, info: { http_code: response.status } };
  }

  private async httpPost(url: string, params: Record<string, any>): Promise<ApiResponse> {
    const formData = new FormData();
    for (const key in params) {
      formData.append(key, params[key]);
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    const output = await response.text();
    return { output, info: { http_code: response.status } };
  }
}