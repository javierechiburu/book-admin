

import { updateDonation } from '@/lib/actions';
import FlowApi from '@/lib/flow-api';
import type { NextRequest, NextResponse } from 'next/server'


export async function POST(
    req: NextRequest,
    res: NextResponse
  ) {
  try {
    
    const r = await req.formData()
    const token = r.get('token')
    if (token === null) {
        return Response.json({ error: "Request body is null" });
    }
  
  
    const serviceName = "payment/getStatus";
    const flowApi = new FlowApi();
    const response = await flowApi.send(serviceName, {token}, "GET");
    if(response){
        const flow = response.flowOrder.toString();
        const u = await updateDonation(flow)
        return Response.json({ status:200, update: u, response: response.flowOrder }) 
    }else{
        return Response.json({ status:200, update: false, response: response.flowOrder }) 
    }
    

    
  } catch (error : any) {
    console.error("Error fetching balance:", error);
      throw new Error("Failed to fetch balance data.");
  }
}
