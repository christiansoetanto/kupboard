import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";
import OutfitItem from "../Outfit/OutfitItem";
import { NavLink } from "react-router-dom";

const OutfitCarousel = (props) => {
  const { outfits, onChange, isLoading } = props;

  const onChangeHandler = (index) => {
    onChange(index);
  };

  const handleNavLinkOnClick = () => {
    document.getElementById("menu-toggle").checked = false;
  };

  return (
    <div className='text-center '>
      {isLoading && (
        <div className='flex flex-col items-center justify-center'>
          <div className='text-lg'>Loading your outfit...</div>
        </div>
      )}
      {!isLoading && outfits.length == 0 && (
        <div className='flex flex-col items-center justify-center'>
          <div className='text-base md:text-lg'>
            Today's outfit has not been set yet.
          </div>
          <div className='text-base md:text-lg'>
            Pick one from your{" "}
            <NavLink
              className='font-bold text-base md:text-lg border-b-2 hover:border-amber-300'
              to='/outfits'
              activeClassName='border-amber-300'
              onClick={handleNavLinkOnClick}
              style={{ borderColor: "transparent" }}
            >
              wardrobe
            </NavLink>
            !
          </div>
          <div>
            <img
              src={
                require("../../assets/illustrations/people-outfit.jpg").default
              }
              alt='people wearing outfit'
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </div>
      )}
      {!isLoading && outfits.length > 0 && (
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          onChange={onChangeHandler}
          showThumbs={false}
          interval={20000}
        >
          {outfits.map((e) => {
            return (
              <div className='mb-8' key={e.outfitId}>
                <OutfitItem key={e.outfitId} outfit={e} />
                {/* <p className='legend'>{e.name}</p> */}
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default OutfitCarousel;
