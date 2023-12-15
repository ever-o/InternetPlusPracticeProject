// todo: 接口定义，接口调用，有两个接口，一个是开始分析需要进行接口调用，二是点击标题按钮后需要进行接口调用获取内容

import React, { useState } from 'react';
import { Input, Button, Table, Spin, Alert, Modal, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import './index.scss'
import { getContent, getInfo } from '../../api/main';

const Main = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = React.useState('')

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAnalysis = async () => {
    setLoading(true);
    setError(null);

    // 模拟后端请求和结果
    // todo1: 修改为实际接口获取的数据
    const { info: result } = await getInfo({ content: inputText })
    console.log(result)
    // const result = [
    //   { id: 1, title: 'Item 1', similarity: 'Indicator A' },
    //   { id: 2, title: 'Item 2', similarity: 'Indicator C' },
    // ];
    setLoading(false);
    setAnalysisResult(result);
  };

  const handleTitleClick = async (text, record) => {
    setModalTitle(text)
    const { content, title } = await getContent(record.id)
    title && setModalTitle(title)
    setModalContent(content);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a onClick={() => handleTitleClick(text, record)}>{text}</a>
      ),
    },
    {
      title: '相似度',
      dataIndex: 'similarity',
      key: 'similarity',
    },
  ];

  return (
    <Layout style={{
      padding: "15px",
      height: "95vh"
    }}>
      <Header style={{
        background: "white",
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
      }}>
        <h1>外规内化分析系统</h1>
      </Header>
      <Content
        style={{
          background: "white",
          marginTop: "10px"
        }}
      >
        <div className='analyseArea'>
          <div className='title'>
            <span><h3>分析内容：</h3></span>
            <div>
              <Button type="primary" onClick={handleAnalysis}>
                开始分析
              </Button>
              {loading && <Spin />}
            </div>
          </div>
          <Input.TextArea
            placeholder="输入外规内容"
            value={inputText}
            onChange={handleInputChange}
            autoSize={{ minRows: 12, maxRows: 15 }} // 自动调整文本域大小，最小 3 行，最大 6 行
          />

        </div>
        <div className='resultArea'>
          <h3>分析结果：</h3>
          <Table
            dataSource={analysisResult}
            columns={columns}
            pagination={false}
            style={{ marginTop: '20px' }}
          />
        </div>
        <Modal
          title={modalTitle}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={"70vw"}
        >
          {modalContent}
        </Modal>
        {error && <Alert message={error} type="error" />}
      </Content>
    </Layout>
  );
};

export default Main;
