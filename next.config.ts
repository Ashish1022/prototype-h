import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {}
};

export default withPayload(nextConfig);
