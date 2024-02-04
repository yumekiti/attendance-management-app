import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Card, Input, Flex, Space, Modal } from "antd";
import { useMutation, useQuery, gql } from "@apollo/client";
import { createUserMutation, updateUserMutation } from "../../mutations/user";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Component = () => {
  const [room, setRoom] = useState<string>("");
  const [modal, contextHolder] = Modal.useModal();
  const handleSave = () => {};

  return (
    <Card title="部屋の追加">
      <Space size="middle" direction="vertical" style={{ width: "100%" }}>
        {/* 学籍番号 */}
        <Flex gap="small" justify="center" align="center">
          <label style={{ whiteSpace: "nowrap", width: "120px" }}>
            学籍番号
          </label>
          <Input
            placeholder="学籍番号"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </Flex>
        <Button block type="primary" onClick={handleSave}>
          保存
        </Button>
      </Space>
      {contextHolder}
    </Card>
  );
};

export default Component;
