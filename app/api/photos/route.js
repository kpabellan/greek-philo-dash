import { NextResponse } from "next/server";
import dotenv from 'dotenv';

dotenv.config();

export async function GET() {
  const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
  const API_KEY = process.env.API_KEY;
  const RANGE = 'Photos!I10:K20';

  const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });
    const { values } = await response.json();

    const imageData = values.map(([src, credit, organization]) => ({
      src,
      credit,
      organization,
    }));

    return NextResponse.json({ imageData }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}