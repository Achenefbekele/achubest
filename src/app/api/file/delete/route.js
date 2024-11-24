import { promises as fs } from 'fs';
import path from 'path';
import files from '@/data/files.js'; // Adjust the path as necessary

export async function POST(req) {
  const { fileName, category } = await req.json();

  if (!fileName || !category) {
    return new Response(JSON.stringify({ message: 'File name or category missing' }), { status: 400 });
  }

  const fileIndex = files[category].findIndex(file => file.name === fileName);
  if (fileIndex === -1) {
    return new Response(JSON.stringify({ message: 'File not found' }), { status: 404 });
  }

  const filePath = path.join(process.cwd(), 'public', category, fileName);
  const tempPath = path.join(process.cwd(), '/tmp');
  console.log("tempPath", tempPath);

  try {
    await fs.unlink(filePath); // Delete the file from the filesystem
    files[category].splice(fileIndex, 1); // Remove the file from the files object

    // Write the updated files object back to files.js
    const filesPath = path.join(process.cwd(), 'src', 'data', 'files.js');
    const filesContent = `const files = ${JSON.stringify(files, null, 2)};\n\nexport default files;\n`;
    await fs.writeFile(filesPath, filesContent);

    return new Response(JSON.stringify({ message: 'File deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error(`Error deleting file ${fileName}:`, error);
    return new Response(JSON.stringify({ message: 'Error deleting file' }), { status: 500 });
  }
}