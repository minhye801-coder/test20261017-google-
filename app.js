/**
 * 영양자료 자동 생성기 (app.js)
 * 초등 영양교사용 급식 연계 식생활 교육자료 제작 엔진
 * 무의존성 순수 Vanilla JavaScript (GitHub Pages 정적 호스팅 100% 호환)
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. 초등학교 다빈도 10대 추천 급식 메뉴 사전 데이터베이스
  // ==========================================================================
  const MENU_PRESETS = [
    {
      id: 'bibimbap',
      name: '알록달록 비빔밥',
      icon: '🥗',
      tag: '전통 식문화 / 골고루 먹기',
      wholeMenu: '보리밥, 팽이버섯된장국, 알록달록비빔밥, 달걀후라이, 깍두기, 사과',
      story: '비빔밥은 밥 위에 여러 가지 고운 색깔의 나물과 고기, 달걀을 얹어 비벼 먹는 우리나라의 대표적인 전통 음식이에요.\n\n옛날 선조들은 한 해의 마지막 날 남은 반찬을 모두 비벼 먹거나, 농번기에 일손을 덜기 위해 함께 비벼 먹으며 지혜를 나눴답니다. 초록 시금치, 주황 당근, 노란 달걀이 어우러져 오방색의 아름다움과 영양의 균형을 모두 담고 있어요.',
      nutrients: [
        { name: '비타민 A', benefit: '시금치와 당근에 가득하여 어두운 곳에서도 눈을 밝게 지켜줘요.', verified: true },
        { name: '식이섬유', benefit: '나물 속 섬유질이 배 속 장운동을 도와 소화를 원활하게 해줘요.', verified: true },
        { name: '단백질', benefit: '달걀과 소고기가 키가 쑥쑥 자라고 튼튼한 근육을 만들도록 도와줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '비빔밥 속에 들어간 주황색 당근은 우리 몸의 어디를 건강하게 해줄까요?',
          options: ['눈을 초롱초롱하게 해줘요', '이를 썩게 만들어요', '잠이 오게 해요'],
          correctIndex: 0,
          explanation: '당근에 풍부한 비타민 A는 우리 눈을 맑고 튼튼하게 지켜주는 소중한 영양소랍니다.'
        },
        middle: {
          question: '비빔밥의 여러 색깔 채소와 단백질 식품을 골고루 먹으면 좋은 점은 무엇일까요?',
          options: ['탄수화물만 편식하게 된다', '오방색 영양소가 몸의 면역력을 골고루 높여준다', '물을 적게 마시게 된다'],
          correctIndex: 1,
          explanation: '비빔밥은 5가지 색상의 고명 채소와 고기가 어우러져 균형 잡힌 영양을 공급해 줍니다.'
        },
        upper: {
          question: '전통 비빔밥에 담긴 조상들의 식생활 지혜로 가장 적절한 것은 무엇일까요?',
          options: ['칼로리만 높여 과식을 유도한다', '여러 식품군을 한 그릇에 담아 영양적 상호보완을 실현했다', '서양 패스트푸드를 모방했다'],
          correctIndex: 1,
          explanation: '비빔밥은 채소의 무기질/비타민과 곡류의 탄수화물, 육류의 단백질이 한 그릇에서 최적의 영양 밸런스를 이룹니다.'
        }
      }
    },
    {
      id: 'miyeokguk',
      name: '쇠고기미역국',
      icon: '🍲',
      tag: '생일·축하 / 바다의 채소',
      wholeMenu: '현미밥, 쇠고기미역국, 돈육간장불고기, 콩나물무침, 배추김치, 귤',
      story: '미역국은 우리가 태어난 날이나 어머니의 은혜를 기리는 날에 꼭 먹는 따뜻한 음식이에요.\n\n바다에서 자라는 미역은 고려 시대부터 아이를 낳은 산모에게 끓여주던 건강식이었어요. 바다의 풍부한 미네랄을 품고 있어 몸속 피를 맑게 정화하고 뼈를 튼튼하게 가꾸어 준답니다.',
      nutrients: [
        { name: '요오드', benefit: '갑상선 건강과 성장 호르몬 분비를 도와 쑥쑥 자라게 해요.', verified: true },
        { name: '칼슘', benefit: '우유 못지않게 칼슘이 많아 뼈와 치아를 튼튼하게 해줘요.', verified: true },
        { name: '철분', benefit: '쇠고기와 미역이 만나 피를 맑게 하고 빈혈을 예방해 줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '미역처럼 바다에서 나는 초록 채소에는 뼈를 단단하게 만드는 어떤 영양소가 많을까요?',
          options: ['설탕', '칼슘', '기름'],
          correctIndex: 1,
          explanation: '미역에는 칼슘이 아주 풍부하여 우리 뼈와 치아를 단단하게 만들어줍니다.'
        },
        middle: {
          question: '우리 조상들이 생일에 미역국을 먹기 시작한 아름다운 유래는 무엇일까요?',
          options: ['어머니가 나를 낳고 고생하신 사랑에 감사하기 위해', '미역이 가장 싼 재료여서', '외국에서 전해진 파티 문화여서'],
          correctIndex: 0,
          explanation: '출산 후 산모의 건강 회복을 돕던 미역국을 생일에 먹으며 어머니의 은혜에 감사하는 전통입니다.'
        },
        upper: {
          question: '미역에 풍부한 미끌미끌한 수용성 식이섬유인 알긴산(Alginic acid)의 주요 효능은?',
          options: ['몸속 노폐물과 중금속을 흡착해 배출한다', '혈당을 급격히 높인다', '치아를 부식시킨다'],
          correctIndex: 0,
          explanation: '미역의 끈적한 알긴산 성분은 장내 유해물질과 중금속을 몸 밖으로 배출해 주는 청소부 역할을 합니다.'
        }
      }
    },
    {
      id: 'jeyuk',
      name: '제육볶음',
      icon: '🥩',
      tag: '피로회복 / 양질의 단백질',
      wholeMenu: '흑미밥, 아욱된장국, 매콤달콤제육볶음, 상추쌈·쌈장, 깍두기, 요구르트',
      story: '제육볶음의 "제육"은 돼지고기를 뜻하는 옛말 "저육(猪肉)"에서 유래되었어요.\n\n양파, 대파, 마늘 등 향긋한 양념 채소와 함께 볶아내어 돼지고기의 누린내를 잡고 풍미를 극대화한 한국인의 소울푸드랍니다. 쌈 채소와 함께 싸서 먹으면 고기와 비타민을 완벽하게 섭취할 수 있어요.',
      nutrients: [
        { name: '비타민 B1 (티아민)', benefit: '소고기의 10배에 달해 공부와 운동으로 쌓인 피로를 싹 풀어줘요.', verified: true },
        { name: '양질의 단백질', benefit: '성장기 근육과 피부, 장기를 구성하는 필수 아미노산이 듬뿍 들어있어요.', verified: true },
        { name: '알리신 (마늘·파)', benefit: '돼지고기의 비타민 B1 흡수율을 10배 이상 높여 활력을 줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '제육볶음을 먹을 때 초록색 상추나 깻잎에 싸서 먹으면 왜 좋을까요?',
          options: ['고기와 채소의 영양소를 골고루 먹을 수 있어서', '고기 맛을 없애려고', '양이 적어 보이게 하려고'],
          correctIndex: 0,
          explanation: '고기(단백질)와 상추(비타민·섬유질)를 함께 먹으면 소화도 잘되고 영양 균형이 최고가 된답니다!'
        },
        middle: {
          question: '돼지고기에 특히 풍부하여 피로를 덜어주고 에너지를 뿜어내게 돕는 비타민은?',
          options: ['비타민 D', '비타민 B1', '비타민 K'],
          correctIndex: 1,
          explanation: '돼지고기에는 젖산 축적을 막고 탄수화물 대사를 촉진하는 비타민 B1이 풍부합니다.'
        },
        upper: {
          question: '제육볶음 양념에 마늘과 양파를 함께 사용하는 식품학적 원리는 무엇일까요?',
          options: ['알리신 성분이 티아민과 결합해 흡수율을 높이는 알리티아민을 형성한다', '고기를 상하게 만든다', '단백질을 응고시킨다'],
          correctIndex: 0,
          explanation: '마늘의 알리신과 돼지고기의 티아민이 결합하여 활성 비타민인 알리티아민을 만들어 체내 흡수를 돕습니다.'
        }
      }
    },
    {
      id: 'curry',
      name: '골드 카레라이스',
      icon: '🍛',
      tag: '항산화 / 두뇌 활력',
      wholeMenu: '골드카레라이스, 맑은유부장국, 닭봉구이, 단무지무침, 깍두기, 청포도',
      story: '노란 황금빛 카레는 인도에서 시작되어 전 세계 어린이들의 사랑을 받는 메뉴예요.\n\n강황, 쿠민, 코리앤더 등 10가지가 넘는 향신료와 함께 큼직한 감자, 당근, 양파가 듬뿍 들어가 채소를 편식하는 친구들도 맛있게 먹을 수 있답니다.',
      nutrients: [
        { name: '커큐민 (강황)', benefit: '노란빛 성분으로 머리를 맑게 하고 몸속 나쁜 염증을 없애줘요.', verified: true },
        { name: '베타카로틴 (당근)', benefit: '체내에서 비타민 A로 바뀌어 감염병을 막고 면역력을 키워줘요.', verified: true },
        { name: '복합 탄수화물', benefit: '감자와 밥이 오후 수업 시간 동안 지치지 않는 두뇌 에너지를 줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '카레를 예쁜 노란색으로 만들어 주는 마법의 식물 영양소는 무엇일까요?',
          options: ['초콜릿', '강황(커큐민)', '소금'],
          correctIndex: 1,
          explanation: '카레의 샛노란 색은 강황 속에 든 "커큐민"이라는 건강 성분 덕분이에요.'
        },
        middle: {
          question: '카레 속 강황의 커큐민 성분이 우리 어린이들에게 주는 좋은 효능은?',
          options: ['집중력을 높이고 두뇌 건강과 면역력을 돕는다', '치아를 흔들리게 한다', '피부를 거칠게 한다'],
          correctIndex: 0,
          explanation: '커큐민은 뇌세포 보호와 항산화 작용으로 공부하는 학생들의 두뇌 건강에 큰 도움이 됩니다.'
        },
        upper: {
          question: '카레의 주원료인 강황 속 커큐민의 체내 흡수율을 높이기 위해 함께 조리하면 좋은 성분은?',
          options: ['지방(유지류) 및 후추(피페린)', '다량의 설탕', '차가운 탄산음료'],
          correctIndex: 0,
          explanation: '지용성 물질인 커큐민은 기름에 볶고 후추의 피페린과 함께 섭취할 때 생체이용률이 극대화됩니다.'
        }
      }
    },
    {
      id: 'tonkatsu',
      name: '수제 등심돈가스',
      icon: '🍱',
      tag: '성장기 파워 / 단백질',
      wholeMenu: '기장밥, 팽이버섯미소국, 수제등심돈가스, 양배추샐러드, 배추김치, 바나나',
      story: '바삭바삭한 소리가 일품인 돈가스는 우리 친구들이 가장 좋아하는 급식 메뉴 중 하나예요!\n\n고기를 부드럽게 두드려 빵가루를 묻혀 튀겨낸 돈가스는 성장기 어린이에게 꼭 필요한 단백질을 보충해 줍니다. 아삭한 양배추 샐러드와 함께 먹으면 기름기를 씻어주고 소화가 훨씬 잘된답니다.',
      nutrients: [
        { name: '동물성 단백질', benefit: '키와 뼈, 근육을 키워주는 8가지 필수 아미노산이 균형 있게 들어있어요.', verified: true },
        { name: '비타민 U (양배추)', benefit: '위벽을 부드럽게 감싸 튀김 음식을 편안하게 소화하도록 도와줘요.', verified: true },
        { name: '아연', benefit: '상처 회복을 돕고 면역 세포를 건강하게 유지해 줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '바삭한 돈가스를 먹을 때 접시 옆에 있는 양배추 샐러드를 꼭 같이 먹어야 하는 이유는?',
          options: ['위장을 편안하게 지켜주고 소화를 도와줘서', '장식용이라 버려야 해서', '돈가스를 식히려고'],
          correctIndex: 0,
          explanation: '양배추에 든 비타민 U는 위를 보호하여 튀긴 고기를 속 쓰림 없이 건강하게 소화시켜 줘요.'
        },
        middle: {
          question: '돼지고기 등심 부위의 특징으로 올바른 것은?',
          options: ['지방이 적고 양질의 단백질이 풍부하여 성장기에 좋다', '영양소가 전혀 없다', '소화가 전혀 안 된다'],
          correctIndex: 0,
          explanation: '등심은 결이 곱고 지방이 적절하며 근육 형성에 최적화된 양질의 단백질 덩어리입니다.'
        },
        upper: {
          question: '육류 튀김 조리 시 신선한 식물성 기름 사용과 샐러드 곁들임이 영양학적으로 중요한 이유는?',
          options: ['산화 스트레스를 줄이고 식이섬유로 콜레스테롤 흡수를 완화하기 위해', '칼로리를 0으로 만들기 위해', '식품 안전 기준을 낮추기 위해'],
          correctIndex: 0,
          explanation: '적정 온도의 신선한 기름 조리와 신선 채소의 식이섬유는 지질 흡수 조절과 소화기 건강을 동시에 돕습니다.'
        }
      }
    },
    {
      id: 'dakdoritang',
      name: '닭볶음탕',
      icon: '🍗',
      tag: '면역력 증진 / 소화가 쏙쏙',
      wholeMenu: '기장밥, 어묵무국, 닭볶음탕, 시금치나물, 깍두기, 우유',
      story: '닭볶음탕은 부드러운 닭고기에 감자, 당근, 양파를 넣고 감칠맛 나는 양념장으로 자작하게 조려낸 일품요리예요.\n\n닭고기는 소나 돼지보다 섬유질이 가늘고 연해서 어린 친구들의 장에서도 소화 흡수가 아주 빠르답니다.',
      nutrients: [
        { name: '필수 아미노산', benefit: '세포 재생을 돕고 두뇌 활동을 활발하게 촉진해요.', verified: true },
        { name: '칼륨 (감자)', benefit: '몸속 불필요한 나트륨을 배출하여 혈액순환을 건강하게 해줘요.', verified: true },
        { name: '비타민 C (양념 채소)', benefit: '환절기 감기를 예방하고 피부 저항력을 높여줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '닭고기가 소고기나 돼지고기보다 어린이 배 속에서 좋은 점은 무엇일까요?',
          options: ['고기가 연해서 소화가 아주 잘 돼요', '딱딱해서 씹기 힘들어요', '매운맛이 강해요'],
          correctIndex: 0,
          explanation: '닭고기는 결이 가늘고 부드러워 어린이 위장에서도 소화 흡수가 쏙쏙 잘됩니다.'
        },
        middle: {
          question: '닭볶음탕에 큼직하게 들어간 감자에 풍부하여 체내 나트륨 배출을 돕는 무기질은?',
          options: ['칼륨', '설탕', '탄소'],
          correctIndex: 0,
          explanation: '감자의 풍부한 칼륨은 적절한 수분 균형과 나트륨 배출을 도와 혈액순환을 돕습니다.'
        },
        upper: {
          question: '닭고기의 단백질 영양가(Protein Quality)에 대한 설명으로 옳은 것은?',
          options: ['체내 합성이 불가능한 필수 아미노산 조성이 우수한 완전단백질이다', '콜라겐만 들어있다', '식물성 식품보다 소화율이 떨어진다'],
          correctIndex: 0,
          explanation: '닭고기는 8가지 필수 아미노산이 모두 포함된 생물가 높은 완전단백질 식품입니다.'
        }
      }
    },
    {
      id: 'janchi',
      name: '잔치국수',
      icon: '🍜',
      tag: '축하와 장수 / 따뜻한 온기',
      wholeMenu: '잔치국수, 미니밥, 해물동그랑땡, 배추김치, 방울토마토',
      story: '잔치국수는 예로부터 마을의 잔칫날이나 결혼식, 회갑연처럼 기쁘고 경사스러운 날에 손님을 대접하던 귀한 음식이에요.\n\n국수의 긴 면발처럼 "오래오래 건강하게 장수하라"는 따뜻한 축복의 의미가 담겨 있답니다. 멸치와 다시마를 진하게 우려낸 맑은 국물이 속을 따뜻하게 데워줘요.',
      nutrients: [
        { name: '복합 탄수화물', benefit: '지친 오후 시간에 신속하게 에너지를 채워 집중력을 올려줘요.', verified: true },
        { name: '칼슘·타우린 (멸치 육수)', benefit: '멸치와 다시마 속 영양소가 피로를 풀어주고 뼈를 튼튼하게 해요.', verified: true },
        { name: '호박·달걀 고명 영양', benefit: '면만 먹을 때 부족하기 쉬운 단백질과 비타민을 완벽하게 채워줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '옛날 조상들이 기쁜 잔칫날마다 긴 국수를 끓여 먹었던 소원은 무엇일까요?',
          options: ['건강하게 오래오래 살라는 소원', '키가 줄어들라는 소원', '잠을 많이 자라는 소원'],
          correctIndex: 0,
          explanation: '길쭉한 국수 면발처럼 아프지 않고 오래오래 건강하게 살라는 축복을 나누었답니다.'
        },
        middle: {
          question: '잔치국수를 먹을 때 면만 먹지 않고 애호박, 달걀지단 고명을 함께 먹어야 하는 이유는?',
          options: ['탄수화물과 함께 단백질과 비타민을 고루 보충하기 위해', '국수를 식히기 위해', '색깔만 보기 위해'],
          correctIndex: 0,
          explanation: '국수(탄수화물)에 달걀(단백질), 애호박/당근(비타민)이 더해져 완벽한 영양 한 그릇이 됩니다.'
        },
        upper: {
          question: '국수 육수의 주재료인 마른 멸치와 다시마가 제공하는 주요 미량 영양소는?',
          options: ['천연 글루탐산, 칼슘, 마그네슘 등 필수 미네랄', '포화지방', '단순 당류'],
          correctIndex: 0,
          explanation: '다시마의 글루탐산과 멸치의 이노신산이 감칠맛을 내며, 풍부한 무기질을 제공합니다.'
        }
      }
    },
    {
      id: 'tteokguk',
      name: '사골 떡국',
      icon: '🥣',
      tag: '새해의 소망 / 칼슘 가득',
      wholeMenu: '사골떡국, 쌀밥(소), 고등어구이, 오이도라지생채, 깍두기, 한과',
      story: '떡국은 새해 첫날 온 가족이 모여 한 살을 더 먹으며 순결하고 번창하길 기원하던 대표 명절 음식이에요.\n\n하얗고 긴 가래떡은 "순수한 마음과 장수"를, 엽전 모양으로 둥글게 썬 떡은 "풍요로운 재물과 행복"을 상징한답니다. 푹 고아낸 사골 국물이 몸을 든든하게 받쳐줘요.',
      nutrients: [
        { name: '콜라겐·칼슘', benefit: '사골 육수 속 영양소가 성장판과 관절을 유연하고 튼튼하게 해요.', verified: true },
        { name: '에너지원 탄수화물', benefit: '쌀가루로 빚은 가래떡이 두뇌 활동에 필요한 당질 에너지를 줘요.', verified: true },
        { name: '철분 (소고기 고명)', benefit: '피를 맑게 하고 면역력을 튼튼하게 지켜줘요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '가래떡을 동글동글 엽전 모양으로 썰어서 끓이는 떡국의 의미는?',
          options: ['새해에 복과 좋은 일이 가득하라는 의미', '떡을 버리기 아까워서', '빨리 먹으려고'],
          correctIndex: 0,
          explanation: '동글납작한 떡은 옛날 동전(엽전)을 닮아 새해에 복과 풍요가 가득하길 비는 마음이 담겼어요.'
        },
        middle: {
          question: '사골을 정성스레 우려낸 떡국 국물이 뼈 성장에 좋은 이유는?',
          options: ['뼈와 관절을 돕는 칼슘과 콜라겐이 진하게 녹아있어서', '소금이 많이 들어서', '색깔이 하얘서'],
          correctIndex: 0,
          explanation: '사골 국물에는 관절과 뼈 성장을 돕는 칼슘, 인, 콜라겐 성분이 풍부합니다.'
        },
        upper: {
          question: '떡국의 백미(가래떡)에 얽힌 한국 전통 음식문화의 철학적 의미는?',
          options: ['묵은해의 번뇌를 씻고 순백의 정갈한 마음으로 새해를 시작함', '단순한 칼로리 축적', '서구 음식 문화의 도입'],
          correctIndex: 0,
          explanation: '가래떡의 흰색은 순수함과 새로운 시작을, 긴 형태는 무병장수를 상징합니다.'
        }
      }
    },
    {
      id: 'mapatofu',
      name: '영양 마파두부',
      icon: '🍲',
      tag: '밭의 쇠고기 / 두뇌 튼튼',
      wholeMenu: '차수수밥, 계란파국, 영양마파두부, 배추김치, 군만두, 멜론',
      story: '마파두부는 부드러운 두부와 다진 고기를 양념 소스에 맛있게 볶아낸 세계적인 두부 요리예요.\n\n콩으로 만든 두부는 "밭에서 나는 쇠고기"라고 불릴 만큼 단백질이 풍부하면서도 기름기가 적고 부드러워 누구나 소화하기 좋답니다. 밥 위에 쓱쓱 비벼 먹으면 밥 한 공기 뚝딱이에요!',
      nutrients: [
        { name: '대두 단백질 & 이소플라본', benefit: '뼈를 튼튼하게 하고 세포 성장을 촉진해요.', verified: true },
        { name: '레시틴', benefit: '두뇌 신경전달물질의 원료가 되어 기억력과 학습 능력을 높여줘요.', verified: true },
        { name: '식물성 칼슘', benefit: '우유를 잘 소화하지 못하는 친구들도 칼슘을 편하게 보충할 수 있어요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '두부의 원료인 콩이 "밭에서 나는 쇠고기"라고 불리는 멋진 이유는?',
          options: ['고기만큼 훌륭한 단백질이 듬뿍 들어있어서', '밭에서 소가 자라서', '색깔이 갈색이어서'],
          correctIndex: 0,
          explanation: '콩은 식물이지만 쇠고기 못지않은 우수한 단백질을 품고 있어서 그렇게 불린답니다.'
        },
        middle: {
          question: '두부에 풍부하여 두뇌 회전과 기억력 향상에 도움을 주는 영양 성분은?',
          options: ['레시틴', '설탕', '카페인'],
          correctIndex: 0,
          explanation: '콩 속의 레시틴은 뇌세포의 활동을 촉진하고 집중력을 높이는 데 기여합니다.'
        },
        upper: {
          question: '두부의 단백질 소화흡수율이 날콩(약 65%)보다 두부(약 95%)에서 월등히 높은 이유는?',
          options: ['가공 과정에서 세포벽이 파괴되고 트립신 억제물질이 불활성화되었기 때문', '물을 많이 타서', '보존료를 첨가해서'],
          correctIndex: 0,
          explanation: '두부 제조 시 가열 및 응고 과정을 거치며 단백질 저해 인자가 제거되어 체내 흡수율이 95% 이상으로 상승합니다.'
        }
      }
    },
    {
      id: 'samgyetang',
      name: '영양 삼계탕',
      icon: '🍲',
      tag: '체력 보충 / 원기 회복',
      wholeMenu: '영양닭다리삼계탕, 찹쌀밥, 오이고추된장무침, 깍두기, 수박',
      story: '삼계탕은 무더운 여름이나 환절기에 기운이 빠졌을 때 몸을 보양하기 위해 먹는 우리나라 으뜸 전통 건강식이에요.\n\n어린 닭에 찹쌀, 인삼, 대추, 마늘을 넣고 푹 고아내어 국물 한 방울까지 정성과 영양이 가득 담겨 있어요. 먹고 나면 몸이 따뜻해지고 힘이 불끈 솟아나요!',
      nutrients: [
        { name: '고단백질 & 필수 아미노산', benefit: '근육을 튼튼히 하고 지친 면역 체계를 빠르게 재충전해요.', verified: true },
        { name: '마늘·대추의 항산화 성분', benefit: '몸속 활성산소를 억제하여 세포 피로를 덜어줘요.', verified: true },
        { name: '소화 흡수율 우수', benefit: '오랜 시간 푹 고아 기름기를 빼고 영양을 응축해 위장에 부담이 없어요.', verified: true }
      ],
      quiz: {
        lower: {
          question: '삼계탕을 먹고 나면 몸에서 어떤 기분 좋은 변화가 일어날까요?',
          options: ['몸이 따뜻해지고 활기찬 에너지가 샘솟아요', '몸이 꽁꽁 얼어붙어요', '배가 아파요'],
          correctIndex: 0,
          explanation: '삼계탕 속의 따뜻한 영양 성분들이 우리 몸의 혈액순환과 면역력을 높여준답니다.'
        },
        middle: {
          question: '삼계탕 국물 속에 마늘과 대추를 함께 넣고 끓이는 중요한 이유는?',
          options: ['잡내를 없애고 항산화 성분으로 면역력을 강화하기 위해', '닭고기를 딱딱하게 하려고', '색을 검게 만들려고'],
          correctIndex: 0,
          explanation: '마늘과 대추는 닭의 풍미를 돋우고 몸의 산화 스트레스를 완화하는 천연 보약재입니다.'
        },
        upper: {
          question: '전통 이열치열(以熱治熱) 식문화에서 삼계탕을 섭취하는 생리학적 이점은?',
          options: ['체표면 혈류를 개선하고 단백질 보충으로 여름철 대사 소모를 보충한다', '체온을 비정상적으로 급상승시킨다', '소화 효소 분비를 억제한다'],
          correctIndex: 0,
          explanation: '차가운 음료로 인해 위장 기능이 저하되기 쉬운 시기에 온성 식품으로 소화기를 보호하고 양질의 단백질을 보충합니다.'
        }
      }
    }
  ];

  // ==========================================================================
  // 2. 중앙 상태 객체 (브라우저 메모리 보관)
  // ==========================================================================
  const state = {
    date: getTodayDateString(),
    gradeGroup: 'middle', // 'lower' (1-2), 'middle' (3-4), 'upper' (5-6)
    allMenusText: '',
    allMenus: [],
    selectedMenu: '',
    story: '',
    nutrients: [],
    quiz: {
      question: '',
      options: ['', '', ''],
      correctIndex: 0,
      explanation: ''
    },
    userSelectedQuizAnswer: null
  };

  function getTodayDateString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // ==========================================================================
  // 3. DOM 요소 참조
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
    btnExportJson: document.getElementById('btn-export-json'),
    btnImportJson: document.getElementById('btn-import-json'),
    jsonFileInput: document.getElementById('json-file-input'),
    btnReset: document.getElementById('btn-reset-form'),

    // 우측 미리보기 툴바 액션
    btnTvFullscreen: document.getElementById('btn-tv-fullscreen'),
    btnSaveImage: document.getElementById('btn-save-image'),
    btnPrint: document.getElementById('btn-print'),

    // 미리보기 카드 영역
    previewCard: document.getElementById('preview-card'),
    previewDateText: document.getElementById('preview-date-text'),
    previewGradeBadge: document.getElementById('preview-grade-badge'),
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
    toastContainer: document.getElementById('toast-container')
  };

  // ==========================================================================
  // 4. 초기화 및 이벤트 리스너 등록
  // ==========================================================================
  function init() {
    // 1. 기본 추천 메뉴 1번(비빔밥)으로 초기 상태 로드
    loadPreset(MENU_PRESETS[0], false);

    // 2. 폼 이벤트 바인딩
    DOM.dateInput.addEventListener('input', onDateChange);
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
          state.userSelectedQuizAnswer = null; // 정답 변경 시 사용자 선택 초기화
          renderPreview();
        }
      });
    });
    DOM.quizExplanationInput.addEventListener('input', onQuizInputChange);

    // 3. 버튼 이벤트 바인딩
    DOM.presetOpenBtn.addEventListener('click', openPresetModal);
    DOM.presetModalCloseBtn.addEventListener('click', closePresetModal);
    DOM.btnTvFullscreen.addEventListener('click', openTvModal);
    DOM.tvModalCloseBtn.addEventListener('click', closeTvModal);

    // ESC 키로 모달 닫기
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeTvModal();
        closePresetModal();
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

    // 4. 프리셋 리스트 렌더링
    renderPresetModalList();

    // 5. 초기 렌더링
    syncFormFromState();
    renderPreview();
  }

  // ==========================================================================
  // 5. 폼 & 상태 동기화 핸들러
  // ==========================================================================
  function onDateChange(e) {
    state.date = e.target.value.trim();
    renderPreview();
  }

  function onGradeChange(newGrade) {
    state.gradeGroup = newGrade;
    DOM.gradeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.grade === newGrade);
    });

    // 학년 변경 시 적합한 퀴즈 난이도 자동 제안 (만약 현재 선택된 프리셋이 있다면)
    const currentPreset = MENU_PRESETS.find(p => p.name.includes(state.selectedMenu) || state.selectedMenu.includes(p.name));
    if (currentPreset && currentPreset.quiz[newGrade]) {
      const q = currentPreset.quiz[newGrade];
      state.quiz.question = q.question;
      state.quiz.options = [...q.options];
      state.quiz.correctIndex = q.correctIndex;
      state.quiz.explanation = q.explanation;
      state.userSelectedQuizAnswer = null;
      syncQuizInputsFromState();
    }

    renderPreview();
    showToast(`${getGradeGroupLabel(newGrade)} 맞춤 설정이 적용되었습니다.`, 'success');
  }

  function onAllMenusInput(e) {
    state.allMenusText = e.target.value;
    // 콤마, 슬래시, 줄바꿈 등으로 분리
    const parsed = state.allMenusText
      .split(/[,·/\n]/)
      .map(m => m.trim())
      .filter(Boolean);

    state.allMenus = parsed;
    updateSelectedMenuDropdown();
    renderPreview();
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

    // 기존 선택값이 존재하면 유지, 없으면 첫 번째 메뉴 선택
    if (state.allMenus.includes(previousSelected)) {
      select.value = previousSelected;
    } else {
      select.value = state.allMenus[0];
      state.selectedMenu = state.allMenus[0];
    }
  }

  function onSelectedMenuChange(e) {
    state.selectedMenu = e.target.value;
    renderPreview();
  }

  function onStoryInput(e) {
    state.story = e.target.value;
    renderPreview();
  }

  function onQuizInputChange() {
    state.quiz.question = DOM.quizQuestionInput.value.trim();
    state.quiz.options[0] = DOM.quizOption0.value.trim();
    state.quiz.options[1] = DOM.quizOption1.value.trim();
    state.quiz.options[2] = DOM.quizOption2.value.trim();
    state.quiz.explanation = DOM.quizExplanationInput.value.trim();
    state.userSelectedQuizAnswer = null;
    renderPreview();
  }

  // ==========================================================================
  // 6. 영양소 동적 행 관리 (추가, 수정, 삭제)
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
      nameInput.placeholder = '영양소명 (예: 칼슘)';
      nameInput.value = item.name;
      nameInput.addEventListener('input', (e) => {
        item.name = e.target.value.trim();
        renderPreview();
      });

      const benefitInput = document.createElement('input');
      benefitInput.type = 'text';
      benefitInput.className = 'form-control';
      benefitInput.placeholder = '역할/효능 (예: 뼈를 튼튼하게 해요)';
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
  // 7. 추천 10대 메뉴 프리셋 로드
  // ==========================================================================
  function renderPresetModalList() {
    const container = DOM.presetListContainer;
    container.innerHTML = '';

    MENU_PRESETS.forEach(preset => {
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
      nameSpan.textContent = preset.name;

      const tagSpan = document.createElement('span');
      tagSpan.className = 'preset-card-tag';
      tagSpan.textContent = preset.tag;

      infoDiv.appendChild(nameSpan);
      infoDiv.appendChild(tagSpan);
      card.appendChild(iconSpan);
      card.appendChild(infoDiv);

      container.appendChild(card);
    });
  }

  function loadPreset(preset, showToastNotice = true) {
    state.selectedMenu = preset.name;
    state.allMenusText = preset.wholeMenu;
    state.allMenus = preset.wholeMenu.split(/[,·/\n]/).map(m => m.trim()).filter(Boolean);
    state.story = preset.story;
    state.nutrients = JSON.parse(JSON.stringify(preset.nutrients));

    const q = preset.quiz[state.gradeGroup] || preset.quiz.middle;
    state.quiz = {
      question: q.question,
      options: [...q.options],
      correctIndex: q.correctIndex,
      explanation: q.explanation
    };
    state.userSelectedQuizAnswer = null;

    syncFormFromState();
    renderPreview();

    if (showToastNotice) {
      showToast(`[${preset.name}] 교육자료가 자동으로 채워졌습니다.`, 'success');
    }
  }

  function openPresetModal() {
    DOM.presetModal.classList.add('active');
  }

  function closePresetModal() {
    DOM.presetModal.classList.remove('active');
  }

  // ==========================================================================
  // 8. 폼 입력값 동기화 (State -> Form UI)
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
  // 9. 실시간 미리보기 렌더링 (Safe DOM Text Injection)
  // ==========================================================================
  function renderPreview() {
    const card = DOM.previewCard;

    // 1. 학년별 클래스 토글
    card.classList.remove('grade-lower', 'grade-middle', 'grade-upper');
    card.classList.add(`grade-${state.gradeGroup}`);

    // 2. 일자 및 학년 배지
    const formattedDate = formatDateKorean(state.date);
    DOM.previewDateText.textContent = formattedDate ? `${formattedDate} 급식 이야기` : '날짜를 입력해주세요';
    DOM.previewGradeBadge.textContent = getGradeGroupLabel(state.gradeGroup);

    // 3. 전체 메뉴 목록 바
    DOM.previewMenuList.innerHTML = '';
    if (state.allMenus.length > 0) {
      DOM.previewMenuBar.style.display = 'flex';
      state.allMenus.forEach((menu, i) => {
        const span = document.createElement('span');
        span.textContent = (i < state.allMenus.length - 1) ? `${menu} · ` : menu;
        if (menu === state.selectedMenu) {
          span.style.color = '#0d9488';
          span.style.fontWeight = '700';
          span.style.textDecoration = 'underline';
        }
        DOM.previewMenuList.appendChild(span);
      });
    } else {
      DOM.previewMenuBar.style.display = 'none';
    }

    // 4. 오늘의 주인공 메뉴
    const heroMenuName = state.selectedMenu || (state.allMenus[0] || '오늘의 급식 메뉴');
    DOM.previewHeroTitle.textContent = heroMenuName;

    const matchedPreset = MENU_PRESETS.find(p => p.name.includes(heroMenuName) || heroMenuName.includes(p.name));
    DOM.previewHeroIcon.textContent = matchedPreset ? matchedPreset.icon : '🍽️';

    // 5. 음식 이야기
    if (state.story.trim()) {
      DOM.previewStoryText.textContent = state.story;
    } else {
      DOM.previewStoryText.textContent = '좌측 편집기에서 음식 이야기를 작성하거나 [추천 메뉴 불러오기]를 사용해보세요.';
    }

    // 6. 영양 정보 그리드 (임의 수치 생성 방지, 정보 없으면 확인 필요 표시)
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

    // 7. 퀴즈 상호작용 카드
    renderQuizInteractive();

    // 8. TV 모달이 열려 있는 경우 모달 내용도 즉시 동기화
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

      // 사용자가 클릭한 상태 검사
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
        renderQuizInteractive();
      });

      DOM.previewQuizOptions.appendChild(btn);
    });

    // 정답을 맞혔거나 문제를 풀었을 때 해설 공개
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
  // 10. TV 전체화면 모달 송출 기능
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
    // previewCard의 클론 노드를 생성하여 TV 모달에 삽입
    const clone = DOM.previewCard.cloneNode(true);
    clone.id = 'tv-preview-clone';

    // TV 모드에서는 퀴즈 옵션도 즉시 클릭 가능하도록 이벤트 재연결
    const cloneButtons = clone.querySelectorAll('.quiz-choice-btn');
    cloneButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        state.userSelectedQuizAnswer = idx;
        renderPreview();
      });
    });

    DOM.tvModalCardHost.appendChild(clone);
  }

  // ==========================================================================
  // 11. JSON 내보내기 & 불러오기 (데이터 보관)
  // ==========================================================================
  function exportDataAsJson() {
    if (!state.date || !state.selectedMenu) {
      showToast('날짜와 메뉴를 먼저 입력해주세요.', 'warning');
      return;
    }

    const payload = {
      app: 'nutrition-edu-generator',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      date: state.date,
      gradeGroup: state.gradeGroup,
      allMenusText: state.allMenusText,
      allMenus: state.allMenus,
      selectedMenu: state.selectedMenu,
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
    a.download = `급식영양자료_${safeDate}_${safeMenu}.json`;
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

        // 기본 유효성 검사
        if (!data || typeof data !== 'object') {
          throw new Error('유효한 JSON 파일이 아닙니다.');
        }

        if (!data.date && !data.selectedMenu && !data.allMenus) {
          throw new Error('영양자료 자동 생성기의 호환 데이터 형식이 아닙니다.');
        }

        // 상태 안전 복원
        state.date = data.date || getTodayDateString();
        state.gradeGroup = ['lower', 'middle', 'upper'].includes(data.gradeGroup) ? data.gradeGroup : 'middle';
        state.allMenusText = data.allMenusText || (Array.isArray(data.allMenus) ? data.allMenus.join(', ') : '');
        state.allMenus = Array.isArray(data.allMenus) ? data.allMenus : (data.allMenusText ? data.allMenusText.split(',').map(m => m.trim()) : []);
        state.selectedMenu = data.selectedMenu || (state.allMenus[0] || '오늘의 메뉴');
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
        showToast('자료가 성공적으로 복원되었습니다.', 'success');
      } catch (err) {
        showToast(`파일 불러오기 실패: ${err.message}`, 'error');
      } finally {
        // 동일 파일 재선택 가능하도록 input 초기화
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
      state.story = '';
      state.nutrients = [];
      state.quiz = {
        question: '',
        options: ['', '', ''],
        correctIndex: 0,
        explanation: ''
      };
      state.userSelectedQuizAnswer = null;

      syncFormFromState();
      renderPreview();
      showToast('입력 폼이 초기화되었습니다.', 'warning');
    }
  }

  // ==========================================================================
  // 12. 인쇄 및 고품질 PNG 이미지 다운로드 엔진
  // ==========================================================================
  function handlePrint() {
    if (!state.date || !state.selectedMenu) {
      showToast('날짜와 메뉴를 먼저 입력해주세요.', 'warning');
      return;
    }
    window.print();
  }

  /**
   * 외부 라이브러리 없이 순수 HTML5 Canvas 2D 그래픽 렌더러로
   * 1200 x 1500 고해상도 PNG 교육자료 포스터 생성 및 다운로드
   */
  function handleSaveImage() {
    if (!state.date || !state.selectedMenu) {
      showToast('날짜와 메뉴를 먼저 입력해주세요.', 'warning');
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = 1200;
      const height = 1550;
      canvas.width = width;
      canvas.height = height;

      // 1. 전체 배경 칠하기
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // 상단 민트 바
      ctx.fillStyle = '#0d9488';
      ctx.fillRect(0, 0, width, 14);

      // 외곽 프레임
      ctx.strokeStyle = '#99f6e4';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      // 2. 헤더: 학교/날짜/학년
      ctx.fillStyle = '#0d9488';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('🏫 초등학교 급식 영양·식생활 이야기', 70, 95);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 44px sans-serif';
      const formattedDate = formatDateKorean(state.date);
      ctx.fillText(formattedDate ? `${formattedDate} 오늘의 급식` : '오늘의 급식 이야기', 70, 155);

      // 대상 학년 배지 박스
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

      // 구분 점선
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(70, 185);
      ctx.lineTo(width - 70, 185);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. 전체 메뉴 바
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

      // 4. 오늘의 주인공 음식 배너
      ctx.fillStyle = '#e6f7f3';
      ctx.fillRect(70, currentY, width - 140, 105);
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 2;
      ctx.strokeRect(70, currentY, width - 140, 105);

      ctx.fillStyle = '#0d9488';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('오늘의 영양 주인공 메뉴', 95, currentY + 38);

      ctx.fillStyle = '#115e59';
      ctx.font = '800 36px sans-serif';
      ctx.fillText(state.selectedMenu || '오늘의 대표 메뉴', 95, currentY + 82);

      const matchedPreset = MENU_PRESETS.find(p => p.name.includes(state.selectedMenu) || state.selectedMenu.includes(p.name));
      ctx.font = '55px sans-serif';
      ctx.fillText(matchedPreset ? matchedPreset.icon : '🍽️', width - 165, currentY + 74);
      currentY += 135;

      // 5. 음식 이야기 섹션
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

      // 6. 영양 정보 섹션
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
          ctx.fillText(n.benefit || '건강 증진에 도움을 줍니다.', 280, currentY + 33);

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

      // 7. 영양 퀴즈 섹션
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

      // 8. PNG 다운로드 실행
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      const safeDate = state.date.replace(/-/g, '');
      const safeMenu = (state.selectedMenu || '급식').replace(/\s+/g, '_');
      a.href = dataUrl;
      a.download = `영양교육자료_${safeDate}_${safeMenu}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      showToast('고해상도 PNG 이미지가 다운로드되었습니다.', 'success');
    } catch (err) {
      showToast(`이미지 저장 중 오류 발생: ${err.message}`, 'error');
    }
  }

  // 텍스트 줄바꿈 도우미 함수 (Canvas 2D)
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
  // 13. 알림 토스트 UI 헬퍼
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
    }, 2800);
  }

  // DOM 로드 완료 시 애플리케이션 시작
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
