export const getImageUrl = (image) => {
    if (!image) return '';

    // Если это полная ссылка (например, с Cloudinary), возвращаем её как есть
    if (image.startsWith('http')) {
        return image;
    }

    const baseUrl = process.env.REACT_APP_API_URL;

    if (!baseUrl) {
        console.warn('REACT_APP_API_URL is not defined. Falling back to relative path for static image:', image);
        // В продакшене на Vercel это скорее всего приведет к ошибке, если бэкенд на другом домене
        return '/static/' + image;
    }

    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const finalUrl = cleanBaseUrl + '/static/' + image;

    return finalUrl;
};
