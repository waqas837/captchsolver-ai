export const dynamic = "force-dynamic";
import pool from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Webcam test related blogs",
  description:
    "Blogs and guides about Webcam, microphone and speaker tests and how run tests for your windows pc mac pc and mobile devices.",
  keywords: ["webcam test", "microphone test", "sound test"],
  openGraph: {
    title: "Webcam related blogs",
    description:
      "Blogs and guides about Webcam, microphone and speaker tests and how run tests for your windows pc mac pc and mobile devices",
    type: "website",
    url: "https://webcamtest.live/",
    image: "https://www.yourwebsite.com/og-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Webcam related blogs",
    description:
      "Blogs and guides about Webcam, microphone and speaker tests and how run tests for your windows pc mac pc and mobile devices",
    image: "https://webcamtest.live/twitter-image.jpg",
  },
  robots: "index, follow",
  // canonical: "https://webcamtest.live/canonical-url",
};


const RelatedPosts = async ({ IamNOtInclude }) => {
  async function fetchAllPosts() {
    let connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT * FROM posts ORDER BY date_created_in ASC limit 4"
      );
      return rows;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    } finally {
      connection.release();
    }
  }
  const posts = await fetchAllPosts();
  return (
    <>
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {posts.length > 0 &&
          posts.map(
            (val, index) =>
              val.id !== IamNOtInclude && (
                <div key={index}>
                  <article className="max-w-xs">
                    <Link href={`/guides/${val.slug}`}>
                      <Image
                        alt="later on"
                        src={val.filePath}
                        width={300}
                        height={300}
                        className="mb-5 rounded-lg"
                      />
                    </Link>
                    <span className="mb-3 inline-block rounded bg-primary py-1 text-center text-xs font-semibold leading-loose">
                      {val.date_created_in.toLocaleString()}
                    </span>
                    <div
                      dangerouslySetInnerHTML={{ __html: val.content }}
                      className="mb-4 text-gray-500 dark:text-gray-400"
                    />
                    <span className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500">
                      {val.readTime} mins
                    </span>
                  </article>
                </div>
              )
          )}
      </div>
    </>
  );
};

export default RelatedPosts;
