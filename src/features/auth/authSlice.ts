import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  AuthError,
} from "@/types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const token = localStorage.getItem("token");

const initialState: AuthState = {
  user: null,
  token,
  isAuthenticated: !!token,
  isLoading: false,
  error: null,
};
// Async thunks
export const register = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: AuthError }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post<AuthResponse>("/signup", {
      user: credentials,
    });

    const token = response.headers.authorization || "";
    const user = response.data.status?.data?.user;

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // Store user data
    }

    // Add the missing status property to the object
    return { status: response.data.status, user, token };
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || "Registration failed",
      errors: error.response?.data?.errors,
    } as AuthError); // Ensure AuthError type for rejectWithValue
  }
});

export const login = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: AuthError }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post<AuthResponse>("/login", {
      user: credentials,
    });

    const token = response.headers.authorization || "";
    const user = response.data.status?.data?.user;
    console.log("tokkkken" + token);
    console.log("USertt" + user);

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // Store user data
    }

    // Add the missing status property to the return object, if applicable
    return { status: response.data.status, user, token };
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || "Login failed",
      errors: error.response?.data?.errors,
    } as AuthError);
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: AuthError }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.delete("/logout", {
        headers: { Authorization: token },
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        api.defaults.headers.common["Authorization"] = "";
      }
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Logout failed",
        errors: error.response?.data?.errors,
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    /*************  ✨ Codeium Command 🌟  *************/
  },
  /**
   * Handle actions from `register`, `login`, and `logout`
   * extraReducers.
   */
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        // Set isLoading to true, and clear any existing error
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        // Set isLoading to false, and set the user, token, and isAuthenticated
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        // Set isLoading to false, and set the error from the action
        state.isLoading = false;
        state.error =
          action.payload?.message || "Registration failed, please try again.";
        state.error = action.payload?.message || "Registration failed";
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        // Set isLoading to true, and clear any existing error
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        // Set isLoading to false, and set the user, token, and isAuthenticated
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.token = payload.token;
        console.log("payload.token" + payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        // Set isLoading to false, and set the error from the action
        state.isLoading = false;
        state.error =
          action.payload?.message || "Login failed, please try again.";
        state.error = action.payload?.message || "Login failed";
      });

    // Logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("User logged out successfully.");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Logout failed, please try again.";
        console.error("Logout error:", action.payload);
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
