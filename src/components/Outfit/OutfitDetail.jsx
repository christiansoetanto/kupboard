import React from "react";
import { useParams } from "react-router-dom";
import AddOutfit from "./AddOutfit";
import OutfitStatistics from "./OutfitStatistic";

const OutfitDetail = (props) => {
  let { id } = useParams();
  return (
    <div className='flex flex-col space-y-10 mb-6'>
      <AddOutfit outfitId={id} />
      <OutfitStatistics id={id} />
    </div>
  );
};

export default OutfitDetail;
