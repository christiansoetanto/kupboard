import React from "react";
import Card from "../UI/Card";
const Clothing = (props) => {
  return (
    <div className='rounded shadow-xl bg-white border p-1'>
      <div className='' id='picture'>
        <img src={require("../../assets/baju.png").default} alt='logo' style={{ height: "100px" }} />
      </div>

      <div id='description'>
        {props.description}, tagid = {props.tagId}
      </div>
    </div>
  );
};

export default Clothing;
