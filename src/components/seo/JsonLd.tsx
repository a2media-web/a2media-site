/**
 * Reusable JSON-LD injector. Renders a <script type="application/ld+json">
 * tag with the supplied schema object(s). Server-rendered, zero JS.
 *
 * Pass either a single object or an array — multiple schemas can ship as one
 * @graph or as separate scripts; both are valid. We use separate scripts so
 * each schema is independently parsed even if one has an issue.
 */
export type JsonLdSchema = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdSchema | JsonLdSchema[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
