import { ActionTypes } from "../constants/action-types"

export const setLogin = (dataUser) => {
    return {
        type : ActionTypes.LOGIN,
        payload : dataUser
    };
};

export const setLogout = () => { 
    return { 
        type : ActionTypes.LOGOUT,
        payload : []
    };
};

export const toggleMenu = (state) => { 
    return { 
        type : ActionTypes.TOGGLE_MENU,
        payload : state
    };
};

export const setNewSales = (products) => { 
    return { 
        type : ActionTypes.NEW_SALES,
        payload : products
    };
};
export const setFilter = (products) => { 
    return { 
        type : ActionTypes.NEW_FILTER,
        payload : products
    };
};
export const setFilterBouquets = (products) => { 
    return { 
        type : ActionTypes.NEW_FILTER_BOUQUETS,
        payload : products
    };
};
export const setNewCards = (products) => { 
    return { 
        type : ActionTypes.NEW_CARDS,
        payload : products
    };
};

export const setChangeTheme = (products) => { 
    return { 
        type : ActionTypes.CHANGE_THEME,
        payload : products
    };
};
export const setNewBouquets = (products) => { 
    return { 
        type : ActionTypes.NEW_BOUQUETS,
        payload : products
    };
};


export const setSettings = (settings) => { 
    return { 
        type : ActionTypes.NEW_SETTING,
        payload : settings
    };
};
export const setNewUser = (settings) => { 
    return { 
        type : ActionTypes.NEW_USER,
        payload : settings
    };
};
export const setNewNoty = (settings) => { 
    return { 
        type : ActionTypes.NEW_NOTY,
        payload : settings
    };
};
export const setNewCountNoty = (settings) => { 
    return { 
        type : ActionTypes.NEW_COUNT_NOTY,
        payload : settings
    };
};
export const setNewNews = (news) => { 
    return { 
        type : ActionTypes.NEW_NEWS,
        payload : news
    };
};

export const setCrypto = (array) => { 
    return { 
        type : ActionTypes.NEW_CRYPTO,
        payload : array
    };
};

export const setTransfer = (array) => { 
    return { 
        type : ActionTypes.NEW_TRANSFER,
        payload : array
    };
};

export const setDigital = (array) => { 
    return { 
        type : ActionTypes.NEW_DIGITAL,
        payload : array
    };
};

 