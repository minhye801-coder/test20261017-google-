# 구글 스프레드시트 & Google Apps Script 연동 가이드

본 문서는 초등학교 영양교사가 매월 작성하는 **구글 스프레드시트 급식 식단표**를 **'영양자료 자동 생성기'** 웹앱과 쉽게 연동할 수 있도록 돕는 안내서입니다.

---

## 1. 개요 및 목적
- **배경**: 많은 학교에서 월간 식단표와 영양정보를 구글 스프레드시트로 관리하고 있습니다.
- **효과**: 스프레드시트에 입력된 날짜별 메뉴를 매일 손으로 복사하지 않고, 클릭 한 번으로 **영양자료 자동 생성기용 JSON 백업 파일**로 내보내거나 클립보드에 복사하여 웹앱에서 즉시 불러올 수 있습니다.
- **보안**: 별도의 유료 API나 외부 데이터베이스 없이, 학교 구글 계정 내에서 완전히 무료로 안전하게 동작합니다.

---

## 2. 구글 스프레드시트 식단표 양식 권장 구조

스프레드시트의 한 시트(예: `10월식단`)를 아래와 같은 열(Column) 구성으로 준비합니다:

| A열 (날짜) | B열 (전체 메뉴) | C열 (주요 소개 메뉴) | D열 (음식 이야기/메모) | E열 (주요 영양소) |
| :--- | :--- | :--- | :--- | :--- |
| 2026-10-19 | 귀리밥, 쇠고기미역국, 돼지갈비찜, 깍두기, 귤 | 쇠고기미역국 | 미역에는 바다의 보약이라 불리는 요오드와 칼슘이 풍부합니다. | 요오드, 칼슘, 단백질 |
| 2026-10-20 | 찰보리밥, 얼갈이된장국, 닭볶음탕, 콩나물무침, 배추김치 | 닭볶음탕 | 닭고기는 소화가 잘되고 근육 성장을 돕는 단백질이 풍부합니다. | 단백질, 필수아미노산 |
| 2026-10-21 | 알록달록비빔밥, 팽이버섯된장국, 달걀후라이, 백김치, 요구르트 | 알록달록비빔밥 | 비빔밥은 오방색 채소가 고루 들어가 영양의 균형을 이룹니다. | 비타민A, 식이섬유 |

---

## 3. Google Apps Script 설치 방법 (단계별 안내)

1. 식단표가 작성된 **구글 스프레드시트**를 엽니다.
2. 상단 메뉴에서 **[확장 프로그램]** > **[Apps Script]**를 클릭합니다.
3. 기존 편집기에 있는 코드를 지우고, 아래의 **[연동 스크립트 코드]**를 그대로 붙여넣습니다.
4. 상단의 **[저장(디스크 아이콘)]** 버튼을 클릭하고, 프로젝트 이름을 `영양자료연동기`로 저장합니다.
5. 스프레드시트 브라우저 창을 새로고침하면, 상단 메뉴바에 **[🍱 영양자료 생성기]** 메뉴가 새로 생성됩니다.

---

## 4. 연동 스크립트 코드 (Code.gs)

```javascript
/**
 * 초등학교 급식 식단표 -> 영양자료 자동 생성기 연동 스크립트
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('🍱 영양자료 생성기')
    .addItem('오늘 날짜 식단 JSON 다운로드', 'exportTodayMealJson')
    .addItem('선택한 행(날짜) 식단 JSON 다운로드', 'exportSelectedRowJson')
    .addItem('연동 안내 도움말', 'showHelpModal')
    .addToUi();
}

/**
 * 오늘 날짜의 식단 행을 찾아 JSON 파일로 내보냅니다.
 */
function exportTodayMealJson() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  
  var targetRow = null;
  // 2행부터 검사 (1행은 헤더)
  for (var i = 1; i < data.length; i++) {
    var rowDate = data[i][0];
    var formattedDate = "";
    if (rowDate instanceof Date) {
      formattedDate = Utilities.formatDate(rowDate, Session.getScriptTimeZone(), "yyyy-MM-dd");
    } else {
      formattedDate = String(rowDate).trim();
    }
    
    if (formattedDate === todayStr) {
      targetRow = data[i];
      break;
    }
  }

  if (!targetRow) {
    SpreadsheetApp.getUi().alert('오늘 날짜(' + todayStr + ')와 일치하는 식단 행을 찾을 수 없습니다.\n행을 직접 선택한 후 [선택한 행 식단 JSON 다운로드]를 실행해주세요.');
    return;
  }

  createAndDownloadJson(targetRow, todayStr);
}

/**
 * 현재 커서가 위치한 행의 식단을 JSON으로 내보냅니다.
 */
function exportSelectedRowJson() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var activeRowIndex = sheet.getActiveCell().getRow();
  
  if (activeRowIndex <= 1) {
    SpreadsheetApp.getUi().alert('식단 데이터가 있는 행(2행 이상)을 선택해주세요.');
    return;
  }
  
  var rowData = sheet.getRange(activeRowIndex, 1, 1, 6).getValues()[0];
  var dateVal = rowData[0];
  var dateStr = "";
  if (dateVal instanceof Date) {
    dateStr = Utilities.formatDate(dateVal, Session.getScriptTimeZone(), "yyyy-MM-dd");
  } else {
    dateStr = String(dateVal).trim() || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  }

  createAndDownloadJson(rowData, dateStr);
}

/**
 * 행 데이터를 웹앱 전용 JSON 포맷으로 조립하고 다운로드 대화상자를 띄웁니다.
 */
function createAndDownloadJson(row, dateStr) {
  var rawMenus = String(row[1] || "").split(/[,·/]/).map(function(m) { return m.trim(); }).filter(Boolean);
  var selectedMenu = String(row[2] || "").trim() || (rawMenus.length > 0 ? rawMenus[0] : "오늘의 추천 메뉴");
  var story = String(row[3] || "").trim();
  var rawNutrients = String(row[4] || "").split(/[,/]/).map(function(n) { return n.trim(); }).filter(Boolean);

  var nutrients = rawNutrients.map(function(n) {
    return {
      name: n,
      benefit: "성장기 어린이의 건강과 면역력을 돕습니다.",
      verified: true
    };
  });

  if (nutrients.length === 0) {
    nutrients = [
      { name: "정보 확인 필요", benefit: "영양소 정보를 입력해주세요.", verified: false }
    ];
  }

  var mealData = {
    version: "1.0",
    savedAt: new Date().toISOString(),
    date: dateStr,
    gradeGroup: "middle", // 기본값: 3~4학년
    allMenus: rawMenus.length > 0 ? rawMenus : [selectedMenu],
    selectedMenu: selectedMenu,
    story: story || (selectedMenu + "은(는) 영양이 가득하고 맛있는 우리나라 전통 급식 메뉴입니다."),
    nutrients: nutrients,
    quiz: {
      question: "오늘 급식의 대표 메뉴인 [" + selectedMenu + "]에 대한 설명으로 알맞은 것은 무엇일까요?",
      options: [
        "영양소가 골고루 들어있는 건강한 음식이다.",
        "하루에 10그릇 넘게 먹어야 좋다.",
        "채소는 빼고 고기만 골라 먹어야 한다."
      ],
      correctIndex: 0,
      explanation: selectedMenu + "은(는) 다양한 영양소가 균형 있게 들어있어 밥과 반찬을 골고루 먹을 때 가장 좋습니다."
    }
  };

  var jsonString = JSON.stringify(mealData, null, 2);
  var html = '<div style="font-family: sans-serif; padding: 15px;">' +
             '<h3>🍱 ' + dateStr + ' [' + selectedMenu + '] 식단 데이터</h3>' +
             '<p>아래 버튼을 눌러 JSON 파일을 다운로드한 후, 영양자료 생성기 웹앱의 <b>[JSON 불러오기]</b> 버튼으로 업로드하세요.</p>' +
             '<a id="downloadBtn" download="급식자료_' + dateStr + '_' + selectedMenu + '.json" ' +
             'href="data:application/json;charset=utf-8,' + encodeURIComponent(jsonString) + '" ' +
             'style="display:inline-block; padding:10px 18px; background:#0D9488; color:white; text-decoration:none; border-radius:6px; font-weight:bold;">' +
             '📥 JSON 파일 다운로드</a>' +
             '</div>';

  var output = HtmlService.createHtmlOutput(html).setWidth(460).setHeight(240);
  SpreadsheetApp.getUi().showModalDialog(output, '영양자료 데이터 내보내기');
}

function showHelpModal() {
  var ui = SpreadsheetApp.getUi();
  ui.alert(
    '🍱 영양자료 자동 생성기 연동 안내\n\n' +
    '1. 식단표 시트의 원하는 날짜 행을 클릭합니다.\n' +
    '2. 상단 메뉴 [🍱 영양자료 생성기] > [선택한 행 식단 JSON 다운로드]를 클릭합니다.\n' +
    '3. 다운로드된 .json 파일을 영양자료 자동 생성기 웹앱의 [JSON 불러오기]로 열면 모든 내용이 즉시 채워집니다.'
  );
}
```

---

## 5. 웹앱에서 활용 순서
1. 구글 스프레드시트에서 위 스크립트를 통해 다운로드한 `급식자료_날짜_메뉴.json` 파일을 준비합니다.
2. **영양자료 자동 생성기** 웹앱 상단 우측의 **[📥 JSON 불러오기]** 버튼을 누릅니다.
3. 다운로드한 파일을 선택하면, 날짜, 전체 급식 메뉴 목록, 오늘의 주인공 메뉴, 음식 이야기, 영양소, 퀴즈가 즉시 폼과 미리보기에 채워집니다.
4. 영양교사는 필요에 따라 문구를 확인하거나 보완한 후, **[📺 TV 전체화면]**으로 급식실 화면에 띄우거나 **[🖼️ PNG 이미지 저장]** / **[🖨️ 인쇄하기]**를 실행합니다.

---

## 6. LG 스탠바이미(StanbyME) 터치 키오스크 설정 가이드

구미봉곡초등학교 급식실, 복도, 또는 교실의 **LG 스탠바이미** 터치스크린에 상시 게시하여 학생들이 자유롭게 터치하고 퀴즈를 풀도록 설정하는 방법입니다.

### 1) 즉시 전환 방법
- 웹앱 상단 헤더의 반짝이는 **[📱 스탠바이미 적용]** 버튼을 터치하면 전체 화면 키오스크로 즉시 전환됩니다.

### 2) 스탠바이미 기기 자동 부팅 URL 설정 (권장)
- 스탠바이미 웹 브라우저의 홈 화면이나 즐겨찾기에 주소 끝에 `#stanbyme`를 붙여 등록하세요:
  - 예시: `https://[배포주소]/#stanbyme`
- 이 주소로 접속하면 교사용 편집 패널을 거치지 않고 **학생용 터치 탐험 화면으로 즉시 부팅**됩니다.

### 3) 학생 터치 상호작용 기능
- **오늘의 식단 터치**:
  - 상단 가로 리본에 `10곡혼합밥`, `국산꽃게탕`, `도라지초무침`, `짜장닭불고기`, `포테이토삼치살구이`, `배추김치`, `파인애플조각` 등 오늘의 메뉴가 큼직한 버튼으로 나옵니다.
  - 학생이 `[🍚 10곡혼합밥]`을 터치하면 밥의 에너지와 집중력 이야기, 비타민 B군 영양소가 나오고, `[🥗 도라지초무침]`을 터치하면 도라지 속 사포닌의 기관지 보호 효능과 맞춤 퀴즈로 즉시 바뀝니다.
- **인터랙티브 퀴즈 & 별 모으기**:
  - 학생이 손가락으로 1, 2, 3번 보기를 터치하면 정답 여부가 밝고 쾌활한 실로폰 효과음과 함께 표시됩니다.
  - 정답을 맞힐 때마다 우측 상단의 `⭐ 모은 별` 점수가 올라가 학생들의 식생활 호기심과 성취감을 자극합니다.
- **학년군별 난이도 조절**:
  - 우측 상단 `[저학년 (1-2)]`, `[중학년 (3-4)]`, `[고학년 (5-6)]` 탭을 터치하면 학생 눈높이에 맞게 글자 크기와 퀴즈 난이도가 자동으로 조절됩니다.
- **교사용 화면 복귀**:
  - 교사가 설정을 변경하고자 할 때는 우측 상단의 `[✕ 편집 화면으로]` 버튼을 누르면 관리자 모드로 돌아옵니다.

