/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Lint runs separately; don't block Vercel builds on it.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    // Old URLs that went out on earlier résumés.
    return [
      { source: "/tower", destination: "/work/tower", permanent: true },
      { source: "/work/local-multi-control", destination: "/lab/local-multi-control", permanent: true },
      { source: "/games/:slug", destination: "/lab/:slug", permanent: true },
      { source: "/tech/unity-tools", destination: "/tools/unity-tools", permanent: true },
      { source: "/tech/star-chart", destination: "/tools/star-chart", permanent: true },
      { source: "/tech/:slug", destination: "/#tools", permanent: false },
      { source: "/writing", destination: "/", permanent: false },
      { source: "/music", destination: "/", permanent: false },
      { source: "/game-dev-journey", destination: "/work/tower", permanent: true },
    ];
  },
};

module.exports = nextConfig;
