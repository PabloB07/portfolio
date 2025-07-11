import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    // Ruta donde se almacena el CV
    const cvPath = join(process.cwd(), 'public', 'cv', 'Pablo_Blanco_Navarro_CV.pdf');
    const fileBuffer = readFileSync(cvPath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Pablo_Blanco_Navarro_CV.pdf"'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'CV no encontrado' }, { status: 404 });
  }
}