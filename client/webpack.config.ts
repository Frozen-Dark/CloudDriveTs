import { resolve } from "path";
import { Configuration } from "webpack";
import { BuildEnv, BuildPaths } from "./config/build/types/config";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";

// eslint-disable-next-line import/no-anonymous-default-export
export default (env: BuildEnv) => {
	const paths: BuildPaths = {
		entry: resolve(__dirname, "src", "index.tsx"),
		build: resolve(__dirname, "product"),
		html: resolve(__dirname, "public", "index.html"),
		src: resolve(__dirname, "src")
	};

	const mode = env.mode || "development";
	const isDev = mode === "development";
	const PORT = env.port || 3005;
	const apiUrl = env.apiUrl || "http://localhost:5000";

	const config: Configuration = buildWebpackConfig({
		mode,
		paths,
		isDev,
		port: PORT,
		apiUrl
	});
	return config;
};
