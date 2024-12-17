import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

const ErrorElement = () => {
  return (
    <div className="text-center pb-20 ">
      <Player
        autoplay
        loop
        src="https://lottie.host/da02ea8a-fd0a-430f-91d1-b5cd3eeff243/DaSsnti3MZ.json"
        className="md:w-[700px] "
      ></Player>
      <h2 className="md:text-5xl text-black font-bold">NOT FOUND</h2>
      <Link to="/">
        <button className="btn btn-accent text-white mt-7">Go Home</button>
      </Link>
    </div>
  );
};

export default ErrorElement;
