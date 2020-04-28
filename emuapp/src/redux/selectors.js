const isEmpty = (obj) => {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

export const getYears = (store) => {
    return isEmpty(store.registration.years) ? null : store.registration.years
}

export const getSexes = (store) => {
    return isEmpty(store.registration.sexes) ? null : store.registration.sexes
}

export const getStreets = (store) => {
    return isEmpty(store.registration.streets) ? null : store.registration.streets
}
