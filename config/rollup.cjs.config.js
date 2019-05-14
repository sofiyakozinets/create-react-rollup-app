import includePaths from "rollup-plugin-includepaths";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import svg from "rollup-plugin-svg";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import uglify from "rollup-plugin-uglify-es";

module.exports = {
	input: "src/publish.js",
	output: {
		file: "dist/index.js",
		format: "cjs",
	},
	plugins: [
		includePaths({
			paths: ["src"],
			extensions: [".js", ".jsx", ".json"],
		}),
		postcss({
			plugins: [autoprefixer()],
			extensions: [".css", ".scss", ".sass", ".less"],
			use: ["sass", "less"],
		}),
		svg(),
		babel({
			exclude: "node_modules/**",
		}),
		resolve(),
		commonjs(),
		replace({
			"process.env.NODE_ENV": JSON.stringify("production"),
		}),
		uglify(),
	],
	external: [
		"react",
		"react-dom",
		"react-is",
		"prop-types",
		// ...
	],
};
