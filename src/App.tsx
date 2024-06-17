import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { DataProvider } from "./contexts/DataContext";
import EmailConfirmation from "./components/EmailConfirmation";
import LandingPage from "./components/LandingPage";
import Game from "./components/Game";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/app",
        element: <PrivateRoute component={Game} from="/app" />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/verification",
        element: <EmailConfirmation />,
    },
]);

function App() {
    return (
        <AuthProvider>
            <DataProvider>
                <RouterProvider router={router} />
            </DataProvider>
        </AuthProvider>
    );
}

export default App;
