export async function POST(request) {
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

  try {
    const data = await request.formData();
    const file = data.get('file');
    const name = data.get('name');
    const organization = data.get('organization');
    const uniqueIdentifier = Date.now();

    const folderPath = `sigma-chi-derby-days-2024/${organization}`;
    const fileName = `${name}-${organization}-${uniqueIdentifier}`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folderPath);
    formData.append('public_id', fileName);
    
    const response = await fetch(cloudinaryURL, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.secure_url) {
      return new Response(JSON.stringify({ message: 'Upload successful', url: result.secure_url, name: name, organization: organization, uniqueIdentifier: uniqueIdentifier }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Upload failed', error: result }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Upload failed', error: error.toString() }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
