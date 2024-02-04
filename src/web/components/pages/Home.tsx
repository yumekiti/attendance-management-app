import React from "react";
import Layout from "../templates/Layout";
import { Row, Col } from "antd";
import LocationTable from "../organisms/LocationTable";
import Tools from "../organisms/Tools";

const Component = () => {
  return (
    <Layout>
      <Row gutter={16}>
        <Col span={18}>
          <LocationTable />
        </Col>
        <Col span={6}>
          <Tools />
        </Col>
      </Row>
    </Layout>
  );
};

export default Component;
