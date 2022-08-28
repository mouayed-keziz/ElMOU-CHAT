
import { ChatRoom, Landing, Login, PageNotFound, Profile, EditProfile } from "./pages";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function App(props) {
    const { primaryColor, setPrimaryColor } = props;
    return (
        <Router>
            {/*
            <Link to={"/profile"}>profile</Link>
            <Link to={"/edit"}>Edit</Link>
            */}
            <Routes>
                <Route path={"/"} element={<Landing color={primaryColor} primaryColorHandeler={setPrimaryColor} />} />
                <Route path={"/auth"} element={<Login color={primaryColor} primaryColorHandeler={setPrimaryColor} />} />
                <Route path={"/chat"} element={<ChatRoom />} />
                <Route path={"/profile"} element={<Profile />} />
                <Route path={"/edit"} element={<EditProfile primaryColor={primaryColor} />} />
                <Route path={"*"} element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}


