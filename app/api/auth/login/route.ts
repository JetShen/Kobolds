import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
      const body = await req.json();
      console.log('Body:', body);
  
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
      console.log('User:', user);
  
      if (!user || !user.password) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isPasswordValid);
  
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }
  
      const token = 'your_jwt_token_here';
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