## Webpack Configuration (`webpack.config.js`) Explained

This is in fact my first time making a webpack config, I have looked at other configs, videos on youtube (crash course on webpack), and tried to use Gpt to chose between different options to what could be best (I may have made mistakes or chosen tools which are not the best).

```javascript
import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";
import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import Dotenv from "dotenv-webpack";

// Load environment variables
const env = process.env.NODE_ENV || "development";
const envPath = `.env.${env}`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = async (env: any, argv: any) => {
    const isProduction = argv.mode === "production";

    return {
        mode: isProduction ? "production" : "development",
        entry: "./src/index.tsx",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: isProduction ? "[name].[contenthash].js" : "[name].js",
            clean: true,
            publicPath: "/",
        },
        resolve: {
            fallback: {
                process: "process/browser",
                path: "path-browserify",
                util: "util/",
            },
            extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@components": path.resolve(__dirname, "src/components"),
                "@app-types": path.resolve(__dirname, "src/types"),
                "@pages": path.resolve(__dirname, "src/pages"),
                "@store": path.resolve(__dirname, "src/store"),
                "@services": path.resolve(__dirname, "src/services"),
                "@utils": path.resolve(__dirname, "src/utils"),
                "@styles": path.resolve(__dirname, "src/styles"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env", { targets: "defaults" }],
                                [
                                    "@babel/preset-react",
                                    { runtime: "automatic" },
                                ],
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "images/[name].[hash][ext]",
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "fonts/[name].[hash][ext]",
                    },
                },
            ],
        },
        plugins: [
            new Dotenv({
                path: `./${envPath}`,
                systemvars: true, // Load system environment variables
                silent: true, // Suppress warnings about missing .env file uffffff
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                title: "Project Addis - Music List",
                favicon: "./public/favicon.png",
            }),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, "public"),
            },
            port: parseInt(process.env.PORT || "3000"),
            open: true,
            hot: true,
            historyApiFallback: true,
            proxy: [
                {
                    context: ["/api"],
                    target: "http://localhost:5000",
                    changeOrigin: true,
                    secure: false,
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
        },
        devtool: isProduction ? "source-map" : "eval-source-map",
    };
};
export default config;

```

-----

## More Explanation of Webpack Configurations

This is in fact my first time making a webpack config, I have looked at other configs, videos on youtube (crash course on webpack), and tried to use Gpt to chose between different options to what could be best (I may have made mistakes or chosen tools which are not the best).

### Core Configuration (`mode`, `entry`, `output`)

This section defines the fundamental aspects of your Webpack build.

  * **`mode: isProduction ? "production" : "development"`**: Tells Webpack whether to build for `production` (optimized, minified, faster) or `development` (faster builds, more debugging info). This automatically applies different built-in optimizations and settings.
  * **`entry: "./src/index.tsx"`**: Specifies the main "**entry point**" of your application. Webpack starts bundling all my code from this file, building its dependency graph.
  * **`output`**:
      * **`path: path.resolve(__dirname, "dist")`**: Defines the absolute path where the bundled output files will be saved (e.g., a `dist` folder in my projects root), ready for deployment.
      * **`filename: isProduction ? "[name].[contenthash].js" : "[name].js"`**: Sets the naming pattern for output JavaScript bundles. In production, `[contenthash]` generates a unique hash based on the file's content for efficient browser caching, forcing updates only when content changes. In development, simpler names are used for easier debugging.
      * **`clean: true`**: Automatically clears (deletes all files from) the `output.path` directory before each new build, preventing old or unused files from accumulating.
      * **`publicPath: "/"`**: Specifies the base public URL path for all output assets when referenced in a browser, ensuring assets like images, fonts, and JavaScript chunks are correctly linked, especially for single-page applications and routing.

-----

### Path Resolution (`resolve`)

This section tells Webpack how to find modules when we use `import` or `require`.

  * **`fallback`**: This is a crucial addition that provides **polyfills** for Node.js core modules (`process`, `path`, `util`) when running in a browser environment. This is necessary because some npm packages might assume the presence of Node.js global objects or modules, even if they're intended for front-end use.
      * `process: "process/browser"`: Provides a browser-compatible `process` object.
      * `path: "path-browserify"`: Offers a browser-compatible version of Node.js's `path` module.
      * `util: "util/"`: Provides a browser-compatible version of Node.js's `util` module.
  * **`extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]`**: Provides a list of file extensions Webpack should try to resolve automatically when I import a module without specifying its extension (e.g., `import MyComponent from './MyComponent'`). This simplifies import statements.
  * **`alias`**: Creates easy-to-use "**aliases**" or shortcuts for long file paths (e.g., `@components` maps to `src/components`). This makes imports cleaner, more readable, and simplifies refactoring by allowing global path changes in one place. A new alias, **`@app-types`**, has been added, mapping to `src/types`, which is useful for organizing and importing shared type definitions.

-----

### Module Rules (`module.rules`)

This is where we tell Webpack how to handle different types of files (modules) it encounters during the bundling process, specifying `test` (which files to process) and `use` (which loaders).

  * **Rule for `.(js|jsx|ts|tsx)$` files (JavaScript/TypeScript/React)**:
      * **`exclude: /node_modules/`**: Prevents processing of files within the `node_modules` directory, as they are typically pre-compiled.
      * **`use: { loader: "babel-loader", options: { presets: [...] } }`**: Uses `babel-loader` to **transpile** modern JavaScript, TypeScript, and React JSX/TSX syntax into older, more universally compatible JavaScript versions. This includes:
          * `@babel/preset-env`: For general JavaScript compatibility across browsers.
          * `@babel/preset-react`: For handling React's JSX/TSX syntax (`runtime: "automatic"` removes the need for `import React`).
          * `@babel/preset-typescript`: For stripping TypeScript type annotations.
  * **Rule for `.css$/i` files (CSS)**:
      * **`use: ["style-loader", "css-loader"]`**: `css-loader` interprets CSS imports and URLs, turning CSS into JavaScript modules. `style-loader` then injects these styles directly into the HTML `<head>` at runtime, allowing CSS to be bundled with your components.
  * **Rules for Assets (`.png|jpe?g|gif|svg`, `woff|woff2|eot|ttf|otf`)**:
      * **`type: "asset/resource"`**: Leverages Webpack 5's built-in **asset module type** to handle static files like images and fonts. It processes these assets by emitting them as separate files.
      * **`generator: { filename: "images/[name].[hash][ext]" }`**: Defines the output filename and path for the asset (e.g., images go into an `images/` folder, fonts into a `fonts/` folder), with a hash for effective caching.

-----

### Plugins (`plugins`)

Plugins extend Webpack's capabilities beyond basic bundling.

  * **`Dotenv`**: This newly added plugin is crucial for **environment variable management**.
      * ` new Dotenv({ path:  `./${envPath}`, systemvars: true, silent: true })`: This plugin loads environment variables from a `.env` file specific to the current `NODE_ENV` (e.g., `.env.development`, `.env.production`). It also loads existing system environment variables and can suppress warnings if a `.env` file is missing. This allows you to manage different configurations (API endpoints, secrets) for development, testing, and production environments.
  * **`HtmlWebpackPlugin`**: Automatically generates an `index.html` file (based on your `public/index.html` template) and injects all your bundled JavaScript and CSS files into it. It also dynamically sets the page title and favicon, automating the setup of your main HTML entry point.

-----

### Development Server (`devServer`)

This section configures the development server, optimizing the local development experience.

  * **`static: { directory: path.join(__dirname, "public") }`**: Specifies a directory to serve static files (like `index.html`, `favicon.png`) directly, without Webpack processing them, ensuring quick access during development.
  * **`port: parseInt(process.env.PORT || "3000")`**: Sets the local port for the development server (defaulting to `3000`), allowing you to configure it via an environment variable.
  * **`open: true`**: Automatically launches the application in the default web browser when the development server starts.
  * **`hot: true`**: Enables **Hot Module Replacement (HMR)**, which updates only modified modules in the browser without a full page reload, dramatically speeding up development by preserving application state.
  * **`historyApiFallback: true`**: Directs any non-existent paths back to `index.html`. This is vital for single-page applications (SPAs) that handle routing on the client-side.
  * **`proxy`**:
      * Intercepts requests starting with `/api` (`context: ["/api"]`) and redirects them to a different target (e.g., `http://localhost:5000`). 
      * `changeOrigin: true` modifies the `Host` header of the proxied request to match the target's host.
      * `secure: false` bypasses SSL certificate verification, which is often useful in development environments with self-signed certificates.
      * This setup solves **Cross-Origin Resource Sharing (CORS)** issues during development, allowing your frontend to seamlessly make API calls to a separate backend server running on a different port.

-----

### Optimization (`optimization`)

Because of time constraints I haven't gone deep into this part but I have added some features from what I have seen on other projects. I try to read about this more and use it in the project after the deadline.

  * **`splitChunks`**: Enables **code splitting**, a Webpack feature that divides your large JavaScript bundle into smaller, more manageable chunks (`chunks: "all"` applies this to all types of chunks).
      * **`cacheGroups.vendor`**: Specifically creates a separate chunk named "vendors" for all code originating from the `node_modules` directory (`test: /[\\/]node_modules[\\/]/`). This allows browsers to cache frequently used third-party libraries separately, reducing download sizes and improving load times for returning users.

-----

### Source Maps (`devtool`)

This configuration dictates how source maps are generated for debugging.

  * **`devtool: isProduction ? "source-map" : "eval-source-map"`**: Specifies the type of source map.
      * **`eval-source-map` (Development)**: Provides fast recompilation and good debugging capabilities for development, with source maps generated within `eval()` statements.
      * **`source-map` (Production)**: Generates a separate, high-quality `.map` file for production builds. This is essential for debugging minified code in deployed environments by mapping back to the original source.