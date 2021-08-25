import React, { useState } from "react";
import ClothingList from "./ClothingList";
import Card from "../UI/Card";
import ClothingFilter from "./ClothingFilter";
const Clothings = () => {
  const getClothingTags = () => {
    let clothingTags = [];

    for (let i = 0; i < 5; i++) {
      clothingTags.push({
        id: i,
        label: "label_" + i,
        isSelected: false,
      });
    }
    return clothingTags;
  };

  const generateRandomClothing = () => {
    let clothingList = [];
    for (let i = 0; i < 25; i++) {
      clothingList.push({
        id: Math.random(),
        description: "description_" + i,
        image: "../../assets/baju.png",
        tagId: clothingTags[Math.floor(Math.random() * 5)].id,
      });
    }
    return clothingList;
  };

  const [clothingTags, setClothingTags] = useState(getClothingTags());
  const [clothingList, setListClothing] = useState(generateRandomClothing());

  const filteredClothingList = clothingList
    .filter((item) => {
      let selectedTags = clothingTags
        .filter((i) => {
          return i.isSelected == true;
        })
        .map((i) => i.id);
      if (selectedTags.length === 0) return true;
      else return selectedTags.includes(item.tagId);
    })
    //nanti ganti aja jadi apa kek
    .sort(function (a, b) {
      return a.tagId - b.tagId;
    });

  const changedFilterHandler = (params) => {
    setClothingTags(params);
  };

  console.log(filteredClothingList.length);

  return (
    <div>
      <Card className=''>
        <ClothingFilter clothingTags={clothingTags} onChangedFilter={changedFilterHandler} />
        <ClothingList clothingList={filteredClothingList} />
      </Card>
    </div>
  );
};

export default Clothings;
