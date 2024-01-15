/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions`` to include MDX files
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};
const withMDX = require("@next/mdx")();

module.exports = withMDX(nextConfig);
