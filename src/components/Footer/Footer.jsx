import "./Footer.css";

import whatsApp from "../../assets/whatsapp.svg";
import telegramm from "../../assets/telegramm.svg";

function Footer() {
  return (
    <footer>
      <div className="align-text">
        <h2>Контакты</h2>

        <div className="whatsapp">
          <img src={telegramm} alt="telegramm" />
          <h3>Telegramm: @BlackBunny</h3>
        </div>
        <div className="telegramm">
          <img src={whatsApp} alt="whatsApp" />
          <h3>WhatsApp: 996 (565) 56-45-43</h3>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
