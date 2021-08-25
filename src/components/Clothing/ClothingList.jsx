import React from "react";
import Clothing from "./Clothing";

const ClothingList = (props) => {
  if (props.clothingList.length === 0) return <h2 className=''>No clothing found.</h2>;
  else
    return (
      <ul className=''>
        {props.clothingList.map((item) => (
          <Clothing key={item.id} image={item.image} description={item.description} tagId={item.tagId} />
        ))}
      </ul>
    );
};

export default ClothingList;
