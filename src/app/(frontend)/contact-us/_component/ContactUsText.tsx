import Link from "next/link";
import { MdLocationOn, MdOutlineEmail, MdPhone } from "react-icons/md";

const ContactUsText = () => {
  return (
    <div>
      <div className="w-full sm:w-96">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Contact Us</h1>
        <p className="text-sm">
          Have questions, feedback, or need assistance? Our team is here to
          help! Reach out through email & contact no, and we’ll connect you with
          the right support to enhance your experience. Whether it’s about
          travel tips, account help, or general inquiries, we’re excited to hear
          from you!
        </p>
        <div className="flex flex-col gap-1 mt-4">
          <Link
            href="mailto: contact@exploringworld.com"
            className="w-fit text-sm text-gray-500 flex items-center gap-1 transition-all duration-300 hover:text-gray-900 hover:underline"
          >
            <MdOutlineEmail />
            <span>contact@exploringworld.com</span>
          </Link>
          <Link
            href="tel: +44 117 2345678"
            className="w-fit text-sm text-gray-500 flex items-center gap-1 transition-all duration-300 hover:text-gray-900 hover:underline"
          >
            <MdPhone />
            <span>+44-117-2345678</span>
          </Link>
          <Link
            href="https://maps.app.goo.gl/dXQoGEwebhNMD2Ao9"
            target="_blank"
            className="w-fit text-sm text-gray-500 flex items-center gap-1 transition-all duration-300 hover:text-gray-900 hover:underline"
          >
            <MdLocationOn />
            <span>Fratton Rd, Fratton, Portsmouth PO1 5HA, UK</span>
          </Link>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="shadow-xl p-4 rounded-md bg-gray-50">
          <h2 className="font-semibold mb-2">Customer Support</h2>
          <p className="text-sm">
            Our dedicated support team is here 24/7 to help with any questions
            or issues you may encounter.
          </p>
        </div>
        <div className="shadow-xl p-4 rounded-md bg-gray-50">
          <h2 className="font-semibold mb-2">Feedback & Suggestions</h2>
          <p className="text-sm">
            Your feedback is invaluable to us, helping us make Snappy even
            better. Your insights shape Snappy’s future.
          </p>
        </div>
        <div className="shadow-xl p-4 rounded-md bg-gray-50">
          <h2 className="font-semibold mb-2">Media Inquiries</h2>
          <p className="text-sm">
            For press or media questions, feel free to reach out at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsText;
