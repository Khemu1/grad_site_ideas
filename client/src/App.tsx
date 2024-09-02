import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Header, Idea, PageNotFound, NewIdea } from "./components/index";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idea/new" element={<NewIdea />} />
        <Route path="/get-idea/:id" element={<Idea />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
