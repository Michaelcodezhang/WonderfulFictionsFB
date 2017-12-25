let fn_test = async (ctx, next) => {
    ctx.response.body = `<h1>This is a test~</h1>`
}

module.exports = {
    'GET /api/test': fn_test
}