module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, os: false, net: false, tls: false, crypto: false, stream: false, timers: false, process: false };
    return config;
  },
};