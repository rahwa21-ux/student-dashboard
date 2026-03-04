import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM grades ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch grades" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const { name } = await req.json();

    if (!name || name.length > 20) {
      return NextResponse.json(
        { error: "Invalid grade name" },
        { status: 400 },
      );
    }

    const result = await pool.query(
      "INSERT INTO grades (name) VALUES ($1) RETURNING *",
      [name],
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create grade" },
      { status: 500 },
    );
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Grade ID required" }, { status: 400 });
    }

    await pool.query("DELETE FROM grades WHERE id = $1", [id]);

    return NextResponse.json({ message: "Grade deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete grade" },
      { status: 500 },
    );
  }
}
