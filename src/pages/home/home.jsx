import React from "react";
import Button from "../../components/button/button";
import Content from "../../components/content_base/content";
import ServiceItem from "../../components/service_item/service_item";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.scss";

const Home = () => {
  const history = useNavigate();
  function onClick() {
    history("/login");
  }
  return (
    <Content>
      <div className={"row mb-5 m-0 px-0 "}>
        <h3 className={"text-center mb-5 "}>
          {" "}
          <b>Connect to Education</b>
        </h3>
        <div className={"row  m-0  justify-content-center "}>
          <ServiceItem
            imageUrl={"/images/office.png"}
            serviceName={"Office"}
            content={"You can have your own office"}
          />
          <ServiceItem
            imageUrl={"/images/school.png"}
            serviceName={"School"}
            content={"Our goal is that you have a good class"}
          />
        </div>
        <div className="row d-flex  justify-content-center my-4 ">
          <div className="col-7 text-center">
            <Button
              value={"Sing up"}
              onClick={onClick}
              customClassName={""}
            ></Button>
          </div>
          <div className="col-7 text-center mt-4">
            <p>
              İf you have an account,{" "}
              <a className={styles.aTag} href="/login">
                sign in
              </a>
            </p>
          </div>
          <div className="col-7 text-center mt-4 ">
            <p>
              You can read our{" "}
              <a className={styles.aTag} href="/policy">
                {" "}
                policy{" "}
              </a>
            </p>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Home;
