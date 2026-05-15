import styles from "./ComparisonTable.module.css";

const ROLES = [
  { role: "5 Senior Video Editors", cost: "$240,000" },
  { role: "1 Content Strategist", cost: "$48,000" },
  { role: "1 Copywriter", cost: "$42,000" },
  { role: "1 Content Creator", cost: "$36,000" },
  { role: "1 Account Manager", cost: "$40,000" },
  { role: "Equipment, Software & AI", cost: "$30,000" },
];

export default function ComparisonTable() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Hire 9 People &amp; Tools. <span>Or Just Us.</span>
          </h2>
          <p className={styles.sub}>
            The cost of building this team yourself vs. working with A2 Media.
          </p>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={`${styles.label} ${styles.dim}`}>Building It In-House (6 Months)</div>
            {ROLES.map((r) => (
              <div key={r.role} className={styles.line}>
                <span className={styles.role}>{r.role}</span>
                <span className={styles.cost}>{r.cost}</span>
              </div>
            ))}
            <div className={styles.total}>
              <span className={styles.totalLabel}>6-month cost</span>
              <span className={`${styles.totalAmount} ${styles.red}`}>$436K+</span>
            </div>
            <div className={styles.note}>Before recruiting, ramp time, and turnover.</div>
          </div>
          <div className={`${styles.card} ${styles.featured}`}>
            <div className={`${styles.label} ${styles.purple}`}>Working With A2 Media (6 Months)</div>
            {ROLES.map((r) => (
              <div key={r.role} className={styles.line}>
                <span className={styles.role}>{r.role}</span>
                <span className={`${styles.cost} ${styles.strike}`}>{r.cost}</span>
              </div>
            ))}
            <div className={styles.total}>
              <span className={styles.totalLabel}>6-month cost</span>
              <span className={`${styles.totalAmount} ${styles.green}`}>$84K</span>
            </div>
            <div className={styles.note}>
              No recruiting. No ramp time. <span className={styles.accent}>Expertise from Day 1.</span>
            </div>
          </div>
        </div>
        <div className={styles.savings}>
          Save over <strong>$352,000</strong>, and start in <strong>48 hours</strong>, not 6 months.
        </div>
      </div>
    </section>
  );
}
