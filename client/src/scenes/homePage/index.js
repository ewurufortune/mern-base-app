import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setName } from "state";
import { setFirstname } from "state";


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) =>state.user);


  const dispatch = useDispatch();
 
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const firstname= useSelector((state) => state.user.firstName);
console.log(user);
const clientId=user._id
  const getUser = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
   console.log(data);
 console.log(firstname);
  };

  const replace = async (id) => {
    const bodyData = {
      id: id,
      firstName: "mooney",
    };
  
    const loggedInResponse = await fetch("http://localhost:3001/auth/replace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });
  
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    dispatch(setFirstname({ firstName: "mooney" }));
  };
  
  
  const handleClick = async (values, onSubmitProps) => {
     await replace(values, onSubmitProps);
    
  };
  return (
    <Box>
   <h1>hellooo {firstname}</h1>
   <button onClick={()=>dispatch(setName())}>+</button>
   <button onClick={() => handleClick(clientId)}>Inject</button>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
          
            <Box m="2rem 0" />
           
          </Box>
        )}
      </Box>
  
  );
};

export default HomePage;