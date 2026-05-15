import styles from "./Editors.module.css";

const EDITORS = [
  {
    name: "Will Smith",
    role: "Actor & Creator",
    subs: "10.8M Subscribers",
    photo:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/685583659fd2cbacac97456d_will-smith-new-headshot-credit-lorenzo-agius_wide-e7290985cc97649f61eb4c28e84d6b272f69202d.jpg",
  },
  {
    name: "Steven Bartlett",
    role: "Diary of a CEO",
    subs: "14.7M Subscribers",
    photo:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/685575c9a91573d1c350f372_Steven-Bartlett-Crop-3.png",
  },
  {
    name: "Ali Abdaal",
    role: "Productivity Creator",
    subs: "6.3M Subscribers",
    photo:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/6855796f57835e2853587700_Ali_Abdaal_m3ulli.jpg",
  },
];

export default function Editors() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The Editors Behind</p>
        <h2 className={styles.heading}>The voices you trust</h2>
        <p className={styles.sub}>
          <span>We work with editors that have shaped content viewed by millions.</span>
          <span>Now they build video systems for B2B teams.</span>
        </p>
        <div className={styles.grid}>
          {EDITORS.map((e) => (
            <div key={e.name} className={styles.card}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.photo} src={e.photo} alt={e.name} />
              <div className={styles.body}>
                <div className={styles.name}>{e.name}</div>
                <div className={styles.role}>{e.role}</div>
                <div className={styles.subs}>{e.subs}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
