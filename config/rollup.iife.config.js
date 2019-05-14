import includePaths from "rollup-plugin-includepaths";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import url from "rollup-plugin-url";
import copy from "rollup-plugin-copy";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import uglify from "rollup-plugin-uglify-es";

module.exports = {
	input: "src/index.js",
	output: {
		file: "build/js/bundle.js",
		format: "iife",
	},
	plugins: [
		includePaths({
			paths: ["src"],
			extensions: [".js", ".jsx", ".json"],
		}),
		postcss({
			plugins: [autoprefixer()],
			extensions: [".css", ".scss", ".sass", ".less"],
			extract: "build/css/bundle.css",
			minimize: true,
			use: ["sass", "less"],
		}),
		url({
			limit: 0, // inline files < X, copy files > X
			include: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"],
			exclude: "node_modules/**",
			fileName: "[name][extname]",
			publicPath: "/images/",
			emitFiles: false,
		}),
		copy({
      targets: {
        "src/images": "build/images",
      },
		}),
		babel({
			exclude: "node_modules/**",
		}),
		resolve({
      mainFields: ["jsnext", "main", "module"],
		}),
		commonjs({
			include: ["node_modules/**"],
			namedExports: {
				"node_modules/react/index.js": [
					"cloneElement",
					"createElement",
					"Component",
					"useContext",
					"useMemo",
					"createFactory",
					"PureComponent",
					"forwardRef",
					"useEffect",
					"Fragment",
					"useRef",
					"useReducer",
					"useCallback",
					"useState",
          // ...
				],
				"node_modules/react-dom/index.js": [
				  "findDOMNode",
          "createPortal",
          // ...
        ],
				"node_modules/react-is/index.js": [
				  "isValidElementType",
          // ...
        ],
				"node_modules/prop-types/index.js": [
				  "object",
          "oneOfType",
          "func",
          "element",
          "bool",
          // ...
        ],
        // ...
			},
		}),
		replace({
			"process.env.NODE_ENV": JSON.stringify("production"),
		}),
		uglify(),
	],
};
