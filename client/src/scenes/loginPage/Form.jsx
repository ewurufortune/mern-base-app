import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { message } from "antd";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  email: yup
    .string()
    // .email("invalid email")
    .required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    // .email("invalid email")
    .required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  email: "",
  password: "",

  picture: "a",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [messageApi, contextHolder] = message.useMessage();


  const register = async (values, onSubmitProps) => {
    messageApi.loading({ content: "Creating A New Save... this might take a minute", key: "registerMessage", duration:20000 });

    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", "mark.jpg");

    const savedUserResponse = await fetch(
      "https://bookboard-app.onrender.com/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      messageApi.success({ content: 'Save Created successfully! log in.', key: 'registerMessage' });

      setTimeout(messageApi.destroy,2000);

      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    // Show loading message
    // Display loading message
    messageApi.loading({ content: "Logging in... might take a minute", key: "LoginMessage", duration:0 });
    try {
      const loggedInResponse = await fetch("https://bookboard-app.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (loggedInResponse.ok) {
        const loggedIn = await loggedInResponse.json();
        console.log(loggedIn);
        onSubmitProps.resetForm();
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          navigate("/home");
          // Display success message
          messageApi.success({
            content: "Logged In successfully!",
            key: "LoginMessage",
          });
        }
        // Display success message
        messageApi.success({
          content: "Logged In successfully!",
          key: "LoginMessage",
        });
        setTimeout(messageApi.destroy,2000);

      } else {
        // Error message
        message.error("Login failed. Please check your credentials."); // Close the message after 2 seconds
        setTimeout(messageApi.destroy,2000);
      }
    } catch (error) {
      console.error(error);
      // Error message for unexpected errors
      messageApi.error({ content: "Login Error", key: "LoginMessage" });
      setTimeout(messageApi.destroy,2000);

    } finally {
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="World Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName || ""}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
              

           
              </>
            )}

            <TextField
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email || ""}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password || ""}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            {contextHolder}

            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
