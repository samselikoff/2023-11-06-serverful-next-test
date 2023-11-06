import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const petName = searchParams.get("petName");
  const ownerName = searchParams.get("ownerName");

  try {
    if (!petName || !ownerName) throw new Error("Pet and owner names required");
    await sql`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${ownerName});`;
    revalidatePath("/", "layout");
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const pets = await sql`SELECT * FROM Pets;`;
  return NextResponse.json({ pets }, { status: 200 });
}
