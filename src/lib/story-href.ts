/** Podcast stories live at /podcast/<slug>. That URL is the only public copy. */
export function storyHref(post: { id: string; data: { category: string } }) {
	return post.data.category === 'podcast' ? `/podcast/${post.id}` : `/blog/${post.id}`;
}
