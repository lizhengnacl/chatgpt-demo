const path = require('path')
const fs = require('fs')
const COS = require('cos-nodejs-sdk-v5')
require('dotenv').config();

const cos = new COS({
  SecretId: process.env.COS_SECRET_ID,
  SecretKey: process.env.COS_SECRET_KEY,
})

const config = {
  Bucket: 'simple-talk-ai-1304696512',
  Region: 'ap-hongkong',
  StorageClass: 'STANDARD',
}

function uploadFile(filePath, key) {
  return new Promise((resolve, reject) => {
    cos.putObject({
      ...config,
      Key: key,
      Body: fs.createReadStream(filePath), // 上传文件对象
      ContentLength: fs.statSync(filePath).size,
      onProgress: function(progressData) {
      },
    }, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data.Location)
      }
    })
  })
}

// 递归遍历文件夹，获取所有文件
function getFiles(dirPath, fileList = []) {
  const files = fs.readdirSync(dirPath)
  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      getFiles(filePath, fileList)
    } else {
      fileList.push(filePath)
    }
  })
  return fileList
}

function uploadDir(dir) {
  const files = getFiles(dir)
  const prefix = dir + '/'

  return Promise.all(files.map(file => {
    return uploadFile(file, file.replace(prefix, ''))
  }))
}

const folderPath = path.resolve(__dirname, '../dist/client')
uploadDir(folderPath).then(res => {
  console.log('=========== upload to cdn success ===========')
  console.log(res)
}).catch(err => {
  console.log('=========== upload to cdn success ===========')
  console.log(err)
})
