import { promises as fs } from 'fs';
import path from 'path';
import files from '@/data/files.js'; // Adjust the path as necessary

export async function POST(req) {
  const data = await req.formData();
  const filesData = data.getAll('file'); // Get all files
  const category = data.get('category');

  console.log("Received FormData:");
  console.log("Files:", filesData);
  console.log("Category:", category);

  if (!filesData.length) {
    console.error("No files received.");
    return new Response(JSON.stringify({ message: 'No files received' }), { status: 400 });
  }

  if (!category) {
    console.error("No category received.");
    return new Response(JSON.stringify({ message: 'No category received' }), { status: 400 });
  }

  const publicDir = path.join(process.cwd(), 'public', category);
  console.log("publicDir", publicDir);

  // Ensure the directory exists
  await fs.mkdir(publicDir, { recursive: true });

  const uploadResults = [];

  for (const file of filesData) {
    const filePath = path.join(publicDir, file.name);

    try {
      await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
      const fileLink = `/${category}/${file.name}`; // Construct the file link
      files[category].push({ name: file.name, link: fileLink }); // Update the files object
      uploadResults.push({ fileName: file.name, status: 'success', filePath });
    } catch (error) {
      console.error(`Error writing file ${file.name}:`, error);
      uploadResults.push({ fileName: file.name, status: 'error', error: error.message });
    }
  }

  // Write the updated files object back to files.js
  const filesPath = path.join(process.cwd(), 'src', 'data', 'files.js');
  const filesContent = `const files = ${JSON.stringify(files, null, 2)};\n\nexport default files;\n`;
  await fs.writeFile(filesPath, filesContent);

  // Return the updated files list for the category
  return new Response(JSON.stringify({ message: 'Files processed', results: uploadResults, files: files[category] }), { status: 200 });
};
