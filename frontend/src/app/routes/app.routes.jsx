import { Navigate, createBrowserRouter } from "react-router";
import PublicProfile from "../../features/public-profile/pages/PublicProfile";
import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import Analytics from "../../features/analytics/pages/Analytics";
import CreateLink from "../../features/links/pages/CreateLink";
import LinksDashboard from "../../features/links/pages/LinksDashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard/links" replace />
    },
    {
        element: <PublicRoute />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/dashboard/links",
                element: <LinksDashboard />
            },
            {
                path: "/dashboard/links/new",
                element: <CreateLink />
            },
            {
                path: "/dashboard/links/:linkId/edit",
                element: <CreateLink />
            },
            {
                path: "/dashboard/analytics",
                element: <Analytics />
            },
        ]
    },
    {
        path: "/:username",
        element: <PublicProfile />
    }
])

export default router
