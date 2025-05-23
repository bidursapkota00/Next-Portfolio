import React, { FormEvent, useRef } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";

import "./contact.css";
import ContactForm from "./form";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <span className="section__title">get in touch</span>
      <h2 className="section__subtitle">contact</h2>
      <div className="contact__container">
        <div className="contact__informations">
          <div className="contact__information">
            <div>
              <FaEnvelopeOpenText size={20} color="rgb(44, 152, 240)" />
            </div>
            <h2>
              <a href="mailto:bidursapkota00@gmail.com">
                bidursapkota00@gmail.com
              </a>
            </h2>
          </div>
          <div className="contact__information">
            <div>
              <FaRegMap size={20} color="rgb(44, 152, 240)" />
            </div>
            <h2>Chunikhel, Lalitpur, Nepal, 44700</h2>
          </div>
          <div className="contact__information">
            <div>
              <FaPhone size={20} color="rgb(44, 152, 240)" />
            </div>
            <h2>
              <a href="tel:+9779865711881">+977 9865711881</a>
            </h2>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
