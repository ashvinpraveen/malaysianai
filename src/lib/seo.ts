export interface ShareImage {
	src: string;
	width?: number;
	height?: number;
	alt?: string;
}

export interface PageMetadata {
	title: string;
	description: string;
	image?: ShareImage;
	noindex?: boolean;
	article?: {
		published: Date;
		modified?: Date;
		author: string;
		authorType: 'Person' | 'Organization';
	};
}

export const defaultShareImage: ShareImage = {
	src: '/images/malaysian-ai-kl-hero-restored-1920.webp',
	width: 1920,
	height: 1080,
	alt: 'An illustrated Kuala Lumpur skyline for Malaysian AI',
};

export function canonicalURL(pathname: string, site: URL) {
	return new URL(pathname.replace(/\/+$/, '') || '/', site);
}

// Prevent content containing </script> from ending the JSON-LD element.
export function serializeJsonLd(value: unknown) {
	return JSON.stringify(value).replace(/</g, '\\u003c');
}
