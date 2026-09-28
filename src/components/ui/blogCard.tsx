


export default function BlogCard(blog:{title:string}){
    return(
        <div className="border border-blue-600 bg-zinc-900 h-60 w-full shadow-md hover:shadow-lg hover:scale-105 rounded-lg p-4">
            <h1 className="flex items-center justify-center h-full text-center text-2xl text-white font-bold">
                {blog.title}
            </h1>
        </div>
    )
}