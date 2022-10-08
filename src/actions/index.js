export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const filterFetched = (filter) => {
    return {
        type: 'FILTER_FETCHED',
        payload: filter
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const onActiveBTN = (name) => {
    return {
        type: 'ONACTIVE_BTN',
        payload: name
    }
}

