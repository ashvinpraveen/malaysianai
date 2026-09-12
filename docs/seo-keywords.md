# SEO keyword targets

Researched on September 12, 2026. The requested phrases are **Malaysian AI**, **Malaysia AI community**, and **Malaysian community**. The last phrase appears in descriptions with AI context because it is otherwise much broader than this site.

The ten additional targets below match the site's existing content and current public search results. They are not a verified top ten by monthly search volume. No Keyword Planner or Search Console volume data was available; the order is not a popularity ranking.

| Search phrase | Relevant content |
| --- | --- |
| Malaysia AI | Homepage and community directory |
| AI community Malaysia | Homepage and About |
| artificial intelligence Malaysia | Homepage and About |
| AI events Malaysia | Homepage events and community stories |
| AI workshops Malaysia | Homepage events and Learn-a-thon story |
| AI meetup Kuala Lumpur | Homepage community directory and events |
| AI hackathon Malaysia | Homepage hackathon events and community directory |
| generative AI Malaysia | Homepage builder communities and Learn-a-thon story |
| AI startups Malaysia | Residency and resident teams |
| AI residency Malaysia | Residency and programme articles |

Research sources support relevance, not search volume:

- [AI Malaysia Kaki](https://aimalaysiakaki.com/) describes a Malaysia AI community offering workshops and meetups.
- [AI Tinkerers Kuala Lumpur](https://kuala-lumpur.aitinkerers.org/) lists local builder meetups, AI events and generative AI sessions.
- [Malaia](https://malaia.net/) describes an AI conference, hackathon and workshops in Kuala Lumpur.
- [Malaysian AI residency](https://www.malaysian.ai/residency) and [resident teams](https://www.malaysian.ai/residents) support the startup and residency targets. Repository content determines what the updated metadata claims.

`src/lib/seo-content.ts` holds search-only titles, descriptions and page-specific keyword lists. `BaseHead.astro` applies them to HTML head metadata and social cards. Organization and WebSite structured data describe the community; BlogPosting keywords match each article. Article headlines retain their editorial titles. Legal pages and the 404 receive no promotional keyword tags.

[Google ignores the keywords meta tag](https://developers.google.com/search/docs/crawling-indexing/special-tags). It is included to record the requested phrases, with no claim of a ranking benefit. Search titles and natural descriptions provide the useful search-facing copy. No hidden keyword text, visible copy, styles or layout were changed. Structured data does not guarantee a ranking improvement or rich result.

To establish a measured top ten later, compare Malaysia-filtered query data in Search Console and Keyword Planner, recording the date range and search volumes before reprioritizing these targets.
