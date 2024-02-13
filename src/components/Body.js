import RestraurantCard, { withPromotedLabel } from "./RestraurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
const Body = () => {
  const [listofrestuarants, setListofrestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [filterList,setFilterList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.8430636&lng=77.656476&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonV = await data.json();
    console.log(jsonV);
    setListofrestaurant(
      jsonV.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilterList(
      jsonV.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };
  const RestraurantwithPromoted = withPromotedLabel(RestraurantCard);
  console.log(RestraurantwithPromoted);
  return listofrestuarants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex items-center">
        <input
          type="text"
          className="ml-5 border border-solid border-black"
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
        />
        <div className="px-4 py-2 bg-green-100 m-4">
        <button  onClick={() => {
          const filterRest = listofrestuarants.filter(res=>
              res.info.name.toLowerCase().includes(searchText.toLowerCase()));
          setFilterList(filterRest);
        }}>
          Search
        </button>
        </div>
        <div className="bg-green-100 px-4 py-2 ">
        <button
          
          onClick={() => {
            const filter = listofrestuarants.filter(
              (res) => res.info.avgRating > 4.0
            );
            setFilterList(filter);
          }}
        >
          Top Rated Restraurant
        </button>
        </div>

      </div>
      <div className="flex flex-wrap">
        {/* RestroCard */}
        {filterList.map((restaurant) => (
          <Link key={restaurant.info.id} to={"/restuarants/"+ restaurant.info.id}>
            {restaurant.info.isOpen ? <RestraurantwithPromoted resData={restaurant}/> : <RestraurantCard  resData={restaurant} />}
            
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
