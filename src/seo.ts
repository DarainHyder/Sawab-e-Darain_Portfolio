/* Machine-readable views of the portfolio, generated at build time from the same data the page renders. */
import profileImage from "@/assets/sawabedararin.jpg";
import { ABOUT, CERTS, LINKS, PROFILE, PROJECTS, STACK, TOOLS, WORK } from "@/components/term/data";

const SITE = PROFILE.site;
const abs = (path: string) => new URL(path, `${SITE}/`).href;

const KNOWS_ABOUT = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Large Language Models",
  "Multi-Agent Systems",
  "MLOps",
  "Data Engineering",
  "ETL/ELT Pipelines",
  "Python",
  "PyTorch",
  "Scikit-Learn",
  "Hugging Face Transformers",
  "FastAPI",
  "Docker",
  "SQL",
  "Pandas",
  "NumPy",
];

/** schema.org graph: the site, the profile page, the person and their projects. */
export function jsonLd(today: string) {
  const person = `${SITE}/#person`;
  const website = `${SITE}/#website`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": website,
        url: `${SITE}/`,
        name: `${PROFILE.name} | ${PROFILE.title}`,
        inLanguage: "en",
        publisher: { "@id": person },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE}/#profile`,
        url: `${SITE}/`,
        name: `${PROFILE.name} | ${PROFILE.title} Portfolio`,
        isPartOf: { "@id": website },
        mainEntity: { "@id": person },
        dateModified: today,
      },
      {
        "@type": "Person",
        "@id": person,
        name: PROFILE.name,
        alternateName: [PROFILE.shortName, PROFILE.handle],
        jobTitle: PROFILE.title,
        description: PROFILE.summary,
        url: `${SITE}/`,
        image: abs(profileImage),
        email: `mailto:${LINKS.email}`,
        address: { "@type": "PostalAddress", addressLocality: PROFILE.education.city, addressCountry: "PK" },
        worksFor: { "@type": "Organization", name: PROFILE.employer },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: PROFILE.education.school,
          address: { "@type": "PostalAddress", addressLocality: PROFILE.education.city, addressCountry: "PK" },
        },
        knowsAbout: KNOWS_ABOUT,
        knowsLanguage: PROFILE.languages,
        sameAs: [LINKS.github, LINKS.linkedin, LINKS.fiverr, LINKS.upwork],
        hasCredential: CERTS.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: c.title,
          credentialCategory: "certificate",
          recognizedBy: { "@type": "Organization", name: c.issuer },
          ...(c.url ? { url: c.url } : {}),
        })),
      },
      ...PROJECTS.map((p) => ({
        "@type": "SoftwareSourceCode",
        "@id": `${SITE}/#project-${p.slug}`,
        name: p.title,
        description: p.description,
        url: p.live,
        codeRepository: p.code,
        keywords: p.tech.join(", "),
        author: { "@id": person },
      })),
    ],
  };
}

/** Plain-language profile for LLMs, following the llms.txt convention (llmstxt.org). */
export function llmsTxt() {
  const lines = [
    `# ${PROFILE.name}`,
    "",
    `> ${PROFILE.summary}`,
    "",
    `Also known as ${PROFILE.shortName} (online handle: ${PROFILE.handle}). Portfolio: ${SITE}/`,
    "",
    "## About",
    "",
    ABOUT.intro,
    "",
    ...ABOUT.blocks.flatMap(([, text]) => [text, ""]),
    "## Experience",
    "",
    ...WORK.map((w) => `- **${w.role}, ${w.company}** (${w.location}, ${w.period}): ${w.description}`),
    "",
    "## Projects",
    "",
    ...PROJECTS.map((p) => `- [${p.title}](${p.live}): ${p.description} Stack: ${p.tech.join(", ")}. Source: ${p.code}`),
    "",
    "## Skills",
    "",
    ...STACK.map((g) => `- ${g.group}: ${g.items.map((s) => s.name).join(", ")}`),
    `- tools: ${TOOLS.join(", ")}`,
    "",
    "## Education",
    "",
    `- ${PROFILE.education.degree}, ${PROFILE.education.school}, ${PROFILE.education.city} (${PROFILE.education.years})`,
    "",
    "## Leadership",
    "",
    ...PROFILE.leadership.map((l) => `- ${l}`),
    "",
    "## Certifications",
    "",
    ...CERTS.map((c) => `- ${c.title}, ${c.issuer} (${c.year})${c.url ? `: ${c.url}` : ""}`),
    "",
    "## Contact",
    "",
    `- Email: ${LINKS.email}`,
    `- Location: ${LINKS.location}`,
    `- [Resume (PDF)](${abs(LINKS.resume)})`,
    `- [GitHub](${LINKS.github})`,
    `- [LinkedIn](${LINKS.linkedin})`,
    `- [Hire on Fiverr](${LINKS.fiverr}) (gig: ${LINKS.fiverrGig})`,
    `- [Hire on Upwork](${LINKS.upwork})`,
    "",
  ];
  return lines.join("\n");
}

export function sitemapXml(today: string) {
  const url = (loc: string, priority: string) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    url(`${SITE}/`, "1.0"),
    url(abs(LINKS.resume), "0.6"),
    "</urlset>",
    "",
  ].join("\n");
}
