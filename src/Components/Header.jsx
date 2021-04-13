import React from "react";

function Header() {
  function reset() {
    window.location.reload(false);
  }
  return (
    <div>
      <nav className="header">
        <label onClick={reset}>Reset</label>
        <a href="https://www.geektrust.in/">geektrust</a>
      </nav>
    </div>
  );
}

export default Header;
