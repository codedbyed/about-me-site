/**
 * Cloudflare Worker: serves the static site in ./public
 *
 * Cloudflare's static-asset binding does the heavy lifting: the assets are
 * stored on Cloudflare's edge and served directly. The Worker itself never
 * runs for a normal page load unless you later add logic (redirects, auth,
 * A/B tests, an API endpoint).
 *
 * Free tier: unlimited requests and bandwidth for static assets.
 */

// [TODO] Optional: add security headers and caching rules here once live.
// export default {
//   async fetch(request, env, ctx) {
//     const response = await env.ASSETS.fetch(request);
//     const headers = new Headers(response.headers);
//     headers.set('X-Content-Type-Options', 'nosniff');
//     headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
//     return new Response(response.body, { status: response.status, headers });
//   }
// };

export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};