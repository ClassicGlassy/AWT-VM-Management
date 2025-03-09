import { Link } from "react-router-dom";

function Page404() {
  return (
    <main className="flex flex-col justify-center items-center text-center min-h-screen bg-gray-200">
      <h1 className="font-bold text-7xl mb-4">404</h1>
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

      <Link to={"/"} className="bg-black text-white px-4 py-2 cursor-pointer">
        GO BACK HOME
      </Link>
    </main>
  );
}
export default Page404;
