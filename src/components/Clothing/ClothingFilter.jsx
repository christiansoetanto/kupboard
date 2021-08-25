import React, { useState } from "react";
import Tag from "../UI/Tag";
const ClothingFilter = (props) => {
  const [clothingTags, setClothingTags] = useState(props.clothingTags);

  const clickTagHandler = (tag) => {
    setClothingTags((prevState) => {
      const elementsIndex = prevState.findIndex((e) => e.id == tag.id);
      let newArray = [...prevState];
      newArray[elementsIndex] = tag;
      return newArray;
    });
    //refactor pake useEffect
    //   props.onChangedFilter([...clothingTags, tag]);

    const elementsIndex = clothingTags.findIndex((e) => e.id == tag.id);
    let newArray = [...clothingTags];
    newArray[elementsIndex] = tag;
    props.onChangedFilter(newArray);
  };

  if (clothingTags.length === 0) return <div>div kosong? nantidipikirn lagi</div>;
  else
    return (
      <ul className=''>
        {clothingTags.map((item) => (
          <Tag key={item.id} id={item.id} label={item.label} isSelected={item.isSelected} onClickTag={clickTagHandler} />
        ))}
      </ul>
    );
};

export default ClothingFilter;
