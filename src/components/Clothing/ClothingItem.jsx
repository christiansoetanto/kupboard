import React from "react";
import { useHistory } from "react-router-dom";
import Card from "../UI/Card";
const ClothingItem = (props) => {
  const { imageUrl, name, tags, category, clothingId } = props.clothing;
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/clothings/${clothingId}`);
  };

  return (
    <div
      className="rounded shadow-xl bg-white border p-1 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-200 transition duration-500 ease-in-out"
      onClick={handleCardClick}
    >
      <div className="" id="picture">
        <img src={imageUrl} style={{ maxHeight: "15rem" }} alt="logo" />
      </div>

      <div id="description flex flex-col justify-center">
        <div className="text-xl font-bold mb-2 mt-2 text-center">{name}</div>
        {/* <div>tagid = {tags.map((e) => e.tagId + "")}</div>
				<div>category = {category.name}</div> */}
      </div>
    </div>
  );
};

export default ClothingItem;
