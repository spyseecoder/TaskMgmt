import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          TaskFlow {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
