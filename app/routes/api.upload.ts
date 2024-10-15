import { type ActionFunction } from '@remix-run/cloudflare';
import { promises as fs } from 'fs';


const UPLOAD_DIR =  ('./uploads/'); 

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const files = formData.getAll('files') as File[];

  if (files.length === 0) {
    return new Response(JSON.stringify({ error: 'No files uploaded' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
  
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const fileInfos = await Promise.all(files.map(async (file) => {
      const fileData = await file.arrayBuffer(); 
      const fileName = file.name; 

      const fileExt = fileName.split('.').pop();
      const originaFilename =  fileName.split('.').slice(0, -1).join('.')

      const timestamp = Math.floor(Date.now() / 1000);
      let uniqueFileName = `${originaFilename}_${timestamp}.${fileExt}`;
      uniqueFileName = uniqueFileName.replace(/\s+/g, '_');
      const filePath = UPLOAD_DIR+uniqueFileName; 

      await fs.writeFile(filePath, Buffer.from(fileData));

      return { name:uniqueFileName,type:file.type,link:uniqueFileName };
    }));

    return new Response(JSON.stringify({ message: 'Files uploaded and saved successfully', files: fileInfos }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('File upload error:', error);

    return new Response(JSON.stringify({ error: 'File upload failed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};