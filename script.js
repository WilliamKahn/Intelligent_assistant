const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://wxpusher.zjiecode.com/api/send/message';  // 替换成实际的目标URL

// 获取CHANGELOG.md文件的路径
const changelogPath = path.join(__dirname, 'CHANGELOG.md');

// 读取CHANGELOG.md文件内容
const changelog = fs.readFileSync(changelogPath, 'utf-8');
const releasedRegex = /## \[Unreleased\](.*?)(?=\n##|\n$)/s;
const match = releasedRegex.exec(changelog);
if(match) {
    // 准备要发送的JSON数据
const jsonData = {
    appToken: 'AT_2vEaUfXFmwMKybX7YeX3yCJFrmc7TFlD',
    content: match[1].trim(),
    summary:"智能助手版本更新",
    contentType: 3,
    uids: ['UID_M1ELSR1yCRxAGUKSGCQCydo7ALu3'],
    verifyPay: false
  };
  
  // 转换 JSON 数据为字符串
  const jsonDataString = JSON.stringify(jsonData);
  
  // 设置请求选项
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(jsonDataString)
    }
  };
  
  // 发送请求
  const req = https.request(url, options, res => {
    let responseData = '';
  
    // 接收响应数据
    res.on('data', chunk => {
      responseData += chunk;
    });
  
    // 处理响应结束
    res.on('end', () => {
      console.log('Response data:', responseData);
    });
  });
  
  // 处理请求错误
  req.on('error', error => {
    console.error('Error:', error.message);
  });
  
  // 发送 JSON 数据
  req.write(jsonDataString);
  req.end();
}

