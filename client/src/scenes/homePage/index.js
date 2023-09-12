import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import OverallTab from "components/widgets/OverallTab";
import StatPerception from "components/widgets/statPerception/StatPerception";

const HomePage = () => {
  const user = useSelector((state) => state.user);
console.log(user);
const clientId=user._id




  // Rest of your code...

  return (
    <>
<OverallTab />
<StatPerception />
     </>
  );
};

export default HomePage;

  
 