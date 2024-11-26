import ContactUsText from "./_component/ContactUsText";
import ContactUsForm from "./_component/ContactUsForm";

export const metadata = {
  title: "Exploring World - Contact Us",
  description: "Welcome to contact us page.",
  keywords: "contact us, phone, email, address, location",
};

const ContactUs = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 lg:items-center">
        <ContactUsText />
        <ContactUsForm />
      </div>
      <div className="mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1260.7511182722742!2d-1.0770857999999999!3d50.80333279999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48745d08b8a8a04d%3A0xa2b63f20bfe78df6!2sFratton%20Rd%2C%20Fratton%2C%20Portsmouth%20PO1%205HA%2C%20UK!5e0!3m2!1sen!2sbd!4v1730312533604!5m2!1sen!2sbd"
          width="100%"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="shadow-xl rounded-md"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
