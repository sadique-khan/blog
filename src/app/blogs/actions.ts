"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getBlogs() {
    try{
        const blogs = await prisma.post.findMany()
        return {
            blogs
        }
    }catch(error){
        console.log(error)
        console.error(error)
    }
}

export async function getBlog(slug:string) {
    try{
        const blog = await prisma.post.findFirst({
            where:{Slug:slug}
        });
        if(!blog){
            throw new Error("No blog found")
        }
        return blog;
    }catch(error){
        console.log(error)
        console.error(error)
    }
}

export default async function searchBlogs(formData: FormData) {
    const query = formData.get("query")?.toString().toLowerCase() || "";
    if (query) {
    redirect(`/blogs?query=${encodeURIComponent(query)}`);
  } else {
    redirect("/blogs");
  }
}