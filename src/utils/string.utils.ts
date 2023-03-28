function capitalizeFirstLetter(string: string | null | undefined) {
    if (!string) {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const stringUtils = {
    capitalizeFirstLetter,
};
