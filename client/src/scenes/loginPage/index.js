import React, { useState } from "react";
import { Layout, Typography, Button, Row, Col } from "antd";
import Form from "./Form";
import {
  ArrowRightOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
  };
  const calculateFontSize = () => {
    const screenWidth = window.innerWidth;

    // Define breakpoints and corresponding font sizes
    const breakpoints = [576, 768];
    const fontSizes = [64, 80, 100]; // Adjust font sizes as needed

    // Find the appropriate font size based on the screen width
    for (let i = 0; i < breakpoints.length; i++) {
      if (screenWidth <= breakpoints[i]) {
        return fontSizes[i];
      }
    }

    // Default font size for larger screens
    return fontSizes[fontSizes.length - 1];
  };

  // Get the calculated font size
  const fontSize = calculateFontSize();

  return (
    <Layout>
      <Content>
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Center the content horizontally
            alignItems: "center", // Center the content vertically
          }}
        >
          <div
            style={{
              backgroundColor: "#f0f2f5",
              padding: "1rem 6%",
              textAlign: "center",
            }}
          >
            <Typography.Title
              level={1}
              style={{
                fontWeight: "bold",
                fontSize: `${fontSize}px`, // Set the calculated font size
                marginTop: "20px",
              }}
            >
              Book<span style={{ color: "limegreen" }}>Board</span>
            </Typography.Title>

            <div style={{ display: "flex" }}>
              <img
                src="https://freesvg.org/img/1393979342.png"
                alt="Female Wrestler 1"
                style={{
                  width: "52%", // Adjust the width of the first image as needed
                  height: "220px", // Set the desired height for the first image
                  marginRight: "-15%", // Adjust the negative margin to control the overlap
                }}
              />
              <img
                src="https://freesvg.org/img/womwrestlercolor.png"
                alt="Wrestler 2"
                style={{
                  width: "52%", // Adjust the width of the second image as needed
                  height: "220px", // Set the desired height for the second image
                  marginLeft: "-25%", // Adjust the negative margin to control the overlap
                }}
              />
            </div>
          </div>
        </div>
        {!showLoginForm ? (
          <div>
            <div
              style={{
                width: "50%",
                margin: "2rem auto",
                padding: "2rem",
                borderRadius: "1.5rem",
                backgroundColor: "#f0f2f5",
                textAlign: "center",
              }}
            >
              <Typography.Title
                level={5}
                style={{
                  fontWeight: "500",
                  marginTop: "-10px",
                  marginBottom: "1.5rem",
                  fontSize: "20px",
                }}
              >
                Welcome to BookBoard, a place to write and share
                fantasy-bookings!
              </Typography.Title>
              <button
                icon={<ArrowRightOutlined />}
                onClick={handleShowLoginForm}
                style={{
                  fontSize: "30px",
                  padding: "10px 20px",
                  marginBottom: "5rem",
                }}
                className="button-85"
              >
                Play{" "}
              </button>
            </div>
            <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
              <Row gutter={[16, 16]}>
                {/* First Row */}
                <Col xs={24} sm={24} md={12}>
                  <div className="feature-image">Placeholder Image</div>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div className="feature-content">
                    <h3 style={{ fontSize: "24px" }}>Feature 1</h3>
                    <p style={{ fontSize: "16px" }}>
                      Description of Feature 1 goes here. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </Col>

                {/* Second Row */}
                <Col xs={24} sm={24} md={12}>
                  <div className="feature-content">
                    <h3 style={{ fontSize: "24px" }}>Feature 2</h3>
                    <p style={{ fontSize: "16px" }}>
                      Description of Feature 2 goes here. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div className="feature-image">Placeholder Image</div>
                </Col>

                {/* Third Row */}
                <Col xs={24} sm={24} md={12}>
                  <div className="feature-image">Placeholder Image</div>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div className="feature-content">
                    <h3 style={{ fontSize: "24px" }}>Feature 3</h3>
                    <p style={{ fontSize: "16px" }}>
                      Description of Feature 3 goes here. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "50%",
              margin: "2rem auto",
              padding: "2rem",
              borderRadius: "1.5rem",
              backgroundColor: "#f0f2f5",
            }}
          >
            <Typography.Title
              level={5}
              style={{ fontWeight: "500", marginBottom: "1.5rem" }}
            >
              Login to BookBoard
            </Typography.Title>
            <Form />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default LoginPage;
