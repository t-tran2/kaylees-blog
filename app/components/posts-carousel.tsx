import { SanityDocument } from "next-sanity";
import Link from "next/link";
import { CarouselNavButton } from "./carousel-nav-button";

function truncatePostBody(postBody: string, maxLength: number): string {
    if (postBody.length <= maxLength) {
        return postBody;
    }

    const truncatedBody = postBody.substring(0, maxLength);
    // Use regex to find the last whitespace character
    const lastWhitespaceMatch = truncatedBody.match(/\s+/g);
    if (!lastWhitespaceMatch) {
        // If there's no whitespace, just return the truncated string
        return truncatedBody;
    }

    // Find position of the last whitespace
    const lastWhitespaceIndex = truncatedBody.lastIndexOf(
        lastWhitespaceMatch[lastWhitespaceMatch.length - 1]
    );
    return truncatedBody.substring(0, lastWhitespaceIndex) + "...";
}

export default function PostsCarousel({ posts }) {
    console.log(posts);
    return (
        <div className="relative w-full flex flex-col items-center">
            <CarouselNavButton direction='left' targetId='posts-carousel' />
            <div id='posts-carousel' className="carousel carousel-start max-w-full w-auto p-5">
                {posts.map((post: SanityDocument, index: number) => (
                    <div key={post._id} className="carousel-item card bg-primary text-primary-content w-96 bg-primary card-md shadow-sm ml-2 mr-2">
                        <div className="card-body">
                            <h2 className="card-title">{post.title}</h2>
                            <time className="font-mono italic">{(new Date(post.publishedAt)).toLocaleDateString()}</time>
                            <p>{truncatePostBody(post.body[0].children[0].text, 200)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <CarouselNavButton direction='right' targetId='posts-carousel' />
        </div>
        //<div className="carousel w-full">
        //    <div id="slide1" className="carousel-item relative w-full">
        //        <img
        //            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
        //            className="w-full" />
        //        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        //            <a href="#slide4" className="btn btn-circle">❮</a>
        //            <a href="#slide2" className="btn btn-circle">❯</a>
        //        </div>
        //    </div>
        //    <div id="slide2" className="carousel-item relative w-full">
        //        <img
        //            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
        //            className="w-full" />
        //        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        //            <a href="#slide1" className="btn btn-circle">❮</a>
        //            <a href="#slide3" className="btn btn-circle">❯</a>
        //        </div>
        //    </div>
        //    <div id="slide3" className="carousel-item relative w-full">
        //        <img
        //            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
        //            className="w-full" />
        //        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        //            <a href="#slide2" className="btn btn-circle">❮</a>
        //            <a href="#slide4" className="btn btn-circle">❯</a>
        //        </div>
        //    </div>
        //    <div id="slide4" className="carousel-item relative w-full">
        //        <img
        //            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
        //            className="w-full" />
        //        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        //            <a href="#slide3" className="btn btn-circle">❮</a>
        //            <a href="#slide1" className="btn btn-circle">❯</a>
        //        </div>
        //    </div>
        //</div>
        //<h1 className="text-4xl font-bold mb-8 mt-8">Posts</h1>
        //<ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        //    {posts.map((post: SanityDocument, index: number) => {
        //        const isLastPost = posts.length - 1 !== index;
        //        return (
        //            <li key={post._id}>
        //                <div className="timeline-middle">
        //                    <svg
        //                        xmlns="http://www.w3.org/2000/svg"
        //                        viewBox="0 0 20 20"
        //                        fill="currentColor"
        //                        className="h-5 w-5">
        //                        <path
        //                            fillRule="evenodd"
        //                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        //                            clipRule="evenodd" />
        //                    </svg>
        //                </div>
        //                <div className={"mb-10 " + (index % 2 === 0 ? "timeline-start md:text-end" : "timeline-end")}>
        //                    <Link href={"/" + post.slug.current} className="hover:underline">
        //                        <time className="font-mono italic">{(new Date(post.publishedAt)).toLocaleDateString()}</time>
        //                        <div className="text-lg font-black">{post.title}</div>
        //                        {truncatePostBody(post.body[0].children[0].text, 50)}
        //                    </Link>
        //                </div>
        //                {isLastPost && <hr />}
        //            </li>
        //        )
        //    })
        //    }
        //</ul>

    )
}
