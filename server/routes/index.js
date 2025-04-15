var express = require('express');
var router = express.Router();
var axios = require('axios');
require('dotenv').config();
var connection = require('../database/sql.js');

// 百度文心一言的 API 地址和认证信息
const ERNIE_API_URL = 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions';
const ERNIE_API_KEY = process.env.BAIDU_API_KEY; // 百度 API Key
const ERNIE_SECRET_KEY = process.env.BAIDU_SECRET_KEY; // 百度 Secret Key

// 获取百度文心一言的 Access Token
const getAccessToken = async () => {
  const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${ERNIE_API_KEY}&client_secret=${ERNIE_SECRET_KEY}`;
  const response = await axios.get(tokenUrl);
  return response.data.access_token;
};

const queryAsync = (sql, params) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// 登录接口
router.post('/login', function (req, res) {
  const { account, password } = req.body; // 获取前端传递的账号和密码

  if (!account || !password) {
    return res.status(400).json({
      success: false,
      message: '账号和密码不能为空',
    });
  }

  // 查询数据库，验证账号和密码
  const query = 'SELECT * FROM vxuser WHERE account = ? AND password = ?';
  connection.query(query, [account, password], function (error, results) {
    if (error) {
      console.error('数据库查询失败:', error);
      return res.status(500).json({
        success: false,
        message: '服务器内部错误',
      });
    }

    if (results.length > 0) {
      // 账号密码验证成功
      res.json({
        success: true,
        message: '登录成功',
        user: results[0], // 返回用户信息
      });
    } else {
      // 账号或密码错误
      res.json({
        success: false,
        message: '账号或密码错误',
      });
    }
  });
});

// 训练记录接口（简化版）
router.post('/training-save',  async (req, res) => {
  const { userId: rawUserId, duration: rawDuration } = req.body; 
 
  // 强制类型转换 
  const userId = Number(rawUserId);
  const duration = Number(rawDuration);
  if (isNaN(userId) || isNaN(duration)) {
    return res.status(400).json({  code: 400, message: '参数必须为有效数字' });
  }
 
  try {
    // 获取数据库当前日期（东八区）
    const dateResult = await queryAsync('SELECT CURDATE() AS today');
    const today = dateResult[0].today; // 直接使用数据库计算的日期 
 
    // 查询最近记录（参数化查询）
    const existing = await queryAsync(
      `SELECT * FROM training_info 
       WHERE user_id = ? 
       ORDER BY last_training_date DESC 
       LIMIT 1`,
      [userId]
    );
 
    console.log(' 数据库当前日期:', today);
    console.log(' 最后训练记录:', existing[0]?.last_training_date);
 
    if (existing.length  === 0) {
      await queryAsync(
        `INSERT INTO training_info 
         (user_id, today_training_duration, total_training_duration, total_training_days, last_training_date)
         VALUES (?, ?, ?, 1, ?)`,
        [userId, duration, duration, today]
      );
    } else {
      const record = existing[0];
      // 直接比较日期字符串（无需转换）
      const isSameDay = record.last_training_date  === today;
 
      console.log(' 日期比对结果:', {
        dbDate: record.last_training_date, 
        today,
        isSameDay 
      });
 
      await queryAsync(
        `UPDATE training_info SET 
         today_training_duration = ?,
         total_training_duration = ?,
         total_training_days = ?,
         last_training_date = ?
         WHERE id = ?`,
        [
          isSameDay ? record.today_training_duration  + duration : duration,
          record.total_training_duration  + duration,
          isSameDay ? record.total_training_days  : record.total_training_days  + 1,
          today,
          record.id  
        ]
      );
    }
    res.json({  code: 200, message: '保存成功' });
  } catch (err) {
    console.error(' 完整错误日志:', {
      message: err.message, 
      sql: err.sql, 
      stack: err.stack  
    });
    res.status(500).json({  
      code: 500,
      message: '操作失败',
      detail: err.sqlMessage  || err.message  
    });
  }
});

//获取训练信息
router.get('/training-info', function (req, res) {
  const userId = req.query.userId; // 从查询参数中获取用户 ID

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: '用户 ID 不能为空',
    });
  }

  // 查询数据库，获取训练信息
  const query = 'SELECT * FROM training_info WHERE user_id = ?';
  connection.query(query, [userId], function (error, results) {
    if (error) {
      console.error('数据库查询失败:', error);
      return res.status(500).json({
        success: false,
        message: '服务器内部错误',
      });
    }

    if (results.length > 0) {
      // 找到训练信息
      res.json({
        success: true,
        message: '获取训练信息成功',
        trainingInfo: results[0], // 返回训练信息
      });
    } else {
      // 未找到训练信息
      res.json({
        success: false,
        message: '未找到训练信息',
      });
    }
  });
});

// 医学问答接口
router.post('/ask', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: '问题不能为空' });
  }

  try {
    // 获取 Access Token
    const accessToken = await getAccessToken();

    // 调用百度文心一言 API
    const response = await axios.post(
      `${ERNIE_API_URL}?access_token=${accessToken}`,
      {
        messages: [
          { role: 'user', content: question },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // 返回文心一言的回答
    const answer = response.data.result;
    res.json({ answer });
  } catch (error) {
    console.error('调用百度文心一言 API 失败:', error.response?.data || error.message);
    res.status(500).json({ error: '获取 AI 回答失败，请稍后重试' });
  }
});

module.exports = router;