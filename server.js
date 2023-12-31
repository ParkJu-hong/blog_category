import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(express.static('public'));
app.use(cors())
app.use((req, res, next) => {
    // 모든 도메인에서의 요청을 허용하려면 '*'을 사용하거나,
    // 특정 도메인에서의 요청만 허용하려면 해당 도메인을 사용합니다.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // preflight 요청에 대한 처리
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  
    next();
  });

app.get('/search-blog', async (req, res) => {
    const clientId = 'pJjm8Zb3_IGOLokzRLfF';
    const apiKey = 'kCHWKs_dbr'; // 여기에 발급받은 네이버 API 키를 넣어주세요

  if (!req.query) {
    res.status(400).json({ error: '검색어를 입력하세요.' });
    return;
  }
  console.log("쿼리 여기 : ", req.query);
  const apiUrl = `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(req.query.query)}&sort=sim&start=${req.query.start}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': apiKey,
      },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('에러 발생:', error);
    res.status(500).json({ error: '검색 중 오류가 발생했습니다.' });
  }
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
