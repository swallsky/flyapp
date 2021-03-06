import React,{useState,useEffect} from 'react';
import { List,PageHeader,Image } from 'antd';
import request from '../../../request';

export default function DataList() {
  const [data, setData] = useState([]);
  const [ftotal, setFtotal] = useState(0);

  useEffect(() => {
    request.get('/api/upload/filelist').then(data => {
      setData(data.data);
      setFtotal(data.data.length); //获取总文件个数
    });
  }, []);

  //打开文件
  async function openFile(e){
    let filePath = e.target.innerText;
    window.electronApi.openFile(filePath);  //打开文件
  }

  return (
    <PageHeader
      title="文件列表"
      subTitle={`共计${ftotal}个文件`}
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
                  <Image width={60} height={60} src={`data:image/jpeg;base64,${item.blobfile}`} />
                }
                title={<div style={{cursor:'default'}}>{item.filename}</div>}
                description={<div onClick={openFile} style={{cursor:'default'}}>{item.filepath}</div>}
              />
            </List.Item>
          )
        }}
      />
    </PageHeader>
  );
}