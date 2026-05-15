export type Logo = {
  name: string;
  domain?: string;
  src?: string;
  featured?: boolean;
  scale?: number;
  noFilter?: boolean;
};

const WF = "https://cdn.prod.website-files.com/64bfb907363259218e796320";

const INFINITE_LAMBDA_FILE =
  "/logos/" +
  encodeURIComponent(
    "eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvZGQ4YjYxYWQtYWE4MC00MjRkLWExM2EtYTZmZWY3ZTQ1ZGY1L2I3MDk0YjRjLTI3ZGQtNDdkNC05OWQwLTUwNGIwZTFjY2ZiOC5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGg.webp"
  );

export const LOGOS: Logo[] = [
  {
    name: "Shopify",
    domain: "shopify.com",
    src: "/logos/Shopify-com_Logo_1.png",
    featured: true,
    scale: 1.0,
  },
  {
    name: "Okta",
    domain: "okta.com",
    src: `${WF}/65e9e913df3011054a62442e_Okta_Logo_White_Medium.png`,
    featured: true,
    scale: 0.85,
  },
  {
    name: "Crossbeam",
    domain: "crossbeam.com",
    src: `${WF}/66c5f4f2fcc977d035928abc_CB.svg`,
    featured: true,
    scale: 1.1,
  },
  {
    name: "Chili Piper",
    domain: "chilipiper.com",
    src: `${WF}/67f1d717fe36ab2b51b4d2a4_chili%20piper.png`,
    scale: 1.0,
  },
  {
    name: "Close",
    domain: "close.com",
    src: `${WF}/66c5f6a4167c23e7116b4984_close.png`,
    scale: 0.9,
  },
  { name: "Reveal", domain: "reveal.co", src: "/logos/Reveal.png", scale: 1.5 },
  { name: "Sendoso", domain: "sendoso.com", src: "/logos/sendoso-logo.png", scale: 0.8 },
  { name: "Goldcast", domain: "goldcast.io", src: "/logos/Goldcast_idQwXJaBBK_1.png", scale: 1.0 },
  { name: "Warmly", domain: "warmly.ai", src: "/logos/idFho75bLH_1778400941443.png", scale: 0.85 },
  { name: "BlueConic", domain: "blueconic.com", src: "/logos/BlueConic_idjjd1-xqj_0.png", scale: 0.95 },
  { name: "Brainlabs", domain: "brainlabs.com", src: "/logos/Brainlabs_idezU5eZwN_1.png", scale: 1.0 },
  {
    name: "ContactMonkey",
    domain: "contactmonkey.com",
    src: "/logos/ContactMonkey_idN6wjc7fq_0.png",
    scale: 1.3,
  },
  { name: "Cority", domain: "cority.com", src: "/logos/Cority.png", scale: 0.65 },
  { name: "Infinite Lambda", domain: "infinitelambda.com", src: INFINITE_LAMBDA_FILE, scale: 1.94 },
  { name: "Rebuy", domain: "rebuyengine.com", src: "/logos/Rebuy.png", scale: 1.05 },
  { name: "Nice Commerce", domain: "nicecommerce.co", src: "/logos/Nice%20Commerce.png", scale: 1.0 },
  { name: "Treasury4", domain: "treasury4.com", src: "/logos/Treasury4_Logo_1.png", scale: 1.0 },
  { name: "Slate", domain: "slate.so", src: "/logos/Slate.png", scale: 1.0 },
  { name: "UBS", domain: "ubs.com", src: "/logos/UBS.png", scale: 0.95 },
];

export function logoSrc(logo: Logo): string | null {
  return logo.src ?? null;
}
