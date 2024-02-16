import { NextResponse } from "next/server";
import dotenv from 'dotenv';

dotenv.config();

export async function GET() {
  const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
  const API_KEY = process.env.API_KEY;
  const RANGE = 'Total points!A1:G';

  const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  try {
    const response = await fetch(apiUrl, {cache: "no-store",});
    const sheetData = await response.json();

    const organizationNames = sheetData.values[0].slice(1);
    const organizationTypes = sheetData.values[1].slice(1);
    const scores = sheetData.values[2].slice(1);

    const leaders = organizationNames.map((organization, index) => {
      const type = organizationTypes[index];
      const score = parseInt(scores[index]);
      return { organization, type, score };
    });

    return NextResponse.json({ leaders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "error" }, { status: 200 });
  }
}
