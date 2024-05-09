import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../redux/actions/authActions";

function Navbar({ transparent }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const data = useSelector((state) => state?.auth.user);
  const isLoggedIn = useSelector((state) => state?.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUser());
    }
  }, []);

  useEffect(() => {
    if (!transparent) {
      setIsScrolled(true);
    } else {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [transparent]);

  let profileImage = null;

  if (data && data.picture) {
    profileImage = (
      <img
        src={data.picture.data ? data.picture.data.url : data.picture}
        alt="Profile picture"
        className="rounded-full w-[40px] md:w-[26px]"
      />
    );
  } else {
    profileImage = (
      <img
        src="person.svg"
        alt="Person Icon"
        className="w-[40px] md:w-[26px]"
      />
    );
  }

  const handleConfirmModalToggle = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav
        className={`py-4 px-3 fixed top-0 w-full z-10 transition-colors duration-1000 ${
          isScrolled || !transparent ? "bg-white shadow" : "bg-transparent"
        }`}
      >
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img src="/logo.png" width={90} alt="Logo" />
          </Link>

          <div>
            {isLoggedIn ? (
              <div className="md:hidden">
                {/* Hamburger Menu */}
                <button
                  onClick={handleMobileMenuToggle}
                  className="text-primary focus:outline-none focus:text-gprimary"
                  aria-label="Open Menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={
                        isMobileMenuOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16m-7 6h7"
                      }
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`${
                  isScrolled || !transparent
                    ? "text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary rounded-full px-4 py-2 items-center"
                    : "text-sm font-medium text-primary bg-white hover:bg-white/90 rounded-full px-4 py-2 items-center"
                }`}
              >
                Log in
              </Link>
            )}

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {isLoggedIn ? (
                <div className="flex items-center gap-8">
                  <div>
                    <Link
                      to="/search-recipe"
                      className={`${
                        isScrolled || !transparent
                          ? "text-sm font-medium text-primary"
                          : "text-sm font-medium text-white "
                      }`}
                    >
                      Search recipe
                    </Link>
                  </div>
                  <div className="relative">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <div className="flex justify-between gap-2 items-center">
                        {profileImage}
                        <p
                          className={`${
                            isScrolled || !transparent
                              ? "text-sm font-medium text-primary"
                              : "text-sm font-medium text-white"
                          }`}
                        >
                          {data && data.name}
                        </p>
                      </div>
                    </div>
                    {showDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md w-40">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm font-medium text-main hover:bg-primary/15 rounded-md"
                          onClick={handleConfirmModalToggle}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "fixed z-50" : "hidden"
        } top-0 left-0 w-full h-full flex items-center justify-end bg-black bg-opacity-30`}
        onClick={handleMobileMenuToggle}
      >
        <div className="md:hidden bg-white w-1/2 h-full flex flex-col justify-start items-end pt-12">
          <button
            onClick={handleMobileMenuToggle}
            className="absolute top-4 right-4 text-main hover:text-gray-600 focus:outline-none"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="px-4 py-2 text-sm font-medium text-main w-full text-right">
            <div className="flex justify-between items-center">
              {profileImage}
              <p className="text-sm font-medium text-primary">
                {data && data.name}
              </p>
            </div>
          </div>
          <Link
            to="/search-recipe"
            className="px-4 py-2 text-sm font-medium text-main hover:bg-primary/15 w-full text-right"
          >
            Search recipe
          </Link>
          {isLoggedIn && (
            <button
              onClick={handleConfirmModalToggle}
              className="px-4 py-2 text-sm font-medium text-main hover:bg-primary/15 w-full text-right"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Confirm Logout Modal */}
      <div
        id="confirm-modal"
        className={`${
          confirmModalOpen ? "" : "hidden"
        } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-textcolor">Logout</h3>
                <button
                  type="button"
                  onClick={handleConfirmModalToggle}
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-textcolor rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            <div className="px-4 md:px-5 pb-4 md:pb-6 pt-2 md:pt-3">
              <p className="mb-4 text-base text-text4">
                Are you sure want to{" "}
                <span className="text-secondary font-semibold">Logout</span>?
              </p>
              <div className="flex justify-end">
                <div className="flex gap-2">
                  <button
                    onClick={handleConfirmModalToggle}
                    type="button"
                    className="w-24 text-main bg-gray-300 hover:bg-gray-400 font-semibold rounded-full text-sm px-5 py-2.5 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      dispatch(logout(navigate));
                      handleConfirmModalToggle();
                    }}
                    type="submit"
                    className="w-24 text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
