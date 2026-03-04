// app/api/resources/route.js
import { NextResponse } from "next/server";

const resources = [
  {
    id: 1,
    gradeId: 1,
    title: "Math PDF",
    type: "pdf",
    link: "/resources/math1.pdf",
    description: "Chapter 1 notes",
    isNew: true,
  },
  {
    id: 2,
    gradeId: 1,
    title: "Science Video",
    type: "video",
    link: "/resources/science1.mp4",
    description: "Introduction to Physics",
    isNew: false,
  },
  {
    id: 3,
    gradeId: 2,
    title: "English PDF",
    type: "pdf",
    link: "/resources/english2.pdf",
    description: "Grammar rules",
    isNew: true,
  },
];

export async function GET() {
  return NextResponse.json(resources);
}
