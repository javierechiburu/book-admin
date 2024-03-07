import { NextApiRequest, NextApiResponse } from 'next';
import FlowApi from '@/lib/flow-api';
import { updateDonation } from '@/lib/actions';
import { NextRequest } from 'next/server';
import querystring, { ParsedUrlQuery } from 'querystring';


export async function POST(req: NextRequest, res: NextApiResponse) {
  try {

    // Verificar si req.body es null
    if (req.body === null) {
        return res.status(400).json({ error: "Request body is null" });
    }
  
    // Parsear el body si no es null
    const formData: ParsedUrlQuery = querystring.parse(req.body.toString());
  
    if (!formData || !formData.token) {
        return res.status(400).json({ error: "Token not provided" });
    }
  
    const token: string = formData.token as string;
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
