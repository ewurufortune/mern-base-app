import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import OverallTab from "components/widgets/OverallTab";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
console.log(user);
const clientId=user._id




  // Rest of your code...

  return (
    <Box>
<OverallTab />
      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <Box m="2rem 0" />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;

  
 