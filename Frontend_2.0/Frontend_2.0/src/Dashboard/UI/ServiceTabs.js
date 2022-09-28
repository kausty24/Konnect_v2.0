import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CompletedTable from "./CompletedTable";
import RequestTable from "./RequestTable";
import PendingTable from "./PendingTable";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";

function ServiceTabs(props) {
  return (
    <Tabs
      defaultActiveKey={props.data.map((item) => item.id)[0]}
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      {props.data.map((item) => {
        const label = (
          <span>
            {item.serviceType}
            {/*  <Badge bg="secondary">New</Badge> */}
          </span>
        );
        return (
          <Tab eventKey={item.id} title={label}>
            {props.table === "completed" && <CompletedTable service={item} />}
            {props.table === "request" && <RequestTable service={item} />}
            {props.table === "pending" && <PendingTable service={item}/>}
          </Tab>
        );
      })}
    </Tabs>
  );
}

export default ServiceTabs;







/*
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CompletedTable from "./CompletedTable";
import PendingTable from "./PendingTable";

function ServiceTabs(props) {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      {props.data.map((item) => {
        return (
          <Tab eventKey={item.id} title={item.serviceType}>
            {props.renderComponant === "completed" ? <CompletedTable service={item} /> : props.renderComponant === "pending"? <PendingTable service={item}/> : <CompletedTable service={item} />}
            
          </Tab>
        );
      })}
    </Tabs>
  );
}

export default ServiceTabs;
*/