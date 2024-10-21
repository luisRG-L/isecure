export default function verifyURLSecurity(url: string) {

    const percentage = url.startsWith('https://') ? 100 : 0;

    return percentage;
};