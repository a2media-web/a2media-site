import styles from "./ClientTestimonials.module.css";

const CLIENTS = [
  {
    quote:
      "We saw record YouTube numbers in our first month with a2. They helped us create explainer videos, short-form content, and event assets. The team is fast, clear, and genuinely fun to work with. Best video partner we've had in SaaS.",
    name: "Greg Mares",
    role: "Senior Media Specialist, Okta",
    avatar:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/67f4361b3999513c9390d815_1712899620456-p-130x130q80.jpeg",
  },
  {
    quote:
      "Easily the best video team I've worked with. World-class work, insane turnaround times, and great communication. The team really cares about us and our goals. Feels like working with partners, not vendors.",
    name: "Andrew Jones",
    role: "Director of Marketing, LABL",
    avatar:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/67f4361bd1a25ac6d5020c62_1700705120887-p-130x130q80.jpeg",
  },
  {
    quote:
      "A2 Media turns raw ideas into high-performing content that lands. They're creative, strategic, and a blast to work with. Every project has been smooth, fast, and impactful. Nobody does B2B video better.",
    name: "Shawnie Hamer",
    role: "Director of Brand & Content, Crossbeam",
    avatar:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/67f4361b24f74f27e5a2a996_1719406706007-p-130x130q80.jpeg",
  },
];

export default function ClientTestimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Our Clients Love Us</h2>
        <div className={styles.grid}>
          {CLIENTS.map((c) => (
            <div key={c.name} className={styles.card}>
              <div className={styles.quote}>&ldquo;{c.quote}&rdquo;</div>
              <div className={styles.author}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.avatar} src={c.avatar} alt={c.name} />
                <div>
                  <div className={styles.name}>{c.name}</div>
                  <div className={styles.role}>{c.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
