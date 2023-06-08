import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import { SignIn } from "../ConnectButton/ConnectButton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const Navbar = () => {
  // const navigate = useNavigate()
  const { address } = useAccount();
  const router = useRouter();
  useEffect(() => {
    address ? router.push("/welcome") : router.push("/");
  }, [address]);
  return (
    <header>
      <div className="navbar-container">
        <Link href={"/"}>
          <Image
            src={"/VoteChainLogo.png"}
            width={130}
            height={100}
            alt="Vote Logo"
          />
        </Link>
        <ul className="nav-list">
          <li>
            <a href="/#mission">Mission</a>
          </li>
          <li>
            <a href="/#howtovote">How To Vote</a>
          </li>
          <li>
            <a href="/#faqs">FAQs</a>
          </li>
        </ul>

        <SignIn showBalance={false} className="hero-page-btn" />
      </div>
    </header>
  );
};

export default Navbar;
