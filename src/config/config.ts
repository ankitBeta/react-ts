interface IConfig {
  baseUrl: string;
}
const config: IConfig = {
  baseUrl: process.env.REACT_APP_API_BASE_URL!,
};
export default config;
