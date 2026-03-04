import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/subjects
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT s.*, g.name AS grade_name
      FROM subjects s
      JOIN grades g ON s.grade_id = g.id
      ORDER BY s.id DESC
    `);
    return NextResponse.json(result.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 },
    );
  }
}

// POST /api/subjects
export async function POST(req) {
  try {
    const { name, description, grade_id } = await req.json();

    if (!name || !grade_id || name.length > 100) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO subjects (name, description, grade_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, description || null, grade_id],
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create subject" },
      { status: 500 },
    );
  }
}
// DELETE /api/subjects?id=123
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Subject ID required" },
        { status: 400 },
      );
    }

    await pool.query("DELETE FROM subjects WHERE id = $1", [id]);

    return NextResponse.json({ message: "Subject deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete subject" },
      { status: 500 },
    );
  }
}

// PUT /api/subjects
export async function PUT(req) {
  try {
    const { id, name, description, grade_id } = await req.json();

    if (!id || !name || !grade_id) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE subjects
       SET name = $1, description = $2, grade_id = $3
       WHERE id = $4 RETURNING *`,
      [name, description || null, grade_id, id],
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update subject" },
      { status: 500 },
    );
  }
}
