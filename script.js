// 抽獎按鈕與結果顯示
document.getElementById('drawButton').addEventListener('click', function() {
    // 獲取輸入的參加者名單
    const participantsText = document.getElementById('participants').value;
    const participants = participantsText.split('\n').filter(name => name.trim() !== '');

    // 檢查是否有參加者
    if (participants.length === 0) {
        alert('請輸入至少一位參加者！');
        return;
    }

    // 隨機選取一位得獎者
    const winnerIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[winnerIndex];

    // 顯示得獎者
    document.getElementById('winner').textContent = `恭喜得獎者：${winner}`;
});
