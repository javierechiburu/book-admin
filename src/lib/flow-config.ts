interface CommerceConfig {
  APIKEY: string;
  SECRETKEY: string;
  APIURL: string;
  BASEURL: string;
}

const COMMERCE_CONFIG: CommerceConfig = {
  APIKEY: `${process.env.FLOW_SANDBOX_API_KEY}`, // Registre aquí su apiKey
  SECRETKEY: `${process.env.FLOW_SANDBOX_SECRET_KEY}`, // Registre aquí su secretKey
  APIURL: "https://sandbox.flow.cl/api", // Producción EndPoint o Sandbox EndPoint
  BASEURL: `${process.env.BASE_URL}` 
};

export default class Config {
  static get(name: keyof CommerceConfig): string {
    if (!(name in COMMERCE_CONFIG)) {
      throw new Error("The configuration element does not exist");
    }
    return COMMERCE_CONFIG[name];
  }
}