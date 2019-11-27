/**
 * Search for a url parameter with a specific id.
 * This function returns the parameter's value or empty.
 *
 * @returns {String}
 */
export const getParameterByName = (variable: string): string | null => {
    const query = window.location.search.substring(1);
    const vars = query.split("&");

    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
};

/**
 * Search for a hash url parameter with a specific id.
 * This function returns the parameter's value or empty.
 *
 * @returns {String}
 */
export const getHashParameterByName = (variable: string): string | null => {
    const query = window.location.hash.split('?');
    if (query && query.length === 2) {
        const vars = query[1].split("&");

        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split("=");
            if (pair[0] === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
    }


    return null;
};
