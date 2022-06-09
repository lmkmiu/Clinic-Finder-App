import { BrowserRouter, Routes, Route } from "react-router-dom";

import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

import SideBar from "./component/Sidebar/SideBar";
import HomePage from "./component/HomePage/HomePage";
import DetailPage from "./component/DetailPage/DetailPage";
import Map from "./component/Map/Map";
import Comments from "./component/Comments/Comments"
import Authentication from "./component/Authentication/Authentication";

const App = () => {

  return (
    <BrowserRouter>
      <GlobalStyles />
      <SideDiv>
        <SideBar />
      </SideDiv>
      <Main>
        <Routes>
          <Route  exact path="/" 
                  element={
                    <HomePage />
                    } />
          <Route  path="/clinic/:_id" 
                  element={
                    <DetailPage />
                    } />
          <Route  path="/login" 
                  element={
                    <Authentication />
                    } />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}
const SideDiv = styled.div`
  float: left;
  width: 20%;
`
const Main = styled.div`
  float: left;
  width: 80%;
`;

export default App;
