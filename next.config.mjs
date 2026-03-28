const isGithubPages = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isGithubPages ? "/anshul-portfolio" : "",
  assetPrefix: isGithubPages ? "/anshul-portfolio/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
