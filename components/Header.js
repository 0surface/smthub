import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-0">
      <div className="flex justify-between max-w-3xl mx-auto items-center">
        <div className="text-2xl font-semibold">SMT Portfolio and Blog</div>
        <ul className="flex">
          <li className="ml-4">
            <Link href="/">
              <a className="text-gray-900 hover:text-gray-700">Home</a>
            </Link>
          </li>
          <li className="ml-4">
            <Link href="/about">
              <a className="text-gray-900 hover:text-gray-700"> About</a>
            </Link>
          </li>
          <li className="ml-4">
            <Link href="/portfolio">
              <a className="text-gray-900 hover:text-gray-700">Portfolio</a>
            </Link>
          </li>
          <li className="ml-4">
            <Link href="/blog">
              <a className="text-gray-900 hover:text-gray-700">Blog</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
