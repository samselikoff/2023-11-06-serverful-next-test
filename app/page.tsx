import { sql } from "@vercel/postgres";

export default async function Home() {
  const { rows, fields } = await sql`SELECT * FROM pets`;

  console.log(rows);

  return (
    <div>
      {rows.map((row, i) => (
        <p key={i}>
          {row.name} - {row.owner}
        </p>
      ))}
    </div>
  );
}
