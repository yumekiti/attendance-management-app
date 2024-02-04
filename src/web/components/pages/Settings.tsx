import React from "react";
import Layout from "../templates/Layout";
import { Row, Col, Button, Flex } from "antd";
import { Link } from "react-router-dom";
import UserSetting from "../organisms/UserSetting";

const Component = () => {
  return (
    <Layout>
      <Row gutter={16}>
        <Col span={6}>
          <Flex wrap="wrap" gap="small">
            <Link to="/" style={{ width: "100%" }}>
              <Button block>もどる</Button>
            </Link>
            <Link to="/room-add" style={{ width: "100%" }}>
              <Button block>部屋の追加</Button>
            </Link>
          </Flex>
        </Col>
        <Col span={18}>
          <UserSetting />
        </Col>
      </Row>
    </Layout>
  );
};

export default Component;
