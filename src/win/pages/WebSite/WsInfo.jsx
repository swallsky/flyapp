import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PageHeader, Descriptions } from "antd";

function WsInfo() {
  useEffect(() => {}, []);

  return (
    <PageHeader title="功能说明" subTitle="功能说明" ghost={false}>
      <Descriptions size="middle" column={1} bordered>
        <Descriptions.Item label="密码保存">
          保存常用项目网站密码
        </Descriptions.Item>
        <Descriptions.Item label="快捷wkgu录">
          一键登录，无须重复输入
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
}

//state映射
const mapStateToProps = (state) => {
  return {
    apiDomain: state.apiDomain, //服务端域名
  };
};

// 事件派发映射: 将reducer中的事件映射成props
const mapDisptchToProps = (dispatch) => {
  return {
    /**
     * 修改后端api地址
     * @param {*} domain
     */
    updateApiDm(domain) {
      const action = { type: "updateApiDomain", apiDomain: domain };
      dispatch(action); // 更新redux
    },
  };
};

export default connect(mapStateToProps, mapDisptchToProps)(WsInfo);
