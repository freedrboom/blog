export default async (ctx, next) => {
  let start = new Date()
  try {
    await next()
  } catch (e) {
    console.log(e)
  }

  let ms = new Date() - start
  console.log(`used : ${ctx.method} ${ctx.url} - ${ms} ms`)
}
