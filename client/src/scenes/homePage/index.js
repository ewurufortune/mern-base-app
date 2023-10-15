import React, { useState } from "react";
import { ConfigProvider, Button, theme, Card } from "antd";
import OverallTab from "components/widgets/OverallTab";
import StatPerception from "components/widgets/statPerception/StatPerception";

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { defaultAlgorithm, darkAlgorithm } = theme;

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
    <Card
     style={{
          width: "100vw",
          height:'100vw'
        }}
            theme={isDarkMode ? "Light" : "Dark"}
>
      <>
        <Button onClick={handleClick}>
          {isDarkMode ? "Light" : "Dark"} Theme
        </Button>
        <OverallTab isDarkMode={isDarkMode} />
        <StatPerception isDarkMode={isDarkMode } />
      </>
      </Card>
    </ConfigProvider>
  );
};

export default HomePage;
