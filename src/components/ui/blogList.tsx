import BlogCard from "./blogCard"
import { getBlogs } from "@/app/blogs/actions"
import Link from "next/link";

export default async function BlogList({ searchParams }:{searchParams?:{ query?: string}}){
    const {blogs} = await getBlogs();
    const query = searchParams?.query?.toLowerCase() || "";
    console.log("searchParams:")
    console.log(searchParams)
    console.log(query)
    const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(query)
  );

    return (
    <div className="px-4">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.Slug}`}>
            <BlogCard title={blog.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}