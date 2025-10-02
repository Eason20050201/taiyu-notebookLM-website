// utils/toPinyin.js
// 將中文轉為拼音（不帶聲調，全部小寫，空格轉為-）
import pinyin from 'pinyin';

export default function toPinyin(str) {
  return pinyin(str, { style: pinyin.STYLE_NORMAL })
    .flat()
    .join('-')
    .toLowerCase();
}
