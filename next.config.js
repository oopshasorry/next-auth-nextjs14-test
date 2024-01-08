/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;
const nextConfig = {
    async headers() {
        return [
            {
            source: '/(.*)',
            headers: [
                {
                key: 'Content-Security-Policy',
                value: cspHeader.replace(/\n/g, ''),
                },
                {
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN'
                },
                {
                key: 'Referrer-Policy',
                value: 'origin-when-cross-origin'
                },
                {
                key: 'X-Content-Type-Options',
                value: 'nosniff'
                },
                {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload'
                }


                ],
            },
        ]

    },
    poweredByHeader: false,
}
  
module.exports = nextConfig