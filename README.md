**recovery_uniapp小程序本地部署教程**：

技术栈使用的是**MySQL+VUE3+nodejs**，使用的IDE为**uniapp**

数据库使用的是mysql。

**前端部分**：
将本代码先clone到本地,然后用uniapp打开，配置好你的微信小程序的appid。

**后端部分**：
安装Node.js v18.19.0.

**数据库（mysql）**：

建表，一共建了三个表分别是：

用户表（vxuser）

训练信息表（training_info）

怀孕和分娩信息表（pregnancy_info）

个人基本信息表（personal_info）

具体信息（代码）如下：

```jsx
环境：mysql8.0

用户表（vxuser）
CREATE TABLE vxuser (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- 自增主键
    name VARCHAR(255) NOT NULL,               -- 用户姓名
    account VARCHAR(255) NOT NULL UNIQUE,     -- 用户账号（唯一约束，防止重复）
    password VARCHAR(255) NOT NULL           -- 用户密码
);

CREATE TABLE training_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    last_training_date DATE DEFAULT (CURRENT_DATE), 
    today_training_duration INT DEFAULT 0,
    total_training_duration INT DEFAULT 0,
    total_training_days INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES vxuser(id)
);

怀孕和分娩信息表（pregnancy_info）
CREATE TABLE pregnancy_info (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- 主键，自增
    user_id INT NOT NULL,                    -- 外键，指向users表中的id
    pregnancy_count INT,                     -- 怀孕次数
    delivery_count INT,                      -- 分娩次数
    miscarriage_count INT,                   -- 流产次数
    visit_reason VARCHAR(255),               -- 就诊原因
    FOREIGN KEY (user_id) REFERENCES vxuser(id) -- 外键约束，引用users表中的id
);

个人基本信息表（personal_info）
CREATE TABLE personal_info (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- 主键，自增
    user_id INT NOT NULL,                    -- 外键，指向users表中的id
    name VARCHAR(255),                       -- 姓名
    gender ENUM('Male', 'Female', 'Other'),  -- 性别，取值：Male, Female, Other
    age INT,                                 -- 年龄
    id_type VARCHAR(50),                     -- 证件类型
    id_number VARCHAR(50),                   -- 证件号码
    birth_date DATE,                         -- 出生日期
    height INT,                              -- 身高（单位：cm）
    weight INT,                              -- 体重（单位：kg）
    FOREIGN KEY (user_id) REFERENCES vxuser(id) -- 外键约束，引用users表中的id
);
```


创建完毕后可以用navicat中查看到可视化的表

实现的流程如下：

**前端**

1.发送请求

**服务端（node）**

2.接收前端请求

3.数据查询

4.发送数据（数据格式）

**前端**

5.接收并存储数据

6.数据显示


# recovery小程序部署

1.首先下载nodejs

https://blog.csdn.net/jsl123x/article/details/139031611?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522ba41785cd3e3aed8749537a635768442%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=ba41785cd3e3aed8749537a635768442&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~hot_rank-5-139031611-null-null.142

2.下载MySQL

https://blog.csdn.net/qq_40187702/article/details/130618805?ops_request_misc=&request_id=&biz_id=102&utm_term=mysql8.0%E4%B8%8B%E8%BD%BD%E5%92%8C%E5%AE%89%E8%A3%85&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-130618805.142

（建表代码如上）

3.配置Node.js

终端管理员键入到server文件夹中，输入如下命令：
npm install

<aside>
💡

在server文件运行npm start，再运行小程序，联通后即完成部署

</aside>
