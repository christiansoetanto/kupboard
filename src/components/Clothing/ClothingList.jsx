import React from "react";
import Clothing from "./Clothing";

const ClothingList = (props) => {
  if (props.clothingList.length === 0) return <h2 className=''>No clothing found.</h2>;
  else
    return (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-3'>
        {props.clothingList.map((item) => (
          <Clothing key={item.id} image={item.image} description={item.description} tagId={item.tagId} />
        ))}
      </div>
    );
};

export default ClothingList;
