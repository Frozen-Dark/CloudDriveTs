import { BuildOptions } from "./types/config";
import { Configuration } from "webpack";
import { buildResolvers } from "./buildResolvers";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): Configuration {
	const { paths, mode, isDev } = options;

	return {
		mode: mode, // собирает со всякой шелухой и комментариями, продашн собирает максимально компактно
		entry: {
			bundle: paths.entry // путь файла с которого начинать сборку
		},
		module: {
			rules: buildLoaders(options)
		},
		resolve: buildResolvers(options), // При импорте файла на конце не нужно указывать расширение на конце

		output: {
			publicPath: "/",
			filename: "[name].[contenthash].js", // динамическое имя и хеш для уникальности
			path: paths.build, // путь до папки сборки скрипта
			clean: true // удаление предыдущих сборок
		},
		plugins: buildPlugins(options),
		devtool: isDev ? "inline-source-map" : undefined, // для девтула, что бы можно было понять откуда падает ошибка
		devServer: isDev ? buildDevServer(options) : undefined // со старой версией не работал сервер, обновил до 4.10.0)
	};
}
