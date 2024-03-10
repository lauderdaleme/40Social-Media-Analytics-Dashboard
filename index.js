const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟用户数据存储
let users = [
  { id: 1, username: 'john_doe', password: 'password123', socialMediaAccounts: [] },
  // 添加更多用户数据...
];

// 处理获取用户社交媒体数据的请求
app.get('/social-media/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({ socialMediaAccounts: user.socialMediaAccounts });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理添加新社交媒体账户的请求
app.post('/social-media/:userId/add-account', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { platform, username } = req.body;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const newAccount = { id: user.socialMediaAccounts.length + 1, platform, username };
    user.socialMediaAccounts.push(newAccount);
    res.json({ message: 'Social media account added successfully', account: newAccount });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理分析社交媒体表现的请求（示例，实际应用中可能需要更复杂的逻辑）
app.get('/analytics/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    // 示例：模拟获取社交媒体数据并进行分析
    const socialMediaData = user.socialMediaAccounts.map((account) => {
      return {
        account: account.username,
        followers: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 5000),
        comments: Math.floor(Math.random() * 2000),
      };
    });

    res.json({ analytics: socialMediaData });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
