export const loadDynamicZxcvbn = (callback) => {
    const existingScript = document.getElementById('zxcvbn');

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = '/hat/claim/public/libs/zxcvbn.min.js'; // URL for the third-party library being loaded.
        script.id = 'zxcvbn'; // e.g., googleMaps or stripe
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) callback();
        };
    }

    if (existingScript && callback) callback();
};