

import { updateDonation } from '@/lib/actions';
import FlowApi from '@/lib/flow-api';
import type { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
 
const schema = z.object({
  token: z.string()
})

export const config = {
    api: {
      bodyParser: false,
    },
};
  
 

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
    const u = await updateDonation("2085737")

    return Response.json({ status:200, update: u }) 
  } catch (error : any) {
    console.error("Error fetching balance:", error);
      throw new Error("Failed to fetch balance data.");
  }
}
