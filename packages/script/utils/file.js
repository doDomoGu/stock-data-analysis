import { readFile, writeFile, mkdir, access, appendFile } from "node:fs/promises";
import path from "path";

async function checkAndCreateDir(dirPath) {
  try {
    // 检查目录是否存在
    await access(dirPath);
    // console.log(`目录 ${dirPath} 已存在`);
  } catch {
    // 目录不存在，创建目录
    // console.log(`目录 ${dirPath} 不存在，创建它`);
    await mkdir(dirPath, { recursive: true });
  }
}

export async function write(filePath, content) {
  try {
    const dirPath = path.parse(filePath).dir;
    await checkAndCreateDir(dirPath);
    await writeFile(filePath, content); // 异步写入文件
    console.log("数据已保存到文件");
  } catch (error) {
    console.error("发生错误:", error);
  }
}

export async function append(filePath, content) {
  try {
    const dirPath = path.parse(filePath).dir;
    await checkAndCreateDir(dirPath);
    await appendFile(filePath, content); // 异步写入文件
    console.log("数据已添加到文件");
  } catch (error) {
    console.error("发生错误:", error);
  }
}
