import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import Copyright from "./copyright";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-4">Follow Me</h2>

        {/* Social Links */}
        <div className="flex space-x-6 text-2xl">
          <a
            href="https://www.linkedin.com/in/bidur-sapkota-b204142a8/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/bidursapkota00"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.youtube.com/@codeyalaya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-colors"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.facebook.com/bdur.sapkota"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/bidursapkota00"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/b2r_sp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            <FaXTwitter />
          </a>
        </div>

        {/* Copyright */}
        <Copyright />
      </div>
    </footer>
  );
}
