import React from "react";

interface IXsvg {
	color:string
}

const Xsvg = ({color}:IXsvg) => {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu / Close_SM">
        <path
          id="Vector"
          d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Xsvg;
