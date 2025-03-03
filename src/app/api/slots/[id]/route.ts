import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/auth.config';
import prisma from '@/lib/prisma';

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return session;
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const session = await checkAuth();
    if (session instanceof NextResponse) return session;

    const { id } = await context.params; // Await the params

    await prisma.slot.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting slot:', error);
    return NextResponse.json(
      { error: 'Error deleting slot', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}







// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../../auth/auth.config"
// import prisma from '@/lib/prisma'

// async function checkAuth() {
//   const session = await getServerSession(authOptions)
//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }
//   return session
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ): Promise<NextResponse> {
//   try {
//     const session = await checkAuth()
//     if (session instanceof NextResponse) return session

//     const { id } = params

//     await prisma.slot.delete({
//       where: { id },
//     })
    
//     return NextResponse.json({ message: 'Slot deleted successfully' })
//   } catch (error) {
//     console.error('Error deleting slot:', error)
//     return NextResponse.json(
//       { error: 'Error deleting slot', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     )
//   }
// }









// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../../auth/auth.config"
// import prisma from '@/lib/prisma'

// async function checkAuth() {
//   const session = await getServerSession(authOptions)
//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }
//   return session
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ): Promise<NextResponse> {
//   try {
//     const session = await checkAuth()
//     if (session instanceof NextResponse) return session

//     const { id } = params

//     await prisma.slot.delete({
//       where: { id },
//     })
    
//     return NextResponse.json({ message: 'Slot deleted successfully' })
//   } catch (error) {
//     console.error('Error deleting slot:', error)
//     return NextResponse.json(
//       { error: 'Error deleting slot', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     )
//   }
// }







// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../../auth/auth.config"
// import prisma from '@/lib/prisma'

// async function checkAuth() {
//   const session = await getServerSession(authOptions)
//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }
//   return session
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await checkAuth()
//     if (session instanceof NextResponse) return session

//     await prisma.slot.delete({
//       where: { id: params.id },
//     })
    
//     return NextResponse.json({ message: 'Slot deleted successfully' })
//   } catch (error) {
//     console.error('Error deleting slot:', error)
//     return NextResponse.json(
//       { error: 'Error deleting slot', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     )
//   }
// }









// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../../auth/auth.config"
// import prisma from '@/lib/prisma'

// async function checkAuth() {
//   const session = await getServerSession(authOptions)
//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }
//   return session
// }

// export async function DELETE(
//   request: NextRequest,
//   context: { params: { id: string } }
// ) {
//   const session = await checkAuth()
//   if (session instanceof NextResponse) return session

//   const id = context.params.id

//   try {
//     await prisma.slot.delete({
//       where: { id },
//     })
//     return NextResponse.json({ message: 'Slot deleted successfully' }, { status: 200 })
//   } catch (error: any) {
//     console.error('Error deleting slot:', error)
//     return NextResponse.json({ error: 'Error deleting slot', details: error.message }, { status: 500 })
//   }
// }




// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from "next-auth/next"
// // import { authOptions } from "../../auth/[...nextauth]/route"
// import { authOptions } from '../../auth/auth.config'
// import prisma from '@/lib/prisma'

// async function checkAuth() {
//   const session = await getServerSession(authOptions)
//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }
//   return session
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const session = await checkAuth()
//   if (session instanceof NextResponse) return session

//   const id = params.id

//   try {
//     await prisma.slot.delete({
//       where: { id },
//     })
//     return NextResponse.json({ message: 'Slot deleted successfully' }, { status: 200 })
//   } catch (error: any) {
//     console.error('Error deleting slot:', error)
//     return NextResponse.json({ error: 'Error deleting slot', details: error.message }, { status: 500 })
//   }
// }

