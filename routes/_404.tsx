import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Aarhus 2025</title>
      </Head>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-roboto-condensed text-8xl font-bold mb-6 text-aarhus-red">
            404
          </h1>
          <h2 className="font-roboto-condensed text-3xl mb-8">
            Page Not Found
          </h2>
          <p className="font-roboto-condensed text-gray-600 mb-8">
            The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-aarhus-red text-white font-roboto-condensed hover:bg-red-800 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    </>
  );
}
