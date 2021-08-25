import React from "react";
import baju from "../../assets/baju.png";
import Card from "../UI/Card";
const Clothing = (props) => {
  return (
    <Card>
      <div className='' id='picture'>
        <img src={props.image} alt='logo' style={{ height: "100px" }} />
      </div>

      <div id='description'>
        {props.description}, tagid = {props.tagId}
      </div>
    </Card>
  );
};

export default Clothing;
