import { useState, useRef, useEffect } from "react";
import "./styles/Header.css"; // Make sure to create this CSS file

function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="header">
      <button className="open-btn" onClick={toggleNav}>
        Menu
      </button>
      <nav id="sidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
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
        className={`backdrop ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
}

export default Header;
