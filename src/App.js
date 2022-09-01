
import { ChatRoom, Landing, Login, PageNotFound, Profile, EditProfile } from "./pages";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

export default function App(props) {

    const { primaryColor, setPrimaryColor } = props;
    const { currentUser } = useContext(AuthContext);

    const RequireAuth = ({ children }) => {
        return (currentUser ? children : <Navigate to={"/auth"} />);
    }

    const RequireNoAuth = ({ children }) => {
        return (currentUser ? <Navigate to={"/chat"} /> : children);
    }

    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<RequireNoAuth><Landing color={primaryColor} primaryColorHandeler={setPrimaryColor} /></RequireNoAuth>} />
                <Route path={"/auth"} element={<RequireNoAuth><Login color={primaryColor} primaryColorHandeler={setPrimaryColor} /></RequireNoAuth>} />
                <Route path={"/chat*"} element={<RequireAuth><ChatRoom /></RequireAuth>} />
                <Route path={"/profile"} element={<RequireAuth><Profile /></RequireAuth>} />
                <Route path={"/profile/:id"} element={<RequireAuth><Profile /></RequireAuth>} />
                <Route path={"/edit"} element={<RequireAuth><EditProfile primaryColor={primaryColor} /></RequireAuth>} />
                <Route path={"*"} element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}


