import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(req: Request) {
  console.log(req);
  // const secretToken = req.headers.get('X-Secret-Token');
  // const hashedSecret = crypto
  // .createHash('sha256')
  // .update(process.env.DEL_SECRET as string)
  // .digest('hex');

  // if (secretToken === hashedSecret) {
  // cookies().delete('refreshtkn');
  cookies().delete("name");
  return NextResponse.json({ message: "Cookie deleted" });
  // } else {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }
}
