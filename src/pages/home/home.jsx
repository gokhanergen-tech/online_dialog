import React from "react";
import Button from "../../components/button/button";
import Content from "../../components/content_base/content";
import ServiceItem from "../../components/service_item/service_item";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.scss";

const Home = () => {
  const history = useNavigate();

  document.title="Home"

  function onClick() {
    history("/login");
  }
  
  return (
    <Content>
      <div className={"row m-0 px-0 "}>
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
        <div className="row d-flex  justify-content-center ">
          <div className="col-sm-7 col-12 text-center">
            <Button
              value={"Sing in"}
              onClick={onClick}
              customClassName={""}
            ></Button>
          </div>
          <div className="col-sm-7 col-12 text-center mt-4">
            <p>
              İf you have an account,{" "}
              <span onClick={()=>history("/login")} className={styles.aTag}>sign in</span>
            </p>
          </div>
          <div className="col-sm-7 col-12 text-center mt-4 ">
            <p>
              You can read our{" "}
              <span onClick={()=>history("/policy")} className={styles.aTag}>policy</span>
            </p>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Home;
