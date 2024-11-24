// app/api/auth/signin/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { username, password } = await request.json();

  // Check if it's a login attempt or file deletion attempt
  const isLoginAttempt = password.length > 6; // Simple way to distinguish between passwords

  if (isLoginAttempt) {
    // Login credentials
    if (username === 'FHI360' && password === 'Achu4321') {
      return NextResponse.json({ success: true });
    }
  } else {
    // File deletion password
    if (password === 'del123') {
      return NextResponse.json({ success: true });
    }
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
