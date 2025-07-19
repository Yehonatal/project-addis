## Webpack Configuration (`webpack.config.js`) Explained

This is in fact my first time making a webpack config, I have looked at other configs, videos on youtube (crash course on webpack), and tried to use Gpt to chose between different options to what could be best (I may have made mistakes or chosen tools which are not the best).

```javascript
import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server"; // This line is just for type declarations, not an actual import for runtime.
import path from "path";
import { fileURLToPath } from "url";

// Helper to get __dirname in ES Modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = (env: any, argv: any) => {
    const isProduction = argv.mode === "production"; // Check if we're in production mode

    return {
        // --- Core Configuration ---
        mode: isProduction ? "production" : "development", // Sets Webpack's build mode
        entry: "./src/index.tsx", // The main entry point of our application
        output: {
            path: path.resolve(__dirname, "dist"), // Where to put the bundled files
            filename: isProduction ? "[name].[contenthash].js" : "[name].js", // Naming convention for output bundles
            clean: true, // Clean the output directory before building
            publicPath: "/", // Public URL path for output files
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx", ".json"], // File extensions Webpack will try to resolve
            alias: { // Shorthand aliases for import paths cause I don't want to waste time writing file paths
                "@": path.resolve(__dirname, "src"),
                "@components": path.resolve(__dirname, "src/components"),
                "@pages": path.resolve(__dirname, "src/pages"),
                "@store": path.resolve(__dirname, "src/store"),
                "@services": path.resolve(__dirname, "src/services"),
                "@utils": path.resolve(__dirname, "src/utils"),
                "@styles": path.resolve(__dirname, "src/styles"),
            },
        },
        module: { // Rules for how different types of modules (files) are treated
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/, // Apply to JS, JSX, TS, TSX files
                    exclude: /node_modules/, // Don't process files in node_modules
                    use: {
                        loader: "babel-loader", // Use Babel to transpile
                        options: {
                            presets: [ // Babel presets for different language features
                                ["@babel/preset-env", { targets: "defaults" }],
                                ["@babel/preset-react", { runtime: "automatic" }],
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/i, // Apply to CSS files
                    use: ["style-loader", "css-loader"], // Use these loaders
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i, // Apply to common image files (This was one the requirement from the PRD I received for the test project )
                    type: "asset/resource", // Webpack 5 built-in asset handling
                    generator: {
                        filename: "images/[name].[hash][ext]", // Output path and naming for images
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i, // Apply to font files
                    type: "asset/resource", // Webpack 5 built-in asset handling
                    generator: {
                        filename: "fonts/[name].[hash][ext]", // Output path and naming for fonts
                    },
                },
            ],
        },
        plugins: [ // Plugins extend Webpack's capabilities
            new HtmlWebpackPlugin({
                template: "./public/index.html", // HTML template to use
                title: "Project Addis - Music List", // Dynamic title for the HTML
                favicon: "./public/favicon.png", // Favicon for the HTML
            }),
        ],
        devServer: { // Configuration for the development server
            static: {
                directory: path.join(__dirname, "public"), // Serve static files from here
            },
            port: parseInt(process.env.PORT || "3000"), // Port for the dev server
            open: true, // Open browser automatically
            hot: true, // Enable Hot Module Replacement (HMR)
            historyApiFallback: true, // Fallback to index.html for client-side routing
            proxy: [ // Proxy API requests
                {
                    context: ["/api"], // Intercept requests starting with /api
                    target: "http://localhost:5001", // Redirect them to this backend
                    changeOrigin: true, // Change the origin header to the target URL
                    secure: false, // Don't verify SSL certs (useful for dev with self-signed certs)
                },
            ],
        },
        optimization: { // Optimizations for the output bundle
            splitChunks: {
                chunks: "all", // Optimize all chunks
                cacheGroups: {
                    vendor: { // Create a vendor chunk for node_modules
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
        },
        devtool: isProduction ? "source-map" : "eval-source-map", // Source map generation strategy
    };
};
export default config;
```

-----

## More Explanation of Webpack Configurations (This is what in part what I wrote down while trying to learn webpack and I gave it to Gpt to format it afterwards )


### Core Configuration (`mode`, `entry`, `output`)

This section defines the fundamental aspects of your Webpack build.

  * **`mode: isProduction ? "production" : "development"`**: Tells Webpack whether to build for `production` (optimized, minified, faster) or `development` (faster builds, more debugging info). This automatically applies different built-in optimizations and settings.
  * **`entry: "./src/index.tsx"`**: Specifies the main "entry point" of your application. Webpack starts bundling all my code from this file, building its dependency graph.
  * **`output`**:
      * **`path: path.resolve(__dirname, "dist")`**: Defines the absolute path where the bundled output files will be saved (e.g., a `dist` folder in my projects root), ready for deployment.
      * **`filename: isProduction ? "[name].[contenthash].js" : "[name].js"`**: Sets the naming pattern for output JavaScript bundles. In production, `[contenthash]` generates a unique hash based on the file's content for efficient browser caching, forcing updates only when content changes. In development, simpler names are used for easier debugging.
      * **`clean: true`**: Automatically clears (deletes all files from) the `output.path` directory before each new build, preventing old or unused files from accumulating. 
      * **`publicPath: "/"`**: Specifies the base public URL path for all output assets when referenced in a browser, ensuring assets like images, fonts, and JavaScript chunks are correctly linked, especially for single-page applications and routing.

-----

### Path Resolution (`resolve`)

This section tells Webpack how to find modules when we use `import` or `require`.

  * **`extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]`**: Provides a list of file extensions Webpack should try to resolve automatically when I import a module without specifying its extension (e.g., `import MyComponent from './MyComponent'`). This simplifies import statements.
  * **`alias`**: Creates easy-to-use "aliases" or shortcuts for long file paths (e.g., `@components` maps to `src/components`). This makes imports cleaner, more readable, and simplifies refactoring by allowing global path changes in one place.

-----

### Module Rules (`module.rules`)

This is where we tell Webpack how to handle different types of files (modules) it encounters during the bundling process, specifying `test` (which files to process) and `use` (which loaders).

  * **Rule for `.(js|jsx|ts|tsx)$` files (JavaScript/TypeScript/React)**:
      * **`exclude: /node_modules/`**: Prevents processing of files within the `node_modules` directory, as they are typically pre-compiled.
      * **`use: { loader: "babel-loader", options: { presets: [...] } }`**: Uses `babel-loader` to transpile modern JavaScript, TypeScript, and React JSX/TSX syntax into older, more universally compatible JavaScript versions. This includes:
          * `@babel/preset-env`: For general JavaScript compatibility across browsers.
          * `@babel/preset-react`: For handling React's JSX/TSX syntax (`runtime: "automatic"` removes the need for `import React`).
          * `@babel/preset-typescript`: For stripping TypeScript type annotations.
  * **Rule for `.css$/i` files (CSS)**:
      * **`use: ["style-loader", "css-loader"]`**: `css-loader` interprets CSS imports and URLs, turning CSS into JavaScript modules. `style-loader` then injects these styles directly into the HTML `<head>` at runtime, allowing CSS to be bundled with your components.
  * **Rules for Assets (`.png|jpe?g|gif|svg`, `woff|woff2|eot|ttf|otf`)**:
      * **`type: "asset/resource"`**: Leverages Webpack 5's built-in asset module type to handle static files like images and fonts. It processes these assets by emitting them as separate files.
      * **`generator: { filename: "images/[name].[hash][ext]" }`**: Defines the output filename and path for the asset (e.g., images go into an `images/` folder, fonts into a `fonts/` folder), with a hash for effective caching.

-----

### Plugins (`plugins`)

  * **`HtmlWebpackPlugin`**: Automatically generates an `index.html` file (based on your `public/index.html` template) and injects all your bundled JavaScript and CSS files into it. It also dynamically sets the page title and favicon, automating the setup of your main HTML entry point.

-----

### Development Server (`devServer`)

This section configures the development server, optimizing the local development experience.

  * **`static: { directory: path.join(__dirname, "public") }`**: Specifies a directory to serve static files (like `index.html`, `favicon.png`) directly, without Webpack processing them, ensuring quick access during development.
  * **`port: parseInt(process.env.PORT || "3000")`**: Sets the local port for the development server (defaulting to `3000`)
  * **`open: true`**: Automatically launches the application in the default web browser when the development server starts.
  * **`hot: true`**: Enables **Hot Module Replacement (HMR)**, which updates only modified modules in the browser without a full page reload, dramatically speeding up development by preserving application state.
  * **`historyApiFallback: true`**: Directs any non-existent paths back to `index.html`. 
  * **`proxy`**:
      * Intercepts requests starting with `/api` (`context: ["/api"]`) and redirects them to a different target (e.g., `http://localhost:5001`).
      * `changeOrigin: true` modifies the `Host` header of the proxied request.
      * `secure: false` bypasses SSL certificate verification 
      * This setup solves **Cross-Origin Resource Sharing (CORS)** issues during development, allowing your frontend to seamlessly make API calls to a separate backend server.

-----

### Optimization (`optimization`)

Because of time constraints I haven't gone deep into this part but I have added some features from what I have seen on other projects. I try to read about this more and use it in the project.

  * **`splitChunks`**: Enables **code splitting**, a Webpack feature that divides your large JavaScript bundle into smaller, more manageable chunks (`chunks: "all"` applies this to all types of chunks).
      * **`cacheGroups.vendor`**: Specifically creates a separate chunk named "vendors" for all code originating from the `node_modules` directory (`test: /[\\/]node_modules[\\/]/`). This allows browsers to cache frequently used third-party libraries separately, reducing download sizes and improving load times for returning users.

-----

### Source Maps (`devtool`)

This configuration dictates how source maps are generated for debugging.

  * **`devtool: isProduction ? "source-map" : "eval-source-map"`**: Specifies the type of source map.
      * **`eval-source-map` (Development)**: Provides fast recompilation and good debugging capabilities for development, with source maps generated within `eval()` statements.
      * **`source-map` (Production)**: Generates a separate, high-quality `.map` file for production builds. This is essential for debugging minified code in deployed environments by mapping back to the original source.