import { refreshPodcastEpisodes } from '../src/lib/podcast';

const { episodes, live } = await refreshPodcastEpisodes();
for (const episode of episodes) {
	console.log(`${episode.published}  ${episode.id}  ${episode.title}`);
}
if (!live) {
	console.error('No live YouTube source responded. The committed cache was left unchanged.');
	process.exit(1);
}
