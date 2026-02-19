export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';

    // If the path starts with http or https, it's already a full URL (e.g. from Cloudinary)
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // Otherwise, assume it's a local static file and prepend the API URL
    const baseUrl = process.env.REACT_APP_API_URL || '';
    // Ensure there's a slash between baseUrl and 'static'
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    return `${normalizedBaseUrl}static/${imagePath}`;
};
