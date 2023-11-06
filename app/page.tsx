import { sql } from "@vercel/postgres";

export default async function Home() {
  const { rows } = await sql`SELECT * FROM pets`;

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
