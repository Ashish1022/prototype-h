"use server";

import { sendEmail } from "@/modules/auth/lib/utils";
import { jobApplicationSchema } from "../_components/schema";
import { z } from "zod";

export async function submitJobApplication(data: z.infer<typeof jobApplicationSchema>) {
    try {
        const validatedData = jobApplicationSchema.parse(data);

        await sendEmail('zero.business.hub@gmail.com', 'Job Application', 'job-application', validatedData);
        // await sendEmail('zero.business.hub@gmail.com', 'Application Received', 'job-application-confirmation.ejs', validatedData);

        return { success: true, message: 'Application submitted successfully' };
    } catch (error) {
        console.error('Job application submission error:', error);
        return { success: false, message: 'Error submitting application! Please try again.' };
    }
}