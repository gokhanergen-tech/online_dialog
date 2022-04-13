import React from "react";
import Content from "../../components/content_base/content";

const About = () => {
  return (
    <Content>
      <div className={"row d-flex   mb-5"}>
        <h3 className={"text-center"}>
          {" "}
          <b>About Us</b>
        </h3>
        <div className={"row  mt-5 justify-content-center"}>
          <p className={"w-75 p-5 "}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </Content>
  );
};

export default About;
