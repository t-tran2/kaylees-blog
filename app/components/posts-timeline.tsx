import { SanityDocument } from "next-sanity";
import Link from "next/link";

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

export default function PostsTimeline({ posts }) {
    return (
        <>
            <h1 className="text-4xl font-bold mb-8 mt-8">Posts</h1>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                {posts.map((post: SanityDocument, index: number) => {
                    const isLastPost = posts.length - 1 !== index;
                    return (
                        <li key={post._id}>
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className={"mb-10 " + (index % 2 === 0 ? "timeline-start md:text-end" : "timeline-end")}>
                                <Link href={"/" + post.slug.current} className="hover:underline">
                                    <time className="font-mono italic">{(new Date(post.publishedAt)).toLocaleDateString()}</time>
                                    <div className="text-lg font-black">{post.title}</div>
                                    {truncatePostBody(post.body[0].children[0].text, 50)}
                                </Link>
                            </div>
                            {isLastPost && <hr />}
                        </li>
                    )
                })
                }
            </ul>
        </>

    )
}
