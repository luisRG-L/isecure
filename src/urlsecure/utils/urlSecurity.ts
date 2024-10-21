export default async function verifyURLSecurity(url: string) {
    const response = await fetch(url, {method: 'HEAD'});
    const headers = response.headers;
    const security = [];
    const securityRequired = ['Strict-Transport-Security', 'X-Frame-Options', 'X-XSS-Protection', 'Content-Security-Policy', 'Referrer-Policy'];

    for (const header of securityRequired) {
        if (headers.has(header)) {
            security.push(header);
        }
    }

    return [security.length, securityRequired.length];
}

export { verifyURLSecurity };