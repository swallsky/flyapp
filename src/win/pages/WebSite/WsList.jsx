import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { List,PageHeader,Avatar,Button } from 'antd';
import axios from 'axios';

function WsList(props) {
  const [data, setData] = useState([]);
  const [ftotal, setFtotal] = useState(0);

  useEffect(() => {
    axios.get(props.apiDomain+'/api/upload/filelist').then(data => {
      setData(data.data);
      setFtotal(data.data.length); //获取总文件个数
    });
  }, [props]);

  return (
    <PageHeader
      title="登录列表"
      subTitle={`共计${ftotal}个文件`}
      extra={[
        <Button key="add" type="primary">新增</Button>,
      ]}
      ghost={false}
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        style={{
          height:410,
          overflow:'auto'
        }}
        renderItem={item => (
          <List.Item
            actions={[<Button key="edit">修改</Button>,<Button key="edit">登录</Button>]}
          >
              <List.Item.Meta
                avatar={<Avatar src="" />}
                title={<a href="https://ant.design">{item.filename}</a>}
                description={<div style={{cursor:'default'}}>{item.filepath}</div>}
              />
          </List.Item>
        )}
      />
    </PageHeader>
  );
}

//state映射
const mapStateToProps = (state) => {
  return {
    apiDomain: state.apiDomain, //服务端域名
  }
}

export default connect(mapStateToProps)(WsList);