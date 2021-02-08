module.exports = {
    plugins: {
        "posthtml-expressions": {
            locals: {
                CLOUDFLARE_TOKEN: process.env.CLOUDFLARE_TOKEN,
            }
        }
    }
}