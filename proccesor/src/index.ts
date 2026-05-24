import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events"
const client = new PrismaClient()

const kafka = new Kafka({
    clientId: "outbox-proccesor",
    brokers: ['localhost:9092']
})
async function Process() {
    const producer = kafka.producer()
    await producer.connect()

    while (1) {

        const pendingrows = await client.zapRunOutBox.findMany({
            where: {},
            take: 10
        })
        producer.send({
            topic: TOPIC_NAME,
            messages: pendingrows.map((r: any) => {
                return {
                    value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 })
                }
            })
        })

        await client.zapRunOutBox.deleteMany({
            where: {
                id: {
                    in: pendingrows.map((a: any) => a.id)
                }
            }
        })

        await new Promise(a => setTimeout(a, 3000))
    }

}

Process()