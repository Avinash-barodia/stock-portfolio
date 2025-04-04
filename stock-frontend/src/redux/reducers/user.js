import { createSlice } from "@reduxjs/toolkit";

const init = {
  signupData: null,
  loading: false,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null // No JSON.parse here
}
const userSlice = createSlice({
  name: 'user',
  initialState: init,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    }
  }
});

export const { setLoading, setSignupData, setToken } = userSlice.actions;
export default userSlice.reducer;
