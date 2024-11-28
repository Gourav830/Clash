
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        hostname:"localhost",
        protocol:"http"
      },
      // {
      //   hostname:"*",
      //   protocol:"https"
      // }
    ]
  }
};

export default nextConfig;
