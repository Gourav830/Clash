
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        hostname:"localhost",
        protocol:"http"
      },
    ],
  },
   reactStrictMode:false,
};

export default nextConfig;
