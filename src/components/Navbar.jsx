import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>iTask</span>
      </div>
      <ul>
        <li>Home</li>
        <li>Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;