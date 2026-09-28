import { auth } from "@/auth";
import BlogList from "@/components/ui/blogList";
import { redirect } from "next/navigation";


export default async function Blogs({searchParams}:{searchParams:{query?:string}}) {

  const session = await auth();

  if (!session?.user){
    redirect('/login')
  }
  return (
    <div className="pt-20 pb-10">
      <BlogList searchParams={await searchParams}/>
    </div>
  );
}
