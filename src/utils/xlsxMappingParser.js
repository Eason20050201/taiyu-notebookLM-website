// utils/xlsxMappingParser.js
// 解析三個 xlsx 檔案並產生 academicSystems 結構
// 需安裝 xlsx 套件 (npm install xlsx)

import * as XLSX from 'xlsx';

const ACADEMIC_SYSTEM_MAP = {
  1: '高中',
  2: '高職',
  3: '藝能科',
  4: '閩南語',
};

function buildHierarchicalMapping(dfChapter, gradeId) {
  const filtered = dfChapter.filter(row => row.gradeId === gradeId);
  const chapters = filtered.filter(row => row.level === 0).sort((a, b) => a.sort - b.sort || a.id - b.id);
  return chapters.map(chRow => {
    const chId = chRow.id;
    const chName = chRow.name;
    const sections = filtered.filter(row => row.pid === chId && row.level === 1)
      .sort((a, b) => a.sort - b.sort || a.id - b.id)
      .map(secRow => {
        const secId = secRow.id;
        const secName = secRow.name;
        const points = filtered.filter(row => row.pid === secId && row.level === 2)
          .sort((a, b) => a.sort - b.sort || a.id - b.id)
          .map(ptRow => ({ name: ptRow.name }));
        return { name: secName, points };
      });
    return { name: chName, sections };
  });
}

function getFirstSheetJson(workbook) {
  const firstSheetName = workbook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
}

export async function parseAllMappingFromXlsx() {
  // fetch 三個 xlsx 檔案
  const [chapterRes, gradeRes, subjectRes] = await Promise.all([
    fetch('/online-chapter.xlsx'),
    fetch('/online-volume.xlsx'),
    fetch('/taiyu-notebookLM-subject.xlsx'),
  ]);
  const [chapterBuf, gradeBuf, subjectBuf] = await Promise.all([
    chapterRes.arrayBuffer(),
    gradeRes.arrayBuffer(),
    subjectRes.arrayBuffer(),
  ]);
  // 解析 xlsx
  const chapterWb = XLSX.read(chapterBuf, { type: 'array' });
  const gradeWb = XLSX.read(gradeBuf, { type: 'array' });
  const subjectWb = XLSX.read(subjectBuf, { type: 'array' });

  const dfChapter = getFirstSheetJson(chapterWb);
  const dfGrade = getFirstSheetJson(gradeWb);
  const dfSubject = getFirstSheetJson(subjectWb);

  // 冊次ID與名稱、subjectId、NotebookLM_URL
  const allGrades = dfGrade.map(row => ({
    gradeId: row.gradeId,
    gradeName: row.gradeName,
    subjectId: row.subjectId,
    notebookUrl: row.NotebookLM_URL || row.notebookUrl || row.notebook_url || '',
    downloadUrl: row.Download_URL || row.downloadUrl || row.download_url || '',
  }));

  // subjectId 對應 subjectName, academicSystem
  const subjectMap = {};
  dfSubject.forEach(row => {
    subjectMap[row.subjectId] = {
      subjectName: row.subjectName,
      academicSystem: ACADEMIC_SYSTEM_MAP[row.academicSystem] || String(row.academicSystem),
    };
  });

  // 依學制分群
  const academicDict = {};
  Object.entries(subjectMap).forEach(([subjectId, info]) => {
    const academic = info.academicSystem;
    const subject = info.subjectName;
    if (!academicDict[academic]) academicDict[academic] = {};
    if (!academicDict[academic][subject]) academicDict[academic][subject] = [];
  });

  // 再依冊次分群
  allGrades.forEach(row => {
    const gradeId = row.gradeId;
    const gradeName = row.gradeName;
    const subjectId = row.subjectId;
    const notebookUrl = row.notebookUrl;
    const downloadUrl = row.downloadUrl;
    const subjectInfo = subjectMap[subjectId];
    if (!subjectInfo) return;
    const academic = subjectInfo.academicSystem;
    const subject = subjectInfo.subjectName;
    const cleanGradeName = typeof gradeName === 'string' && gradeName.includes(' (ID:') ? gradeName.split(' (ID:')[0] : gradeName;
    const volumeObj = { name: cleanGradeName, chapters: buildHierarchicalMapping(dfChapter, gradeId), notebookUrl, downloadUrl };
    academicDict[academic][subject].push(volumeObj);
  });

  // academicSystems 陣列
  const academicSystems = Object.entries(academicDict).map(([academic, subjects]) => ({
    name: academic,
    subjects: Object.entries(subjects).map(([subject, volumes]) => ({
      name: subject,
      volumes,
    })),
  }));

  return { academicSystems };
}
