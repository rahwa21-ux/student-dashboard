import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/chapters
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT c.*, s.name AS subject_name
      FROM chapters c
      JOIN subjects s ON c.subject_id = s.id
      ORDER BY c.order_number ASC
    `);
    return NextResponse.json(result.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch chapters" },
      { status: 500 },
    );
  }
}

// POST /api/chapters
export async function POST(req) {
  try {
    const { title, order_number, subject_id } = await req.json();

    if (!title || !order_number || !subject_id) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO chapters (title, order_number, subject_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [title, order_number, subject_id],
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create chapter" },
      { status: 500 },
    );
  }
}
// DELETE /api/chapters?id=123
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { error: "Chapter ID required" },
        { status: 400 },
      );

    await pool.query("DELETE FROM chapters WHERE id = $1", [id]);
    return NextResponse.json({ message: "Chapter deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete chapter" },
      { status: 500 },
    );
  }
}

// PUT /api/chapters
export async function PUT(req) {
  try {
    const { id, title, order_number, subject_id } = await req.json();

    if (!id || !title || !order_number || !subject_id) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE chapters
       SET title = $1, order_number = $2, subject_id = $3
       WHERE id = $4 RETURNING *`,
      [title, order_number, subject_id, id],
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update chapter" },
      { status: 500 },
    );
  }
}
