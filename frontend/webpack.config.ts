import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = (env: any, argv: any) => {
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
            extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@components": path.resolve(__dirname, "src/components"),
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
                    target: "http://localhost:5001",
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
