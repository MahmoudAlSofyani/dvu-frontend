import { createStore, action } from "easy-peasy";

const store = createStore({
  memberSignupForm: {
    stepNumber: 1,
    formData: {},
    setStepNumber: action((state, payload) => {
      state.stepNumber = payload;
    }),
    setFormData: action((state, payload) => {
      state.formData = {
        ...state.formData,
        [payload.id || payload.name]: payload.value,
      };
    }),
  },
  memberLoginForm: {
    formData: {},
    setFormData: action((state, payload) => {
      state.formData = {
        ...state.formData,
        [payload.id || payload.name]: payload.value,
      };
    }),
  },
  mobileSideBar: {
    isMenuOpen: false,
    toggleMenu: action((state, payload) => {
      state.isMenuOpen = !state.isMenuOpen;
    }),
  },
  currentUser: {
    currentUser: {},
    setCurrentUser: action((state, payload) => {
      state.currentUser = payload;
    }),
  },
  settingsFormData: {
    formData: {},
    setFormData: action((state, payload) => {
      state.formData = {
        ...state.formData,
        [payload.id || payload.name]: payload.value,
      };
    }),
  },
});

export default store;
