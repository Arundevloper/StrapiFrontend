import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 body-font  mt-auto">
      <div className="container px-8 py-20 mx-auto flex md:items-start lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        {/* Logo and About Section */}
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            href="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Tailblocks</span>
          </Link>
          <p className="text-gray-300 text-base mt-4">
            Innovating solutions to help you grow your business.
          </p>
        </div>

        {/* Link Categories */}
        <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {["Products", "Company", "Resources", "Support"].map(
            (category, idx) => (
              <div key={idx} className="px-4 mb-10">
                <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">
                  {category}
                </h2>
                <nav className="list-none">
                  {["Link 1", "Link 2", "Link 3", "Link 4"].map(
                    (link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href="/"
                          className="text-gray-400 hover:text-gray-300"
                        >
                          {link}
                        </Link>
                      </li>
                    )
                  )}
                </nav>
              </div>
            )
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-800">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row justify-between">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © 2024 Tailblocks —
            <Link
              href="https://twitter.com/knyttneve"
              className="text-gray-500 ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              @knyttneve
            </Link>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            {["facebook", "twitter", "instagram", "linkedin"].map(
              (social, idx) => (
                <Link
                  href="/"
                  key={idx}
                  className="text-gray-400 hover:text-white ml-3"
                >
                  <svg
                    fill="currentColor"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    {/* Example icons (replace with actual icons if needed) */}
                    {social === "facebook" && (
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    )}
                    {social === "twitter" && (
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    )}
                    {social === "instagram" && (
                      <rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                      ></rect>
                    )}
                    {social === "linkedin" && (
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    )}
                  </svg>
                </Link>
              )
            )}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
