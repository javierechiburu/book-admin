import CryptoJS from 'crypto-js'

const secretKey = process.env.FLOW_SANDBOX_SECRET_KEY ? process.env.FLOW_SANDBOX_SECRET_KEY : "";
export const apiKey = process.env.FLOW_SANDBOX_API_KEY; 


export async function getSign(params: Object) {

    const keys = Object.keys(params)
    .sort((a, b) => a.localeCompare(b));

    let toSign: string = '';

    keys.forEach((key, index) => {
      toSign += index === 0 ? `${key}=${params[key as keyof typeof params]}` : `&${key}=${params[key as keyof typeof params]}`;
    });

    const signature = CryptoJS.HmacSHA256(toSign, secretKey).toString();
    return signature;
}

export async function getPack(params: Object) {

  const keys = Object.keys(params)
  .sort((a, b) => a.localeCompare(b));

  let toSign: string = '';

  keys.forEach((key, index) => {
    toSign += index === 0 ? `${key}=${params[key as keyof typeof params]}` : `&${key}=${params[key as keyof typeof params]}`;
  });

  return toSign;
}

export async function updateDonation(key : String) {
  try {

        const { flowOrder } = CreateDonation.parse({
          flowOrder: key
      });
      await sql`UPDATE donations SET status = 12 WHERE flowOrder = ${flowOrder}`;
      return true;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch donations.');
    }
}