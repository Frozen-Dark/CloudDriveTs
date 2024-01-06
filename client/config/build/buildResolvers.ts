import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/config";
import { resolve } from "path";
export function buildResolvers(options: BuildOptions): ResolveOptions {
	return {
		extensions: [".tsx", ".ts", ".js"],
		preferAbsolute: true,
		modules: [options.paths.src, "node_modules"],
		mainFiles: ["index"],
		alias: {
			"@app": resolve(options.paths.src, "app"),
			"@pages": resolve(options.paths.src, "pages"),
			"@config": resolve(options.paths.src, "config"),
			"@components": resolve(options.paths.src, "components"),
			"@assets": resolve(options.paths.src, "assets"),
			"@store": resolve(options.paths.src, "store"),
			"@actions": resolve(options.paths.src, "actions"),
			"@lib": resolve(options.paths.src, "lib"),
			"@ui": resolve(options.paths.src, "ui"),
			"@hooks": resolve(options.paths.src, "hooks")
		}
	};
}
