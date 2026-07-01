import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.issue.deleteMany();
  await prisma.newsPost.deleteMany();

  await prisma.issue.createMany({
    data: [
      {
        title: "Broken streetlight on Main St",
        description:
          "The streetlight near the corner of Main St and 2nd Ave has been out for a week, making the crossing dark at night.",
        category: "Safety",
        location: "Main St & 2nd Ave",
        status: "OPEN",
        authorName: "Maria",
      },
      {
        title: "Overflowing bins at Riverside Park",
        description:
          "Trash bins by the playground are overflowing every weekend. We could use an extra collection.",
        category: "Sanitation",
        location: "Riverside Park",
        status: "IN_PROGRESS",
        authorName: "Anonymous",
      },
      {
        title: "Pothole on Elm Street",
        description:
          "Large pothole near house number 14 — already caused a flat tire.",
        category: "Roads & Traffic",
        location: "Elm Street",
        status: "RESOLVED",
        authorName: "Daniel",
      },
      {
        title: "Loud construction before 7am",
        description:
          "Construction crew on Oak Ave starts drilling before permitted hours on weekdays.",
        category: "Noise",
        location: "Oak Ave",
        status: "OPEN",
        authorName: "Anonymous",
      },
    ],
  });

  await prisma.newsPost.createMany({
    data: [
      {
        title: "Community clean-up day this Saturday",
        content:
          "Join us at Riverside Park at 9am for our monthly clean-up. Gloves and bags provided. Coffee and snacks afterwards!",
        authorName: "Community Team",
      },
      {
        title: "Road resurfacing on Elm Street complete",
        content:
          "Thanks for your patience — the Elm Street resurfacing is finished and the road is reopened to traffic.",
        authorName: "City Works",
      },
      {
        title: "New recycling schedule starting next month",
        content:
          "Recycling pickup moves to every Tuesday starting the 1st. Please have bins out by 7am.",
        authorName: "Community Team",
      },
    ],
  });

  console.log("Seeded issues and news posts.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
