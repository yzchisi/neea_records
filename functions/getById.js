export async function onRequestGet(context) {
  const { DB, request } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({
      code: 400,
      msg: "缺少id参数"
    }), { headers: { "Content-Type": "application/json" } });
  }

  const row = await DB.prepare("SELECT * FROM user_info WHERE id = ?")
    .bind(id)
    .first();

  if (!row) {
    return new Response(JSON.stringify({
      code: 404,
      msg: "未找到该id对应的信息"
    }), { headers: { "Content-Type": "application/json" } });
  }

  return new Response(JSON.stringify({
    code: 200,
    data: row
  }), { headers: { "Content-Type": "application/json" } });
}