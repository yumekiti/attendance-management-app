import React, { useState } from "react";
import { Modal, Input } from "antd";

const { Search } = Input;

const Component = () => {
  const [modal, contextHolder] = Modal.useModal();
  const onSearch = (value: string) => {
    modal.info({
      title: `Search result for ${value}`,
      content: (
        <div>
          <p>No user found</p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <>
      <Search placeholder="search user" onSearch={onSearch} />
      {contextHolder}
    </>
  );
};

export default Component;
