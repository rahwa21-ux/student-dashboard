import { NextResponse } from "next/server";
import pool from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export const GET = async () => {
  try {
    const result = await pool.query(`
      SELECT l.*, c.title AS chapter_name, c.id AS chapter_id, 
             s.name AS subject_name, s.id AS subject_id,
             g.name AS grade_name, g.id AS grade_id
      FROM lessons l
      JOIN chapters c ON l.chapter_id = c.id
      JOIN subjects s ON c.subject_id = s.id
      JOIN grades g ON s.grade_id = g.id
      ORDER BY l.created_at DESC
    `);
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

export const POST = async (req) => {
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

    let videoPath = null;
    const video = formData.get("video");
    if (video && video.size > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads/videos");
      await fs.mkdir(uploadDir, { recursive: true });
      const filename = `${Date.now()}-${video.name}`;
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, Buffer.from(await video.arrayBuffer()));
      videoPath = `/uploads/videos/${filename}`;
    }

    const result = await pool.query(
      `INSERT INTO lessons (title, description, chapter_id, video_path)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, chapter_id, videoPath],
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
