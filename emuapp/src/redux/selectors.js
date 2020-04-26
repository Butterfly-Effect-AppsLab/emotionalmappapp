const isEmpty = (obj) => {

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

export const getYears = (store) => {
    return isEmpty(store.registration) ? null : store.registration
}
