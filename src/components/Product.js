import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, addQuantity, selectItems } from "../slices/basketSlice";

function Product({ id, title, price, description, category, image, qty }) {
  const [rating] = useState(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
  const [hasPrime] = useState(Math.random() < 0.5);
  const [added, setAdded] = useState(false);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  const addItemsToBasket = () => {
    // Add item to basket...
    dispatch(
      addToBasket({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
        hasPrime,
        qty,
      })
    );
    dispatch(addQuantity(id));
    setAdded(true);
  };

  const addQuantityItem = () => {
    dispatch(addQuantity(id));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-grey-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="IDR" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-green-500">FREE Next-day Delivery</p>
        </div>
      )}
      {added ? (
        <button
          onClick={() => addQuantityItem()}
          className="mt-auto p-2 text-xs md:text-sm bg-gradient-to-b from-green-200 to-green-400 border border-green-300 rounded-sm focus:outline-none focus:ring-green-500 active:from-green-500">
          Added {items.find((item) => item.id === id).qty}
        </button>
      ) : (
        <button onClick={() => addItemsToBasket()} className="mt-auto button">
          Add to Basket
        </button>
      )}
    </div>
  );
}

export default Product;
