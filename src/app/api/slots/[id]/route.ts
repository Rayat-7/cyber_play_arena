import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import prisma from '@/lib/prisma'

async function checkAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return session
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await checkAuth()
  if (session instanceof NextResponse) return session

  const id = params.id

  try {
    await prisma.slot.delete({
      where: { id },
    })
    return NextResponse.json({ message: 'Slot deleted successfully' }, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting slot:', error)
    return NextResponse.json({ error: 'Error deleting slot', details: error.message }, { status: 500 })
  }
}

