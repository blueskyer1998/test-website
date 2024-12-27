document.getElementById('fetchComments').addEventListener('click', async function() {
    const postUrl = document.getElementById('postUrl').value;
    const winnerDiv = document.getElementById('winner');

    if (!postUrl) {
        winnerDiv.textContent = '請輸入 Instagram 貼文網址！';
        return;
    }

    try {
        // 解析貼文 ID
        const postId = extractPostId(postUrl);
        if (!postId) {
            winnerDiv.textContent = '無效的貼文網址！';
            return;
        }

        // 獲取 Access Token
        const accessToken = '你的 Instagram API Access Token';

        // 使用 Instagram API 獲取評論
        const comments = await fetchComments(postId, accessToken);
        if (comments.length === 0) {
            winnerDiv.textContent = '貼文無評論！';
            return;
        }

        // 隨機抽選一位得獎者
        const winner = comments[Math.floor(Math.random() * comments.length)];
        winnerDiv.textContent = `恭喜得獎者：${winner}`;
    } catch (error) {
        console.error(error);
        winnerDiv.textContent = '抽獎過程出錯，請稍後再試！';
    }
});

// 解析 Instagram 貼文 ID
function extractPostId(url) {
    const regex = /https:\/\/www.instagram.com\/p\/([^\/?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// 使用 Instagram API 獲取評論
async function fetchComments(postId, accessToken) {
    const apiUrl = `https://graph.facebook.com/v15.0/${postId}/comments?access_token=${accessToken}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data || !data.data) throw new Error('無法獲取評論');
    return data.data.map(comment => comment.from.name);
}
