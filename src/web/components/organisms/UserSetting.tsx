import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Card, Input, Flex, Space, Modal } from "antd";
import { useMutation, useQuery, gql } from "@apollo/client";
import { createUserMutation, updateUserMutation } from "../../mutations/user";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Component = () => {
  const { system } = useSelector((state: RootState) => state.systemInfo);
  const [modal, contextHolder] = Modal.useModal();
  const [id, setId] = useState<string>("");
  const [school_number, setSchoolNumber] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [class_name, setClassName] = useState<string>("");
  const [attendance_number, setAttendanceNumber] = useState<string>("");
  const [updateUser] = useMutation(updateUserMutation);
  const [createUser] = useMutation(createUserMutation);

  const { loading, data, refetch } = useQuery(gql`
    query get {
      userByUuid(uuid: "${system.uuid}") {
        id
        school_number
        username
        class_name
        attendance_number
      }
    }
  `);

  const handleSave = () => {
    if (data) {
      updateUser({
        variables: {
          updateUserInput: {
            id,
            school_number: Number(school_number),
            username,
            class_name,
            attendance_number: Number(attendance_number),
            is_calling: false,
          },
        },
      })
        .then(() => {
          refetch();
          modal.success({
            title: "成功",
            content: "ユーザを更新しました",
          });
        })
        .catch(() => {
          modal.error({
            title: "エラー",
            content: "更新に失敗しました",
          });
        });
    } else {
      createUser({
        variables: {
          createUserInput: {
            school_number: Number(school_number),
            username,
            class_name,
            attendance_number: Number(attendance_number),
            uuid: system.uuid,
          },
        },
      })
        .then(() => {
          refetch();
          modal.success({
            title: "成功",
            content: "ユーザを作成しました",
          });
        })
        .catch(() => {
          modal.error({
            title: "エラー",
            content: "更新に失敗しました",
          });
        });
    }
  };

  useEffect(() => {
    if (!data) return;
    setSchoolNumber(data.userByUuid.school_number);
    setUsername(data.userByUuid.username);
    setClassName(data.userByUuid.class_name);
    setAttendanceNumber(data.userByUuid.attendance_number);
    setId(data.userByUuid.id);
  }, [data]);

  if (loading) return <p>Loading...</p>;

  return (
    <Card title="設定">
      <Space size="middle" direction="vertical" style={{ width: "100%" }}>
        {/* 学籍番号 */}
        <Flex gap="small" justify="center" align="center">
          <label style={{ whiteSpace: "nowrap", width: "120px" }}>
            学籍番号
          </label>
          {!!data ? (
            <span style={{ whiteSpace: "nowrap", width: "100%" }}>
              {school_number}
            </span>
          ) : (
            <Input
              placeholder="学籍番号"
              value={school_number}
              onChange={(e) => setSchoolNumber(e.target.value)}
            />
          )}
        </Flex>
        {/* 名前 username */}
        <Flex gap="small" justify="center" align="center">
          <label style={{ whiteSpace: "nowrap", width: "120px" }}>名前</label>
          <Input
            placeholder="名前"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Flex>
        {/* クラス class_name */}
        <Flex gap="small" justify="center" align="center">
          <label style={{ whiteSpace: "nowrap", width: "120px" }}>クラス</label>
          <Input
            placeholder="クラス"
            value={class_name}
            onChange={(e) => setClassName(e.target.value)}
          />
        </Flex>
        {/* 出席番号 attendance_number */}
        <Flex gap="small" justify="center" align="center">
          <label style={{ whiteSpace: "nowrap", width: "120px" }}>
            出席番号
          </label>
          <Input
            placeholder="出席番号"
            value={attendance_number}
            onChange={(e) => setAttendanceNumber(e.target.value)}
          />
        </Flex>
        <Flex gap="small" justify="center" align="center">
          <label style={{ whiteSpace: "nowrap", width: "120px" }}>UUID</label>
          <span style={{ whiteSpace: "nowrap", width: "100%" }}>
            {system.uuid}
          </span>
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
