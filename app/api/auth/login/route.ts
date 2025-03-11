import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    try {
      const body = await req.json();
  
      const { email, password } = body;
  
      if (!email || !password) {
        return NextResponse.json(
          { message: 'Email and password are required' },
          { status: 400 }
        );
      }
  
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });
  
      if (!user || !user.password) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }
      const cookieStore = cookies()
      const sessionCookie = cookieStore.set('session', JSON.stringify(user.role), {
        maxAge: 60 * 60 * 24 * 7,
      });

      const token = 'token'; // TODO: Implement JWT
      return NextResponse.json(
        { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json(
        { message: 'Internal server error' },
        { status: 500 }
      );
    }
  }