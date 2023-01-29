import "./navbar.css";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { HiShoppingBag } from "react-icons/hi";
import { CiUser } from "react-icons/ci";
import {
  getAllCarts,
  getCartItemsTotalQuantities,
  getTotals,
} from "../../feature/cartSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const itemsCount = useSelector(getCartItemsTotalQuantities);

  return (
    <nav className="navbar navbar-expand-md ">
      <div className="container">
        <Link className="navbar-brand p-1 fs-1" to="/ecommerc-toolkit">
          Gifty
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main"
          aria-controls="main"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <BiMenu className="menu-icons" />
        </button>
        <div className="collapse navbar-collapse" id="main">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active p-1 p-lg-2"
                aria-current="page"
                to="/ecommerc-toolkit"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link p-1 p-lg-2" to="/ecommerc-toolkit">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link p-1 p-lg-2" to="/ecommerc-toolkit">
                Why Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link p-1 p-lg-2" to="/ecommerc-toolkit">
                Testimonial
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link p-1 p-lg-2" to="/ecommerc-toolkit">
                Contact Us
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav d-flex ul">
            <div className="login ps-2 ms-3  d-md-block">
              <CiUser />
            </div>
            <div className="search ml-2">
              <AiOutlineSearch
                className="search-icons d-md-block ps-2 ms-3"
                onClick={() => setShow((prev) => !prev)}
              />
              {show && (
                <div className="searshInput">
                  <div>
                    <input
                      type="text"
                      placeholder="searsh..."
                      className="searshInput"
                      onChange={(e) => handleSearch(e)}
                    />
                  </div>
                  <span>
                    <Link to={`search/${searchTerm}`}>Find</Link>
                  </span>
                </div>
              )}
            </div>
            <div className="cart ps-2 ms-3  d-md-block">
              <span>{itemsCount}</span>
              <Link to="ecommerc-toolkit/cart">
                <HiShoppingBag />
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
