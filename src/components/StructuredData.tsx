import { toJsonLd } from "@/lib/schema";

type StructuredDataProps = {
  data: object | object[];
  id?: string;
};

/**
 * Renders a JSON-LD <script> tag with schema.org data.
 * Use this inside server or client components to inject structured data
 * for SEO and Knowledge Graph indexing.
 *
 * Multiple JSON-LD blocks on the same page are valid per Google guidelines.
 */
export default function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: toJsonLd(data) }}
    />
  );
}
