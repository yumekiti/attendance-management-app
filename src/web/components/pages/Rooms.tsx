import React, { useState } from "react";
import Layout from "../templates/Layout";
import { Row, Col, Button, Card, List } from "antd";
import LocationTable from "../organisms/LocationTable";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { formatDate } from "../../libs/format";

const Component = () => {
  const [bodys, setBodys] = useState<any[]>([]);
  const { loading, error, data } = useQuery(gql`
    query list {
      userLocations {
        room {
          name
          created_at
          updated_at
        }
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (data.userLocations.length === 0) {
    return <p>データがありません</p>;
  }

  if (bodys.length === 0) {
    setBodys(data.userLocations);
  }

  return (
    <Layout>
      <Row gutter={16}>
        <Col span={6}>
          <Link to="/" style={{ width: "100%" }}>
            <Button block>もどる</Button>
          </Link>
        </Col>
        <Col span={18}>
          <Card title="教室一覧">
            <List
              bordered
              dataSource={bodys}
              renderItem={(item: any) => (
                <List.Item>
                  <span>{item.room.name}</span>
                  <span>{formatDate(item.room.updated_at)}</span>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Component;
