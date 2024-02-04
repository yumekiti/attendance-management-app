import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Table, Flex, Select } from "antd";
import { formatDate } from "../../libs/format";

const Component = () => {
  const [bodys, setBodys] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);

  const columns = [
    {
      title: "出席番号",
      dataIndex: ["user", "attendance_number"],
      key: "attendance_number",
      sorter: (a: any, b: any) =>
        a.user.attendance_number - b.user.attendance_number,
    },
    {
      title: "呼び出し中",
      dataIndex: ["user", "is_calling"],
      key: "is_calling",
      render: (text: boolean) => (text ? "呼び出し中" : "待機中"),
    },
    {
      title: "クラス名",
      dataIndex: ["user", "class_name"],
      key: "class_name",
    },
    {
      title: "ユーザ名",
      dataIndex: ["user", "username"],
      key: "username",
    },
    {
      title: "教室名",
      dataIndex: ["room", "name"],
      key: "room",
      sorter: (a: any, b: any) => a.room.name.localeCompare(b.room.name),
    },
    {
      title: "学籍番号",
      dataIndex: ["user", "school_number"],
      key: "school_number",
      sorter: (a: any, b: any) => a.user.school_number - b.user.school_number,
    },
    {
      title: "入室日時",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a: any, b: any) => a.created_at.localeCompare(b.created_at),
      render: (text: string) => formatDate(text),
    },
    {
      title: "更新日時",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: (a: any, b: any) => a.updated_at.localeCompare(b.updated_at),
      render: (text: string) => formatDate(text),
    },
  ];

  const { loading, error, data } = useQuery(gql`
    query list {
      userLocations {
        id
        room {
          name
        }
        user {
          school_number
          username
          class_name
          attendance_number
          is_calling
        }
        created_at
        updated_at
      }
    }
  `);

  const handleChange = (value: any) => {
    if (value.length === 0) {
      setBodys(data.userLocations);
      return;
    }
    const newBodys = data.userLocations.filter((body: any) => {
      if (
        value.includes(body.user.class_name) ||
        value.includes(body.room.name)
      ) {
        return body;
      }
    });
    setBodys(newBodys);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (data.userLocations.length === 0) {
    return <p>データがありません</p>;
  }

  if (bodys.length === 0) {
    setBodys(data.userLocations);
  }

  bodys.forEach((body) => {
    // class_name
    const class_name = body.user.class_name;
    if (!options.find((option) => option.value === class_name)) {
      setOptions([...options, { label: class_name, value: class_name }]);
    }
    // room_name
    const room_name = body.room.name;
    if (!options.find((option) => option.value === room_name)) {
      setOptions([...options, { label: room_name, value: room_name }]);
    }
  });

  return (
    <Flex wrap="wrap" gap="small">
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        onChange={handleChange}
        options={options}
      />
      <Table
        dataSource={bodys}
        columns={columns}
        rowKey="id"
        scroll={{ x: 900 }}
        size="small"
      />
    </Flex>
  );
};

export default Component;
