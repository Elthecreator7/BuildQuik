import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from 'random-word-slugs'

export const projectsRouter = createTRPCRouter({
    getMany: baseProcedure
        .query(async () => {
            const projects = await prisma.project.findMany({
                orderBy: {
                    updateAt: "desc",
                }
            });

            return projects;
        }),
    create: baseProcedure
        .input(
            z.object({
                value: z.string().min(1, { message: "Value is required" }).max(10000, {message: "Value is too long"}),
            }),
        )
        .mutation(async ({ input }) => {
            const createdProjects = await prisma.project.create({
                data: {
                    name: generateSlug(2, {
                        format: "kebab"
                    }),
                    messages: {
                        create: {
                            content: input.value,
                            role: "USER",
                            type: "RESULT",
                        }
                    }
                }
            });
            await inngest.send({
                name: "code-agent/run",
                data: {
                    value: input.value,
                    projectId: createdProjects.id
                }
            });
            return createdProjects;

        }),
})

//Reminder: create will be accessed as message.create()
//Reminder2: createdMessage === newMessage this is so that the API response has a...well response