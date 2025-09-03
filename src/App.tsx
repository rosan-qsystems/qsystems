import "./App.css";
import { MainContainer } from "./hoc/main";
import { MainRoutes } from "./routes";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <MainContainer>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </MainContainer>
  );
}

export default App;
