"use client"

import { useState, useEffect } from "react"
import { format, setHours, setMinutes, addMinutes } from "date-fns"
import axios from 'axios'
import { DatePicker } from "@/components/ui/date-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'
import { toast } from "sonner"
import Image from "next/image"

type Slot = {
  id: string
  startTime: string
  endTime: string
  isBooked: boolean
  gameDevice: string
}

function generateTimeSlots() {
  const slots = []
  let start = setHours(setMinutes(new Date(), 0), 11) // 11:00 AM
  const end = setHours(setMinutes(new Date(), 0), 23) // 11:00 PM

  while (start < end) {
    slots.push(format(start, "HH:mm"))
    start = addMinutes(start, 30)
  }

  return slots
}

const timeSlots = generateTimeSlots()

export function CustomerSlotViewer() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [slots, setSlots] = useState<Slot[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchSlots(selectedDate)
  }, [selectedDate])

  const fetchSlots = async (date: Date) => {
    setIsLoading(true)
    try {
      console.log('Fetching slots for date:', format(date, 'yyyy-MM-dd'))
      const response = await axios.get('/api/public-slots', {
        params: { 
          date: format(date, 'yyyy-MM-dd'),
        },
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      })
      console.log('API Response:', response.data)
      setSlots(response.data)
    } catch (error) {
      console.error('Error fetching slots:', error)
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data)
      }
      toast.error("Failed to fetch slots. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  const getSlotStatus = (timeSlot: string, gameDevice: string) => {
    const slot = slots.find(s => 
      format(new Date(s.startTime), "HH:mm") === timeSlot && s.gameDevice === gameDevice
    )
    return slot?.isBooked ?? false
  }

  const renderSlotTable = (gameDevice: string) => (
    <Table className="object-cover overflow-hidden bg-slate-50">
      <TableHeader>
        <TableRow>
          <TableHead>Time Slot</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timeSlots.map((timeSlot) => {
          const isBooked = getSlotStatus(timeSlot, gameDevice)
          return (
            <TableRow key={`${gameDevice}-${timeSlot}`}>
              <TableCell>{timeSlot}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  isBooked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {isBooked ? 'Booked' : 'Available'}
                </span>
              </TableCell>
              <TableCell className="p-0">
                {!isBooked && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('https://m.me/415263521680217?source=qr_link_share', '_blank')}
                  >
                    {/* <MessageCircle className="w-3 h-4 font-zentry" /> */}
                    Book via <Image src="/messenger.webp" height={15} width={15} alt="messenger"/>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )

  return (
    <div id="slots" className="container mx-auto px-4 object-cover overflow-x-hidden py-8 ">
      <h2 className="text-5xl bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent font-zentry text-center mb-8 uppercase underline font-semibold animate-ping-2">Available Slots</h2>
      <div className="mb-8">
        <p className="font-semibold ml-4 font-zentry text-pink-700 animate-pulse">Choose Your date</p>
        <DatePicker
          selected={selectedDate}
          onSelect={handleDateChange}
          className="w-full max-w-sm mx-auto"
        />
      </div>
      {isLoading ? (
        <p className="text-center">Loading slots...</p>
      ) : (
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-8  ">
          <div>
            <h3 className="text-2xl font-semibold mb-4 uppercase font-zentry">Console 1</h3>
            {renderSlotTable('Console 1')}
          </div>
          <div className="overflow-hidden">
            <h3 className="text-2xl font-semibold mb-4 uppercase font-zentry">Console 2</h3>
            {renderSlotTable('Console 2')}
          </div>
        </div>
      )}
    </div>
  )
}

