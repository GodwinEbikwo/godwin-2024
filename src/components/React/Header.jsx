import "./styles/Header.css";
import { useState, useRef, useEffect } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Handle clicks outside the nav
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isOpen &&
        !document.getElementById("sidebar").contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <button
        className="open-btn"
        onClick={toggleNav}
        aria-expanded={isOpen}
        aria-controls="sidebar"
      >
        Menu
      </button>

      <nav
        id="sidebar"
        ref={sidebarRef}
        className={`sidebar ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <button className="close-btn" onClick={toggleNav}>
          Close
        </button>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
      <div
        aria-hidden="true"
        className={`backdrop ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      />
    </header>
  );
}

export default Header;
