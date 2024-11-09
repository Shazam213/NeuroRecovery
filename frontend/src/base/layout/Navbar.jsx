import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  Brain,
  Activity,
  Users,
  LineChart,
  Menu,
  X,
  Bell,
  LogOut,
  Settings,
  Gamepad2,
  User,
  BarChart,
  Moon,
  Sun,
  UserPen
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const isCaregiver = user?.role === "admin";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme(); // Use theme and setTheme from context
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(3); // This would come from your notification context

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: BarChart,
      isVisible: user?.role === "user", // Visible only if the user's role is "user"
    },
    {
      name: "Exercise Hub",
      path: "/exercises",
      icon: Brain,
      isVisible: user?.role === "user", // Visible only if the user's role is "user"
    },
    {
      name: "Game Test",
      path: "/test",
      icon: Gamepad2,
      isVisible: user?.role === "user", // Visible only if the user's role is "user"
    },
    {
      name: "EEG Monitor",
      path: "/eeg",
      icon: Activity,
      isVisible: user?.role === "user", // Visible only if the user's role is "user"
    },
    {
      name: "Progress",
      path: "/progress",
      icon: LineChart,
      isVisible: user?.role === "user", // Visible only if the user's role is "user"
    },
    {
      name: "Caregiver Portal",
      path: "/caregiver",
      icon: Users,
      isVisible: (isCaregiver) => isCaregiver, // This will be a function that checks the user's role
    },
    {
      name: "Chatbot",
      path: "http://65.20.69.83/", // External URL for the chatbot
      icon: Users, // Use an appropriate icon or create a new one
      isVisible: user?.role === "user", // Visible only if the user's role is "user"
      isExternal: true, // Mark as external link
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light"); // Switch to light mode
    } else {
      setTheme("dark"); // Switch to dark mode
    }
  };

  return (
    <nav
      className={`w-full ${
        theme === "dark"
          ? "bg-gray-900 text-white shadow-md"
          : "bg-white text-gray-800 shadow-sm border-b"
      } shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to={
                  user?.role === "user"
                    ? "/dashboard"
                    : user?.role === "admin"
                    ? "/caregiver"
                    : "/login"
                }
                className="flex items-center space-x-2"
              >
                <Brain className="h-8 w-8" />
                <span className="font-bold text-xl">NeuroRecovery</span>
              </Link>
            </div>

            {/* Main Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
            {user &&
  navigation.map((item) => {
    if (typeof item.isVisible === "function" && !item.isVisible(isCaregiver)) {
      return null; // Don't render the item if the condition is false
    } else if (!item.isVisible) {
      return null; // Don't render the item if the condition is false
    }

    const Icon = item.icon;
    if (item.isExternal) {
      return (
        <a
          key={item.name}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            isActive(item.path)
              ? `${
                  theme === "dark"
                    ? "text-blue-300 bg-gray-800"
                    : "text-blue-600 bg-blue-50"
                }`
              : `${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
          }`}
        >
          <Icon className="h-4 w-4 mr-2" />
          {item.name}
        </a>
      );
    }

    return (
      <Link
        key={item.name}
        to={item.path}
        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          isActive(item.path)
            ? `${
                theme === "dark"
                  ? "text-blue-300 bg-gray-800"
                  : "text-blue-600 bg-blue-50"
              }`
            : `${
                theme === "dark"
                  ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`
        }`}
      >
        <Icon className="h-4 w-4 mr-2" />
        {item.name}
      </Link>
    );
  })}
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Notifications */}

            {user && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/notifications")}
                className="relative"
              >
                <Bell
                  className={`h-5 w-5 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            )}

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={`${
                    theme === "dark"
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800"
                  } shadow-lg rounded-md p-2`}
                >
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="hover:bg-blue-700 hover:text-white rounded-md p-2"
                    icon={UserPen}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    icon={Settings}
                    onClick={() => navigate("/settings")}
                    className="hover:bg-blue-700 hover:text-white rounded-md p-2"
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleLogout();
                    }}
                    className="hover:bg-blue-700 hover:text-white rounded-md p-2"
                    icon={LogOut}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive("/login")
                      ? `${
                          theme === "dark"
                            ? "text-blue-300 bg-gray-800"
                            : "text-blue-600 bg-blue-50"
                        }`
                      : `${
                          theme === "dark"
                            ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive("/register")
                      ? `${
                          theme === "dark"
                            ? "text-blue-300 bg-gray-800"
                            : "text-blue-600 bg-blue-50"
                        }`
                      : `${
                          theme === "dark"
                            ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "dark"
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-900 text-yellow-400"
              }`}
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block pl-3 pr-4 py-2 text-base font-medium ${
                    isActive(item.path)
                      ? `${
                          theme === "dark"
                            ? "text-blue-300 bg-gray-800"
                            : "text-blue-600 bg-blue-50"
                        }`
                      : `${
                          theme === "dark"
                            ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
