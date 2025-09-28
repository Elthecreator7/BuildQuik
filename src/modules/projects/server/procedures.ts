import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import {  createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from 'random-word-slugs'
import { TRPCError } from "@trpc/server";

export const projectsRouter = createTRPCRouter({
    getOne: protectedProcedure
    .input(z.object({
        id: z.string().min(1, {message: "Id is required"})
    }))
        .query(async ({ input, ctx }) => {
            const existingProject = await prisma.project.findUnique({
              where:{
                id: input.id,
                userId: ctx.auth.userId,
              }
            });

            if(!existingProject){
                throw new TRPCError({code: "NOT_FOUND", message: "Project not found"});
            }

            return existingProject;
        }),
    getMany: protectedProcedure
        .query(async ({ ctx }) => {
            const projects = await prisma.project.findMany({
                where: {
                    userId: ctx.auth.userId,
                },
                orderBy: {
                    updateAt: "desc",
                }
            });

            return projects;
        }),
    create: protectedProcedure
        .input(
            z.object({
                value: z.string().min(1, { message: "Value is required" }).max(10000, {message: "Value is too long"}),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const createdProjects = await prisma.project.create({
                data: {
                    userId: ctx.auth.userId,
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