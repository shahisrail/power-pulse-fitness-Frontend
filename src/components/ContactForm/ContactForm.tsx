import { CiTwitter } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { IoIosMail } from "react-icons/io";
import { FaPenToSquare } from "react-icons/fa6";
import "./ContactForm.css";
import { PiTelegramLogo } from "react-icons/pi";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isChecked, setIsChecked] = useState(false);

  // State to handle validation errors
  const [errors, setErrors] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const validateForm = () => {
    const errors = {
      from_name: "",
      from_email: "",
      message: "",
    };
    let isValid = true;

    // Name validation
    if (!form.current?.from_name.value) {
      errors.from_name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!form.current?.from_email.value) {
      errors.from_email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.current?.from_email.value)) {
      errors.from_email = "Invalid email format";
      isValid = false;
    }

    // Message validation
    if (!form.current?.message.value) {
      errors.message = "Message is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the checkbox is checked
    if (!isChecked) {
      toast.error("You must agree to data collection and storage."); // Show toast error
      return; // Exit if checkbox is not checked
    }

    if (!validateForm()) {
      return; // Exit if validation fails
    }

    const toastId = toast.loading("Sending message...");

    emailjs
      .sendForm(
        "service_c0zm213",
        "template_nhaqj9y",
        form.current as HTMLFormElement,
        {
          publicKey: "bK8RydNwVnirPGhf4",
        }
      )
      .then(
        () => {
          form.current?.reset();
          toast.success("Message sent successfully!", {
            id: toastId,
            duration: 3000,
          });
          setErrors({ from_name: "", from_email: "", message: "" }); // Reset errors after success
          setIsChecked(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <div className="container mx-auto mt-10 mb-10">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-40 w-full">
        <div className="w-full lg:w-1/2 rounded-lg px-3 py-5 sm:px-5 sm:py-10 md:py-20 md:px-16 bg-[#FFFFFF]">
          <h1 className="text-4xl font-oswald font-bold text-[#2C2C2C] mb-5">
            Contact Form
          </h1>
          <form ref={form} onSubmit={sendEmail}>
            <div className="flex items-center  contact-hover-effect   mt-6 pb-1">
              <GoPerson className="text-2xl text-[#808080]" />
              <input
                className="w-full pl-3 py-3 outline-none font-poppins text-base text-[#808080]"
                type="text"
                name="from_name"
                id=""
                placeholder="Name"
              />
            </div>
            {errors.from_name && (
              <p className="text-red-500 text-sm pt-1 font-poppins">
                {errors.from_name}
              </p>
            )}
            <div className="flex items-center  contact-hover-effect  mt-6 pb-1">
              <IoIosMail className="text-2xl text-[#808080]" />
              <input
                className="w-full pl-3 py-3 outline-none font-poppins text-base text-[#808080]"
                type="text"
                name="from_email"
                id=""
                placeholder="Email Address"
              />
            </div>
            {errors.from_email && (
              <p className="text-red-500 text-sm font-poppins pt-1">
                {errors.from_email}
              </p>
            )}
            <div className="flex items-center  contact-hover-effect  mt-6 pb-7">
              <FaPenToSquare className="text-2xl text-[#808080]" />
              <input
                className="w-full pl-3 py-3 outline-none font-poppins text-base text-[#808080]"
                type="text"
                name="message"
                id=""
                placeholder="How Can we help you? Feel free to get in touch"
              />
            </div>
            {errors.message && (
              <p className="text-red-500 text-sm font-poppins pt-1">
                {errors.message}
              </p>
            )}
            <div className="flex items-center gap-3 mt-6 mb-2">
              <label className="custom-checkbox-container">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <span className="custom-checkbox"></span>
              </label>
              <p
                className="text-sm font-oswald font-normal text-[#808080]"
                style={{ letterSpacing: "0.050em" }}
              >
                I agree that my data is{" "}
                <span className="contact-hover-effect  ">
                  collected and stored.
                </span>
              </p>
            </div>
            <button
              className="mt-10 bg-[#EC3D08] hover:bg-[#E21010] text-white py-4 px-6 text-base font-poppins uppercase flex items-center gap-3"
              style={{ letterSpacing: "2px" }}
            >
              <PiTelegramLogo className="text-xl" />
              Get In Touch
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/2">
          <h3
            className="font-poppins text-[#2C2C2C] text-start font-semibold text-base uppercase mb-5"
            style={{ letterSpacing: "0.050em" }}
          >
            Contact Us
          </h3>
          <h1
            className="font-lora text-xl semi-sm:text-2xl md:text-3xl lg:text-4xl text-start   lg:w-[360px]   uppercase text-[#2C2C2C] font-bold mb-5"
            style={{ lineHeight: "1.2", letterSpacing: "0.025em" }}
          >
            Have questions? Get in touch!
          </h1>
          <p
            className="font-poppins text-[#808080] text-start font-semibold text-base lg:w-[230px] mb-5"
            style={{ lineHeight: "1.5", letterSpacing: "0.025em" }}
          >
            785 15h Street, Office 478 Berlin, De 81566
          </p>
          <p
            className="font-poppins text-[#808080] text-start font-semibold text-base lg:w-[230px] mb-6"
            style={{ lineHeight: "1.5", letterSpacing: "0.025em" }}
          >
            info@email.com
          </p>
          <h3 className="font-poppins text-[#2C2C2C] text-start font-semibold text-base uppercase mb-7">
            +1 840 841 25 69
          </h3>
          <div className="flex items-center justify-start gap-2 mt-4 ml-0 md:ml-5 lg:ml-0">
            <div className="border max-w-full px-3 py-3 text-[#808080] hover:text-[#40AFF3]  cursor-pointer">
              <FaFacebookF className=" text-xl" />
            </div>
            <div className="border max-w-full px-3 py-3 text-[#808080] hover:text-[#40AFF3] cursor-pointer">
              <FaInstagram className=" text-xl" />
            </div>
            <div className="border max-w-full px-3 py-3 text-[#808080] hover:text-[#40AFF3] cursor-pointer">
              <FaPinterestP className=" text-xl" />
            </div>
            <div className="border max-w-full px-3 py-3 text-[#808080] hover:text-[#40AFF3] cursor-pointer">
              <CiTwitter className=" text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
