import { NextResponse } from "next/server";
import pool from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT n.id, n.title, n.description, n.chapter_id, n.file_path, n.created_at,
              c.title AS chapter_title, s.name AS subject_name, g.name AS grade_name
       FROM notes n
       LEFT JOIN chapters c ON n.chapter_id = c.id
       LEFT JOIN subjects s ON c.subject_id = s.id
       LEFT JOIN grades g ON s.grade_id = g.id
       ORDER BY n.created_at DESC`,
    );
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description") || null;
    const chapter_id = formData.get("chapter_id");

    if (!title || !chapter_id) {
      return NextResponse.json(
        { error: "Title and Chapter are required" },
        { status: 400 },
      );
    }

    // Handle file upload
    let filePath = null;
    const file = formData.get("file");
    if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filepath, buffer);
      filePath = `/uploads/${filename}`;
    }

    const result = await pool.query(
      `INSERT INTO notes (title, description, chapter_id, file_path) 
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [title, description, parseInt(chapter_id), filePath],
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add note" }, { status: 500 });
  }
}
