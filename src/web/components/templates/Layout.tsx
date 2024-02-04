import React, { memo, CSSProperties, useEffect, ReactNode } from "react";

import { Layout, Flex } from "antd";
import Footer from "../organisms/Footer";
import { useDispatch } from "react-redux";
import { setSystem } from "../../features/systemInfo";
import Loading from "../atoms/Loading";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

type Props = {
  children: ReactNode;
};

const Component: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const { system } = useSelector((state: RootState) => state.systemInfo);
  const [loading, setLoading] = React.useState(!system);
  const { Content } = Layout;

  const layoutStyle: CSSProperties = {
    width: "100%",
    height: "100vh",
    backgroundColor: "#D8EEFE",
  };

  const contentStyle: CSSProperties = {
    padding: "24px",
  };

  const getSystem = async () => {
    const response = await (window as any).si.system();
    dispatch(setSystem(response));
    setLoading(false);
  };

  useEffect(() => {
    if (system) return;
    getSystem();
  }, [loading]);

  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={layoutStyle}>
        <Content style={contentStyle}>{system && children}</Content>
        <Footer />
        <Loading spinning={loading} />
      </Layout>
    </Flex>
  );
};

export default memo(Component);
