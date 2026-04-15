import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  // Initialize client inside handler to prevent error during build phase in Vercel.
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );
  try {
    const body = await request.json();
    const {
      email, password, fullName, phone, role,
      classSection, rollNumber, parentName, parentPhone,
      employeeId, designation,
    } = body;

    // Validate required fields
    if (!email || !password || !fullName || !role) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    // 1. Create auth user using admin client (bypasses email confirmation)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email so they can login after admin approval
      user_metadata: {
        full_name: fullName,
        role,
      },
    });

    if (authError) {
      // Handle duplicate email
      if (authError.message?.includes('already been registered') || authError.message?.includes('already exists')) {
        return NextResponse.json(
          { error: 'This email is already registered. Please use a different email or try logging in.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    const userId = authData.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: 'User creation failed. Please try again.' },
        { status: 500 }
      );
    }

    // 2. Create profile using service role (bypasses RLS)
    const profileData: Record<string, any> = {
      id:        userId,
      email,
      full_name: fullName,
      phone:     phone || null,
      role,
      is_active: false,  // Admin must approve
    };

    if (role === 'student') {
      profileData.class_section  = classSection || null;
      profileData.roll_number    = rollNumber   || null;
      profileData.parent_name    = parentName   || null;
      profileData.parent_phone   = parentPhone  || null;
      profileData.admission_year = new Date().getFullYear();
    }

    if (role === 'teacher') {
      profileData.employee_id  = employeeId  || null;
      profileData.designation  = designation || null;
    }

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert([profileData], { onConflict: 'id' });

    if (profileError) {
      // If profile fails, clean up the auth user
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return NextResponse.json(
        { error: 'Profile creation failed: ' + profileError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Registration submitted successfully.' });
  } catch (err: any) {
    console.error('Registration error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
