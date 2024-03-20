import { Helmet } from 'react-helmet-async';

interface props {
    title: string,
    content: string,
    href: string,
    crawler?: boolean
}

export function SEOHelper({ title, content, href, crawler = true }: props) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={content} />
            <link rel="canonical" href={href} />
            {!crawler && <meta name="robots" content="noindex" />}
        </Helmet>
    );
}