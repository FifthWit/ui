"use client";

import { redirect, useParams } from "next/navigation";

export default function DemoPage() {
	const { name } = useParams();
	redirect(`/demo/${name}/default`);
}
