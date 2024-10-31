"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactUsForm = () => {
  return (
    <div className="shadow-lg p-6 xl:p-10 rounded-md">
      <p className="text-lg font-semibold mb-2">Say Something</p>
      <form
        target="_blank"
        action="https://formsubmit.co/www.raianshahrear10@gmail.com"
        method="POST"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New submission!" />
        <input
          type="hidden"
          name="_autoresponse"
          value="Your email has been received. Thanks for reaching out to us."
        />
        <div>
          <label className="text-xs font-semibold mb-1 inline-block">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
            placeholder="Enter email"
          />
        </div>
        <div className="mt-2">
          <label className="text-xs font-semibold mb-1 inline-block">
            Comment/Feedback
          </label>
          <textarea
            name="message"
            className="border border-gray-300 w-full min-h-24 px-2 py-1 text-sm rounded-sm"
            placeholder="Write here..."
          ></textarea>
        </div>
        <Button
          type="submit"
          className="h-fit p-2 mt-2"
          onClick={() => toast.success("Thanks for your message!")}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ContactUsForm;
