export const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('http')) {
        return image;
    }
    return process.env.REACT_APP_API_URL + '/static/' + image;
};
