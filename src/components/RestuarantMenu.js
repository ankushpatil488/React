import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestuarantMenu from "../utils/useRestuarantMenu";
import RestraurantCategory from "./RestraurantCategory";
import { useState } from "react";
const RestraurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestuarantMenu(resId);
  const [showIndex,setshowIndex] = useState(null);
  if (resInfo === null) return <Shimmer />;
  // console.log();
  const { name, cuisines, costForTwo } =
    resInfo?.data?.cards[0]?.card?.card?.info;
  // console.log(resInfo?.data?.cards[0]?.card?.card?.info)
  const { itemCards } =
    resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card;
  // console.log(resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
  const categories =
    resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  // console.log(categories)
  return (
    <div className="text-center">
      <h3 className="font-bold my-6 text-2xl">{name}</h3>
      <p className="font-bold text-lg">
        {cuisines.join(",")} - {costForTwo / 100}
      </p>
      {/* {itemCards.map(items => <li key={items.card.info.id}>{items.card.info.name} : {items.card.info.price/100 || items.card.info.defaultPrice/100}</li>)} */}
      {categories.map((category,index) => (
        <RestraurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index===showIndex ? true:false}
          setshowIndex={()=>setshowIndex(index)}
        />
      ))}
    </div>
  );
};
export default RestraurantMenu;
