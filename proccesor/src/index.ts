import { Kafka } from "kafkajs";
import { prisma } from "./db";



const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
    clientId: "outbox-proccesor",
    brokers: ["localhost:9092"]
})

async function proccesor() {
    const producer = kafka.producer()
    await producer.connect()
    await initkafka()

    while (1) {
        const pendingrows = await prisma.zapRunOutBox.findMany({
            where: {},
            take: 10
        })
        await producer.send({
            topic: TOPIC_NAME,
            messages: pendingrows.map((a: any) => {
                return {
                    value: JSON.stringify({ zapRunId: a.zaprunId, stage: 0 })
                }
            })
        })

        await prisma.zapRunOutBox.deleteMany({
            where: {
                id: {
                    in: pendingrows.map((a: any) => a.id)
                }
            }
        })
        await new Promise(a => setTimeout(a, 3000))
    }
}
proccesor()


async function initkafka() {
    const admin = kafka.admin()
    console.log("cnting kfka admn")
    await admin.connect();

    console.log("Kafka admin connected!");

    const currtopics = await admin.listTopics()
    console.log(currtopics, "_______________")
    if (!currtopics.includes("zap-events")) {
        await admin.createTopics({
            topics: [{
                topic: "zap-events",
                numPartitions: 1,
                replicationFactor: 1
            }]
        });
        console.log("Topic 'zap-events' created dynamically!");
    }
    const currtopics2 = await admin.listTopics()
    console.log(currtopics2, "_______________")
    await admin.disconnect();
}