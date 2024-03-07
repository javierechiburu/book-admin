import { NextApiRequest, NextApiResponse } from 'next';
import FlowApi from '@/lib/flow-api';
import { updateDonation } from '@/lib/actions';


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.body.token) {
        return new Response("error",{ status:400 } ) 
    }
    const token: string = req.body.token;
    const params = {
      token: token
    };
    const serviceName = "payment/getStatus";
    const flowApi = new FlowApi();
    const response = await flowApi.send(serviceName, params, "GET");

    updateDonation("2085737")
    return new Response( JSON.stringify(response) ,{ status:200 } ) 
  } catch (error : any) {
    console.error("Error fetching balance:", error);
      throw new Error("Failed to fetch balance data.");
  }
}
