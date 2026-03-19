import type { Post } from "@/content/mock/types";
import { NewsCard } from "./NewsCard";

type NewsListProps = {
  posts: Post[];
  title?: string;
};

export function NewsList({ posts, title }: NewsListProps) {
  return (
    <section className="animate-reveal space-y-5">
      {title ? <h2 className="text-2xl font-semibold">{title}</h2> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post, index) => (
          <NewsCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}
