import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient();

async function seed() {
    // Admin users (for authentication)
    const admins = [
        { email: "raisoulrayat@gmail.com", password: "password123" },
        { email: "naimurriyad12590@gmail.com", password: "password123" },
        { email: "admin@gmail.com", password: "password" }
    ];

    // Seed Admins
    for (const admin of admins) {
        const hashedPassword = await bcrypt.hash(admin.password, 10);

        const existingAdmin = await prisma.admin.findUnique({
            where: { email: admin.email },
        });

        if (!existingAdmin) {
            await prisma.admin.create({
                data: {
                    email: admin.email,
                    password: hashedPassword,
                },
            });
            console.log(`Admin created: ${admin.email}`);
        } else {
            console.log(`Admin already exists: ${admin.email}`);
        }
    }

    // BookingAdmin users (for booking management)
    const bookingAdmins = [
        { email: "omi@cyberarena.com", password: "admin123" },
        { email: "riyad@cyberarena.com", password: "admin123" }
    ];

    // Seed BookingAdmins
    for (const bookingAdmin of bookingAdmins) {
        const hashedPassword = await bcrypt.hash(bookingAdmin.password, 10);

        const existingBookingAdmin = await prisma.bookingAdmin.findUnique({
            where: { email: bookingAdmin.email },
        });

        if (!existingBookingAdmin) {
            await prisma.bookingAdmin.create({
                data: {
                    email: bookingAdmin.email,
                    password: hashedPassword,
                },
            });
            console.log(`BookingAdmin created: ${bookingAdmin.email}`);
        } else {
            console.log(`BookingAdmin already exists: ${bookingAdmin.email}`);
        }
    }
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });













// import bcrypt from "bcrypt";
// // import { PrismaClient } from "@prisma/client/";
// import { PrismaClient } from "@prisma/client";
// const prisma =new PrismaClient();
// async function seedAdmins() {
//     const admins =[
//         {email:"raisoulrayat@gmail.com",password:"password123"},
//         {email:"naimurriyad12590@gmail.com",password:"password123"},
//         {email:"admin@gmail.com",password:"password"},
//     ];
//     for(const admin of admins){
//         const hashedPassword =await bcrypt.hash(admin.password,10);

//         const existingAdmin =await prisma.admin.findUnique({
//             where:{ email:admin.email},
//         });

//         if(!existingAdmin){
//             await prisma.admin.create({
//                 data:{
//                     email:admin.email,
//                     password:hashedPassword,
//                 },
//             });
//             console.log(`Admin created: ${admin.email}`);
//     } else {
//       console.log(`Admin already exists: ${admin.email}`);
//     }
//         }
//     }

//     seedAdmins()
//     .catch((e)=>{
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async()=>{
//         await prisma.$disconnect();
//     });
