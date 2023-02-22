import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import auth from "./firebase/firebase.config";
import routes from "./routes/routes";
import { useDispatch } from "react-redux";
import { getUser, setLoading } from "./features/auth/authSlice";
import { Toaster } from "react-hot-toast";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                dispatch(getUser(user.email));
            } else {
                dispatch(setLoading(false));
            }
        });
        return () => {
            unsubscribe();
        };
    });
    return (
        <>
            <Toaster />
            <RouterProvider router={routes} />
        </>
    );
}

export default App;
