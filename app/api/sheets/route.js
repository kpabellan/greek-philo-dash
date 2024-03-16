import { google } from 'googleapis';

export async function POST(request) {
  const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
  const RANGE = 'Photos!A:D';

  try {
    const imageData = await request.json();
    const { cloudinaryResult, name, organization, uniqueIdentifier } = imageData;

    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);

    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    const sheetBody = {
      values: [
        [cloudinaryResult, name, organization, uniqueIdentifier]
      ],
    };

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: sheetBody,
    });

    return new Response(JSON.stringify({ message: 'Sheet update successful', result: response.data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Sheet update unsuccessful', error: error.toString() }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}