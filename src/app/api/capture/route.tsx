import { NextRequest, NextResponse } from 'next/server';
import { getSign, getPack, apiKey } from "@/lib/flow";
import { updateDonation } from '@/lib/actions';

export async function POST(req: NextRequest, res: NextResponse) {
  
    try {
        const dataReq = await req.formData()
        const token = dataReq.get('token')

        console.log(token)

        const params = {
            "apiKey": apiKey,
            "token": token
        };
        const data = await getPack(params);
        const sign = await getSign(params);
        const body = `${data}&s=${sign}`;
        const url = `https://sandbox.flow.cl/api/payment/getStatus?${body}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const responseData = await response.json();
        updateDonation(responseData.flowOrder)

        console.log("acaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        return NextResponse.json({status: 200})
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw new Error("Failed to fetch balance data.");
    }
}