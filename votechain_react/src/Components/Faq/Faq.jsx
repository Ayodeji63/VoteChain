import React from "react";
import "./Faq.css";
import { Collapse } from "antd";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const { Panel } = Collapse;

const text = (
  <p className="collapse-text">
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);

const Faq = () => {
  return (
    <div className="faq-container" id="faqs">
      <div className="faq-text">
        <h4>Frequently asked questions</h4>
        <p>Everything you need to know about the product and billing.</p>
      </div>
      <div className="collapse-container">
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIconPosition={"end"}
          expandIcon={({ isActive }) =>
            isActive ? (
              <AiOutlineMinusCircle className="collapse-icon" />
            ) : (
              <AiOutlinePlusCircle className="collapse-icon" />
            )
          }
        >
          <Panel
            className="collapse"
            header="What is your cancellation policy?"
            key="1"
          >
            {text}
          </Panel>
          <Panel
            className="collapse"
            header="Is there a free trial available?"
            key="2"
          >
            {text}
          </Panel>
          <Panel
            className="collapse"
            header="Can I change my plan later?"
            key="3"
          >
            {text}
          </Panel>
          <Panel
            className="collapse"
            header="Can other info be added to an invoice?"
            key="4"
          >
            {text}
          </Panel>
          <Panel className="collapse" header="How does billing work?" key="5">
            {text}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default Faq;
