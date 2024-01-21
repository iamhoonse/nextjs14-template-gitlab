/** @type {import('typedoc').TypeDocOptions} **/
module.exports = {
    $schema: "https://typedoc.org/schema.json",
    entryPoints: ["./src"],
    entryPointStrategy: "expand",
    exclude: "**/*+(index|.spec|.e2e).ts",
    out: "./docs/code",
}