import React from "react";
import Layout from "../templates/Layout";
import { Row, Col, Button, Flex } from "antd";
import { Link } from "react-router-dom";
import AddRoom from "../organisms/AddRoom";

const Component = () => {
  return (
    <Layout>
      <Row gutter={16}>
        <Col span={6}>
          <Flex wrap="wrap" gap="small">
            <Link to="/" style={{ width: "100%" }}>
              <Button block>もどる</Button>
            </Link>
          </Flex>
        </Col>
        <Col span={18}>
          <AddRoom />
        </Col>
      </Row>
    </Layout>
  );
};

export default Component;
