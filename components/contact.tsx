'use client';

import React from 'react';
import SectionHeading from './section-heading';
import { useSectionInView } from "@/lib/hooks";
import { motion } from 'framer-motion';
import { sendEmail } from '@/actions/sendEmail';
import toast from "react-hot-toast";
import SubmitBtn from './submit-btn';

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id='contact'
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:shoryadubey7610@gmail.com">
          shoryadubey7610@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (rawFormData) => {
          // Ensure new FormData (optional defensive measure)
          const formData = new FormData();
          rawFormData.forEach((value, key) => formData.append(key, value));

          const { data, error } = await sendEmail(formData);

          toast.dismiss();

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
        }}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          type="email"
          name="senderEmail"
          required
          maxLength={500}
          placeholder="Your Email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderMessage"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}
