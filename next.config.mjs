const isGithubPages = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const basePath = isGithubPages ? "/anshul-portfolio" : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: isGithubPages ? "/anshul-portfolio/" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
