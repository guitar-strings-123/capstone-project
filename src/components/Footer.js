export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social-icon">
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
        </ul>
        <ul className="menu">
          <li className="menu__item">
            <a className="menu__link" href="/">
              Home
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="Products">
              Products
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="Profile">
              Profile
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="ComingSoon">
              Team
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="ComingSoon">
              Contact
            </a>
          </li>
        </ul>
        <p>&copy;2023 Robert Green | All Rights Reserved</p>
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          nomodule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        ></script>
      </div>
    </footer>
  );
}
