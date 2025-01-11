import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/route";
import { authOptions } from './../auth/auth.config'
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  console.log('GET /api/slots called');
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    if (!session) {
      console.log('Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
      orderBy: {
        startTime: 'asc',
      },
    });

    console.log('Fetched slots:', slots);

    return NextResponse.json(slots);
  } catch (error) {
    console.log('Error in GET /api/slots:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  console.log('POST /api/slots called');
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    if (!session) {
      console.log('Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookingData = await request.json();
    console.log('Received booking data:', bookingData);

    // Validate the booking data here

    const newSlot = await prisma.slot.create({
      data: {
        startTime: new Date(bookingData.startTime),
        endTime: new Date(bookingData.endTime),
        isBooked: bookingData.isBooked,
        customerName: bookingData.customerName,
        email: bookingData.email,
        phoneNumber: bookingData.phoneNumber,
        game: bookingData.game,
        price: bookingData.price,
        bookedBy: bookingData.bookedBy,
        gameDevice: bookingData.gameDevice,
        numberOfPersons: bookingData.numberOfPersons,
        note: bookingData.note,
      },
    });

    console.log('Created new slot:', newSlot);

    return NextResponse.json(newSlot, { status: 201 });
  } catch (error) {
    console.log('Error in POST /api/slots:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

