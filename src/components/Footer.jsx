import "./Footer.css";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="#">
          <FaFacebook />
        </a>
        <a href="#">
          <FaTwitter />
        </a>
        <a href="#">
          <FaLinkedin />
        </a>
        <p clo>© Master School. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
