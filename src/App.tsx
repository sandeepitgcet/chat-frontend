// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./componets/Home";
import Welcome from "./componets/Welcome";
import ProtectedRoute from "./componets/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
