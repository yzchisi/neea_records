export async function onRequest(context) {
  try {
    const { env, request } = context
    const db = env.DB
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return Response.json({ code: 400, msg: '缺少id参数' })
    }
    if (!db) {
      return Response.json({ code: 500, msg: 'DB绑定获取失败，env.DB是undefined' })
    }

    // ✅ 新增这一行，开启session，自动走就近读副本
    const session = db.withSession()

    const stmt = session.prepare('SELECT * FROM user_info WHERE id = ?')
    const result = await stmt.bind(id).first()

    if (!result) {
      return Response.json({ code: 404, msg: '没有找到这条记录' })
    }
    return Response.json({ code: 200, data: result })
  } catch (err) {
    return Response.json({ code: 500, msg: `服务器内部错误：${err.message}` })
  }
}
