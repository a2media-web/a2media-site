export const TESTIMONIAL_VIDEO_ID = "ssz1fkb6lu";

export type Quote = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export const QUOTES: Quote[] = [
  {
    quote:
      "Very few people understand video and marketing as much as A2 Media. They don't just produce, they think strategically about every piece of content.",
    name: "Tobi Oluwole",
    role: "CEO, Magnate · 300K+ LinkedIn Followers",
    avatar:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/68a31f15cb721ef5a93c8741_zobi1kSGMj5s0f0ZI8vLyfW2jw.jpeg",
  },
  {
    quote:
      "A2 Media is one of the best video agencies we've ever worked with. They understood our product, our audience, and delivered content that actually moved the needle.",
    name: "Madeleine Work",
    role: "Sr. Product Marketing Manager, Chili Piper",
    avatar:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/68ffe07880d0ae5c085ec9e1_1758139797919.png",
  },
  {
    quote:
      "Working with A2 Media completely changed how we approach video. They brought a level of strategy and execution we hadn't seen from any other agency.",
    name: "Martin",
    role: "Owner, CEG Consult",
    avatar:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/699505f0ef9da222e04efd93_1741721282818.jpeg",
  },
];

export const ambientSrc = (id: string) =>
  `https://fast.wistia.net/embed/iframe/${id}?autoPlay=true&muted=true&endVideoBehavior=loop&playButton=false&smallPlayButton=false&fullscreenButton=false&playbar=false&volumeControl=false&controlsVisibleOnLoad=false&seo=false&videoFoam=true`;

export const lightboxSrc = (id: string) =>
  `https://fast.wistia.net/embed/iframe/${id}?autoPlay=true&seo=false&videoFoam=true`;
