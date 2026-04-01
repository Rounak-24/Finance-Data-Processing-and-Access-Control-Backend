import z from "zod"

export const registerUserSchema = z.object({
    body: z.object({
        fullname: z.string().min(5, 'Fullname must be at least 5 characters'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        role: z.enum(["Viewer","Analyst","Admin"],{
            error: (issue) => ({
                message:
                    issue.input === undefined
                        ? "Role is required and cannot be empty."
                        : "Invalid role. Must be 'Viewer', 'Analyst', or 'Admin'.",
            }),
        }),
        isActive: z.boolean().default(true)
    })
})

export const loginUserSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(1, 'Password is required')
    })
})