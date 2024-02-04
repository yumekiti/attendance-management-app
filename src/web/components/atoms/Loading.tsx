import React, { FC } from "react";
import { Spin } from "antd";

type Props = {
  spinning: boolean;
};

const Component: FC<Props> = ({ spinning }) => {
  return <Spin spinning={spinning} tip="Loading" size="large" fullscreen />;
};

export default Component;
