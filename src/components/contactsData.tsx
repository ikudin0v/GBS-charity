import React from "react";
import { CONFIG } from "../config";

const ContactsData = () => {
  return (
    <ul className="">
      <li>
        {"Адрес: "}
        <a href={CONFIG.CONTACTS.ADDRESS.LINK} className="underline" target="_blank">
          {CONFIG.CONTACTS.ADDRESS.TEXT}
        </a>
      </li>
      <li>
        {"Телефон: "}
        <a href={CONFIG.CONTACTS.PHONE.LINK} className="underline" target="_blank">
          {CONFIG.CONTACTS.PHONE.TEXT}
        </a>
      </li>
      <li>
        {"Email: "}
        <a href={CONFIG.CONTACTS.EMAIL.LINK} className="underline" target="_blank">
          {CONFIG.CONTACTS.EMAIL.TEXT}
        </a>
      </li>
      <li>
        <a href={CONFIG.CONTACTS.WEBSITE.LINK} className="underline" target="_blank">
          {CONFIG.CONTACTS.WEBSITE.TEXT}
        </a>
      </li>
    </ul>
  );
};

export default ContactsData;
