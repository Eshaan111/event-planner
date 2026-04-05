import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promisify } from 'util';
import libre from 'libreoffice-convert';

const convert = promisify(libre.convert);

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());

        // Convert PPTX buffer to PDF
        const pdfBuffer = await convert(buffer, '.pdf', undefined);

        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="converted.pdf"`,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
    }
}