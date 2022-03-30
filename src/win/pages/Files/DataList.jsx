import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { List,PageHeader,Image } from 'antd';
import axios from 'axios';

function DataList(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(props.apiDomain+'/api/upload/filelist').then(data => {
      setData(data.data);
    });
  }, [props]);

  return (
    <PageHeader
      title="文件列表"
      subTitle="文件信息列表"
      ghost={false}
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        style={{
          height:410,
          overflow:'auto'
        }}
        renderItem={item => {
          return (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image width={60} height={60} src={(props.apiDomain + "/api/upload/priview?filename=" + item.filename + "&" + Math.random())} />
                }
                title={item.filename}
                description={item.filepath}
              />
            </List.Item>
          )
        }}
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

export default connect(mapStateToProps)(DataList);