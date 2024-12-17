import { useSignUpMutation } from "@/redux/features/auth/authApi";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating Account...");
    try {
      const userInfo = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        password: data?.password,
      };
      const res = await signUp(userInfo).unwrap();
      toast.success(res.message || "User Register Successfully!!!", {
        id: toastId,
        duration: 3000,
      });
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  const errorMessages = Object.values(errors).map(
    (error: any, index: number) => (
      <li key={index} className="text-red-500">
        {error.message}
      </li>
    )
  );

  return (
    <div className="container mx-auto pb-20 lg:pb-28">
      <Helmet>
        <title>PowerPulse Fitness | Register</title>
      </Helmet>
      <div className="flex items-center flex-col lg:flex-row gap-5 lg:gap-40">
        <div className=" md:w-[600px]  ">
          <Player
            autoplay
            loop
            src="https://lottie.host/b759c0fc-4c77-4918-abbb-a3d3e1026e7d/KoNeQ25HCu.json"
          ></Player>
        </div>
        <div className="lg:pt-16">
          <h1
            className="text-[#1d1d1f] text-4xl font-oswald text-center pb-10 md:pb-12"
            style={{ lineHeight: "1", letterSpacing: "0.025em" }}
          >
            Create Account
          </h1>

          {Object.keys(errors).length > 0 && (
            <ul
              className="font-oswald list-disc pl-10 pt-3 pb-3 mb-5 space-y-1  font-medium border border-[#d02e2e] bg-[#fff6f6] text-[#d02e2e]"
              style={{ lineHeight: "1.6", letterSpacing: "0.025em" }}
            >
              {errorMessages}
            </ul>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-7">
                <h2
                  className="text-base font-normal text-[#1D1D1F] mb-3 uppercase font-oswald"
                  style={{ letterSpacing: "0.3em" }}
                >
                  First Name
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[461px] mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-oswald   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                  type="text"
                  id=""
                  placeholder=""
                  {...register("firstName", {
                    required: "First Name is Required",
                  })}
                />
              </div>
              <div className="mb-7">
                <h2
                  className="text-base font-normal text-[#1D1D1F] mb-3 uppercase font-oswald"
                  style={{ letterSpacing: "0.3em" }}
                >
                  Last Name
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[461px] mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-oswald   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                  type="text"
                  id=""
                  placeholder=""
                  {...register("lastName", {
                    required: "Last Name is Required",
                  })}
                />
              </div>
              <div className="mb-7">
                <h2
                  className="text-base font-normal text-[#1D1D1F] mb-3 uppercase font-oswald"
                  style={{ letterSpacing: "0.3em" }}
                >
                  Email
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[461px] mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-oswald   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                  type="email"
                  id=""
                  placeholder=""
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              <div className="mb-7">
                <h2
                  className="text-base font-normal text-[#1D1D1F] mb-3 uppercase font-oswald"
                  style={{ letterSpacing: "0.3em" }}
                >
                  Password
                </h2>
                <div className="relative">
                  <input
                    className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[461px] border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-oswald   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                    type={showPassword ? "text" : "password"}
                    id=""
                    placeholder=""
                    {...register("password", {
                      required: "Password is Required",
                      minLength: {
                        value: 6,
                        message:
                          "Password is too short (minimum is 6 characters)",
                      },
                    })}
                  />
                  <span
                    className="absolute right-4 md:right-2 top-4 rtl:left-0 rtl:right-auto "
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-xl"></AiOutlineEyeInvisible>
                    ) : (
                      <AiOutlineEye className="text-xl"></AiOutlineEye>
                    )}
                  </span>
                </div>
              </div>
              <div className="mb-5">
                <input
                  style={{ lineHeight: "1.42", letterSpacing: ".3em" }}
                  type="submit"
                  className="py-3 bg-[#1d1d1f] text-white w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[461px] text-base font-bold cursor-pointer font-oswald login-button"
                  value="Create"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
