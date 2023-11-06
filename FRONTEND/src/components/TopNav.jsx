import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//import { onAuthStateChanged, signOut } from "firebase/auth";
//import { firebaseAuth } from "../utils/firebase-config";

const TopNav = ({ isScrolled }) => {
  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "My characters",
      link: "/tv",
    },
    {
      name: "Create character",
      link: "/character/create",
    },
    {
      name: "Trending",
      link: "/movies",
    },
  ];

  // const navigate = useNavigate();
  // //onAuthStateChanged(firebaseAuth, (currentUser) => {
  //   if (!currentUser) navigate("/login");
  // });
  return (
    <NavContainer>
      <nav className={`${isScrolled ? "scrolled" : "notScroll"}`}>
        <div className="leftSide">
          <div className="logo">
            <img
              src="https://logos.flamingtext.com/Word-Logos/character-design-amped-logo.png"
              alt="logo"
            />
          </div>
          <ul className="links">
            {navLinks.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="rightSide">
          {/* <button onClick={() => signOut(firebaseAuth)}>
            <AiOutlineLogout />
          </button> */}
        </div>
      </nav>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  .notScroll {
    display: flex;
  }
  .scrolled {
    display: flex;
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0.4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .leftSide {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-left: 5rem;
    }
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }
    img {
      width: 10rem;
      height: 2rem;
    }
  }
  .links {
    display: flex;
    list-style-type: none;
    gap: 3rem;
    li {
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
  .rightSide {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-right: 1rem;
    button {
      background-color: red;
      border: none;
      cursor: pointer;
      border-radius: 50%;
    }
    &:focus {
      outline: none;
    }
    svg {
      color: white;
      font-size: 2rem;
    }
  }
`;

export default TopNav;
