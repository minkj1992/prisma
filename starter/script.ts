import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  const user = await prisma.user.create({
    data: {
      email: "leoo2@gmail.com",
      name: "leoo",
    },
  });

  const post = await prisma.post.create({
    data: {
      title: "Leoo's first post with GQL",
      author: {
        connect: {
          email: "leoo2@gmail.com",
        },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    // eager loading
    include: { posts: true },
  });

  // const results = await Promise.all([post, allUsers]);

  console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
