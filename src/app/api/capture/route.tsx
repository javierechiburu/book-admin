import FlowApi from '@/lib/flow-api';
import { updateDonation } from '@/lib/actions';
import { NextRequest, NextResponse } from 'next/server';
import querystring, { ParsedUrlQuery } from 'querystring';


export async function POST(req: NextRequest, res: NextResponse) {
  try {

    if (req.body === null) {
        return Response.json({ error: "Request body is null" });
    }
  
    const formData: ParsedUrlQuery = querystring.parse(req.body.toString());
    if (!formData || !formData.token) {
        return Response.json({ error: "Token not provided", data: formData });
    }
  
    const token: string = formData.token as string;
    const params = {
        token: token
    };
    const serviceName = "payment/getStatus";
    const flowApi = new FlowApi();
    const response = await flowApi.send(serviceName, params, "GET");

    return new Response( JSON.stringify(response) ,{ status:200 } ) 
  } catch (error : any) {
    console.error("Error fetching balance:", error);
      throw new Error("Failed to fetch balance data.");
  }
}
