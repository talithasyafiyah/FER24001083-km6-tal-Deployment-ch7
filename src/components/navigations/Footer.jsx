function Footer({ transparent }) {
  return (
    <footer className="main-font mt-[50px] bg-main">
      <div className="w-full p-4 py-8">
        <div className="flex items-center justify-between md:container md:mb-8">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src="logo.png" alt="nomnom-logo" width={90} />
            </a>
          </div>
        </div>

        <div className="main-font justify-center md:container md:justify-between md:flex">
          <div className="md:mb-0">
            <ul className="flex flex-col md:flex-row text-left text-xs text-white md:space-x-3 md:p-0 md:text-sm lg:space-x-8 lg:p-0">
              <li>
                <a
                  href="/"
                  className="block rounded px-1.5 py-2 hover:text-primary md:p-0 md:px-3 lg:p-0"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block rounded px-1.5 py-2 hover:text-primary md:p-0 md:px-3 lg:p-0"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block rounded px-1.5 py-2 hover:text-primary md:p-0 md:px-3 lg:p-0"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block rounded px-1.5 py-2 hover:text-primary md:p-0 md:px-3 lg:p-0"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-3 md:mt-0">
            <div className="flex justify-start md:justify-center">
              <p className="self-center whitespace-nowrap text-xs font-normal md:text-sm dark:text-white">
                &copy; 2024 Talitha Syafiyah
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
