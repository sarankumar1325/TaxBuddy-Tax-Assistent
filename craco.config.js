module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          fs: false,
          http: false,
          https: false,
          url: false,
          util: false,
          zlib: false,
          stream: false,
        },
      },
    },
  },
};
