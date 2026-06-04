export default function ProtectedRoute({ children }) {
    const isAuthenticated = false;
    if (!isAuthenticated) {
        return <Navigate to="/login" />;

    }
    return children;
}