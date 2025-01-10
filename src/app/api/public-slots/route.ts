import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  console.log('GET /api/public-slots called');
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    console.log('Requested date:', date);

    if (!date) {
      console.log('Invalid date parameter');
      return NextResponse.json({ error: 'Invalid date parameter' }, { status: 400 });
    }

    const startOfDay = new Date(`${date}T00:00:00Z`);
    const endOfDay = new Date(`${date}T23:59:59Z`);
    console.log('Date range:', { startOfDay, endOfDay });

    const slots = await prisma.slot.findMany({
      where: {
        startTime: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      select: {
        id: true,
        startTime: true,
        endTime: true,
        isBooked: true,
        gameDevice: true,
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    console.log('Fetched slots:', slots);

    return NextResponse.json(slots);
  } catch (error) {
    console.error('Error in GET /api/public-slots:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export const dynamic = 'force-dynamic';

