type JsonLdProps = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE_URL = "https://robertleggett.com.au";

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Robert Leggett",
        url: SITE_URL,
        description:
          "Technology strategist, cloud architect, and engineering leader specialising in AI platforms, cloud-native architecture, and platform engineering.",
        author: personSchema(),
      }}
    />
  );
}

export function PersonSchema() {
  return <JsonLd data={personSchema()} />;
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Robert Leggett",
    url: SITE_URL,
    image: `${SITE_URL}/avatar/headshot.png`,
    jobTitle: "Cloud Architect & Engineering Leader",
    knowsAbout: [
      "Cloud Architecture",
      "AI Platforms",
      "Platform Engineering",
      "AWS",
      "GCP",
      "Azure",
      "Kubernetes",
      "Infrastructure as Code",
    ],
    sameAs: ["https://github.com/Rob-Leggett"],
  };
}

export function articleSchema({
  title,
  description,
  slug,
  date,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}/`,
    datePublished: new Date(date).toISOString(),
    dateModified: new Date(date).toISOString(),
    image: image ? `${SITE_URL}${image}` : undefined,
    author: {
      "@type": "Person",
      name: "Robert Leggett",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Robert Leggett",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}/`,
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
