import React, { useState } from "react";
import Tag from "../UI/Tag";
const ClothingFilter = (props) => {
  const clickTagHandler = (tag) => {
    const elementsIndex = props.clothingTags.findIndex((e) => e.id === tag.id);
    let newArray = [...props.clothingTags];
    newArray[elementsIndex] = tag;
    props.onChangedFilter(newArray);
  };

  if (props.clothingTags.length === 0) return <div>div kosong? nantidipikirn lagi</div>;
  else
    return (
      <div className='flex flex-start'>
        {props.clothingTags.map((item) => (
          <Tag key={item.id} id={item.id} label={item.label} isSelected={item.isSelected} onClickTag={clickTagHandler} />
        ))}
      </div>
    );
};

export default ClothingFilter;
