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
    return (
        <div className="relative w-full flex flex-col items-center">
            <CarouselNavButton direction='left' targetId='posts-carousel' />
            <div id='posts-carousel' className="carousel carousel-start max-w-full w-auto p-5">
                {posts.map((post: SanityDocument, index: number) => (
                    <div key={post._id} className="carousel-item card bg-primary text-primary-content w-96 bg-primary card-md shadow-sm ml-2 mr-2">
                        <Link href={`/${post.slug.current}`}>
                            <div className="card-body">
                                <h2 className="card-title">{post.title}</h2>
                                <time className="font-mono italic">{(new Date(post.publishedAt)).toLocaleDateString()}</time>
                                <p className="break-words">{truncatePostBody(post.body[0].children[0].text, 200)}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <CarouselNavButton direction='right' targetId='posts-carousel' />
        </div>
    )
}
