"use client"

import { useState, useEffect } from "react"
import { format, setHours, setMinutes, addMinutes } from "date-fns"
import axios from 'axios'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SessionProvider } from "next-auth/react"
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Edit, BookOpen, Plus, Trash2 } from 'lucide-react'

const games = [
  "FC25",
  "Mortal Combat 11",
  "GTA V",
  "UFC",
  "WWE 2k23",
  "Spider-Man",
  "God of War",
  "Rocket League"
]

const gameDevices = ["Console 1", "Console 2"]  // Changed from 'consoles' to 'gameDevices'

const admins = ["Admin 1", "Admin 2", "Admin 3"]

type Slot = {
  id: string
  startTime: string
  endTime: string
  isBooked: boolean
  customerName?: string
  email?: string
  phoneNumber?: string
  game?: string
  price?: number
  bookedBy?: string
  gameDevice: string  // Changed from 'console' to 'gameDevice'
  numberOfPersons: number
  note?: string
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

function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [slots, setSlots] = useState<Slot[]>([])
  const [editingSlot, setEditingSlot] = useState<Slot | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isNewBooking, setIsNewBooking] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [slotToDelete, setSlotToDelete] = useState<Slot | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchSlots(selectedDate)
    }
  }, [selectedDate, session])

  const handleError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
      console.log('Axios error:', error)
      if (error.response) {
        console.log('Response data:', error.response.data)
        console.log('Response status:', error.response.status)
        console.log('Response headers:', error.response.headers)
      } else if (error.request) {
        console.log('Request:', error.request)
      } else {
        console.log('Error message:', error.message)
      }
      return error.response?.data?.error || error.message || 'An unexpected error occurred'
    } else if (error instanceof Error) {
      console.log('Non-Axios error:', error)
      return error.message
    } else {
      console.log('Unknown error:', error)
      return 'An unexpected error occurred'
    }
  }

  const fetchSlots = async (date: Date) => {
    setIsLoading(true)
    try {
      console.log('Fetching slots for date:', format(date, 'yyyy-MM-dd'))
      const response = await axios.get('/api/slots', {
        params: { 
          date: format(date, 'yyyy-MM-dd'),
        },
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
      console.log('Axios response:', response)
      if (response.data && Array.isArray(response.data)) {
        console.log('Fetched slots:', response.data)
        setSlots(response.data)
      } else {
        console.log('Unexpected response format:', response.data)
        toast.error('Received unexpected data format from server')
      }
    } catch (error) {
      console.log('Error in fetchSlots:', error)
      const errorMessage = handleError(error)
      console.log('Formatted error message:', errorMessage)
      toast.error(`Failed to fetch slots: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  const handleBooking = (slot: Slot | null) => {
    if (slot) {
      setEditingSlot(slot)
      setIsNewBooking(false)
    } else {
      setEditingSlot(null)
      setIsNewBooking(true)
      setSelectedTimeSlot(null)
    }
    setIsDialogOpen(true)
  }

  const handleSaveBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const bookingData = {
      id: editingSlot?.id,
      startTime: isNewBooking ? new Date(selectedDate.setHours(parseInt(selectedTimeSlot!.split(':')[0]), parseInt(selectedTimeSlot!.split(':')[1]))).toISOString() : editingSlot!.startTime,
      endTime: isNewBooking ? new Date(new Date(selectedDate.setHours(parseInt(selectedTimeSlot!.split(':')[0]), parseInt(selectedTimeSlot!.split(':')[1]))).getTime() + 30 * 60000).toISOString() : editingSlot!.endTime,
      isBooked: true,
      customerName: formData.get("customerName") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      game: formData.get("game") as string,
      price: parseFloat(formData.get("price") as string),
      bookedBy: formData.get("bookedBy") as string,
      gameDevice: formData.get("gameDevice") as string,  // Changed from 'console' to 'gameDevice'
      numberOfPersons: parseInt(formData.get("numberOfPersons") as string),
      note: formData.get("note") as string
    }

    try {
      console.log('Sending booking data:', bookingData)
      const response = await axios.post('/api/slots', bookingData)
      console.log('Booking response:', response.data)

      if (isNewBooking) {
        setSlots([...slots, response.data])
      } else {
        setSlots(slots.map(slot => 
          slot.id === editingSlot?.id ? response.data : slot
        ))
      }

      setIsDialogOpen(false)
      toast.success("Booking saved successfully!")
      fetchSlots(selectedDate)
    } catch (error) {
      const errorMessage = handleError(error)
      toast.error(`Failed to save booking: ${errorMessage}`)
    }
  }

  const handleDeleteSlot = (slot: Slot) => {
    setSlotToDelete(slot)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDeleteSlot = async () => {
    if (!slotToDelete) return

    try {
      await axios.delete(`/api/slots/${slotToDelete.id}`)
      setSlots(slots.filter(slot => slot.id !== slotToDelete.id))
      toast.success("Slot deleted successfully!")
    } catch (error) {
      const errorMessage = handleError(error)
      toast.error(`Failed to delete slot: ${errorMessage}`)
    } finally {
      setIsDeleteConfirmOpen(false)
      setSlotToDelete(null)
    }
  }

  const getAvailableTimeSlots = () => {
    const bookedSlots = slots.map(slot => format(new Date(slot.startTime), "HH:mm"))
    return timeSlots.filter(slot => !bookedSlots.includes(slot))
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <section id="admin-slots" className="py-16 bg-gradient-to-bl from-[#ffe4e6] to-[#ccfbf1] text-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="sticky top-0 bg-white z-10 p-4 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">Admin Slot Viewer</h2>
          <div className="flex justify-between items-center">
            <DatePicker
              selected={selectedDate}
              onSelect={handleDateChange}
              className="w-48"
            />
            <Button
              onClick={() => handleBooking(null)}
              className="w-full md:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" /> New Booking
            </Button>
          </div>
        </div>
        
        {gameDevices.map((device) => (  // Changed from 'consoles' to 'gameDevices'
          <div key={device} className="mb-8">
            <h3 className="text-2xl font-bold mb-4">{device}</h3>
            {isLoading ? (
              <p>Loading slots...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {slots
                  .filter(slot => slot.gameDevice === device)  // Changed from 'console' to 'gameDevice'
                  .map((slot) => (
                    <Card 
                      key={slot.id} 
                      className="p-4 bg-white/30 backdrop-blur-sm relative"
                    >
                      <CardContent className="p-0 flex flex-col justify-between h-full">
                        <div className={`p-2 rounded-t-md ${slot.isBooked ? 'bg-blue-100' : 'bg-green-100'}`}>
                          <p className="text-lg font-semibold">
                            {format(new Date(slot.startTime), "h:mm a")} - {format(new Date(slot.endTime), "h:mm a")}
                          </p>
                        </div>
                        <div className="mt-2">
                          <Badge 
                            variant={slot.isBooked ? "secondary" : "default"} 
                            className={`${slot.isBooked ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                          >
                            {slot.isBooked ? "Booked" : "Available"}
                          </Badge>
                          {slot.isBooked && (
                            <div className="mt-2 text-xs font-bold text-sky-500">
                              <p>Customer: {slot.customerName}</p>
                              <p>Email: {slot.email}</p>
                              <p>Phone: {slot.phoneNumber}</p>
                              <p>Game: {slot.game}</p>
                              <p>Price: {slot.price}tk</p>
                              <p>Persons: {slot.numberOfPersons}</p>
                              <p>Booked by: {slot.bookedBy}</p>
                              {slot.note && <p>Note: {slot.note}</p>}
                            </div>
                          )}
                        </div>
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleBooking(slot)}
                            className="hover:bg-gray-100"
                          >
                            {slot.isBooked ? (
                              <Edit className="h-4 w-4" />
                            ) : (
                              <BookOpen className="h-4 w-4" />
                            )}
                            <span className="sr-only">{slot.isBooked ? "Edit" : "Book"}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteSlot(slot)}
                            className="hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isNewBooking ? "New Booking" : (editingSlot?.isBooked ? "Edit Booking" : "New Booking")}</DialogTitle>
            <DialogDescription>
              {isNewBooking 
                ? "Create a new booking" 
                : (editingSlot?.startTime && editingSlot?.endTime
                    ? `Enter the booking details for ${format(new Date(editingSlot.startTime), "h:mm a")} - ${format(new Date(editingSlot.endTime), "h:mm a")}`
                    : "Enter the booking details"
                  )
              }
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveBooking}>
            <div className="grid gap-4 py-4">
              {isNewBooking && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="timeSlot" className="text-right">
                    Time Slot
                  </Label>
                  <Select 
                    name="timeSlot" 
                    value={selectedTimeSlot || undefined}
                    onValueChange={(value) => setSelectedTimeSlot(value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableTimeSlots().map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerName" className="text-right">
                  Customer
                </Label>
                <Input
                  id="customerName"
                  name="customerName"
                  defaultValue={editingSlot?.customerName}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={editingSlot?.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={editingSlot?.phoneNumber}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="game" className="text-right">
                  Game
                </Label>
                <Select name="game" defaultValue={editingSlot?.game}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a game" />
                  </SelectTrigger>
                  <SelectContent>
                    {games.map((game) => (
                      <SelectItem key={game} value={game}>
                        {game}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={editingSlot?.price}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bookedBy" className="text-right">
                  Booked By
                </Label>
                <Select name="bookedBy" defaultValue={editingSlot?.bookedBy}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select admin" />
                  </SelectTrigger>
                  <SelectContent>
                    {admins.map((admin) => (
                      <SelectItem key={admin} value={admin}>
                        {admin}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gameDevice" className="text-right">
                  Game Device
                </Label>
                <Select name="gameDevice" defaultValue={editingSlot?.gameDevice}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select game device" />
                  </SelectTrigger>
                  <SelectContent>
                    {gameDevices.map((device) => (
                      <SelectItem key={device} value={device}>
                        {device}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="numberOfPersons" className="text-right">
                  Number of Persons
                </Label>
                <Select name="numberOfPersons" defaultValue={editingSlot?.numberOfPersons?.toString()}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select number of persons" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="note" className="text-right">
                  Note
                </Label>
                <Textarea
                  id="note"
                  name="note"
                  defaultValue={editingSlot?.note}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this slot? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeleteSlot}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default function AdminDashboardPage() {
  return (
    <SessionProvider>
      <AdminDashboard />
    </SessionProvider>
  )
}


































// "use client"

// import { useState, useEffect } from "react"
// import { format, setHours, setMinutes, addMinutes } from "date-fns"
// import axios from 'axios'
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import { SessionProvider } from "next-auth/react"
// import { DatePicker } from "@/components/ui/date-picker"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { toast } from "sonner"
// import { Edit, BookOpen, Plus } from 'lucide-react'

// const games = [
//   "FC25",
//   "Mortal Combat 11",
//   "GTA V",
//   "UFC",
//   "WWE 2k23",
//   "Spider-Man",
//   "God of War",
//   "Rocket League"
// ]

// const consoles = ["Console 1", "Console 2"]

// const admins = ["Admin 1", "Admin 2", "Admin 3"]

// type Slot = {
//   id: string
//   startTime: string
//   endTime: string
//   isBooked: boolean
//   customerName?: string
//   game?: string
//   price?: number
//   bookedBy?: string
// }

// function generateTimeSlots() {
//   const slots = []
//   let start = setHours(setMinutes(new Date(), 0), 11) // 11:00 AM
//   const end = setHours(setMinutes(new Date(), 0), 23) // 11:00 PM

//   while (start < end) {
//     slots.push(format(start, "HH:mm"))
//     start = addMinutes(start, 30)
//   }

//   return slots
// }

// const timeSlots = generateTimeSlots()

// function AdminDashboard() {
//   const { data: session, status } = useSession()
//   const router = useRouter()

//   const [selectedDate, setSelectedDate] = useState<Date>(new Date())
//   const [selectedConsole, setSelectedConsole] = useState(consoles[0])
//   const [slots, setSlots] = useState<Slot[]>([])
//   const [editingSlot, setEditingSlot] = useState<Slot | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isNewBooking, setIsNewBooking] = useState(false)
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth/login")
//     }
//   }, [status, router])

//   useEffect(() => {
//     if (session) {
//       fetchSlots(selectedDate)
//     }
//   }, [selectedDate, session])

//   const fetchSlots = async (date: Date) => {
//     setIsLoading(true)
//     try {
//       const response = await axios.get('/api/slots', {
//         params: { date: format(date, 'yyyy-MM-dd') }
//       })
//       setSlots(response.data)
//     } catch (error: any) {
//       console.error('Error fetching slots:', error)
//       toast.error(`Failed to fetch slots: ${error.response?.data?.details || error.message || 'Unknown error'}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleDateChange = (date: Date | undefined) => {
//     if (date) {
//       setSelectedDate(date)
//     }
//   }

//   const handleBooking = (slot: Slot | null) => {
//     if (slot) {
//       setEditingSlot(slot)
//       setIsNewBooking(false)
//     } else {
//       setEditingSlot(null)
//       setIsNewBooking(true)
//       setSelectedTimeSlot(null)
//     }
//     setIsDialogOpen(true)
//   }

//   const handleSaveBooking = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const formData = new FormData(e.currentTarget)
//     const customerName = formData.get("customerName") as string
//     const game = formData.get("game") as string
//     const price = parseFloat(formData.get("price") as string)
//     const bookedBy = formData.get("bookedBy") as string

//     let startTime, endTime
//     if (isNewBooking && selectedTimeSlot) {
//       startTime = new Date(selectedDate)
//       const [hours, minutes] = selectedTimeSlot.split(':')
//       startTime.setHours(parseInt(hours), parseInt(minutes))
//       endTime = addMinutes(startTime, 30)
//     } else if (editingSlot && editingSlot.startTime && editingSlot.endTime) {
//       startTime = new Date(editingSlot.startTime)
//       endTime = new Date(editingSlot.endTime)
//     } else {
//       toast.error('Invalid booking data')
//       return
//     }

//     try {
//       const response = await axios.post('/api/slots', {
//         id: editingSlot?.id,
//         startTime: startTime.toISOString(),
//         endTime: endTime.toISOString(),
//         isBooked: true,
//         customerName,
//         game,
//         price,
//         bookedBy
//       })

//       if (isNewBooking) {
//         setSlots([...slots, response.data])
//       } else {
//         setSlots(slots.map(slot => 
//           slot.id === editingSlot?.id ? response.data : slot
//         ))
//       }

//       setIsDialogOpen(false)
//       toast.success("Booking saved successfully!")
//       fetchSlots(selectedDate) // Refresh the slots after saving
//     } catch (error: any) {
//       console.error('Error saving booking:', error)
//       toast.error(`Failed to save booking: ${error.response?.data?.details || error.message || 'Unknown error'}`)
//     }
//   }

//   if (status === "loading") {
//     return <div>Loading...</div>
//   }

//   if (!session) {
//     return null
//   }

//   return (
//     <section id="admin-slots" className="py-16 bg-gradient-to-bl from-[#ffe4e6] to-[#ccfbf1] text-black min-h-screen">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-8">Admin Slot Viewer</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <Card className="bg-white/50 backdrop-blur-md border-gray-200">
//             <CardHeader>
//               <CardTitle>Select Date</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <DatePicker
//                 selected={selectedDate}
//                 onSelect={handleDateChange}
//                 className="w-full"
//               />
//             </CardContent>
//           </Card>
//           <Card className="md:col-span-2 bg-white/50 backdrop-blur-md border-gray-200">
//             <CardHeader>
//               <CardTitle>Slots for {selectedDate && format(selectedDate, "MMMM d, yyyy")}</CardTitle>
//               <CardDescription>
//                 Select a console to view and manage slots
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-wrap gap-4 mb-4">
//                 {consoles.map((console) => (
//                   <button
//                     key={console}
//                     onClick={() => setSelectedConsole(console)}
//                     className={`px-4 py-2 rounded-md transition-colors ${
//                       selectedConsole === console
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-200 text-black hover:bg-gray-300"
//                     }`}
//                   >
//                     {console}
//                   </button>
//                 ))}
//               </div>
//               <Button
//                 onClick={() => handleBooking(null)}
//                 className="mb-4 w-full md:w-auto"
//               >
//                 <Plus className="mr-2 h-4 w-4" /> New Booking
//               </Button>
//               {isLoading ? (
//                 <p>Loading slots...</p>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {slots.map((slot) => (
//                     <Card 
//                       key={slot.id} 
//                       className="p-4 bg-white/30 backdrop-blur-sm relative"
//                     >
//                       <CardContent className="p-0 flex flex-col justify-between h-full">
//                         <div className={`p-2 rounded-t-md ${slot.isBooked ? 'bg-blue-100' : 'bg-green-100'}`}>
//                           <p className="text-lg font-semibold">
//                             {format(new Date(slot.startTime), "h:mm a")} - {format(new Date(slot.endTime), "h:mm a")}
//                           </p>
//                         </div>
//                         <div className="mt-2">
//                           <Badge 
//                             variant={slot.isBooked ? "secondary" : "default"} 
//                             className={`${slot.isBooked ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
//                           >
//                             {slot.isBooked ? "Booked" : "Available"}
//                           </Badge>
//                           {slot.isBooked && (
//                             <div className="mt-2 text-xs font-bold text-sky-500">
//                               <p>Customer: {slot.customerName}</p>
//                               <p>Game: {slot.game}</p>
//                               <p>Price: {slot.price}tk</p>
//                               <p>Booked by: {slot.bookedBy}</p>
//                             </div>
//                           )}
//                         </div>
//                         <Button 
//                           variant="ghost" 
//                           size="icon"
//                           onClick={() => handleBooking(slot)}
//                           className="absolute top-2 right-2 hover:bg-gray-100"
//                         >
//                           {slot.isBooked ? (
//                             <Edit className="h-4 w-4" />
//                           ) : (
//                             <BookOpen className="h-4 w-4" />
//                           )}
//                           <span className="sr-only">{slot.isBooked ? "Edit" : "Book"}</span>
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>{isNewBooking ? "New Booking" : (editingSlot?.isBooked ? "Edit Booking" : "New Booking")}</DialogTitle>
//             <DialogDescription>
//               {isNewBooking 
//                 ? "Create a new booking" 
//                 : (editingSlot?.startTime && editingSlot?.endTime
//                     ? `Enter the booking details for ${format(new Date(editingSlot.startTime), "h:mm a")} - ${format(new Date(editingSlot.endTime), "h:mm a")}`
//                     : "Enter the booking details"
//                   )
//               }
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleSaveBooking}>
//             <div className="grid gap-4 py-4">
//               {isNewBooking && (
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="timeSlot" className="text-right">
//                     Time Slot
//                   </Label>
//                   <Select 
//                     name="timeSlot" 
//                     value={selectedTimeSlot || undefined}
//                     onValueChange={(value) => setSelectedTimeSlot(value)}
//                   >
//                     <SelectTrigger className="col-span-3">
//                       <SelectValue placeholder="Select a time slot" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {timeSlots.map((slot) => (
//                         <SelectItem key={slot} value={slot}>
//                           {slot}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="customerName" className="text-right">
//                   Customer
//                 </Label>
//                 <Input
//                   id="customerName"
//                   name="customerName"
//                   defaultValue={editingSlot?.customerName}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="game" className="text-right">
//                   Game
//                 </Label>
//                 <Select name="game" defaultValue={editingSlot?.game}>
//                   <SelectTrigger className="col-span-3">
//                     <SelectValue placeholder="Select a game" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {games.map((game) => (
//                       <SelectItem key={game} value={game}>
//                         {game}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="price" className="text-right">
//                   Price
//                 </Label>
//                 <Input
//                   id="price"
//                   name="price"
//                   type="number"
//                   defaultValue={editingSlot?.price}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="bookedBy" className="text-right">
//                   Booked By
//                 </Label>
//                 <Select name="bookedBy" defaultValue={editingSlot?.bookedBy}>
//                   <SelectTrigger className="col-span-3">
//                     <SelectValue placeholder="Select admin" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {admins.map((admin) => (
//                       <SelectItem key={admin} value={admin}>
//                         {admin}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button type="submit">Save changes</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </section>
//   )
// }

// export default function AdminDashboardPage() {
//   return (
//     <SessionProvider>
//       <AdminDashboard />
//     </SessionProvider>
//   )
// }
























// "use client"

// import { fetchSlots } from "@/app/utils/api/slot"
// import { useState } from "react"
// import { format, setHours, setMinutes } from "date-fns"
// import { DatePicker } from "@/components/ui/date-picker"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { toast } from "sonner"
// import { Edit, TicketCheck} from 'lucide-react'

// const games = [
//   "FC25",
//   "Mortal Combat 11",
//   "GTA V",
//   "UFC",
//   "WWE 2k23",
//   "Spider-Man",
//   "God of War",
//   "Rocket League"
// ]

// const consoles = ["Console 1", "Console 2"]

// const admins = ["Admin 1", "Admin 2", "Admin 3"]

// type Slot = {
//   id: string
//   startTime: Date
//   endTime: Date
//   duration: 30 | 60
//   isBooked: boolean
//   customerName?: string
//   game?: string
//   price?: number
//   bookedBy?: string
// }

// export default function AdminSlotViewer() {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date())
//   const [selectedConsole, setSelectedConsole] = useState(consoles[0])
//   const [slots, setSlots] = useState<Slot[]>([])
//   const [editingSlot, setEditingSlot] = useState<Slot | null>(null)

//   // Generate slots for the selected date
//   const generateSlots = (date: Date): Slot[] => {
//     const generatedSlots: Slot[] = []
//     const startHour = 12
//     const endHour = 23

//     for (let hour = startHour; hour < endHour; hour++) {
//       for (let minute = 0; minute < 60; minute += 30) {
//         const startTime = setMinutes(setHours(date, hour), minute)
//         const endTime = setMinutes(setHours(date, hour + (minute + 30 >= 60 ? 1 : 0)), (minute + 30) % 60)
//         generatedSlots.push({
//           id: `${startTime.getTime()}`,
//           startTime,
//           endTime,
//           duration: 30,
//           isBooked: Math.random() < 0.3 // Randomly set some slots as booked for demonstration
//         })
//       }
//     }

//     return generatedSlots
//   }

//   const handleDateChange = (date: Date| undefined) => {
//     if(date){
//       setSelectedDate(date)
//       setSlots(generateSlots(date))
//     } else {
//       setSlots([]);
//     }
//   }
//   // const handleDateChange = async (date: Date | undefined) => {
//   //   if (date) {
//   //     setSelectedDate(date)
//   //     try {
//   //       const fetchedSlots = await fetchSlots(date)
//   //       setSlots(fetchedSlots)
//   //     } catch (error) {
//   //       console.error("Error fetching slots:", error)
//   //       toast.error("Failed to fetch slots")
//   //     }
//   //   } else {
//   //     setSlots([])
//   //   }
//   // }
  

//   const handleBooking = (slot: Slot) => {
//     setEditingSlot(slot)
//   }

//   const handleSaveBooking = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (!editingSlot) return;
//     console.log("Form submitted");

//     const formData = new FormData(e.currentTarget)
//     const customerName = formData.get("customerName") as string
//     const game = formData.get("game") as string
//     const price = parseFloat(formData.get("price") as string)
//     const bookedBy = formData.get("bookedBy") as string

//     console.log(customerName, game, price, bookedBy);
//     const updatedSlots = slots.map(slot => 
//       slot.id === editingSlot.id 
//         ? { ...slot, isBooked: true, customerName, game, price, bookedBy }
//         : slot
//     )

//     setSlots(updatedSlots)
//     setEditingSlot(null)
//     console.log(toast.success("Booking saved successfully!"))
//   }

//   return (
//     <section id="admin-slots" className="py-16 bg-gradient-to-bl from-[#ffe4e6] to-[#ccfbf1] text-black">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-8">Admin Slot Viewer</h2>
//         <div className="mb-8">
//           <Card className="bg-white/50 backdrop-blur-md border-gray-200">
//             <CardHeader>
//               <CardTitle>Select Date</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <DatePicker
//                 selected={selectedDate}
//                 onSelect={handleDateChange}
//                 className="w-full"
//               />
//             </CardContent>
//           </Card>
//         </div>
//         <Card className="bg-white/50 backdrop-blur-md border-gray-200">
//           <CardHeader>
//             <CardTitle>Slots for {selectedDate && format(selectedDate, "MMMM d, yyyy")}</CardTitle>
//             <CardDescription>
//               Select a console to view and manage slots
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex space-x-4 mb-4">
//               {consoles.map((console) => (
//                 <button
//                   key={console}
//                   onClick={() => setSelectedConsole(console)}
//                   className={`px-4 py-2 rounded-md transition-colors ${
//                     selectedConsole === console
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-black hover:bg-gray-300"
//                   }`}
//                 >
//                   {console}
//                 </button>
//               ))}
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {slots.map((slot) => (
//                 <Card 
//                   key={slot.id} 
//                   className="p-4 bg-white/30 backdrop-blur-sm relative"
//                 >
//                   <CardContent className="p-0 flex flex-col justify-between h-full">
//                     <div className={` rounded-md ${slot.isBooked ? 'bg-blue-100' : 'bg-green-100'}`}>
//                       <p className=" font-semibold rounded-md">
//                         {format(slot.startTime, "h:mm a")} - {format(slot.endTime, "h:mm a")}
//                       </p>
//                     </div>
//                     <div className="mt-2">
//                       <Badge 
//                         variant={slot.isBooked ? "secondary" : "default"} 
//                         className={`${slot.isBooked ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
//                       >
//                         {slot.isBooked ? "Booked" : "Available"}
//                       </Badge>
//                       {slot.isBooked && (
//                         <div className="mt-2 text-xs font-bold text-sky-500">
//                           <p>Customer : {slot.customerName}</p>
//                           <p>Game : {slot.game}</p>
//                           <p>Price : {slot.price}tk</p>
//                           <p>Booked by : {slot.bookedBy}</p>
//                         </div>
//                       )}
//                     </div>
//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Button 
//                           variant="ghost" 
//                           size="icon"
//                           onClick={() => handleBooking(slot)}
//                           className="absolute top-2 right-2 hover:bg-gray-100"
//                         >
//                           {slot.isBooked ? (
//                             <Edit className="h-4 w-4" />
//                           ) : (
//                             <TicketCheck className="h-4 w-4" />
//                           )}
//                           <span className="sr-only">{slot.isBooked ? "Edit" : "Book"}</span>
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                           <DialogTitle>{slot.isBooked ? "Edit Booking" : "New Booking"}</DialogTitle>
//                           <DialogDescription>
//                             Enter the booking details for {format(slot.startTime, "h:mm a")} - {format(slot.endTime, "h:mm a")}
//                           </DialogDescription>
//                         </DialogHeader>
//                         <form onSubmit={handleSaveBooking}>
//                           <div className="grid gap-4 py-4">
//                             <div className="grid grid-cols-4 items-center gap-4">
//                               <Label htmlFor="customerName" className="text-right">
//                                 Customer
//                               </Label>
//                               <Input
//                                 id="customerName"
//                                 name="customerName"
//                                 defaultValue={slot.customerName}
//                                 className="col-span-3"
//                               />
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-4">
//                               <Label htmlFor="game" className="text-right">
//                                 Game
//                               </Label>
//                               <Select name="game" defaultValue={slot.game}>
//                                 <SelectTrigger className="col-span-3">
//                                   <SelectValue placeholder="Select a game" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   {games.map((game) => (
//                                     <SelectItem key={game} value={game}>
//                                       {game}
//                                     </SelectItem>
//                                   ))}
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-4">
//                               <Label htmlFor="price" className="text-right">
//                                 Price
//                               </Label>
//                               <Input
//                                 id="price"
//                                 name="price"
//                                 type="number"
//                                 defaultValue={slot.price}
//                                 className="col-span-3"
//                               />
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-4">
//                               <Label htmlFor="bookedBy" className="text-right">
//                                 Booked By
//                               </Label>
//                               <Select name="bookedBy" defaultValue={slot.bookedBy}>
//                                 <SelectTrigger className="col-span-3">
//                                   <SelectValue placeholder="Select admin" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   {admins.map((admin) => (
//                                     <SelectItem key={admin} value={admin}>
//                                       {admin}
//                                     </SelectItem>
//                                   ))}
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                           </div>
//                           <DialogFooter>
//                             <Button type="submit">Save changes</Button>
//                           </DialogFooter>
//                         </form>
//                       </DialogContent>
//                     </Dialog>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </section>
//   )
// }








// // "use client"

// // import { useState } from "react"
// // import { format, setHours, setMinutes } from "date-fns"
// // import { DatePicker } from "@/components/ui/date-picker"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Badge } from "@/components/ui/badge"
// // import { ScrollArea } from "@/components/ui/scroll-area"
// // import { Button } from "@/components/ui/button"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select"
// // import { toast } from "sonner"

// // const games = [
// //   "FC25",
// //   "Mortal Combat 11",
// //   "GTA V",
// //   "UFC",
// //   "WWE 2k23",
// //   "Spider-Man",
// //   "God of War",
// //   "Rocket League"
// // ]

// // const consoles = ["Console 1", "Console 2"]

// // const admins = ["Admin 1", "Admin 2", "Admin 3"]

// // type Slot = {
// //   id: string
// //   startTime: Date
// //   endTime: Date
// //   duration: 30 | 60
// //   isBooked: boolean
// //   customerName?: string
// //   game?: string
// //   price?: number
// //   bookedBy?: string
// // }

// // export default function AdminSlotViewer() {
// //   const [selectedDate, setSelectedDate] = useState<Date>(new Date())
// //   const [selectedConsole, setSelectedConsole] = useState(consoles[0])
// //   const [slots, setSlots] = useState<Slot[]>([])
// //   const [editingSlot, setEditingSlot] = useState<Slot | null>(null)

// //   // Generate slots for the selected date
// //   const generateSlots = (date: Date): Slot[] => {
// //     const generatedSlots: Slot[] = []
// //     const startHour = 12
// //     const endHour = 23

// //     for (let hour = startHour; hour < endHour; hour++) {
// //       for (let minute = 0; minute < 60; minute += 30) {
// //         const startTime = setMinutes(setHours(date, hour), minute)
// //         const endTime = setMinutes(setHours(date, hour + (minute + 30 >= 60 ? 1 : 0)), (minute + 30) % 60)
// //         generatedSlots.push({
// //           id: `${startTime.getTime()}`,
// //           startTime,
// //           endTime,
// //           duration: 30,
// //           isBooked: false
// //         })
// //       }
// //     }

// //     return generatedSlots
// //   }

// //   const handleDateChange = (date: Date | undefined) => {
// //     if(date){
// //     setSelectedDate(date)
// //     setSlots(generateSlots(date))
// //     }else{
// //       setSlots([]);
// //     }
// //   }

// //   const handleBooking = (slot: Slot) => {
// //     setEditingSlot(slot)
// //   }

// //   const handleSaveBooking = (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault()
// //     if (!editingSlot) return

// //     const formData = new FormData(e.currentTarget)
// //     const customerName = formData.get("customerName") as string
// //     const game = formData.get("game") as string
// //     const price = parseFloat(formData.get("price") as string)
// //     const bookedBy = formData.get("bookedBy") as string

// //     const updatedSlots = slots.map(slot => 
// //       slot.id === editingSlot.id 
// //         ? { ...slot, isBooked: true, customerName, game, price, bookedBy }
// //         : slot
// //     )

// //     setSlots(updatedSlots)
// //     setEditingSlot(null)
// //     toast.success("Booking saved successfully!")
// //   }

// //   return (
// //     <section id="admin-slots" className="py-16 ">
// //       <div className="container mx-auto px-4">
// //         <h2 className="text-3xl font-bold text-center mb-8 text-white">Admin Slot Viewer</h2>
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> 
// //           <Card className=" ">
// //             <CardHeader>
// //               <CardTitle>Select Date</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <DatePicker
// //                 selected={selectedDate}
// //                 onSelect={handleDateChange}
// //                 className="w-full"
// //               />
// //             </CardContent>
// //           </Card>
// //           <Card className="lg:col-span-2 ">
// //             <CardHeader>
// //               <CardTitle>Slots for {selectedDate && format(selectedDate, "MMMM d, yyyy")}</CardTitle>
// //               <CardDescription className="">
// //                 Select a console to view and manage slots
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="flex space-x-4 mb-4">
// //                 {consoles.map((console) => (
// //                   <button
// //                     key={console}
// //                     onClick={() => setSelectedConsole(console)}
// //                     className={`px-4 py-2 rounded-md transition-colors ${
// //                       selectedConsole === console
// //                         ? "bg-yellow-500 text-black"
// //                         : "bg-gray-700 text-white hover:bg-gray-600"
// //                     }`}
// //                   >
// //                     {console}
// //                   </button>
// //                 ))}
// //               </div>
// //               <ScrollArea className="h-[400px]">
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   {slots.map((slot) => (
// //                     <Card key={slot.id} className={`p-4 ${slot.isBooked ? 'bg-gray-700' : 'bg-gray-800'}`}>
// //                       <CardContent className="p-0 flex items-center justify-between">
// //                         <div>
// //                           <p className="text-sm font-semibold">
// //                             {format(slot.startTime, "h:mm a")} - {format(slot.endTime, "h:mm a")}
// //                           </p>
// //                           <Badge variant={slot.isBooked ? "secondary" : "default"} className="mt-1">
// //                             {slot.isBooked ? "Booked" : "Available"}
// //                           </Badge>
// //                           {slot.isBooked && (
// //                             <div className="mt-2 text-xs">
// //                               <p>Customer: {slot.customerName}</p>
// //                               <p>Game: {slot.game}</p>
// //                               <p>Price: ${slot.price}</p>
// //                               <p>Booked by: {slot.bookedBy}</p>
// //                             </div>
// //                           )}
// //                         </div>
// //                         <Dialog>
// //                           <DialogTrigger asChild>
// //                             <Button variant="outline" onClick={() => handleBooking(slot)}>
// //                               {slot.isBooked ? "Edit" : "Book"}
// //                             </Button>
// //                           </DialogTrigger>
// //                           <DialogContent className="sm:max-w-[425px]">
// //                             <DialogHeader>
// //                               <DialogTitle>{slot.isBooked ? "Edit Booking" : "New Booking"}</DialogTitle>
// //                               <DialogDescription>
// //                                 Enter the booking details for {format(slot.startTime, "h:mm a")} - {format(slot.endTime, "h:mm a")}
// //                               </DialogDescription>
// //                             </DialogHeader>
// //                             <form onSubmit={handleSaveBooking}>
// //                               <div className="grid gap-4 py-4">
// //                                 <div className="grid grid-cols-4 items-center gap-4">
// //                                   <Label htmlFor="customerName" className="text-right">
// //                                     Customer
// //                                   </Label>
// //                                   <Input
// //                                     id="customerName"
// //                                     name="customerName"
// //                                     defaultValue={slot.customerName}
// //                                     className="col-span-3"
// //                                   />
// //                                 </div>
// //                                 <div className="grid grid-cols-4 items-center gap-4">
// //                                   <Label htmlFor="game" className="text-right">
// //                                     Game
// //                                   </Label>
// //                                   <Select name="game" defaultValue={slot.game}>
// //                                     <SelectTrigger className="col-span-3">
// //                                       <SelectValue placeholder="Select a game" />
// //                                     </SelectTrigger>
// //                                     <SelectContent>
// //                                       {games.map((game) => (
// //                                         <SelectItem key={game} value={game}>
// //                                           {game}
// //                                         </SelectItem>
// //                                       ))}
// //                                     </SelectContent>
// //                                   </Select>
// //                                 </div>
// //                                 <div className="grid grid-cols-4 items-center gap-4">
// //                                   <Label htmlFor="price" className="text-right">
// //                                     Price
// //                                   </Label>
// //                                   <Input
// //                                     id="price"
// //                                     name="price"
// //                                     type="number"
// //                                     defaultValue={slot.price}
// //                                     className="col-span-3"
// //                                   />
// //                                 </div>
// //                                 <div className="grid grid-cols-4 items-center gap-4">
// //                                   <Label htmlFor="bookedBy" className="text-right">
// //                                     Booked By
// //                                   </Label>
// //                                   <Select name="bookedBy" defaultValue={slot.bookedBy}>
// //                                     <SelectTrigger className="col-span-3">
// //                                       <SelectValue placeholder="Select admin" />
// //                                     </SelectTrigger>
// //                                     <SelectContent>
// //                                       {admins.map((admin) => (
// //                                         <SelectItem key={admin} value={admin}>
// //                                           {admin}
// //                                         </SelectItem>
// //                                       ))}
// //                                     </SelectContent>
// //                                   </Select>
// //                                 </div>
// //                               </div>
// //                               <DialogFooter>
// //                                 <Button type="submit">Save changes</Button>
// //                               </DialogFooter>
// //                             </form>
// //                           </DialogContent>
// //                         </Dialog>
// //                       </CardContent>
// //                     </Card>
// //                   ))}
// //                 </div>
// //               </ScrollArea>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }

