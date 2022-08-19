import { FaDiscord, FaTwitter, FaTelegramPlane, FaGithub } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

function Footer() {
  return (
    <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-qdark mt-auto border-t border-indigo-500">
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 justify-center">
        <li>
          <a href="#" className="ml-4 hover:underline md:mr-6 ">
            Contact
          </a>
        </li>
        <li>
          <a href="#" className="ml-4 hover:underline md:mr-6">
            Whitepaper
          </a>
        </li>
        <li>
          <a href="#" className="ml-4 hover:underline md:mr-6">
            Documentation
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline ml-4 md:mr-6">
            Forum
          </a>
        </li>
      </ul>
      <div className="flex mt-4 space-x-6 justify-center md:mt-0">
        <a
          href="https://discord.com/"
          className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <FaDiscord />
          <span className="sr-only">Discord</span>
        </a>
        <a
          href="https://twitter.com/"
          className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <FaTwitter />
          <span className="sr-only">Twitter page</span>
        </a>
        <a
          href="https://telegram.org/"
          className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <FaTelegramPlane />
          <span className="sr-only">Telegram page</span>
        </a>
        <a
          href="https://github.com/"
          className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <FaGithub />
          <span className="sr-only">GitHub account</span>
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <IoMdSettings />
          <span className="sr-only">Settings</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
