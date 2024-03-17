import React from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";

import "./contact.css";

export default function Contact() {
  // const submitForm = () => {

  // }
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
            <h2>bidursapkota00@gmail.com</h2>
          </div>
          <div className="contact__information">
            <div>
              <FaRegMap size={20} color="rgb(44, 152, 240)" />
            </div>
            <h2>Nakhipot, Lalitpur, Nepal, 44700</h2>
          </div>
          <div className="contact__information">
            <div>
              <FaPhone size={20} color="rgb(44, 152, 240)" />
            </div>
            <h2>+977 9865711881</h2>
          </div>
        </div>

        <form
          className="contact__form"
          method="post"
          //   onsubmit="submitForm(event);"
        >
          <input
            className="contact__input"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
          />

          <input
            className="contact__input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />

          <input
            className="contact__input"
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            required
          />

          <textarea
            id="message"
            className="contact__textarea"
            name="message"
            placeholder="Message"
            rows={4}
            required
          ></textarea>

          <button className="contact__button" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
