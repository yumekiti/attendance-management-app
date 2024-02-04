import React, { ChangeEvent, useState } from "react";
import { Button, Flex, Input } from "antd";
import Search from "../molecules/Search";
import { Link } from "react-router-dom";

const Component = () => {
  const [room, setRoom] = useState<string>("");

  const handleonChanged = (e: ChangeEvent<HTMLInputElement>) => {
    // 数字だけを許可
    const reg = /^[0-9]+$/;
    if (e.target.value === "" || reg.test(e.target.value)) {
      setRoom(e.target.value);
    }
  };

  return (
    <Flex wrap="wrap" gap="small">
      <Input
        placeholder="教室名"
        value={room}
        count={{
          show: true,
          max: 4,
        }}
        maxLength={4}
        onChange={handleonChanged}
      />
      <Search />
      <Button block>呼び出す</Button>
      <Link to="/rooms" style={{ width: "100%" }}>
        <Button block>教室を探す</Button>
      </Link>
      <Link to="/settings" style={{ width: "100%" }}>
        <Button block>設定</Button>
      </Link>
    </Flex>
  );
};

export default Component;
