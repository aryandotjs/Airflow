import { prisma } from "../src/db/index";
async function main() {

    await prisma.user.deleteMany({});
    await prisma.availableTrigger.deleteMany({});
    await prisma.availableAction.deleteMany({});

    await prisma.availableTrigger.create({
        data: {
            id: "webhook",
            name: "Webhook",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFGzJc27FBvMN81ciQ-9TJsqe0O9GmVTbGQ&s"
        }
    })

    await prisma.availableAction.create({
        data: {
            id: "email",
            name: "Email",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa9DeAiFI8AuhJak1gq9YCmdpm2ju_XhK-Sw&s"
        }
    })

    const user = await prisma.user.create({
        data: {
            email: "seedts@email.com",
            name: "seed ts",
            password: "123123",
            zaps: {
                create: {
                    trigger: {
                        create: {
                            triggerId: "webhook",
                            metadata: {
                                webhookUrl: "https://hooks.airflow.com/123"
                            }
                        }
                    },
                    actions: {
                        create: {
                            ActionId: "email",
                            metadata: {
                                body: "Your automation ran successfully!",
                                to: "user@example.com"
                            }
                        }
                    }
                }
            }
        },
        include: {
            zaps: {
                include: {
                    trigger: true,
                    actions: true
                }
            }
        }
    })

    console.log("seeded successfully", JSON.stringify(user, null, 2))
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

