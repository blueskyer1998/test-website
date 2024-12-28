const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'abc123';
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// 驗證 Webhook
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook 驗證成功');
        res.status(200).send(challenge);
    } else {
        console.log('Webhook 驗證失敗');
        res.status(403).send('驗證失敗');
    }
});

// 處理 Instagram 的事件通知
app.post('/webhook', (req, res) => {
    const body = req.body;

    if (body.object === 'instagram') {
        console.log('收到的 Instagram 通知:', JSON.stringify(body, null, 2));
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.status(404).send('Not Found');
    }
});

// 提供靜態文件（可選）
app.use(express.static(path.join(__dirname, '../')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器已啟動，監聽端口 ${PORT}`);
});
