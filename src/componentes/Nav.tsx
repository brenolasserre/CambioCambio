import React from "react";

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  return (
    <nav className="ml-8 mt-16 lg:ml-[13vw] w-fit">
      <a href="/" className="flex items-center gap-2">
        <img src="../../logo.svg" alt="" />
        <h1 className="text-textColor text-3xl font-extrabold">CambioCambio</h1>
      </a>
    </nav>
  );
};

export default Nav;
