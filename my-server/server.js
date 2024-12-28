const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 使用 body-parser 解析請求
app.use(bodyParser.json());

// 定義路由
app.get('/', (req, res) => {
    res.send('伺服器運行成功！');
});

app.post('/webhook', (req, res) => {
    console.log('收到的請求內容:', req.body);
    res.send('Webhook 已接收');
});

// 啟動伺服器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`伺服器已啟動，監聽埠號 ${PORT}`);
});
