import { Kafka } from "kafkajs";
import { prisma } from "./db";
import { Mailer } from "./helpers/email";
import { Parser } from "./helpers/parser";
import type { JsonObject } from "@prisma/client/runtime/client";


const TOPIC_NAME = "zap-events"
const kafka = new Kafka({
    clientId: "worker-proccesor",
    brokers: ["localhost:9092"]
})

async function workerRun() {

    const consumer = kafka.consumer({ groupId: "group-worker-run" })
    const producer = kafka.producer()
    await consumer.connect()
    await producer.connect()

    await consumer.subscribe({
        topic: TOPIC_NAME,
        fromBeginning: false
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (!message.value) return;
            try {
                const parsedmessage = JSON.parse(message.value?.toString());

                const data = await prisma.zaprun.findFirst({
                    where: {
                        id: parsedmessage.zapRunId,
                    },
                    include: {
                        type: {
                            include: {
                                actions: {
                                    include: {
                                        type: true
                                    }
                                }
                            }
                        }
                    }
                })
                // console.log(data, "-------------------------------")
                const currentstage = parsedmessage.stage;
                const cuurentAction = data?.type.actions.find((a: any) => a.sortingOrder == currentstage)
                const ActionName = cuurentAction?.type.name
                // console.log(cuurentAction)
                if (ActionName == "Email") {
                    const body = Parser((cuurentAction?.metadata as JsonObject)?.body as string, data?.metadata)
                    Mailer({
                        to: (cuurentAction?.metadata as JsonObject)?.email as string,
                        body
                    })
                }

                const laststage = (data?.type.actions.length || 1) - 1
                if (laststage > currentstage) {
                    await producer.send({
                        topic: TOPIC_NAME,
                        messages: [{ value: JSON.stringify({ zapRunId: parsedmessage.zapRunId, stage: currentstage + 1 }) }]
                    })
                    console.log("pushed again to queue")
                }

                await consumer.commitOffsets([{
                    topic: TOPIC_NAME,
                    partition: partition,
                    offset: (parseInt(message.offset) + 1).toString()
                }])

            } catch (error) {
                console.error("Error executing background worker task:", error);
                throw error;
            }
        },
        autoCommit: false
    })
}

workerRun().catch(console.error)