import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const organizationType = url.searchParams.get('organizationType');

  const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
  const API_KEY = process.env.API_KEY;
  const RANGE = 'Total points!A1:T';

  const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  try {
    const response = await fetch(apiUrl, {cache: "no-store"});
    const sheetData = await response.json();

    const organizationNames = sheetData.values[0].slice(1);
    const organizationTypes = sheetData.values[1].slice(1);
    const scores = sheetData.values[2].slice(1);

    let leaders = organizationNames.map((organization, index) => {
      const type = organizationTypes[index];
      const score = parseInt(scores[index]);
      return { organization, type, score };
    });

    if (organizationType && organizationType !== 'All') {
      leaders = leaders.filter(leader => leader.type === organizationType);
    }

    return NextResponse.json({ leaders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}