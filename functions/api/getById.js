export async function onRequestGet(context) {
  const { DB, request } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return Response.json({
      code: 400,
      msg: "缺少id参数"
    }, { status: 400 });
  }

  const row = await DB.prepare("SELECT * FROM user_info WHERE id = ?")
    .bind(id)
    .first();

  if (!row) {
    return Response.json({
      code: 404,
      msg: "未找到该id对应的信息"
    }, { status: 404 });
  }

  return Response.json({
    code: 200,
    data: row
  });
}
