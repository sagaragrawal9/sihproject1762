import React from 'react';
import { Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-500">
              PhilatelyIndia is India's premier online platform for philatelists, offering a digital album, marketplace, and vibrant community for stamp collectors and enthusiasts.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Shop", "Community", "FAQ", "Contact Us"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Resources</h3>
            <ul className="space-y-2">
              {["Philately Resources", "Indian Postal History", "Thematic Collecting", "Exhibitions & Events"].map((resource) => (
                <li key={resource}>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">{resource}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-500">Email: support@philatelyindia.com</p>
            <p className="text-sm text-gray-500">Phone: +91-9876543210</p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} PhilatelyIndia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;