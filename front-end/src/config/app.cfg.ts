const config = {
  /**
   * REACT_APP_* variables must be in the .env file
   * under the `front-end` root directory.
   * @see https://stackoverflow.com/a/49579700/2247494
   */
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  },
};

export default config;
