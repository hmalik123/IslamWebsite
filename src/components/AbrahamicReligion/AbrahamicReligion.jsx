import React from 'react';
import styles from './AbrahamicReligion.module.css';

const AbrahamicReligion = () => {
  const religions = {
    overview: {
      title: "Abrahamic Religions",
      content: "Abrahamic religions are those faiths that trace their origins to the patriarch Abraham. The three major Abrahamic religions - Judaism, Christianity, and Islam - share many commonalities including monotheism, prophetic tradition, and ethical teachings, while maintaining their unique theological perspectives and practices."
    },
    judaism: {
      title: "Judaism",
      content: "Judaism is the oldest Abrahamic faith, founded around 2000 BCE. It centers on the covenant between God and the Jewish people, with the Torah as its foundational text. Judaism emphasizes ethical monotheism and observance of divine law (halakha).",
      timeline: "c. 2000 BCE - Present"
    },
    christianity: {
      title: "Christianity",
      content: "Christianity emerged in the 1st century CE, founded on the life and teachings of Jesus Christ, whom Christians believe to be the Son of God and the Messiah prophesied in Jewish tradition. The New Testament, along with the Hebrew Bible (Old Testament), forms the Christian scriptures.",
      timeline: "c. 30-33 CE - Present"
    },
    islam: {
      title: "Islam",
      content: "Islam was founded in the 7th century CE through revelations received by the Prophet Muhammad. Muslims believe the Quran is the literal word of God (Allah) as revealed to Muhammad. Islam acknowledges earlier prophets, including Abraham, Moses, and Jesus, considering Muhammad the final prophet who completed God's message to humanity.",
      timeline: "610-632 CE - Present",
      keyBeliefs: [
        "Tawhid (Oneness of God)",
        "Prophethood and revelation",
        "Angels and divine decree",
        "Day of Judgment and afterlife",
        "The Five Pillars: Shahada (faith declaration), Salat (prayer), Zakat (charity), Sawm (fasting), Hajj (pilgrimage)"
      ],
      connection: "Islam explicitly recognizes its connection to earlier Abrahamic faiths. Muslims consider Abraham (Ibrahim) a prophet and hanif (true monotheist). The Kaaba in Mecca is believed to have been built by Abraham and his son Ishmael, from whom Arabs trace their lineage. The Quran refers to Jews and Christians as 'People of the Book,' acknowledging their shared scriptural heritage."
    }
  };

  return (
    <div className={styles.AbrahamicContainer}>
      <h1 className={styles.mainTitle}>The Family of Abrahamic Religions</h1>
      
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          <div className={`${styles.timelineMarker} ${styles.judaismMarker}`}><span>Judaism</span></div>
          <div className={`${styles.timelineMarker} ${styles.christianityMarker}`}><span>Christianity</span></div>
          <div className={`${styles.timelineMarker} ${styles.islamMarker}`}><span>Islam</span></div>
        </div>
      </div>

      {/* Overview Section */}
      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>{religions.overview.title}</h2>
        <div className={styles.sectionContent}>
          <p>{religions.overview.content}</p>
        </div>
      </section>

      {/* Judaism Section */}
      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>{religions.judaism.title}</h2>
        <div className={styles.sectionContent}>
          <p>{religions.judaism.content}</p>
          <p className={styles.timeline}><strong>Timeline:</strong> {religions.judaism.timeline}</p>
        </div>
      </section>

      {/* Christianity Section */}
      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>{religions.christianity.title}</h2>
        <div className={styles.sectionContent}>
          <p>{religions.christianity.content}</p>
          <p className={styles.timeline}><strong>Timeline:</strong> {religions.christianity.timeline}</p>
        </div>
      </section>

      {/* Islam Section */}
      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>{religions.islam.title}</h2>
        <div className={styles.sectionContent}>
          <div className={styles.emphasizedContent}>
            <p>{religions.islam.content}</p>
            <p className={styles.timeline}><strong>Timeline:</strong> {religions.islam.timeline}</p>
            
            <h3 className={styles.subtitle}>Key Beliefs and Practices</h3>
            <ul className={styles.keyPoints}>
              {religions.islam.keyBeliefs?.map((belief, index) => (
                <li key={index}>{belief}</li>
              ))}
            </ul>
            
            <h3 className={styles.subtitle}>Connection to Abrahamic Tradition</h3>
            <p className={styles.connectionText}>{religions.islam.connection}</p>
            
            <div className={styles.islamFeature}>
              <h3>Islam as the Completion of Abrahamic Tradition</h3>
              <p>
                In Islamic theology, Islam is viewed as the restoration of the original, uncorrupted monotheistic faith of Abraham. 
                Muslims believe that Judaism and Christianity originated from divine revelations but that their scriptures were 
                altered over time, while the Quran remains preserved in its original form. The Prophet Muhammad is considered the 
                final messenger in a long line of prophets that includes prominent figures from Jewish and Christian traditions.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.quoteBox}>
          <blockquote>
            "Say, 'We believe in Allah and what has been revealed to us and what was revealed to Abraham, Ishmael, Isaac, Jacob, and the Descendants, and what was given to Moses and Jesus and what was given to the prophets from their Lord. We make no distinction between any of them, and we are Muslims [submitting] to Him.'"
            <cite>— Quran 2:136</cite>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default AbrahamicReligion;