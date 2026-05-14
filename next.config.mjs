/** @type {import('next').NextConfig} */

// Cloudflare Turnstile widget loads scripts from and iframes
// challenges.cloudflare.com — see src/components/TurnstileWidget.tsx.
const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";

// Next.js dev mode uses eval-source-map, which requires 'unsafe-eval' in CSP.
// Production bundles do not eval, so the production CSP stays strict.
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDev && "'unsafe-eval'",
  TURNSTILE_ORIGIN,
]
  .filter(Boolean)
  .join(" ");

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' ${TURNSTILE_ORIGIN}`,
  "media-src 'self'",
  `frame-src ${TURNSTILE_ORIGIN}`,
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
