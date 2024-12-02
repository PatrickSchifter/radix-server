import { PrismaClient } from "@prisma/client";
import { addDays, format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function seedUsers() {
  const users = [
    {
      email: "user1@radix.com.br",
      name: "User 1",
      password: "$2a$12$JpRD8Emgh8QEVyjdxInKA.PElMwsLSaR15VqBEZPRiMxzL/PMrWse", // 123456 if the SECRET_JWT=something
    },
    {
      email: "user2@radix.com.br",
      name: "User 2",
      password: "$2a$12$JpRD8Emgh8QEVyjdxInKA.PElMwsLSaR15VqBEZPRiMxzL/PMrWse", // 123456 if the SECRET_JWT=something
    },
    {
      email: "user3@radix.com.br",
      name: "User 3",
      password: "$2a$12$JpRD8Emgh8QEVyjdxInKA.PElMwsLSaR15VqBEZPRiMxzL/PMrWse", // 123456 if the SECRET_JWT=something
    },
    {
      email: "user4@radix.com.br",
      name: "User 4",
      password: "$2a$12$JpRD8Emgh8QEVyjdxInKA.PElMwsLSaR15VqBEZPRiMxzL/PMrWse", // 123456 if the SECRET_JWT=something
    },
    {
      email: "user5@radix.com.br",
      name: "User 5",
      password: "$2a$12$JpRD8Emgh8QEVyjdxInKA.PElMwsLSaR15VqBEZPRiMxzL/PMrWse", // 123456 if the SECRET_JWT=something
    },
  ];

  await Promise.all(
    users.map(async (userToCreate) => {
      await prisma.user.create({
        data: userToCreate,
      });
    })
  );

  console.info("Users seeded successfully.");
}

async function seedEquipments() {
  const equipments = [
    { id: "EQ-00001", api_key: uuidv4() },
    { id: "EQ-00002", api_key: uuidv4() },
    { id: "EQ-00003", api_key: uuidv4() },
    { id: "EQ-00004", api_key: uuidv4() },
    { id: "EQ-00005", api_key: uuidv4() },
  ];

  await Promise.all(
    equipments.map(async (equipmentToCreate) => {
      await prisma.equipment.create({
        data: equipmentToCreate,
      });
    })
  );

  console.info("Equipments seeded successfully.");
}

async function seedSensorReadings() {
  const equipmentIds = await prisma.equipment.findMany({
    select: { id: true },
  });

  const sensorReadings = [];
  for (let i = 0; i < 1000; i++) {
    const randomEquipment =
      equipmentIds[Math.floor(Math.random() * equipmentIds.length)];
    const randomValue = parseFloat((Math.random() * 100).toFixed(2)); // Geração de valor aleatório
    const randomDate = addDays(new Date(), -Math.floor(Math.random() * 30)); // Gerando data aleatória nos últimos 30 dias
    const formattedDate = format(randomDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    sensorReadings.push({
      equipmentId: randomEquipment.id,
      timestamp: new Date(formattedDate),
      value: randomValue,
    });
  }

  await Promise.all(
    sensorReadings.map(async (reading) => {
      await prisma.sensorReading.create({
        data: reading,
      });
    })
  );

  console.info("Sensor readings seeded successfully.");
}

async function seed() {
  try {
    await seedUsers();
    await seedEquipments();
    await seedSensorReadings();
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
