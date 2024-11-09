import React from 'react'
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
    const { theme } = useTheme();
    return (
        <footer className={`p-6 mt-8 ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Company Info */}
            <div>
              <h4 className="font-semibold text-lg">Company</h4>
              <ul className="space-y-2 mt-2">
                <li><a href="#" className="text-sm hover:text-indigo-600">About Us</a></li>
                <li><a href="#" className="text-sm hover:text-indigo-600">Careers</a></li>
                <li><a href="#" className="text-sm hover:text-indigo-600">Blog</a></li>
                <li><a href="#" className="text-sm hover:text-indigo-600">Press</a></li>
              </ul>
            </div>
      
            {/* Support */}
            <div>
              <h4 className="font-semibold text-lg">Support</h4>
              <ul className="space-y-2 mt-2">
                <li><a href="#" className="text-sm hover:text-indigo-600">Help Center</a></li>
                <li><a href="#" className="text-sm hover:text-indigo-600">FAQ</a></li>
                <li><a href="#" className="text-sm hover:text-indigo-600">Contact Us</a></li>
              </ul>
            </div>
      
            {/* Legal */}
            <div>
              <h4 className="font-semibold text-lg">Legal</h4>
              <ul className="space-y-2 mt-2">
                <li><a href="#" className="text-sm hover:text-indigo-600">Privacy Policy</a></li>
                <li><a href="#" className="text-sm hover:text-indigo-600">Terms of Service</a></li>
                <li><a href="#" className="text-sm hover:text-indigo-600">Cookie Policy</a></li>
              </ul>
            </div>
      
            {/* Social */}
            <div>
              <h4 className="font-semibold text-lg">Follow Us</h4>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-lg hover:text-indigo-600"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-lg hover:text-indigo-600"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-lg hover:text-indigo-600"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="text-lg hover:text-indigo-600"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
      
          {/* Copyright Section */}
          <div className="mt-6 border-t pt-4 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </footer>
      );
      
}

export default Footer