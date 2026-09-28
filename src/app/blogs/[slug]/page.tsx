import Link from "next/link";
import { getBlog } from "../actions";



export default async function BlogPage(
  {params,
  }:{
    params : Promise<{slug: string}>;
  }
){
  const slug = (await params).slug
  const blog = await getBlog(slug)
  return(
    <div className="p-10 h-screen flex flex-col justify-center text-center">
      <div className="bg-zinc-900 py-40 border rounded rounded-2xl border-zinc-300">
        <div className="m-8 text-6xl">{blog.title}</div>

        <div className="m-4 text-2xl text-blue-500 font-bold">
          <Link href={blog.content}>download</Link>
        </div>
      </div>
    </div>
  )
}