import React, { useState } from "react";
import Card from "./Card";
const Tag = (props) => {
  const [tag, setTag] = useState({
    id: props.id,
    label: props.label,
    isSelected: props.isSelected,
  });
  const clickTagHandler = (e) => {
    setTag((prevState) => {
      return { ...prevState, isSelected: !prevState.isSelected };
    });

    //TODO nanti refactor pake useEffect()
    props.onClickTag({ ...tag, isSelected: !tag.isSelected });
  };
  return (
    <Card>
      <div className=''>{props.label}</div>
      <button onClick={clickTagHandler}>pencet ini untuk pilih, status isSelected = {tag.isSelected.toString()}</button>
    </Card>
  );
};

export default Tag;
