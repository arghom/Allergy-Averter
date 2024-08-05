import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
    const error = useRouteError()
    console.error(error)
  return (
    <>
      <div className="flex items-center justify-center flex-col min-h-screen">
        <h1>Error: Page Not Found {error.statusText || error.message}</h1>
        <Link to="/" className="text-blue-600 text-4xl">Go back to home</Link>
      </div>
    </>
  );
}
