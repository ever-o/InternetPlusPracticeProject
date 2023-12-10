// todo: 接口定义，接口调用，有两个接口，一个是开始分析需要进行接口调用，二是点击标题按钮后需要进行接口调用获取内容

import React, { useState } from 'react';
import { Input, Button, Table, Spin, Alert, Modal, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import './index.scss'

const Main = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAnalysis = () => {
    setLoading(true);
    setError(null);

    // 模拟后端请求和结果
    setTimeout(() => {
      const mockResult = [
        { id: 1, title: 'Item 1', indexOne: 'Indicator A', indexTwo: 'Indicator B' },
        { id: 2, title: 'Item 2', indexOne: 'Indicator C', indexTwo: 'Indicator D' },
      ];
      setLoading(false);
      setAnalysisResult(mockResult);
    }, 2000);
  };

  const handleTitleClick = (text) => {
    setModalContent(`这是标题为 ${text} 的弹窗内容。`);
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
      render: (text) => (
        <a onClick={() => handleTitleClick(text)}>{text}</a>
      ),
    },
    {
      title: '指标1',
      dataIndex: 'indexOne',
      key: 'indexOne',
    },
    {
      title: '指标2',
      dataIndex: 'indexTwo',
      key: 'indexTwo',
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
          title="弹窗标题"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          {modalContent}
        </Modal>
        {error && <Alert message={error} type="error" />}
      </Content>
    </Layout>
  );
};

export default Main;
