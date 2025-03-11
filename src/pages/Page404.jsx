import LinkButtonPositive from "../components/linkButton/LinkButtonPositive";
import { IoHome } from "react-icons/io5";

function Page404() {
  return (
    <main className="flex flex-col justify-center items-center text-center h-screen">
      <h1 className="font-bold flex items-center text-7xl mb-4 transition-colors animate-pulse">
        404
      </h1>
      <p className="font-medium text-3xl text-gray-600 mb-4">
        Oops, This Page Not Found!
      </p>
      <p className="text-gray-400 font-mono text-lg mb-7">
        The link might be corrupted,
        <span className="text-gray-500">
          {" "}
          or the page might have been removed
        </span>
      </p>

      {/* <Link to={"/"} className="bg-black text-white px-4 py-2 cursor-pointer">
        GO BACK HOME
      </Link> */}

      <LinkButtonPositive to={"/"} text={"GO BACK HOME"} Icon={IoHome} />
    </main>
  );
}
export default Page404;
