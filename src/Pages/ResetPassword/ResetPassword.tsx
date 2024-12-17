import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Parse the query parameters
  const email = searchParams.get("email"); // Get email from URL
  const token = searchParams.get("token"); // Get token from URL
  // console.log(token);

  const newPassword = watch("newPassword");

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Proceeding to Reset Password");
    try {
      const newUpdatedPassword = {
        token,
        newPassword: data?.newPassword,
        confirmNewPassword: data?.confirmNewPassword,
      };
      const res = await resetPassword(newUpdatedPassword).unwrap();
      console.log(res);
      const user = verifyToken(res?.data?.accessToken);
      console.log(user);
      dispatch(
        setUser({
          user: { user, id: res.data.user?._id },
          token: res?.data.accessToken,
        })
      );
      toast.success(res.message || "Password reset to the successfully!", {
        id: toastId,
        duration: 3000,
      });
      navigate("/account");
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
    <div className="pt-14 lg:pt-20 pb-32 md:pb-60">
      <Helmet>
        <title>PowerPulse Fitness | Reset-Password</title>
      </Helmet>
      <h1
        className="text-4xl font-oswald font-normal mb-4 text-center"
        style={{ lineHeight: "1", letterSpacing: "0.025em" }}
      >
        Reset account password
      </h1>
      <h2
        className="xs:text-xs sm:text-sm semi-sm:text-base font-normal text-[#1D1D1F] mb-10 uppercase font-oswald text-center"
        style={{ lineHeight: "1.6", letterSpacing: "0.025em" }}
      >
        Enter a new password for {email}
      </h2>

      {Object.keys(errors).length > 0 && (
        <ul
          className="font-oswald list-disc pl-10 pt-3 pb-3 mb-5 ml-3 semi-sm:ml-4 md:ml-36 lg:ml-[730px] space-y-1  w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[461px] font-medium border border-[#d02e2e] bg-[#fff6f6] text-[#d02e2e]"
          style={{ lineHeight: "1.6", letterSpacing: "0.025em" }}
        >
          {errorMessages}
        </ul>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-7 ml-3 semi-sm:ml-4 md:ml-36 lg:ml-[730px]">
          <div className="relative">
            <input
              className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[461px] border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-oswald   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
              type={showNewPassword ? "text" : "password"}
              id=""
              placeholder="New Password"
              {...register("newPassword", {
                required: "Password Can't be Blank.",
                minLength: {
                  value: 6,
                  message: "Password is too short (minimum is 6 characters)",
                },
              })}
            />
            <span
              className="absolute right-6 semi-sm:right-8 md:right-[175px] lg:right-[725px] top-4 rtl:left-0 rtl:right-auto "
              onClick={() => {
                setShowNewPassword(!showNewPassword);
              }}
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible className="text-xl"></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye className="text-xl"></AiOutlineEye>
              )}
            </span>
          </div>
        </div>
        <div className="mb-7 ml-3 semi-sm:ml-4 md:ml-36 lg:ml-[730px]">
          <div className="relative">
            <input
              className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[461px] border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-oswald   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
              type={showConfirmNewPassword ? "text" : "password"}
              id=""
              placeholder="Confirm New Password"
              {...register("confirmNewPassword", {
                required: "Password confirmation can't be blank",
                validate: (value) =>
                  value === newPassword ||
                  "The password confirmation must match the provided password",
              })}
            />
            <span
              className="absolute right-6 semi-sm:right-8 md:right-[175px] lg:right-[725px] top-4 rtl:left-0 rtl:right-auto "
              onClick={() => {
                setShowConfirmNewPassword(!showConfirmNewPassword);
              }}
            >
              {showConfirmNewPassword ? (
                <AiOutlineEyeInvisible className="text-xl"></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye className="text-xl"></AiOutlineEye>
              )}
            </span>
          </div>
        </div>
        <div className="mb-5 semi-sm:mr-1 md:mr-5 lg:mr-0 lg:ml-[17px] flex items-center justify-center">
          <input
            style={{ lineHeight: "1.42", letterSpacing: ".3em" }}
            type="submit"
            className="py-3 bg-[#1d1d1f] text-white w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[461px] text-base font-bold cursor-pointer uppercase font-oswald login-button"
            value="Reset Password"
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
