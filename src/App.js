
import { ChatRoom, Landing, Login, PageNotFound, Profile } from "./pages";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App(props) {
    const { primaryColor, setPrimaryColor } = props;
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Landing color={primaryColor} primaryColorHandeler={setPrimaryColor} />} />
                <Route path={"/login"} element={<Login color={primaryColor} primaryColorHandeler={setPrimaryColor} />} />
                <Route path={"/chat"} element={<ChatRoom />} />
                <Route path={"/profile"} element={<Profile />} />
                <Route path={"*"} element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}


