export const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('http')) {
        return image;
    }
    const baseUrl = process.env.REACT_APP_API_URL || '';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    return cleanBaseUrl + '/static/' + image;
};
