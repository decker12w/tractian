import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import AppRoutes from "./routes/routes";
import { AnalyzerProvider } from "./context/AnalyserContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AnalyzerProvider>
          <AppRoutes />
        </AnalyzerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
