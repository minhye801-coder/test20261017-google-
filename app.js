/**
 * 영양자료 자동 생성기 (app.js)
 * 초등 영양교사용 급식 연계 식생활 교육자료 제작 & 스탠바이미(StanbyME) 터치 키오스크 엔진
 * - 전국 학교 검색 (교육부 나이스 오픈API 실시간 연동)
 * - 순수 Vanilla JavaScript (외부 라이브러리 없는 순수 정적 웹, GitHub Pages 100% 호환)
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. 현재 선택된 학교 정보 (기본값: 구미봉곡초등학교, 검색으로 변경 가능)
  // ==========================================================================
  let currentSchool = {
    name: '구미봉곡초등학교',
    officeCode: 'R10', // 경상북도교육청
    schoolCode: '8801088', // 구미봉곡초등학교 표준코드
    location: '경상북도 구미시'
  };

  // ==========================================================================
  // 2. 급식 메뉴별 풍부한 식생활 교육 & 퀴즈 지식 데이터베이스
  // ==========================================================================
  const FOOD_KNOWLEDGE_BASE = [
    {
      keywords: ['꽃게', '게탕', '꽃게탕', '해물'],
      hero: '국산꽃게탕',
      icon: '🦀',
      story: '꽃게는 가을철 바다의 영양 보약으로 불릴 만큼 맛과 영양이 풍부한 수산물이에요.\n\n단단한 껍질 속 부드러운 게살에는 타우린과 필수 아미노산이 듬뿍 들어있어 국물을 시원하게 해주고, 학교 수업과 체육 활동으로 지친 우리 친구들의 피로를 말끔히 풀어준답니다.',
      nutrients: [
        { name: '타우린', benefit: '간 기능을 돕고 피로를 빠르게 풀어주며 눈 건강을 지켜줘요.', verified: true },
        { name: '칼슘 & 키토산', benefit: '성장기 어린이의 뼈와 치아를 튼튼하게 만들어줘요.', verified: true },
        { name: '양질의 단백질', benefit: '지방이 적고 소화가 잘되어 근육 성장에 아주 좋아요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '꽃게탕 국물을 시원하게 해주고 피로를 싹 풀어주는 바다 영양소는?',
          options: ['타우린', '설탕', '초콜릿'],
          correctIndex: 0,
          explanation: '게살과 조개류에 많은 타우린은 피로 회복과 눈 건강에 최고예요!'
        },
        middle: {
          question: '꽃게 껍질과 살에 풍부하여 뼈를 튼튼하게 하고 성장을 돕는 무기질은?',
          options: ['칼슘', '탄소', '카페인'],
          correctIndex: 0,
          explanation: '꽃게에는 뼈 형성에 꼭 필요한 칼슘이 듬뿍 들어있습니다.'
        },
        upper: {
          question: '꽃게와 같은 갑각류 껍질에 함유된 고분자 다당류 키틴/키토산의 주요 기능은?',
          options: ['체내 면역력 증진 및 유해 콜레스테롤 흡수 저감', '혈당의 급상승 유발', '단백질 분해 방해'],
          correctIndex: 0,
          explanation: '키토산은 장내 유익균 증식과 면역력 증진에 도움을 주는 기능성 성분입니다.'
        }
      }
    },
    {
      keywords: ['도라지', '도라지초무침', '나물', '무침'],
      hero: '도라지초무침',
      icon: '🥗',
      story: '쌉싸름하면서도 향긋한 도라지는 옛날부터 우리 조상들이 목과 기관지를 보호하기 위해 즐겨 먹던 귀한 약용 채소예요.\n\n새콤달콤하고 매콤한 양념에 아삭아삭하게 무쳐내어 입맛을 돋워주고, 환절기에 목이 아프거나 기침이 날 때 기관지를 촉촉하게 보호해 준답니다.',
      nutrients: [
        { name: '사포닌', benefit: '기관지 점액 분비를 촉진해 미세먼지와 바이러스로부터 목을 보호해요.', verified: true },
        { name: '이눌린 (천연 식이섬유)', benefit: '장내 유익균의 먹이가 되어 소화를 돕고 변비를 예방해요.', verified: true },
        { name: '칼슘 & 철분', benefit: '뿌리채소의 풍부한 무기질이 빈혈을 예방하고 피를 맑게 해줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '도라지초무침에 들어있는 도라지는 우리 몸 어디를 튼튼하게 지켜줄까요?',
          options: ['목과 기관지를 촉촉하게 지켜줘요', '발가락을 길어지게 해요', '귀를 간지럽게 해요'],
          correctIndex: 0,
          explanation: '도라지 속 사포닌 성분은 목과 기관지를 촉촉하게 감싸 기침과 감기를 막아줘요!'
        },
        middle: {
          question: '도라지 뿌리에 풍부하여 기침을 멎게 하고 기관지 점막을 튼튼히 하는 핵심 영양소는?',
          options: ['사포닌', '설탕', '탄산'],
          correctIndex: 0,
          explanation: '도라지의 쌉싸름한 맛을 내는 사포닌은 기관지 질환을 예방하는 으뜸 성분입니다.'
        },
        upper: {
          question: '도라지 속 사포닌(Platycodin) 성분이 호흡기 건강에 미치는 생리학적 작용은?',
          options: ['기관지 분비액 생성을 촉진하여 섬모 운동 활성화 및 항염증 작용', '체온의 급격한 저하', '단백질 흡수 억제'],
          correctIndex: 0,
          explanation: '도라지 사포닌은 기도 점액 분비를 증가시켜 유해물질 배출과 면역 조절을 돕습니다.'
        }
      }
    },
    {
      keywords: ['10곡혼합밥', '혼합밥', '잡곡밥', '보리밥', '현미밥', '밥'],
      hero: '10곡혼합밥',
      icon: '🍚',
      story: '10곡 혼합밥은 쌀에 찹쌀, 보리, 조, 수수, 기장, 흑미 등 10가지 건강한 알곡이 한데 어우러진 영양의 보물상자예요!\n\n백미만 먹을 때보다 비타민 B군과 미네랄, 식이섬유가 몇 배나 풍부하여 우리 두뇌에 지치지 않는 집중력 에너지를 가득 채워준답니다.',
      nutrients: [
        { name: '복합 탄수화물', benefit: '뇌가 활동하는 데 필요한 포도당 에너지를 서서히 지속적으로 공급해요.', verified: true },
        { name: '비타민 B군', benefit: '에너지 대사를 촉진하여 오후 수업 시간에도 피로하지 않게 해줘요.', verified: true },
        { name: '식이섬유', benefit: '배 속 장운동을 활발하게 하여 소화를 돕고 쾌변을 선물해요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '10곡 혼합밥처럼 여러 잡곡을 골고루 섞어 먹으면 어떤 좋은 힘이 생길까요?',
          options: ['머리가 똑똑해지고 하루 종일 쌩쌩해요', '잠이 쏟아져요', '이가 아파요'],
          correctIndex: 0,
          explanation: '잡곡밥은 에너지가 오래오래 지속되어 공부와 운동에 큰 힘을 준답니다!'
        },
        middle: {
          question: '잡곡밥에 풍부하여 섭취한 영양소를 활력 에너지로 바꾸고 피로를 덜어주는 비타민은?',
          options: ['비타민 B군', '비타민 K', '비타민 D'],
          correctIndex: 0,
          explanation: '통곡물에 많은 비타민 B군은 탄수화물과 단백질의 체내 연소를 돕는 필수 비타민입니다.'
        },
        upper: {
          question: '단일 백미밥 대비 10곡 혼합밥 섭취가 혈당 조절 및 대사 건강에 유리한 과학적 이유는?',
          options: ['풍부한 불용성·수용성 식이섬유가 당 흡수 속도를 완만하게 조절(Low GI)', '칼로리가 0이 되어서', '지방질만 연소시켜서'],
          correctIndex: 0,
          explanation: '복합 전분과 풍부한 섬유소는 혈당 급상승을 막고 인슐린 저항성을 개선합니다.'
        }
      }
    },
    {
      keywords: ['닭불고기', '짜장닭', '닭갈비', '닭강정', '파닭', '닭'],
      hero: '짜장닭불고기',
      icon: '🍗',
      story: '닭고기는 단백질 섬유가 가늘고 연해서 다른 육류보다 소화 흡수가 훨씬 빠른 훌륭한 고기예요.\n\n영양선생님께서 달콤짭조름한 짜장 소스에 채소와 닭고기를 조화롭게 볶아내어, 밥과 함께 먹으면 에너지와 영양이 몸속으로 쏙쏙 흡수된답니다.',
      nutrients: [
        { name: '필수 아미노산', benefit: '체내에서 합성되지 않는 필수 영양소로 성장과 두뇌 활동을 도와요.', verified: true },
        { name: '소화 흡수율 우수', benefit: '소고기나 돼지고기보다 지방이 적고 부드러워 위장에 부담이 적어요.', verified: true },
        { name: '비타민 B6', benefit: '단백질 대사를 돕고 면역 항체 형성을 촉진해요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '닭고기가 다른 고기보다 어린이 배 속에서 좋은 가장 큰 이유는?',
          options: ['고기가 연하고 부드러워 소화가 쏙쏙 잘돼서', '너무 매워서', '딱딱해서'],
          correctIndex: 0,
          explanation: '닭고기는 근육 섬유가 가늘어 어린이 위장에서도 소화가 편안하게 이루어져요.'
        },
        middle: {
          question: '닭고기처럼 양질의 동물성 단백질이 우리 몸에서 하는 가장 중요한 일은?',
          options: ['근육, 피부, 장기 등 몸을 쑥쑥 자라게 한다', '잠을 못 자게 한다', '치아를 흔들리게 한다'],
          correctIndex: 0,
          explanation: '단백질은 성장기 어린이의 뼈와 근육, 면역 세포를 구성하는 필수 요소입니다.'
        },
        upper: {
          question: '닭고기의 단백질 영양학적 특성으로 옳은 것은 무엇일까요?',
          options: ['생물가가 높고 필수 아미노산 조성이 뛰어난 완전단백질이다', '지방질만 가득하다', '비타민 흡수를 방해한다'],
          correctIndex: 0,
          explanation: '닭고기는 체내 이용률이 높은 완전단백질 식품으로 성장기 체조직 합성에 핵심입니다.'
        }
      }
    },
    {
      keywords: ['삼치', '생선', '삼치살구이', '고등어', '가자미', '구이'],
      hero: '포테이토삼치살구이',
      icon: '🐟',
      story: '삼치는 고등어, 꽁치와 함께 바다를 대표하는 등푸른생선 3총사 중 하나예요!\n\n부드러운 흰 속살에 고소한 감자 옷을 입혀 구워내어 비린내가 없고 담백하답니다. 삼치에는 머리를 똑똑하게 해주는 오메가-3 지방산(DHA)이 가득 들어있어 공부하는 학생들에게 최고예요.',
      nutrients: [
        { name: 'DHA (오메가-3)', benefit: '뇌세포를 활성화하여 기억력과 집중력을 높여줘요.', verified: true },
        { name: 'EPA', benefit: '혈액순환을 원활하게 하고 혈관을 깨끗하게 청소해 줘요.', verified: true },
        { name: '비타민 D', benefit: '음식 속 칼슘이 뼈에 쏙쏙 흡수되도록 도와줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '삼치와 같은 등푸른생선에 많아 우리 머리를 똑똑하게 해주는 착한 기름은?',
          options: ['오메가-3 (DHA)', '식용유', '초콜릿 기름'],
          correctIndex: 0,
          explanation: 'DHA는 뇌세포의 주요 구성 성분으로 기억력과 집중력 발달에 아주 중요해요!'
        },
        middle: {
          question: '생선에 풍부한 비타민 D가 우리 몸에서 하는 결정적인 역할은?',
          options: ['칼슘이 뼈와 치아에 잘 흡수되도록 돕는다', '배를 차갑게 한다', '머리카락을 빠지게 한다'],
          correctIndex: 0,
          explanation: '비타민 D는 칼슘의 체내 흡수율을 30~40% 이상 끌어올려 주는 길잡이 역할을 합니다.'
        },
        upper: {
          question: '등푸른생선의 고도불포화지방산(EPA/DHA) 섭취의 생화학적 이점은?',
          options: ['혈소판 응집 억제 및 뇌 신경 시냅스 기능 촉진', '혈전 생성 촉진', '포화지방산 축적'],
          correctIndex: 0,
          explanation: 'DHA는 뇌 신경세포막의 유동성을 증가시키고, EPA는 혈관 건강을 보호합니다.'
        }
      }
    },
    {
      keywords: ['파인애플', '파인애플조각', '과일', '후식'],
      hero: '달콤 파인애플',
      icon: '🍍',
      story: '달콤하고 상큼한 파인애플은 "천연 소화제"라는 멋진 별명을 가지고 있어요!\n\n고기나 밥을 먹은 뒤 파인애플을 먹으면 단백질을 싹 분해해 주는 착한 효소가 일하여, 배가 더부룩하지 않고 속이 편안해지도록 도와준답니다.',
      nutrients: [
        { name: '브로멜린 (소화효소)', benefit: '단백질 분해를 도와 고기나 식사를 부드럽게 소화시켜 줘요.', verified: true },
        { name: '비타민 C', benefit: '환절기 감기를 예방하고 유해 활성산소로부터 세포를 지켜줘요.', verified: true },
        { name: '구연산', benefit: '새콤한 유기산이 피로 물질인 젖산을 분해해 활력을 되찾아줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '파인애플을 밥이나 고기 반찬을 먹은 뒤 후식으로 먹으면 왜 좋을까요?',
          options: ['소화가 쏙쏙 잘되도록 도와줘서', '배를 아프게 하려고', '밥을 잊어버리려고'],
          correctIndex: 0,
          explanation: '파인애플 속 브로멜린 효소는 위장에서 단백질 소화를 돕는 으뜸 소화제예요!'
        },
        middle: {
          question: '파인애플에 들어있어 고기를 부드럽게 재우거나 소화를 돕는 천연 단백질 분해 효소는?',
          options: ['브로멜린', '설탕', '캡사이신'],
          correctIndex: 0,
          explanation: '브로멜린(Bromelain)은 단백질을 아미노산으로 분해해 소화 흡수를 촉진합니다.'
        },
        upper: {
          question: '파인애플 속 단백질 가수분해 효소 브로멜라인의 식품 가공 및 영양적 활용은?',
          options: ['연육 작용을 통한 고기의 조직 연화 및 위장 소화 부담 경감', '단백질 변성 유발 및 파괴', '칼로리 증폭'],
          correctIndex: 0,
          explanation: '브로멜라인은 단백질 펩타이드 사슬을 절단해 육질을 연하게 하고 체내 소화를 촉진합니다.'
        }
      }
    },
    {
      keywords: ['배추김치', '김치', '깍두기', '나박김치', '열무생채'],
      hero: '아삭 배추김치',
      icon: '🥬',
      story: '김치는 우리나라를 대표하는 세계 최고의 발효 슈퍼푸드예요!\n\n신선한 배추에 고춧가루, 마늘, 젓갈이 어우러져 맛있게 익어가면서 장을 건강하게 지켜주는 식물성 유산균이 요구르트보다 몇 배나 풍부하게 자라난답니다.',
      nutrients: [
        { name: '식물성 유산균', benefit: '장내 유익균을 늘려 소화를 돕고 면역력을 최강으로 올려줘요.', verified: true },
        { name: '비타민 C & 카로틴', benefit: '항산화 작용으로 감기를 막고 피부 저항력을 높여줘요.', verified: true },
        { name: '알리신 (마늘·생강)', benefit: '몸을 따뜻하게 하고 혈액순환과 살균 작용을 도와요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '배추김치가 알맞게 익으면 생겨나서 우리 배 속을 튼튼하게 해주는 고마운 친구는?',
          options: ['식물성 유산균', '곰팡이', '초콜릿'],
          correctIndex: 0,
          explanation: '김치 속 풍부한 유산균은 장 속 유해균을 물리치고 면역력을 지켜줘요!'
        },
        middle: {
          question: '김치가 세계 5대 건강식품으로 꼽히며 전 세계인의 사랑을 받는 결정적 이유는?',
          options: ['발효 과정에서 생기는 수억 마리의 유익한 유산균과 풍부한 비타민', '소금이 많아서', '외국에서 만든 거라서'],
          correctIndex: 0,
          explanation: '자연 발효 과정에서 생성되는 천연 유산균과 비타민, 파이토케미컬 덕분입니다.'
        },
        upper: {
          question: '김치의 젖산 발효 과정에서 생성되는 유익한 유기산의 생화학적 역할은?',
          options: ['장내 pH를 약산성으로 유지하여 부패균 억제 및 면역세포 자극', '치아를 부식시킴', '소화 효소 저해'],
          correctIndex: 0,
          explanation: '생성된 젖산과 유기산은 장내 산도를 낮추어 병원성 세균을 억제하고 장벽을 강화합니다.'
        }
      }
    },
    {
      keywords: ['깻잎', '쌈', '쌈장'],
      hero: '향긋 깻잎쌈',
      icon: '🌿',
      story: '깻잎은 시금치보다 철분이 2배나 많이 들어있는 초록 잎채소의 왕이에요!\n\n독특하고 향긋한 향기 성분인 페릴키톤은 천연 방부제 역할을 하여 고기나 생선을 먹을 때 세균을 막아주고, 피를 맑게 가꾸어 준답니다.',
      nutrients: [
        { name: '철분', benefit: '시금치의 2배에 달해 붉은 피를 만들고 빈혈을 싹 예방해 줘요.', verified: true },
        { name: '칼슘 & 비타민 A', benefit: '뼈를 튼튼히 하고 눈의 피로를 풀어 시력을 지켜줘요.', verified: true },
        { name: '페릴라케톤 (향기 성분)', benefit: '천연 항균 작용으로 식중독을 막고 입맛을 돋워줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '깻잎에 가득 들어있어 우리 몸의 피를 붉고 건강하게 만들어주는 영양소는?',
          options: ['철분', '모래', '기름'],
          correctIndex: 0,
          explanation: '깻잎에는 철분이 가득하여 빈혈을 막고 머리를 맑게 해줘요!'
        },
        middle: {
          question: '고기를 먹을 때 깻잎에 싸서 먹으면 식중독을 예방하고 소화가 잘되는 이유는?',
          options: ['깻잎 속 천연 항균 성분(페릴라케톤)과 풍부한 식이섬유 덕분에', '고기를 식히려고', '고기 맛을 없애려고'],
          correctIndex: 0,
          explanation: '깻잎의 독특한 향기 성분은 살균 작용을 하고 육류의 소화를 촉진합니다.'
        },
        upper: {
          question: '깻잎의 파이토케미컬인 루테올린(Luteolin)과 로즈마린산의 주요 효능은?',
          options: ['알레르기 증상 완화 및 강력한 항산화·항염증 작용', '비타민 파괴', '혈당 급상승'],
          correctIndex: 0,
          explanation: '깻잎의 로즈마린산과 루테올린은 염증 반응을 억제하고 알레르기 저항력을 높입니다.'
        }
      }
    }
  ];

  // ==========================================================================
  // 3. 중앙 상태 객체 (브라우저 메모리 보관)
  // ==========================================================================
  const state = {
    date: getTodayDateString(),
    gradeGroup: 'middle', // 'lower' (1-2), 'middle' (3-4), 'upper' (5-6)
    allMenusText: '',
    allMenus: [],
    selectedMenu: '',
    calorie: '',
    story: '',
    nutrients: [],
    quiz: {
      question: '',
      options: ['', '', ''],
      correctIndex: 0,
      explanation: ''
    },
    userSelectedQuizAnswer: null,
    starsCollected: 0 // 스탠바이미 퀴즈 별점 보상 카운터
  };

  function getTodayDateString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // ==========================================================================
  // 4. 오디오 피드백 시스템 (Web Audio API - 외부 음원 무의존 100% 작동)
  // ==========================================================================
  const SoundFX = {
    audioCtx: null,
    getAudioContext: function () {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    },
    playCorrectChime: function () {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
      });
    },
    playWrongHint: function () {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(261.63, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    },
    playTouchPop: function () {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  };

  // ==========================================================================
  // 5. DOM 요소 참조
  // ==========================================================================
  const DOM = {
    // 폼 입력 요소
    dateInput: document.getElementById('meal-date-input'),
    gradeBtns: document.querySelectorAll('.grade-btn'),
    allMenusInput: document.getElementById('all-menus-input'),
    selectedMenuSelect: document.getElementById('selected-menu-select'),
    presetOpenBtn: document.getElementById('btn-open-presets'),
    storyInput: document.getElementById('food-story-input'),
    nutrientListContainer: document.getElementById('nutrient-items-container'),
    addNutrientBtn: document.getElementById('btn-add-nutrient'),
    quizQuestionInput: document.getElementById('quiz-question-input'),
    quizOption0: document.getElementById('quiz-opt-0'),
    quizOption1: document.getElementById('quiz-opt-1'),
    quizOption2: document.getElementById('quiz-opt-2'),
    quizRadio0: document.getElementById('quiz-radio-0'),
    quizRadio1: document.getElementById('quiz-radio-1'),
    quizRadio2: document.getElementById('quiz-radio-2'),
    quizExplanationInput: document.getElementById('quiz-explanation-input'),

    // 상단 및 제어 버튼
    btnOpenStanbyme: document.getElementById('btn-open-stanbyme'),
    btnExportJson: document.getElementById('btn-export-json'),
    btnImportJson: document.getElementById('btn-import-json'),
    jsonFileInput: document.getElementById('json-file-input'),
    btnReset: document.getElementById('btn-reset-form'),

    // 학교 검색 & 나이스 연동 배너 요소
    currentSchoolDisplay: document.getElementById('current-school-display'),
    btnOpenSchoolSearch: document.getElementById('btn-open-school-search'),
    schoolSyncStatus: document.getElementById('school-sync-status'),
    btnFetchNeis: document.getElementById('btn-fetch-neis'),

    // 우측 미리보기 툴바 액션
    btnStanbymeToolbar: document.getElementById('btn-stanbyme-toolbar'),
    btnTvFullscreen: document.getElementById('btn-tv-fullscreen'),
    btnSaveImage: document.getElementById('btn-save-image'),
    btnPrint: document.getElementById('btn-print'),

    // 미리보기 카드 영역
    previewCard: document.getElementById('preview-card'),
    previewDateText: document.getElementById('preview-date-text'),
    previewGradeBadge: document.getElementById('preview-grade-badge'),
    previewCalorieBadge: document.getElementById('preview-calorie-badge'),
    previewCalorieText: document.getElementById('preview-calorie-text'),
    previewMenuBar: document.getElementById('preview-menu-bar'),
    previewMenuList: document.getElementById('preview-menu-list'),
    previewHeroTitle: document.getElementById('preview-hero-title'),
    previewHeroIcon: document.getElementById('preview-hero-icon'),
    previewStoryText: document.getElementById('preview-story-text'),
    previewNutrientGrid: document.getElementById('preview-nutrient-grid'),
    previewQuizBox: document.getElementById('preview-quiz-box'),
    previewQuizQuestion: document.getElementById('preview-quiz-question'),
    previewQuizOptions: document.getElementById('preview-quiz-options'),
    previewQuizExplanation: document.getElementById('preview-quiz-explanation'),
    previewQuizExpText: document.getElementById('preview-quiz-exp-text'),

    // 모달 및 토스트
    tvModal: document.getElementById('tv-modal'),
    tvModalCloseBtn: document.getElementById('btn-close-tv-modal'),
    tvModalCardHost: document.getElementById('tv-modal-card-host'),
    presetModal: document.getElementById('preset-modal'),
    presetModalCloseBtn: document.getElementById('btn-close-preset-modal'),
    presetListContainer: document.getElementById('preset-list-container'),
    toastContainer: document.getElementById('toast-container'),

    // 학교 검색 모달
    schoolSearchModal: document.getElementById('school-search-modal'),
    btnCloseSchoolModal: document.getElementById('btn-close-school-modal'),
    schoolKeywordInput: document.getElementById('school-keyword-input'),
    btnExecuteSchoolSearch: document.getElementById('btn-execute-school-search'),
    schoolSearchResults: document.getElementById('school-search-results'),

    // 스탠바이미 전용 DOM 요소
    stanbymeKioskView: document.getElementById('stanbyme-kiosk-view'),
    stanbymeDateBadge: document.getElementById('stanbyme-date-badge'),
    stanbymeStarCount: document.getElementById('stanbyme-star-count'),
    stanbymeGradeTabs: document.querySelectorAll('.stanbyme-grade-tab'),
    btnCloseStanbyme: document.getElementById('btn-close-stanbyme'),
    stanbymeDishList: document.getElementById('stanbyme-dish-list'),
    stanbymeHeroIcon: document.getElementById('stanbyme-hero-icon'),
    stanbymeHeroTitle: document.getElementById('stanbyme-hero-title'),
    stanbymeStoryText: document.getElementById('stanbyme-story-text'),
    stanbymeNutTitle: document.getElementById('stanbyme-nut-title'),
    stanbymeNutrientGrid: document.getElementById('stanbyme-nutrient-grid'),
    stanbymeQuizBadge: document.getElementById('stanbyme-quiz-badge'),
    stanbymeQuizQuestion: document.getElementById('stanbyme-quiz-question'),
    stanbymeQuizOptions: document.getElementById('stanbyme-quiz-options'),
    stanbymeQuizFeedback: document.getElementById('stanbyme-quiz-feedback'),
    stanbymeFbIcon: document.getElementById('stanbyme-fb-icon'),
    stanbymeFbTitle: document.getElementById('stanbyme-fb-title'),
    stanbymeFbText: document.getElementById('stanbyme-fb-text')
  };

  // ==========================================================================
  // 6. 초기화 및 이벤트 리스너 등록
  // ==========================================================================
  function init() {
    // 1. 이벤트 바인딩
    DOM.dateInput.addEventListener('change', onDateChange);
    DOM.gradeBtns.forEach(btn => {
      btn.addEventListener('click', () => onGradeChange(btn.dataset.grade));
    });
    DOM.allMenusInput.addEventListener('input', onAllMenusInput);
    DOM.selectedMenuSelect.addEventListener('change', onSelectedMenuChange);
    DOM.storyInput.addEventListener('input', onStoryInput);
    DOM.addNutrientBtn.addEventListener('click', () => addNutrientItem('', '', true));

    // 퀴즈 입력 리스너
    DOM.quizQuestionInput.addEventListener('input', onQuizInputChange);
    DOM.quizOption0.addEventListener('input', onQuizInputChange);
    DOM.quizOption1.addEventListener('input', onQuizInputChange);
    DOM.quizOption2.addEventListener('input', onQuizInputChange);
    [DOM.quizRadio0, DOM.quizRadio1, DOM.quizRadio2].forEach((radio, index) => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          state.quiz.correctIndex = index;
          state.userSelectedQuizAnswer = null;
          renderPreview();
          if (DOM.stanbymeKioskView.classList.contains('active')) {
            renderStanbymeKiosk();
          }
        }
      });
    });
    DOM.quizExplanationInput.addEventListener('input', onQuizInputChange);

    // 모달 & 버튼 이벤트
    DOM.presetOpenBtn.addEventListener('click', openPresetModal);
    DOM.presetModalCloseBtn.addEventListener('click', closePresetModal);
    DOM.btnTvFullscreen.addEventListener('click', openTvModal);
    DOM.tvModalCloseBtn.addEventListener('click', closeTvModal);

    // 학교 검색 모달 이벤트
    if (DOM.btnOpenSchoolSearch) DOM.btnOpenSchoolSearch.addEventListener('click', openSchoolSearchModal);
    if (DOM.btnCloseSchoolModal) DOM.btnCloseSchoolModal.addEventListener('click', closeSchoolSearchModal);
    if (DOM.schoolSearchModal) {
      DOM.schoolSearchModal.addEventListener('click', (e) => {
        if (e.target === DOM.schoolSearchModal) closeSchoolSearchModal();
      });
    }
    if (DOM.btnExecuteSchoolSearch && DOM.schoolKeywordInput) {
      DOM.btnExecuteSchoolSearch.addEventListener('click', () => {
        searchSchoolByName(DOM.schoolKeywordInput.value);
      });
      DOM.schoolKeywordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          searchSchoolByName(DOM.schoolKeywordInput.value);
        }
      });
    }

    // 스탠바이미 오픈/닫기 버튼
    if (DOM.btnOpenStanbyme) DOM.btnOpenStanbyme.addEventListener('click', openStanbymeKiosk);
    if (DOM.btnStanbymeToolbar) DOM.btnStanbymeToolbar.addEventListener('click', openStanbymeKiosk);
    if (DOM.btnCloseStanbyme) DOM.btnCloseStanbyme.addEventListener('click', closeStanbymeKiosk);

    // 스탠바이미 내 학년 탭 전환
    if (DOM.stanbymeGradeTabs) {
      DOM.stanbymeGradeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          SoundFX.playTouchPop();
          onGradeChange(tab.dataset.grade);
          syncStanbymeGradeTabs();
        });
      });
    }

    // 나이스 수동 새로고침 버튼
    if (DOM.btnFetchNeis) {
      DOM.btnFetchNeis.addEventListener('click', () => {
        fetchNeisMeal(state.date);
      });
    }

    // ESC 키로 모달 닫기
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeTvModal();
        closePresetModal();
        closeSchoolSearchModal();
        closeStanbymeKiosk();
      }
    });

    // 백업 & 복원
    DOM.btnExportJson.addEventListener('click', exportDataAsJson);
    DOM.btnImportJson.addEventListener('click', () => DOM.jsonFileInput.click());
    DOM.jsonFileInput.addEventListener('change', handleJsonFileImport);
    DOM.btnReset.addEventListener('click', confirmAndReset);

    // 인쇄 & 이미지 다운로드
    DOM.btnPrint.addEventListener('click', handlePrint);
    DOM.btnSaveImage.addEventListener('click', handleSaveImage);

    // 모달 배경 클릭 시 닫기
    DOM.presetModal.addEventListener('click', (e) => {
      if (e.target === DOM.presetModal) closePresetModal();
    });
    DOM.tvModal.addEventListener('click', (e) => {
      if (e.target === DOM.tvModal) closeTvModal();
    });

    // 2. 프리셋 리스트 렌더링
    renderPresetModalList();

    // 3. 현재 학교 표시 업데이트 및 오늘의 급식 자동 연동 실행
    updateSchoolDisplay();
    DOM.dateInput.value = state.date;
    fetchNeisMeal(state.date);

    // 4. URL에 #stanbyme가 있으면 스탠바이미 모드로 자동 진입
    if (window.location.hash === '#stanbyme' || window.location.search.includes('stanbyme')) {
      setTimeout(openStanbymeKiosk, 600);
    }
  }

  // ==========================================================================
  // 7. 전국 학교 검색 기능 (교육부 나이스 schoolInfo API)
  // ==========================================================================
  async function searchSchoolByName(keyword) {
    if (!keyword || !keyword.trim()) {
      showToast('검색할 학교 이름을 입력해주세요.', 'warning');
      return;
    }

    DOM.schoolSearchResults.innerHTML = '<p style="text-align: center; color: var(--color-mint-primary); padding: 2rem 0; font-weight: 700;">🔄 나이스(NEIS)에서 학교를 검색하는 중입니다...</p>';

    const url = `https://open.neis.go.kr/hub/schoolInfo?Type=json&SCHUL_NM=${encodeURIComponent(keyword.trim())}`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data && data.schoolInfo && data.schoolInfo[1] && data.schoolInfo[1].row) {
        const schools = data.schoolInfo[1].row;
        renderSchoolSearchResults(schools);
      } else {
        DOM.schoolSearchResults.innerHTML = '<p style="text-align: center; color: #dc2626; padding: 2rem 0; font-weight: 600;">검색 결과가 없습니다. 학교명을 다시 확인해주세요.</p>';
      }
    } catch (err) {
      DOM.schoolSearchResults.innerHTML = '<p style="text-align: center; color: #dc2626; padding: 2rem 0; font-weight: 600;">학교 검색 중 오류가 발생했습니다. 네트워크를 확인하세요.</p>';
    }
  }

  function renderSchoolSearchResults(schools) {
    DOM.schoolSearchResults.innerHTML = '';

    schools.forEach(sch => {
      const card = document.createElement('div');
      card.className = 'preset-card-item';
      card.style.display = 'flex';
      card.style.justifyContent = 'space-between';
      card.style.alignItems = 'center';
      card.style.background = '#ffffff';

      const info = document.createElement('div');
      info.style.display = 'flex';
      info.style.flexDirection = 'column';
      info.style.gap = '0.2rem';

      const title = document.createElement('span');
      title.className = 'preset-card-name';
      title.textContent = sch.SCHUL_NM;

      const sub = document.createElement('span');
      sub.className = 'preset-card-tag';
      sub.textContent = `${sch.ATPT_OFCDC_SC_NM} · ${sch.LCTN_SC_NM} (${sch.SCHUL_KND_SC_NM || '학교'}) - ${sch.ORG_RDNMA || ''}`;

      info.appendChild(title);
      info.appendChild(sub);

      const selectBtn = document.createElement('button');
      selectBtn.type = 'button';
      selectBtn.className = 'btn btn-primary btn-sm';
      selectBtn.textContent = '이 학교 선택';

      card.appendChild(info);
      card.appendChild(selectBtn);

      card.addEventListener('click', () => {
        SoundFX.playTouchPop();
        currentSchool = {
          name: sch.SCHUL_NM,
          officeCode: sch.ATPT_OFCDC_SC_CODE,
          schoolCode: sch.SD_SCHUL_CODE,
          location: sch.LCTN_SC_NM
        };
        closeSchoolSearchModal();
        updateSchoolDisplay();
        fetchNeisMeal(state.date);
        showToast(`[${sch.SCHUL_NM}] 식단을 나이스에서 불러옵니다!`, 'success');
      });

      DOM.schoolSearchResults.appendChild(card);
    });
  }

  function updateSchoolDisplay() {
    if (DOM.currentSchoolDisplay) {
      DOM.currentSchoolDisplay.textContent = `🏫 ${currentSchool.name}`;
    }
    const stanbymeTag = document.querySelector('.stanbyme-school-tag span:last-child');
    if (stanbymeTag) {
      stanbymeTag.textContent = `${currentSchool.name} 오늘의 식생활 탐험대`;
    }
    const previewBadge = document.querySelector('.card-school-badge span:last-child');
    if (previewBadge) {
      previewBadge.textContent = `${currentSchool.name} 오늘의 급식 식생활 이야기`;
    }
  }

  function openSchoolSearchModal() {
    SoundFX.playTouchPop();
    if (DOM.schoolSearchModal) DOM.schoolSearchModal.classList.add('active');
  }

  function closeSchoolSearchModal() {
    if (DOM.schoolSearchModal) DOM.schoolSearchModal.classList.remove('active');
  }

  // ==========================================================================
  // 8. 스탠바이미(StanbyME) 전용 인터랙티브 키오스크 컨트롤러
  // ==========================================================================
  function openStanbymeKiosk() {
    SoundFX.playTouchPop();
    DOM.stanbymeKioskView.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.location.hash !== '#stanbyme') {
      window.location.hash = 'stanbyme';
    }

    syncStanbymeGradeTabs();
    renderStanbymeKiosk();
    showToast('📱 스탠바이미 터치 모드가 켜졌습니다. 식단을 자유롭게 터치해 보세요!', 'success');
  }

  function closeStanbymeKiosk() {
    SoundFX.playTouchPop();
    DOM.stanbymeKioskView.classList.remove('active');
    document.body.style.overflow = '';
    if (window.location.hash === '#stanbyme') {
      history.replaceState(null, null, ' ');
    }
  }

  function syncStanbymeGradeTabs() {
    if (!DOM.stanbymeGradeTabs) return;
    DOM.stanbymeGradeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.grade === state.gradeGroup);
    });
  }

  function selectDish(menuName) {
    SoundFX.playTouchPop();
    state.selectedMenu = menuName;
    DOM.selectedMenuSelect.value = menuName;

    applyFoodStoryAndQuiz(menuName);

    DOM.storyInput.value = state.story;
    syncQuizInputsFromState();

    renderPreview();
    if (DOM.stanbymeKioskView.classList.contains('active')) {
      renderStanbymeKiosk();
    }
  }

  function renderStanbymeKiosk() {
    const formattedDate = formatDateKorean(state.date);
    if (DOM.stanbymeDateBadge) {
      DOM.stanbymeDateBadge.textContent = `${formattedDate} 식단`;
    }
    if (DOM.stanbymeStarCount) {
      DOM.stanbymeStarCount.textContent = state.starsCollected;
    }

    DOM.stanbymeDishList.innerHTML = '';
    state.allMenus.forEach(menu => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `stanbyme-dish-btn ${menu === state.selectedMenu ? 'active' : ''}`;

      const matchedKnowledge = findKnowledgeForDish(menu);
      const icon = matchedKnowledge ? matchedKnowledge.icon : '🍽️';

      btn.innerHTML = `
        <span class="stanbyme-dish-icon">${icon}</span>
        <span class="stanbyme-dish-name">${menu}</span>
      `;

      btn.addEventListener('click', () => selectDish(menu));
      DOM.stanbymeDishList.appendChild(btn);
    });

    const curMatched = findKnowledgeForDish(state.selectedMenu);
    if (DOM.stanbymeHeroIcon) DOM.stanbymeHeroIcon.textContent = curMatched ? curMatched.icon : '🍽️';
    if (DOM.stanbymeHeroTitle) DOM.stanbymeHeroTitle.textContent = state.selectedMenu || '오늘의 급식';
    if (DOM.stanbymeStoryText) DOM.stanbymeStoryText.textContent = state.story;

    DOM.stanbymeNutrientGrid.innerHTML = '';
    const validNutrients = state.nutrients.filter(n => n.name && n.name.trim());
    if (validNutrients.length > 0) {
      validNutrients.forEach(n => {
        const card = document.createElement('div');
        card.className = 'stanbyme-nut-card';
        card.innerHTML = `
          <div class="stanbyme-nut-name">🌱 ${n.name}</div>
          <div class="stanbyme-nut-benefit">${n.benefit || '성장과 활력을 도와줘요.'}</div>
        `;
        DOM.stanbymeNutrientGrid.appendChild(card);
      });
    }

    renderStanbymeQuiz();
  }

  function renderStanbymeQuiz() {
    const q = state.quiz;
    if (!q || !q.question.trim()) {
      DOM.stanbymeQuizQuestion.textContent = '문제를 준비 중입니다.';
      DOM.stanbymeQuizOptions.innerHTML = '';
      DOM.stanbymeQuizFeedback.classList.remove('show');
      return;
    }

    DOM.stanbymeQuizQuestion.textContent = `Q. ${q.question}`;
    DOM.stanbymeQuizOptions.innerHTML = '';

    const validOptions = q.options.filter(opt => opt && opt.trim());
    validOptions.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'stanbyme-option-btn';

      const textSpan = document.createElement('span');
      textSpan.textContent = `${idx + 1}. ${optText}`;
      btn.appendChild(textSpan);

      const statusSpan = document.createElement('span');
      statusSpan.style.fontSize = '1.35rem';

      if (state.userSelectedQuizAnswer !== null) {
        if (idx === state.quiz.correctIndex) {
          btn.classList.add('correct');
          statusSpan.textContent = '정답! 👏';
        } else if (idx === state.userSelectedQuizAnswer) {
          btn.classList.add('wrong');
          statusSpan.textContent = '다시 해볼까요? 💡';
        }
      }

      btn.appendChild(statusSpan);

      btn.addEventListener('click', () => {
        state.userSelectedQuizAnswer = idx;
        if (idx === state.quiz.correctIndex) {
          SoundFX.playCorrectChime();
          state.starsCollected += 1;
          if (DOM.stanbymeStarCount) DOM.stanbymeStarCount.textContent = state.starsCollected;
          showFeedback(true, '와! 정답입니다! ⭐ 별 1개를 획득했어요!', q.explanation);
        } else {
          SoundFX.playWrongHint();
          showFeedback(false, '아쉬워요! 다시 한번 생각해보세요!', q.explanation);
        }
        renderStanbymeQuiz();
        renderPreview();
      });

      DOM.stanbymeQuizOptions.appendChild(btn);
    });

    if (state.userSelectedQuizAnswer !== null) {
      DOM.stanbymeQuizFeedback.classList.add('show');
      DOM.stanbymeFbText.textContent = q.explanation || '우리 몸에 좋은 급식을 골고루 맛있게 먹어요!';
    } else {
      DOM.stanbymeQuizFeedback.classList.remove('show');
    }
  }

  function showFeedback(isCorrect, title, explanation) {
    if (!DOM.stanbymeQuizFeedback) return;
    DOM.stanbymeQuizFeedback.classList.add('show');
    if (isCorrect) {
      DOM.stanbymeQuizFeedback.style.borderColor = '#86efac';
      DOM.stanbymeQuizFeedback.style.background = '#f0fdf4';
      DOM.stanbymeFbIcon.textContent = '🎉';
      DOM.stanbymeFbTitle.style.color = '#15803d';
    } else {
      DOM.stanbymeQuizFeedback.style.borderColor = '#fca5a5';
      DOM.stanbymeQuizFeedback.style.background = '#fff1f2';
      DOM.stanbymeFbIcon.textContent = '💡';
      DOM.stanbymeFbTitle.style.color = '#b91c1c';
    }
    DOM.stanbymeFbTitle.textContent = title;
    DOM.stanbymeFbText.textContent = explanation || '';
  }

  // ==========================================================================
  // 9. 교육부 나이스(NEIS) 오픈 API 실시간 급식 연동
  // ==========================================================================
  async function fetchNeisMeal(dateString) {
    if (!dateString) return;

    const ymd = dateString.replace(/-/g, '');
    updateSyncStatus('loading', `🔄 ${currentSchool.name} 급식 조회 중...`);

    const apiUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=${currentSchool.officeCode}&SD_SCHUL_CODE=${currentSchool.schoolCode}&MLSV_YMD=${ymd}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`서버 응답 오류 (HTTP ${response.status})`);
      }

      const data = await response.json();

      if (data && data.mealServiceDietInfo && data.mealServiceDietInfo[1] && data.mealServiceDietInfo[1].row) {
        const row = data.mealServiceDietInfo[1].row[0];
        applyNeisMealData(row, dateString);
      } else {
        handleNoMealDay(dateString);
      }
    } catch (err) {
      console.warn('나이스 API 연동 실패, 수동 모드 유지:', err);
      updateSyncStatus('warning', '⚠️ 나이스 통신 지연 (수동 작성 모드)');
      showToast('나이스 연결이 원활하지 않아 수동 작성 모드로 전환합니다.', 'warning');
      renderPreview();
    }
  }

  function applyNeisMealData(row, dateString) {
    const rawDish = row.DDISH_NM || '';
    const cleanMenus = rawDish
      .split(/<br\s*\/?>|\n/i)
      .map(item => item.replace(/\([0-9.\s]+\)/g, '').replace(/\([가-힣\s]+\)/g, '').trim())
      .filter(Boolean);

    state.date = dateString;
    state.allMenus = cleanMenus;
    state.allMenusText = cleanMenus.join(', ');
    state.calorie = row.CAL_INFO ? row.CAL_INFO.trim() : '';

    state.selectedMenu = pickBestHeroMenu(cleanMenus);
    state.nutrients = parseNeisNutrients(row.NTR_INFO);
    applyFoodStoryAndQuiz(state.selectedMenu);

    syncFormFromState();
    renderPreview();
    if (DOM.stanbymeKioskView.classList.contains('active')) {
      renderStanbymeKiosk();
    }

    const calNotice = state.calorie ? ` (${state.calorie})` : '';
    updateSyncStatus('success', `✅ ${currentSchool.name} 급식 연동 성공${calNotice}`);
    showToast(`[${currentSchool.name}] ${formatDateKorean(dateString)} 식단을 정상 불러왔습니다!`, 'success');
  }

  async function handleNoMealDay(dateString) {
    updateSyncStatus('warning', `⚠️ ${dateString}은 ${currentSchool.name} 급식이 없는 날(주말/휴일)입니다.`);

    const dayOfWeek = new Date(dateString).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      const recentFriday = getRecentFriday(dateString);
      showToast(`${dateString}은 주말이어서 최근 급식일(${recentFriday}) 식단을 확인합니다.`, 'info');
      state.date = recentFriday;
      DOM.dateInput.value = recentFriday;
      fetchNeisMeal(recentFriday);
    } else {
      showToast(`${dateString}은 ${currentSchool.name} 급식이 등록되지 않은 날(방학/학사일정)입니다.`, 'warning');
      renderPreview();
    }
  }

  function getRecentFriday(currentDateStr) {
    const d = new Date(currentDateStr);
    const day = d.getDay();
    const diff = (day === 6) ? 1 : 2;
    d.setDate(d.getDate() - diff);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  function pickBestHeroMenu(menus) {
    if (!menus || menus.length === 0) return '오늘의 대표 메뉴';
    const priorityKeywords = ['꽃게', '도라지', '혼합밥', '잡곡밥', '밥', '스테이크', '불고기', '갈비', '삼치', '닭', '돈가스', '탕', '찌개', '비빔밥', '카레', '마파두부', '미역국', '생선'];

    for (const kw of priorityKeywords) {
      const found = menus.find(m => m.includes(kw));
      if (found) return found;
    }

    if (menus.length >= 2) return menus[1];
    return menus[0];
  }

  function parseNeisNutrients(ntrText) {
    if (!ntrText) {
      return [
        { name: '단백질', benefit: '성장기 어린이의 뼈와 튼튼한 근육을 만들어줘요.', verified: true },
        { name: '칼슘', benefit: '뼈와 치아를 튼튼하게 하고 키 성장을 도와요.', verified: true },
        { name: '비타민 C', benefit: '면역력을 높여 감기를 예방하고 피로를 풀어줘요.', verified: true }
      ];
    }

    const lines = ntrText.split(/<br\s*\/?>|\n/i);
    const parsed = [];

    const nutrientMap = {
      '단백질': '성장기 근육 형성과 면역 세포를 만드는 필수 영양소예요.',
      '칼슘': '뼈와 치아를 단단하게 구성하고 키 성장을 도와요.',
      '비타민A': '어두운 곳에서도 시력을 지켜주고 피부 건강을 도와요.',
      '비타민C': '몸속 활성산소를 억제하고 감기 등 바이러스를 막아줘요.',
      '철분': '혈액 속 산소를 온몸으로 운반해 활기찬 에너지를 줘요.',
      '티아민': '에너지 대사를 촉진하여 공부 피로를 싹 풀어줘요.',
      '리보플라빈': '구강 건강과 세포 성장, 시각 기능을 도와줘요.'
    };

    lines.forEach(line => {
      const match = line.match(/^([가-힣A-Za-z]+)\s*(\([^\)]+\))?\s*:\s*([0-9.]+)/);
      if (match) {
        const rawName = match[1];
        const unit = match[2] || '';
        const value = match[3];

        for (const [key, benefitText] of Object.entries(nutrientMap)) {
          if (rawName.includes(key)) {
            parsed.push({
              name: `${rawName} ${unit ? unit.replace(/[()]/g, '') : ''} (${value})`,
              benefit: benefitText,
              verified: true
            });
            break;
          }
        }
      }
    });

    return parsed.length > 0 ? parsed.slice(0, 4) : [
      { name: '검증된 영양소', benefit: '영양선생님의 균형 잡힌 식단입니다.', verified: true }
    ];
  }

  function findKnowledgeForDish(dishName) {
    if (!dishName) return null;
    return FOOD_KNOWLEDGE_BASE.find(item => item.keywords.some(kw => dishName.includes(kw)));
  }

  function applyFoodStoryAndQuiz(menuName) {
    const matched = findKnowledgeForDish(menuName);

    if (matched) {
      state.story = matched.story;
      const q = matched.quiz[state.gradeGroup] || matched.quiz.middle;
      state.quiz = {
        question: q.question,
        options: [...q.options],
        correctIndex: q.correctIndex,
        explanation: q.explanation
      };
    } else {
      state.story = `오늘 ${currentSchool.name} 급식의 맛있는 음식은 바로 [${menuName}]입니다!\n\n영양선생님께서 우리 친구들이 건강하고 튼튼하게 자라도록 신선하고 좋은 재료로 정성껏 준비해 주셨어요. 한 입 한 입 꼭꼭 씹어 먹으면 우리 몸에 필요한 활력 에너지가 샘솟는답니다.`;
      state.quiz = {
        question: `오늘 급식 식단인 [${menuName}]을 올바르고 건강하게 먹는 방법은?`,
        options: [
          '밥과 다른 반찬들과 함께 골고루 섭취한다',
          '좋아하는 것만 골라 먹고 나머지는 버린다',
          '씹지 않고 급하게 삼킨다'
        ],
        correctIndex: 0,
        explanation: `${menuName}은(는) 다양한 영양소로 조리되어 다른 음식과 골고루 먹을 때 우리 몸에 가장 좋습니다.`
      };
    }

    state.userSelectedQuizAnswer = null;
  }

  function updateSyncStatus(type, message) {
    if (!DOM.schoolSyncStatus) return;
    DOM.schoolSyncStatus.className = `sync-status-text ${type}`;
    DOM.schoolSyncStatus.textContent = message;
  }

  // ==========================================================================
  // 10. 폼 & 상태 동기화 핸들러
  // ==========================================================================
  function onDateChange(e) {
    const newDate = e.target.value.trim();
    if (newDate) {
      state.date = newDate;
      fetchNeisMeal(newDate);
    }
  }

  function onGradeChange(newGrade) {
    state.gradeGroup = newGrade;
    DOM.gradeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.grade === newGrade);
    });

    applyFoodStoryAndQuiz(state.selectedMenu);
    syncQuizInputsFromState();
    renderPreview();
    if (DOM.stanbymeKioskView.classList.contains('active')) {
      renderStanbymeKiosk();
    }
    showToast(`${getGradeGroupLabel(newGrade)} 맞춤 설정이 적용되었습니다.`, 'success');
  }

  function onAllMenusInput(e) {
    state.allMenusText = e.target.value;
    const parsed = state.allMenusText
      .split(/[,·/\n]/)
      .map(m => m.trim())
      .filter(Boolean);

    state.allMenus = parsed;
    updateSelectedMenuDropdown();
    renderPreview();
    if (DOM.stanbymeKioskView.classList.contains('active')) {
      renderStanbymeKiosk();
    }
  }

  function updateSelectedMenuDropdown() {
    const select = DOM.selectedMenuSelect;
    const previousSelected = state.selectedMenu;
    select.innerHTML = '';

    if (state.allMenus.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = '메뉴를 먼저 입력해주세요';
      select.appendChild(opt);
      state.selectedMenu = '';
      return;
    }

    state.allMenus.forEach(menu => {
      const opt = document.createElement('option');
      opt.value = menu;
      opt.textContent = menu;
      select.appendChild(opt);
    });

    if (state.allMenus.includes(previousSelected)) {
      select.value = previousSelected;
    } else {
      select.value = state.allMenus[0];
      state.selectedMenu = state.allMenus[0];
    }
  }

  function onSelectedMenuChange(e) {
    selectDish(e.target.value);
  }

  function onStoryInput(e) {
    state.story = e.target.value;
    renderPreview();
    if (DOM.stanbymeKioskView.classList.contains('active')) {
      renderStanbymeKiosk();
    }
  }

  function onQuizInputChange() {
    state.quiz.question = DOM.quizQuestionInput.value.trim();
    state.quiz.options[0] = DOM.quizOption0.value.trim();
    state.quiz.options[1] = DOM.quizOption1.value.trim();
    state.quiz.options[2] = DOM.quizOption2.value.trim();
    state.quiz.explanation = DOM.quizExplanationInput.value.trim();
    state.userSelectedQuizAnswer = null;
    renderPreview();
    if (DOM.stanbymeKioskView.classList.contains('active')) {
      renderStanbymeKiosk();
    }
  }

  // ==========================================================================
  // 11. 영양소 동적 행 관리 (추가, 수정, 삭제)
  // ==========================================================================
  function addNutrientItem(name = '', benefit = '', verified = true) {
    const item = { name, benefit, verified };
    state.nutrients.push(item);
    renderNutrientFormRows();
    renderPreview();
  }

  function removeNutrientItem(index) {
    state.nutrients.splice(index, 1);
    renderNutrientFormRows();
    renderPreview();
  }

  function renderNutrientFormRows() {
    const container = DOM.nutrientListContainer;
    container.innerHTML = '';

    if (state.nutrients.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'empty-nutrient-warning';
      emptyDiv.textContent = '⚠️ 등록된 영양정보가 없습니다. [+ 영양소 추가] 버튼을 눌러주세요.';
      container.appendChild(emptyDiv);
      return;
    }

    state.nutrients.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'nutrient-item';

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'form-control';
      nameInput.placeholder = '영양소명 (예: 단백질)';
      nameInput.value = item.name;
      nameInput.addEventListener('input', (e) => {
        item.name = e.target.value.trim();
        renderPreview();
      });

      const benefitInput = document.createElement('input');
      benefitInput.type = 'text';
      benefitInput.className = 'form-control';
      benefitInput.placeholder = '역할/효능 (예: 근육 성장을 도와요)';
      benefitInput.value = item.benefit;
      benefitInput.addEventListener('input', (e) => {
        item.benefit = e.target.value.trim();
        renderPreview();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn btn-outline-danger btn-sm';
      deleteBtn.title = '이 영양소 삭제';
      deleteBtn.textContent = '✕ 삭제';
      deleteBtn.addEventListener('click', () => removeNutrientItem(index));

      row.appendChild(nameInput);
      row.appendChild(benefitInput);
      row.appendChild(deleteBtn);
      container.appendChild(row);
    });
  }

  // ==========================================================================
  // 12. 추천 메뉴 모달 및 수동 선택
  // ==========================================================================
  function renderPresetModalList() {
    const container = DOM.presetListContainer;
    container.innerHTML = '';

    FOOD_KNOWLEDGE_BASE.forEach(preset => {
      const card = document.createElement('div');
      card.className = 'preset-card-item';
      card.addEventListener('click', () => {
        loadPreset(preset, true);
        closePresetModal();
      });

      const iconSpan = document.createElement('span');
      iconSpan.className = 'preset-card-icon';
      iconSpan.textContent = preset.icon;

      const infoDiv = document.createElement('div');
      infoDiv.className = 'preset-card-info';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'preset-card-name';
      nameSpan.textContent = preset.hero;

      const tagSpan = document.createElement('span');
      tagSpan.className = 'preset-card-tag';
      tagSpan.textContent = preset.keywords.join(' · ');

      infoDiv.appendChild(nameSpan);
      infoDiv.appendChild(tagSpan);
      card.appendChild(iconSpan);
      card.appendChild(infoDiv);

      container.appendChild(card);
    });
  }

  function loadPreset(preset, showToastNotice = true) {
    selectDish(preset.hero);

    if (showToastNotice) {
      showToast(`[${preset.hero}] 교육자료가 자동으로 채워졌습니다.`, 'success');
    }
  }

  function openPresetModal() {
    DOM.presetModal.classList.add('active');
  }

  function closePresetModal() {
    DOM.presetModal.classList.remove('active');
  }

  // ==========================================================================
  // 13. 폼 UI 동기화 (State -> Form UI)
  // ==========================================================================
  function syncFormFromState() {
    DOM.dateInput.value = state.date;
    DOM.gradeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.grade === state.gradeGroup);
    });
    DOM.allMenusInput.value = state.allMenusText;
    updateSelectedMenuDropdown();
    DOM.selectedMenuSelect.value = state.selectedMenu;
    DOM.storyInput.value = state.story;

    renderNutrientFormRows();
    syncQuizInputsFromState();
  }

  function syncQuizInputsFromState() {
    DOM.quizQuestionInput.value = state.quiz.question;
    DOM.quizOption0.value = state.quiz.options[0] || '';
    DOM.quizOption1.value = state.quiz.options[1] || '';
    DOM.quizOption2.value = state.quiz.options[2] || '';

    DOM.quizRadio0.checked = state.quiz.correctIndex === 0;
    DOM.quizRadio1.checked = state.quiz.correctIndex === 1;
    DOM.quizRadio2.checked = state.quiz.correctIndex === 2;

    DOM.quizExplanationInput.value = state.quiz.explanation;
  }

  // ==========================================================================
  // 14. 실시간 미리보기 렌더링 (학생 터치 지원 칩 연결)
  // ==========================================================================
  function renderPreview() {
    const card = DOM.previewCard;

    card.classList.remove('grade-lower', 'grade-middle', 'grade-upper');
    card.classList.add(`grade-${state.gradeGroup}`);

    const formattedDate = formatDateKorean(state.date);
    DOM.previewDateText.textContent = formattedDate ? `${formattedDate} 오늘의 급식 이야기` : '날짜를 입력해주세요';
    DOM.previewGradeBadge.textContent = getGradeGroupLabel(state.gradeGroup);

    if (state.calorie && DOM.previewCalorieBadge && DOM.previewCalorieText) {
      DOM.previewCalorieBadge.style.display = 'inline-flex';
      DOM.previewCalorieText.textContent = state.calorie;
    } else if (DOM.previewCalorieBadge) {
      DOM.previewCalorieBadge.style.display = 'none';
    }

    DOM.previewMenuList.innerHTML = '';
    if (state.allMenus.length > 0) {
      DOM.previewMenuBar.style.display = 'flex';
      state.allMenus.forEach((menu) => {
        const chip = document.createElement('span');
        chip.className = 'interactive-dish-chip';
        chip.textContent = menu;
        chip.title = `${menu} 탐구하기 (클릭 시 이야기와 퀴즈가 전환됩니다)`;

        if (menu === state.selectedMenu) {
          chip.style.color = '#0d9488';
          chip.style.fontWeight = '800';
          chip.style.background = '#ccfbf1';
          chip.style.border = '1px solid #2dd4bf';
        }

        chip.addEventListener('click', () => {
          selectDish(menu);
        });

        DOM.previewMenuList.appendChild(chip);
      });
    } else {
      DOM.previewMenuBar.style.display = 'none';
    }

    const heroMenuName = state.selectedMenu || (state.allMenus[0] || '오늘의 급식 메뉴');
    DOM.previewHeroTitle.textContent = heroMenuName;

    const matchedKnowledge = findKnowledgeForDish(heroMenuName);
    DOM.previewHeroIcon.textContent = matchedKnowledge ? matchedKnowledge.icon : '🍽️';

    DOM.previewStoryText.textContent = state.story || `맛있고 영양 가득한 ${currentSchool.name} 급식 시간 되세요!`;

    DOM.previewNutrientGrid.innerHTML = '';
    const validNutrients = state.nutrients.filter(n => n.name && n.name.trim());

    if (validNutrients.length > 0) {
      validNutrients.forEach(n => {
        const nutCard = document.createElement('div');
        nutCard.className = 'nutrient-card';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'nutrient-card-name';
        nameDiv.textContent = `🌱 ${n.name}`;

        const benefitDiv = document.createElement('div');
        benefitDiv.className = 'nutrient-card-benefit';
        benefitDiv.textContent = n.benefit || '성장과 활력을 돕습니다.';

        nutCard.appendChild(nameDiv);
        nutCard.appendChild(benefitDiv);
        DOM.previewNutrientGrid.appendChild(nutCard);
      });
    } else {
      const warnDiv = document.createElement('div');
      warnDiv.className = 'empty-nutrient-warning';
      warnDiv.innerHTML = '<span>⚠️</span> <span>[영양 정보 확인 필요] 실제 검증된 영양 정보를 좌측에 입력해주세요.</span>';
      DOM.previewNutrientGrid.appendChild(warnDiv);
    }

    renderQuizInteractive();

    if (DOM.tvModal.classList.contains('active')) {
      syncTvModalContent();
    }
  }

  function renderQuizInteractive() {
    const q = state.quiz;
    if (!q.question.trim()) {
      DOM.previewQuizQuestion.textContent = '오늘의 퀴즈 문제를 입력해주세요.';
      DOM.previewQuizOptions.innerHTML = '';
      DOM.previewQuizExplanation.classList.remove('show');
      return;
    }

    DOM.previewQuizQuestion.textContent = `Q. ${q.question}`;
    DOM.previewQuizOptions.innerHTML = '';

    const validOptions = q.options.filter(opt => opt && opt.trim());
    validOptions.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-choice-btn';

      const textSpan = document.createElement('span');
      textSpan.textContent = `${idx + 1}. ${optText}`;
      btn.appendChild(textSpan);

      const statusSpan = document.createElement('span');
      statusSpan.style.fontWeight = '700';

      if (state.userSelectedQuizAnswer !== null) {
        if (idx === state.quiz.correctIndex) {
          btn.classList.add('selected-correct');
          statusSpan.textContent = '정답! 👏';
        } else if (idx === state.userSelectedQuizAnswer) {
          btn.classList.add('selected-wrong');
          statusSpan.textContent = '다시 생각해보세요 💡';
        }
      }

      btn.appendChild(statusSpan);

      btn.addEventListener('click', () => {
        state.userSelectedQuizAnswer = idx;
        if (idx === state.quiz.correctIndex) {
          SoundFX.playCorrectChime();
        } else {
          SoundFX.playWrongHint();
        }
        renderQuizInteractive();
      });

      DOM.previewQuizOptions.appendChild(btn);
    });

    if (state.userSelectedQuizAnswer !== null) {
      DOM.previewQuizExplanation.classList.add('show');
      DOM.previewQuizExpText.textContent = q.explanation || '우리 몸에 좋은 급식을 골고루 맛있게 먹어요!';
    } else {
      DOM.previewQuizExplanation.classList.remove('show');
    }
  }

  function formatDateKorean(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    return `${parts[0]}년 ${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일`;
  }

  function getGradeGroupLabel(grade) {
    switch (grade) {
      case 'lower': return '초등 저학년 (1~2학년)';
      case 'middle': return '초등 중학년 (3~4학년)';
      case 'upper': return '초등 고학년 (5~6학년)';
      default: return '전학년 대상';
    }
  }

  // ==========================================================================
  // 15. TV 전체화면 모달 송출 기능
  // ==========================================================================
  function openTvModal() {
    if (!state.date || !state.selectedMenu) {
      showToast('급식 날짜와 메뉴를 먼저 입력해주세요.', 'warning');
      return;
    }
    syncTvModalContent();
    DOM.tvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeTvModal() {
    DOM.tvModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function syncTvModalContent() {
    DOM.tvModalCardHost.innerHTML = '';
    const clone = DOM.previewCard.cloneNode(true);
    clone.id = 'tv-preview-clone';

    const cloneButtons = clone.querySelectorAll('.quiz-choice-btn');
    cloneButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        state.userSelectedQuizAnswer = idx;
        if (idx === state.quiz.correctIndex) {
          SoundFX.playCorrectChime();
        } else {
          SoundFX.playWrongHint();
        }
        renderPreview();
      });
    });

    DOM.tvModalCardHost.appendChild(clone);
  }

  // ==========================================================================
  // 16. JSON 내보내기 & 불러오기 (데이터 보관)
  // ==========================================================================
  function exportDataAsJson() {
    if (!state.date || !state.selectedMenu) {
      showToast('날짜와 메뉴를 먼저 입력해주세요.', 'warning');
      return;
    }

    const payload = {
      app: 'nutrition-edu-generator',
      school: currentSchool.name,
      version: '1.0',
      exportedAt: new Date().toISOString(),
      date: state.date,
      gradeGroup: state.gradeGroup,
      allMenusText: state.allMenusText,
      allMenus: state.allMenus,
      selectedMenu: state.selectedMenu,
      calorie: state.calorie,
      story: state.story,
      nutrients: state.nutrients,
      quiz: state.quiz
    };

    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeDate = state.date.replace(/-/g, '');
    const safeMenu = state.selectedMenu.replace(/\s+/g, '_');
    a.href = url;
    a.download = `${currentSchool.name}_급식영양자료_${safeDate}_${safeMenu}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('JSON 백업 파일이 저장되었습니다.', 'success');
  }

  function handleJsonFileImport(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const data = JSON.parse(event.target.result);

        if (!data || typeof data !== 'object') {
          throw new Error('유효한 JSON 파일이 아닙니다.');
        }

        if (!data.date && !data.selectedMenu && !data.allMenus) {
          throw new Error('영양자료 자동 생성기의 호환 데이터 형식이 아닙니다.');
        }

        state.date = data.date || getTodayDateString();
        state.gradeGroup = ['lower', 'middle', 'upper'].includes(data.gradeGroup) ? data.gradeGroup : 'middle';
        state.allMenusText = data.allMenusText || (Array.isArray(data.allMenus) ? data.allMenus.join(', ') : '');
        state.allMenus = Array.isArray(data.allMenus) ? data.allMenus : (data.allMenusText ? data.allMenusText.split(',').map(m => m.trim()) : []);
        state.selectedMenu = data.selectedMenu || (state.allMenus[0] || '오늘의 메뉴');
        state.calorie = data.calorie || '';
        state.story = data.story || '';
        state.nutrients = Array.isArray(data.nutrients) ? data.nutrients : [];
        if (data.quiz && typeof data.quiz === 'object') {
          state.quiz = {
            question: data.quiz.question || '',
            options: Array.isArray(data.quiz.options) ? data.quiz.options : ['', '', ''],
            correctIndex: typeof data.quiz.correctIndex === 'number' ? data.quiz.correctIndex : 0,
            explanation: data.quiz.explanation || ''
          };
        }
        state.userSelectedQuizAnswer = null;

        syncFormFromState();
        renderPreview();
        if (DOM.stanbymeKioskView.classList.contains('active')) {
          renderStanbymeKiosk();
        }
        showToast('자료가 성공적으로 복원되었습니다.', 'success');
      } catch (err) {
        showToast(`파일 불러오기 실패: ${err.message}`, 'error');
      } finally {
        DOM.jsonFileInput.value = '';
      }
    };

    reader.onerror = function () {
      showToast('파일을 읽는 중 오류가 발생했습니다.', 'error');
      DOM.jsonFileInput.value = '';
    };

    reader.readAsText(file, 'utf-8');
  }

  function confirmAndReset() {
    if (confirm('모든 입력 내용이 초기화됩니다. 계속하시겠습니까?\n(중요한 내용은 [JSON 백업]으로 미리 저장하세요.)')) {
      state.date = getTodayDateString();
      state.gradeGroup = 'middle';
      state.allMenusText = '';
      state.allMenus = [];
      state.selectedMenu = '';
      state.calorie = '';
      state.story = '';
      state.nutrients = [];
      state.quiz = {
        question: '',
        options: ['', '', ''],
        correctIndex: 0,
        explanation: ''
      };
      state.userSelectedQuizAnswer = null;
      state.starsCollected = 0;

      syncFormFromState();
      renderPreview();
      showToast('입력 폼이 초기화되었습니다.', 'warning');
    }
  }

  // ==========================================================================
  // 17. 인쇄 및 Canvas 2D 고해상도 PNG 이미지 다운로드 엔진
  // ==========================================================================
  function handlePrint() {
    if (!state.date || !state.selectedMenu) {
      showToast('날짜와 메뉴를 먼저 입력해주세요.', 'warning');
      return;
    }
    window.print();
  }

  function handleSaveImage() {
    if (!state.date || !state.selectedMenu) {
      showToast('날짜와 메뉴를 먼저 입력해주세요.', 'warning');
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = 1200;
      const height = 1580;
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0d9488';
      ctx.fillRect(0, 0, width, 14);

      ctx.strokeStyle = '#99f6e4';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      ctx.fillStyle = '#0d9488';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(`🏫 ${currentSchool.name} 오늘의 급식 식생활 이야기`, 70, 95);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 44px sans-serif';
      const formattedDate = formatDateKorean(state.date);
      ctx.fillText(formattedDate ? `${formattedDate} 급식 이야기` : '오늘의 급식 이야기', 70, 155);

      ctx.fillStyle = '#e6f7f3';
      ctx.fillRect(width - 340, 105, 270, 50);
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(width - 340, 105, 270, 50);

      ctx.fillStyle = '#0f766e';
      ctx.font = 'bold 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(getGradeGroupLabel(state.gradeGroup), width - 205, 138);
      ctx.textAlign = 'left';

      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(70, 185);
      ctx.lineTo(width - 70, 185);
      ctx.stroke();
      ctx.setLineDash([]);

      let currentY = 215;
      if (state.allMenus.length > 0) {
        ctx.fillStyle = '#f0fdfa';
        ctx.fillRect(70, currentY, width - 140, 55);
        ctx.strokeStyle = '#ccfbf1';
        ctx.strokeRect(70, currentY, width - 140, 55);

        ctx.fillStyle = '#0d9488';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('오늘의 식단: ', 90, currentY + 36);

        ctx.fillStyle = '#334155';
        ctx.font = '600 22px sans-serif';
        const menuString = state.allMenus.join('  ·  ');
        ctx.fillText(menuString, 230, currentY + 36);
        currentY += 80;
      }

      ctx.fillStyle = '#e6f7f3';
      ctx.fillRect(70, currentY, width - 140, 105);
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 2;
      ctx.strokeRect(70, currentY, width - 140, 105);

      ctx.fillStyle = '#0d9488';
      ctx.font = 'bold 20px sans-serif';
      const calText = state.calorie ? ` · 열량: ${state.calorie}` : '';
      ctx.fillText(`오늘의 영양 주인공 메뉴${calText}`, 95, currentY + 38);

      ctx.fillStyle = '#115e59';
      ctx.font = '800 36px sans-serif';
      ctx.fillText(state.selectedMenu || '오늘의 대표 메뉴', 95, currentY + 82);

      const matchedKnowledge = findKnowledgeForDish(state.selectedMenu);
      ctx.font = '55px sans-serif';
      ctx.fillText(matchedKnowledge ? matchedKnowledge.icon : '🍽️', width - 165, currentY + 74);
      currentY += 135;

      ctx.fillStyle = '#0d9488';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('📖 오늘의 음식 이야기', 70, currentY);
      currentY += 40;

      ctx.fillStyle = '#1e293b';
      ctx.font = '22px sans-serif';
      const storyLines = wrapText(ctx, state.story || '맛있고 건강한 급식 시간 되세요!', width - 140);
      storyLines.forEach(line => {
        ctx.fillText(line, 70, currentY);
        currentY += 36;
      });
      currentY += 25;

      ctx.fillStyle = '#0d9488';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('🥦 우리 몸을 튼튼하게 하는 영양 정보', 70, currentY);
      currentY += 35;

      const validNutrients = state.nutrients.filter(n => n.name && n.name.trim());
      if (validNutrients.length > 0) {
        validNutrients.forEach(n => {
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(70, currentY, width - 140, 50);
          ctx.strokeStyle = '#e2e8f0';
          ctx.strokeRect(70, currentY, width - 140, 50);

          ctx.fillStyle = '#0f766e';
          ctx.font = 'bold 22px sans-serif';
          ctx.fillText(`• ${n.name}`, 90, currentY + 33);

          ctx.fillStyle = '#475569';
          ctx.font = '20px sans-serif';
          ctx.fillText(n.benefit || '건강 증진에 도움을 줍니다.', 320, currentY + 33);

          currentY += 60;
        });
      } else {
        ctx.fillStyle = '#fffbeb';
        ctx.fillRect(70, currentY, width - 140, 50);
        ctx.strokeStyle = '#fde68a';
        ctx.strokeRect(70, currentY, width - 140, 50);

        ctx.fillStyle = '#b45309';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('⚠️ [영양 정보 확인 필요] 검증된 수치 및 성분을 입력해주세요.', 90, currentY + 33);
        currentY += 65;
      }
      currentY += 20;

      if (state.quiz.question.trim()) {
        ctx.fillStyle = '#0284c7';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('❓ 신나는 오늘의 영양 퀴즈!', 70, currentY);
        currentY += 40;

        ctx.fillStyle = '#0369a1';
        ctx.font = 'bold 24px sans-serif';
        const qLines = wrapText(ctx, `Q. ${state.quiz.question}`, width - 140);
        qLines.forEach(line => {
          ctx.fillText(line, 70, currentY);
          currentY += 34;
        });
        currentY += 10;

        state.quiz.options.forEach((opt, idx) => {
          if (!opt) return;
          const isCorrect = (idx === state.quiz.correctIndex);
          ctx.fillStyle = isCorrect ? '#ecfdf5' : '#f8fafc';
          ctx.fillRect(70, currentY, width - 140, 48);
          ctx.strokeStyle = isCorrect ? '#10b981' : '#cbd5e1';
          ctx.strokeRect(70, currentY, width - 140, 48);

          ctx.fillStyle = isCorrect ? '#065f46' : '#334155';
          ctx.font = '600 21px sans-serif';
          ctx.fillText(`${idx + 1}. ${opt} ${isCorrect ? ' (★ 정답)' : ''}`, 90, currentY + 32);

          currentY += 56;
        });

        if (state.quiz.explanation) {
          ctx.fillStyle = '#15803d';
          ctx.font = 'italic 19px sans-serif';
          ctx.fillText(`💡 해설: ${state.quiz.explanation}`, 70, currentY + 20);
        }
      }

      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      const safeDate = state.date.replace(/-/g, '');
      const safeMenu = (state.selectedMenu || '급식').replace(/\s+/g, '_');
      a.href = dataUrl;
      a.download = `${currentSchool.name}_영양교육자료_${safeDate}_${safeMenu}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      showToast(`${currentSchool.name} 고해상도 PNG 이미지가 다운로드되었습니다.`, 'success');
    } catch (err) {
      showToast(`이미지 저장 중 오류 발생: ${err.message}`, 'error');
    }
  }

  function wrapText(ctx, text, maxWidth) {
    const words = text.split('\n');
    const lines = [];

    words.forEach(paragraph => {
      let currentLine = '';
      for (let i = 0; i < paragraph.length; i++) {
        const char = paragraph[i];
        const testLine = currentLine + char;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = char;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        lines.push(currentLine);
      }
    });

    return lines;
  }

  // ==========================================================================
  // 18. 알림 토스트 UI 헬퍼
  // ==========================================================================
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';
    if (type === 'error') icon = '❌';

    toast.textContent = `${icon} ${message}`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // DOM 로드 완료 시 애플리케이션 시작
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
