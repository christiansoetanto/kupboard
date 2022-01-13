import React from "react";

const ClothingItemPopup = (props) => {
  const { imageUrl, name, onClick } = props;

  const selectImageHandler = () => {
    onClick(imageUrl);
  };

  return (
    <div
      className='flex flex-col text-center items-center px-3 border border-gray-300 rounded-md mx-1 cursor-pointer hover:bg-yellow-100'
      onClick={selectImageHandler}
    >
      <div>{name}</div>
      <div>
        <img src={imageUrl} style={{ maxHeight: "5rem" }}></img>
      </div>
    </div>
  );
};

export default ClothingItemPopup;
