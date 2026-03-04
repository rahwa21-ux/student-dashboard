import { NextResponse } from "next/server";
import pool from "@/lib/db";
import fs from "fs/promises";
import path from "path";

// DELETE /api/lessons/:id
export const DELETE = async (req, context) => {
  const params = await context.params; // ✅ unwrap params promise
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid lesson ID" }, { status: 400 });
  }

  try {
    const result = await pool.query(
      "DELETE FROM lessons WHERE id=$1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const videoPath = result.rows[0].video_path;
    if (videoPath) {
      const filePath = path.join(process.cwd(), "public", videoPath);
      try {
        await fs.unlink(filePath);
      } catch {}
    }

    return NextResponse.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/lessons/:id error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

// PUT /api/lessons/:id
export const PUT = async (req, context) => {
  const params = await context.params; // ✅ unwrap params promise
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid lesson ID" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description") || null;
    const chapter_id = parseInt(formData.get("chapter_id"));

    if (!title || isNaN(chapter_id)) {
      return NextResponse.json(
        { error: "Title and valid Chapter required" },
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

    const query = videoPath
      ? `UPDATE lessons SET title=$1, description=$2, chapter_id=$3, video_path=$4 WHERE id=$5 RETURNING id, title, description, chapter_id, video_path`
      : `UPDATE lessons SET title=$1, description=$2, chapter_id=$3 WHERE id=$4 RETURNING id, title, description, chapter_id, video_path`;

    const values = videoPath
      ? [title, description, chapter_id, videoPath, id]
      : [title, description, chapter_id, id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/lessons/:id error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
