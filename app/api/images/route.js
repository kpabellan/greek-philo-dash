import { NextResponse } from "next/server";

export async function GET() {
  const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
  const API_KEY = process.env.API_KEY;
  const RANGE = 'Images!I10:K';

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
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}