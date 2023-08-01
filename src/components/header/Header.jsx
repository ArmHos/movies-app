import { Link } from "react-router-dom";
import "./Header.scss";
import { MdMovieFilter } from "react-icons/md";
import { useRef } from "react";

const Header = ({ setData }) => {
  const headerRef = useRef(null);
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      headerRef.current.style.opacity = 1;
    } else if (currentScrollPos > 75) {
      headerRef.current.style.opacity = 0;
    }
    prevScrollpos = currentScrollPos;
  };
  return (
    <header ref={headerRef}>
      <Link to="/">
        <div
          className="logo"
          onClick={() => {
            let trading = JSON.parse(localStorage.getItem("trading"));
            if (trading) {
              setData(trading);
            }
          }}
        >
          <MdMovieFilter size={35} />
          <span>MovieDB</span>
        </div>
      </Link>
    </header>
  );
};

export default Header;
