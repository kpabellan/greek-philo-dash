import dotenv from 'dotenv';

export async function POST(request) {
  dotenv.config();

  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

  try {
    const data = await request.formData();
    const file = data.get('file');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(cloudinaryURL, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.secure_url) {
      return new Response(JSON.stringify({ message: 'Upload successful', url: result.secure_url }), {
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
