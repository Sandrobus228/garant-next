import React from "react";
import Link from "next/link";
import Image from "next/image";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import Text from "@/components/ui/Text/Text";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";
import { ESvgName } from "@/constants/svg-ids.constants";
import { IArticle } from "@/data/articles";
import styles from "./Article.module.scss";

interface Props {
  article: IArticle;
}

const Article = ({ article }: Props) => {
  return (
    <ContentContainer>
      <Substrate withShadow="light" className={styles.substrate}>
      <article className={styles.wrapper}>
        <div className={styles.heroWrapper}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            className={styles.heroImage}
            sizes="100vw"
            priority
          />
        </div>

        <div className={styles.meta}>
          <span className={styles.date}>{article.date}</span>
          <div className={styles.views}>
            <SvgSelector id={ESvgName.EYE} className={styles.eyeIcon} />
            <span>{article.views}</span>
          </div>
        </div>

        <h1 className={styles.title}>{article.title}</h1>

        <div className={styles.body}>
          {article.content.map((block, index) => {
            if (block.type === "h2") {
              return (
                <h2 key={index} className={styles.heading}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={index} className={styles.list}>
                  {block.items.map((item, i) => (
                    <li key={i} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className={styles.paragraph}>
                {block.segments.map((seg, i) =>
                  seg.href ? (
                    <Link key={i} href={seg.href} className={styles.link} target="_blank" rel="noopener noreferrer">
                      {seg.text}
                    </Link>
                  ) : (
                    <span key={i}>{seg.text}</span>
                  )
                )}
              </p>
            );
          })}
        </div>

        <hr className={styles.divider} />

        <Text className={styles.contactText}>
          Остались вопросы? Свяжитесь с нами!{" "}
          <br />
          Позвоните нам или{" "}
          <a
            href="https://wa.me/79407411000"
            target="_blank"
            rel="nofollow noopener"
            className={styles.whatsappLink}
          >
            напишите в <span className={styles.textBold}>WhatsApp</span>
          </a>{" "}
          по номеру:
        </Text>

        <Link href="tel:79407411000" className={styles.phone}>
          +7 940 741 10 00
        </Link>

        <SocialLinks className={styles.socialLinks} />
      </article>
      </Substrate>
    </ContentContainer>
  );
};

export default Article;
