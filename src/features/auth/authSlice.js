import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
    user: { email: "", role: "" },
    isLoading: true,
    isError: false,
    error: "",
};

export const createUser = createAsyncThunk(
    "auth/createUser",
    async ({ email, password }) => {
        const data = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return data.user.email;
    }
);
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }) => {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user.email;
    }
);
export const loginWithGoogle = createAsyncThunk(
    "auth/loginWithGoogle",
    async () => {
        const googleProvider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, googleProvider);
        return data.user.email;
    }
);
export const getUser = createAsyncThunk("auth/getUser", async (email) => {
    const url = `${process.env.REACT_APP_DEV_URL}/user/${email}`;
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    if (data.status) {
        return data;
    } else {
        return email;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = { email: "", role: "" };
        },
        setUser: (state, { payload }) => {
            state.user.email = payload;
            state.isLoading = false;
        },
        clearError: (state) => {
            state.isError = false;
            state.error = "";
        },
        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
                state.isError = false;
                state.error = "";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = "";
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
                state.isError = false;
                state.error = "";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = "";
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
                state.isError = false;
                state.error = "";
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = "";
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                if (payload.status) {
                    state.user = payload.data;
                } else {
                    state.user.email = payload;
                }
                state.isError = false;
                state.error = "";
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = "";
                state.isError = true;
                state.error = action.error.message;
            });
    },
});

export const { logout, setUser, clearError, setLoading } = authSlice.actions;

export default authSlice.reducer;
