import React from "react";

const SectionContainerLayout = ({ title, children }) => {
  return (
    <div className="flex flex-col mx-5 md:mx-0">
      <div>
        <h1 className="text-white text-xl uppercase tracking-widest">
          {title}
        </h1>
        <hr className="text-red my-2 border-2 rounded" />
      </div>
      <div className="my-5 space-y-10">{children}</div>
    </div>
  );
};

export default SectionContainerLayout;
