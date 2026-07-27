import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Short URL for the Anything Is Possible insert-card QR code.
        //
        // permanent: false (307) ON PURPOSE. A 308 is cached by browsers
        // indefinitely, and a QR code printed onto a card cannot be recalled —
        // so the destination has to stay changeable forever. This is the
        // "redirect URL you control, not the final destination" the campaign's
        // fulfillment spec calls for.
        source: "/aip",
        destination: "/anything-is-possible?src=card",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
