import React from "react";
import Header from "./components/organisms/Header";
import MainTemplate from "./components/templates/MainTemplate";
import VideoList from "./components/organisms/VideoList";

function App() {
  return <MainTemplate header={<Header />} main={<VideoList />} />;
}

export default App;
