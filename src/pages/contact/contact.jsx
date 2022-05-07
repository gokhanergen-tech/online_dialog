import React from "react";
import Content from "../../components/content_base/content";
import styles from "./contact.module.scss";

const Contact = () => {
  const mail = "online_office@guncetek.com";
  document.title="Contact"
  return (
    <Content>
      <div className={"row "}>
        <h3 className={"text-center "}>
          <b>Contact</b>
        </h3>
        <div className={"text-center my-4 " + styles.follow_us}>Follow US</div>
        <div className={"d-flex justify-content-center gap-5 " + styles.icons}>
          <a
            href={"https://www.facebook.com"}
            className={`${"rounded-circle"}  ${styles.social_span}  ${
              styles.facebook
            }`}
          >
            <img className={"mx-0"} src={"/icons/facebook.svg"} alt="" />
          </a>
          <a
            href={"https://www.instagram.com"}
            className={`${"rounded-circle"}  ${styles.social_span}  ${
              styles.instagram
            }`}
          >
            <img className={"mx-0"} src={"/icons/instagram.svg"} alt="" />
          </a>
          <a
            href={"https://www.twitter.com"}
            className={`${"rounded-circle"}  ${styles.social_span}  ${
              styles.twitter
            }`}
          >
            <img className={"mx-0"} src={"/icons/twitter.svg"} alt="" />
          </a>
          <a
            href={"https://www.linkedin.com"}
            className={`${"rounded-circle"}  ${styles.social_span}  ${
              styles.linkedin
            }`}
          >
            <img className={"mx-0"} src={"/icons/linkedin.svg"} alt="" />
          </a>
        </div>
        <div className={"row mt-5 "}>
          <div className="col-1 offset-3 p-1 py-0 ">
            <b>Adress</b>
          </div>

          <div className="col-6 p-3 py-0 ">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </div>
        </div>
        <div className={"row mt-2 "}>
          <div className="col-1 offset-3 p-1 py-0 ">
            <b>Telefon</b>
          </div>

          <div className="col-6 p-1 py-0 px-3 ">
            <a className={styles.aTag} href={"+905000000000"}>
              {"+90 500 000 00 00"}
            </a>
          </div>
        </div>
        <div className={"row mt-2 "}>
          <div className="col-1 offset-3 p-1 py-0 ">
            <b>Mail</b>
          </div>

          <div className="col-6 p-1 py-0 px-3 ">
            <a className={styles.aTag} href={"mailto:" + mail}>
              {mail}{" "}
            </a>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Contact;
