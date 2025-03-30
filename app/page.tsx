import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import PostsTimeline from "./components/posts-timeline";
import PostsCarousel from "./components/posts-carousel";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, body}`;

const options = { next: { revalidate: 30 } };


export default async function Home() {
    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
    return (
        <div>
            <main className="flex flex-col  row-start-2 items-center">
                <div
                    className="hero min-h-200"
                    style={{
                        backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                    }}
                    data-theme="light">
                    <div className="hero-overlay"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="">
                            <h1 className="mb-5 text-5xl font-bold">Hello, my name is Kaylee!</h1>
                            <p className="mb-5 text-2xl">
                                Swag city, Y&#39;all
                            </p>
                        </div>
                    </div>
                </div>
                <h1 className="text-4xl font-bold mb-3 mt-3 text-center">Posts</h1>
                <PostsCarousel posts={posts} />
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            </footer>
        </div>
    );
}
