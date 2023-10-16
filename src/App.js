import { useRoutes } from "react-router-dom";
import "./App.css";
import routes from "./Router";

function App() {
  
  const routing = useRoutes(routes);

  return <>{routing}</>;
}

export default App;
