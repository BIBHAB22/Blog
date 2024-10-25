// app/blog/[id]/page.js
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import ReactMarkdown from 'react-markdown';
import CodeSnippet from '@/components/CodeSnippet'; // Adjust the path if necessary

const BlogPost = async ({ params }) => {
    const { id } = params; // Extract the ID from the URL

    // Fetch the blog post data from Firestore
    const blogDoc = doc(db, 'blogs', id);
    const blogSnapshot = await getDoc(blogDoc);

    if (!blogSnapshot.exists()) {
        return <h1>Blog post not found</h1>; // Handle not found case
    }

    const blogData = blogSnapshot.data();
    const { title, description, author, date, content } = blogData;

    // Custom components for rendering specific Markdown elements
    const renderers = {
        code: ({ inline, children }) => {
            if (inline) {
                return <code className="bg-gray-200 dark:bg-gray-700 rounded px-1">{children}</code>;
            }
            return <CodeSnippet code={children} />;
        },
    };

    return (
        <div className="flex-col items-center justify-center p-4 w-3/5">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="mb-4">{description}</p>
            <div className="text-sm mb-4">
                <span>By {author}</span> |{' '}
                <span>
                    {new Date(date.seconds * 1000).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}
                </span>
            </div>
            <ReactMarkdown components={renderers} className="">
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default BlogPost;
