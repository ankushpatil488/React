import {CDN_URL} from "../utils/constants";
const RestraurantCard = (props) => {
    const { resData } = props;
    const {cloudinaryImageId,name,cuisines,costForTwo,avgRating} = resData?.info;
    return (
      <div className="m-4 p-4 w-[250px] bg-gray-100 hover:bg-gray-200" >
        <img
          className="res-logo"
          src={CDN_URL+cloudinaryImageId}
        ></img>
        <h3>{name}</h3>  {/*cannot write props.info.name*/}
        <h4 className="flex flex-wrap">{cuisines.join(",")}</h4>
        <h4>{costForTwo}</h4>
        <h4>{avgRating}</h4>
      </div>
    );
  };
 export default RestraurantCard; 

 export const withPromotedLabel= (RestraurantCard) => {
  return (props) => {
    return(<div>
      <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Open</label>
      {/* ... is spread opeator */}
      <RestraurantCard {...props}/> 
    </div>
    );
  }
 };