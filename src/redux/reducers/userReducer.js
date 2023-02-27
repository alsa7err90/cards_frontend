import {ActionTypes} from "../constants/action-types";
try {
} catch (error) {}
const userId = localStorage.getItem("userId")
  ? localStorage.getItem("userId")
  : null;

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : {};
const sales = JSON.parse(localStorage.getItem("sales"))
  ? JSON.parse(localStorage.getItem("sales"))
  : {};

const logged = JSON.parse(localStorage.getItem("logged"))
  ? JSON.parse(localStorage.getItem("logged"))
  : {};
const crypto = JSON.parse(localStorage.getItem("crypto"))
  ? JSON.parse(localStorage.getItem("crypto"))
  : {};
const setting = JSON.parse(localStorage.getItem("setting"))
  ? JSON.parse(localStorage.getItem("setting"))
  : {};
const news = JSON.parse(localStorage.getItem("news"))
  ? JSON.parse(localStorage.getItem("news"))
  : {};
const user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : {};
const cards = JSON.parse(localStorage.getItem("cards"))
  ? JSON.parse(localStorage.getItem("cards"))
  : {};
const bouquets = JSON.parse(localStorage.getItem("bouquets"))
  ? JSON.parse(localStorage.getItem("bouquets"))
  : {};
const theme = JSON.parse(localStorage.getItem("theme"))
  ? JSON.parse(localStorage.getItem("theme"))
  : {};
const countNoty = JSON.parse(localStorage.getItem("countNoty"))
  ? JSON.parse(localStorage.getItem("countNoty"))
  : {};
const noty = JSON.parse(localStorage.getItem("noty"))
  ? JSON.parse(localStorage.getItem("noty"))
  : {};

const initialState = token
  ? {
      logged: logged,
      token: token,
      userId: userId,
      sales: null,
      crypto: crypto,
      setting: setting,
      news: null,
      user: user,
      cards: cards,
      bouquets: bouquets,
      theme: theme,
      filter: null,
      filterBouquets: null,
      noty: noty,
      countNoty: null,
      toggleMenu: false,
    }
  : {
      logged: false,
      token: null,
      userId: null,
      sales: null,
      crypto: null,
      digital: null,
      setting: null,
      news: null,
      cards: null,
      bouquets: null,
      filter: null,
      theme: null,
      noty: null,
      countNoty: null,
      toggleMenu: false,
      filterBouquets: null,
    };

export const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.LOGIN:
      console.log(payload);
      window.localStorage.setItem("token", JSON.stringify(payload.token));
      window.localStorage.setItem("logged", JSON.stringify(true));
      window.localStorage.setItem("user", JSON.stringify(payload.user));
      window.localStorage.setItem("userId", JSON.stringify(payload.user.id));

      return {
        ...state,
        logged: true,
        token: payload.token,
        userId: payload.user.id,
        user: payload.user,
      };
    case ActionTypes.LOGOUT:
      console.log("LOGOUT");
      localStorage.clear();
      return {
        ...state,
        logged: false,
        token: null,
        userId: null,
        user: null,
      };

    case ActionTypes.NEW_SALES:
      window.localStorage.setItem("sales", JSON.stringify(payload));
      return {
        ...state,
        sales: payload,
      };

    case ActionTypes.NEW_CRYPTO:
      window.localStorage.setItem("crypto", JSON.stringify(payload));
      return {
        ...state,
        crypto: payload,
      };

    case ActionTypes.NEW_SETTING:
      localStorage.setItem("setting", JSON.stringify(payload));
      return {
        ...state,
        setting: payload,
      };

    case ActionTypes.NEW_NEWS:
      localStorage.setItem("news", JSON.stringify(payload));
      return {
        ...state,
        news: payload,
      };

    case ActionTypes.NEW_USER:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
      };
    case ActionTypes.NEW_CARDS:
      localStorage.setItem("cards", JSON.stringify(payload));
      return {
        ...state,
        cards: payload,
      };
    case ActionTypes.NEW_FILTER:
      localStorage.setItem("filter", JSON.stringify(payload));
      return {
        ...state,
        filter: payload,
      };
    case ActionTypes.NEW_BOUQUETS:
      localStorage.setItem("bouquets", JSON.stringify(payload));
      return {
        ...state,
        bouquets: payload,
      };

    case ActionTypes.NEW_FILTER_BOUQUETS:
      return {
        ...state,
        filterBouquets: payload,
      };

    case ActionTypes.CHANGE_THEME:
      localStorage.setItem("theme", JSON.stringify(payload));
      console.log(payload);
      return {
        ...state,
        theme: payload,
      };

    case ActionTypes.NEW_NOTY:
      localStorage.setItem("noty", JSON.stringify(payload));
      console.log(payload);
      return {
        ...state,
        noty: payload,
      };

    case ActionTypes.NEW_COUNT_NOTY:
      localStorage.setItem("countNoty", JSON.stringify(payload));
      console.log(payload);
      return {
        ...state,
        countNoty: payload,
      };
    case ActionTypes.TOGGLE_MENU:
      console.log(payload);
      return {
        ...state,
        toggleMenu: payload,
      };

    default:
      return state;
  }
};
