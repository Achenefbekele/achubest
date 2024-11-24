import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { writeFile } from 'fs/promises';
import { IncomingForm } from 'formidable';

// Helper function to validate file path
const isValidFilePath = (filePath) => {
    return !filePath.includes('..');
};

// Helper function to parse form data
const parseForm = async (req) => {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm({
            maxFileSize: 50 * 1024 * 1024, // 50MB limit
            uploadDir: path.join(process.cwd(), 'public/temp'), // Temporary upload directory
        });

        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const filePath = url.searchParams.get('path');

        if (!filePath || !isValidFilePath(filePath)) {
            return NextResponse.json(
                { error: 'Invalid file path' },
                { status: 400 }
            );
        }

        const fullPath = path.join(process.cwd(), 'public', filePath);

        try {
            await fs.access(fullPath);
        } catch {
            return NextResponse.json(
                { error: 'File not found' },
                { status: 404 }
            );
        }

        const fileBuffer = await fs.readFile(fullPath);
        const fileName = path.basename(filePath);
        const ext = path.extname(fileName).toLowerCase();

        const contentTypes = {
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.doc': 'application/msword',
            '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            '.ppt': 'application/vnd.ms-powerpoint',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            '.xls': 'application/vnd.ms-excel',
            '.pdf': 'application/pdf'
        };

        const headers = new Headers({
            'Content-Type': contentTypes[ext] || 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
            'Content-Length': fileBuffer.length.toString(),
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });

        return new Response(fileBuffer, { headers });

    } catch (error) {
        console.error('Error handling file:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        // Parse the multipart form data
        const data = await request.formData();
        const file = data.get('file');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = file.name;
        const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = path.join(uploadDir, safeName);

        // Save file
        await fs.writeFile(filePath, buffer);

        // Return success response
        return NextResponse.json({
            success: true,
            file: filePath.replace(/\\/g, '/'),
            message: 'File uploaded successfully'
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        );
    }
} 