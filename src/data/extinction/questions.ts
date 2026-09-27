import type { Question } from '../types';

/**
 * 《경험의 멸종》(크리스틴 로젠 지음, 이영래 옮김, 어크로스) 골든벨 대비 문제
 *
 * - 첨부 PDF(책 p.1~331, 프롤로그~에필로그)에 실제로 적힌 내용만으로 출제했다.
 * - sourcePage 는 책(인쇄본) 쪽수이며, PDF 쪽수는 pages.ts 가 자동으로 계산해 보여준다.
 * - 문제를 추가할 때는 id 를 새로 만들고(기존 id 는 바꾸지 말 것), `npm test` 로 형식을 검사한다.
 */

const P = '프롤로그';
const C1 = '1장 직접 경험의 내리막';
const C2 = '2장 대면 상호작용의 필요성';
const C3 = '3장 손으로 써야만 배울 수 있는 것';
const C4 = '4장 기다림과 지루함의 기능';
const C5 = '5장 감정 길들이기';
const C6 = '6장 기술로 매개된 쾌락';
const C7 = '7장 소멸하는 장소, 개인화된 공간';
const EP = '에필로그';

export const multipleQuestions: Question[] = [
  // ───────────── 프롤로그 ─────────────
  {
    id: 'm01',
    type: 'multiple',
    category: P,
    difficulty: 'basic',
    sourcePage: 18,
    question: '저자에 따르면 기술은 우리의 경험을 어떤 방식으로 변화시켰는가?',
    choices: [
      '경험을 막지 않고 그 중요성과 의미를 약화시킴으로써',
      '경험을 법과 제도로 직접 금지함으로써',
      '경험에 드는 비용을 크게 높임으로써',
      '경험할 수 있는 사람을 소수 계층으로 제한함으로써',
    ],
    answer: 0,
    explanation:
      '저자는 기술이 경험을 막거나 금지한 것이 아니라, 경험의 중요성과 의미를 약화시킴으로써 경험을 변화시켰다고 말한다.',
  },
  {
    id: 'm02',
    type: 'multiple',
    category: P,
    difficulty: 'tricky',
    sourcePage: 17,
    question: '저자가 GPS를 종이 지도·육분의와 비교하며 지적한 내용은?',
    choices: [
      'GPS는 더 정확하지만 사용자를 조종사가 아닌 방관자로 만든다',
      'GPS는 더 정확하며 사용자를 방관자가 아닌 조종사로 만든다',
      'GPS는 종이 지도보다 부정확해 사용자를 불안하게 만든다',
      'GPS는 사용자의 방향 감각을 오히려 단련시킨다',
    ],
    answer: 0,
    explanation:
      'GPS는 종이 지도나 육분의보다 정확하지만 사용자를 조종사가 아닌 방관자로 만든다. 저자는 캘리포니아 외딴 지역에서 GPS가 꺼졌을 때 아들과 낡은 지도와 표지판으로 길을 찾으며 보람을 느낀 경험을 소개한다.',
  },
  {
    id: 'm03',
    type: 'multiple',
    category: P,
    difficulty: 'tricky',
    sourcePage: 16,
    question: '철학자 테오도어 아도르노가 1954년 텔레비전을 비판하며 사용한 표현은?',
    choices: ['경험의 빈곤', '가짜 사건', '허위의 사실성', '부재의 현존'],
    answer: 2,
    explanation:
      '아도르노는 1954년 텔레비전의 "허위의 사실성(false realism)"을 비판했다. "경험의 빈곤"은 발터 벤야민, "가짜 사건"은 대니얼 부어스틴의 표현이다.',
  },
  {
    id: 'm04',
    type: 'multiple',
    category: P,
    difficulty: 'hard',
    sourcePage: 13,
    question:
      '2021년 1월 6일 국회의사당 습격으로 기소된 큐어논 음모론자로, FBI 조사에서 "나에게 일어난 모든 일이 영화와 같다"고 말한 인물은?',
    choices: ['매슈 라이트', '마이크 스파크스', '네이선 유르겐슨', '더그 젠슨'],
    answer: 3,
    explanation:
      '더그 젠슨의 사례다. 매슈 라이트는 2018년 방탄 트럭을 몰고 후버댐에 간 인물, 마이크 스파크스는 "손에 성경보다 휴대전화를 들고 있는 때가 많다"고 말한 인물로 등장한다.',
  },

  // ───────────── 1장 ─────────────
  {
    id: 'm06',
    type: 'multiple',
    category: C1,
    difficulty: 'basic',
    sourcePage: 27,
    question:
      "소제목 '날씨 앱 뒤에는 기상학자가 없다'에서, 캐피털 웨더 갱의 기상학자가 알려준 스마트폰 날씨 앱 예보의 실체는?",
    choices: [
      '현지 기상학자들이 매일 직접 작성한다',
      '위성 사진을 사람이 판독해 만든다',
      '컴퓨터가 만들며 현지 기상학자의 전문 지식을 활용하지 않는다',
      '과거 연감의 통계를 바탕으로 만든다',
    ],
    answer: 2,
    explanation:
      '저자는 아이폰 날씨 앱도 인간 기상학자가 예보하는 줄 알았지만, 캐피털 웨더 갱의 기상학자는 스마트폰 날씨 앱의 예보가 컴퓨터로 만들어지며 현지 기상학자의 전문 지식을 활용하지 않는다고 알려주었다.',
  },
  {
    id: 'm07',
    type: 'multiple',
    category: C1,
    difficulty: 'hard',
    sourcePage: 29,
    question:
      '책에 따르면 2012년 미국인의 스마트폰 사용률은 12개월 만에 몇 %에서 몇 %로 늘었는가?',
    choices: ['21%에서 35%로', '31%에서 44%로', '35%에서 85%로', '44%에서 63%로'],
    answer: 1,
    explanation:
      '2012년은 미국인의 스마트폰 사용이 전년 대비 가장 빠르게 증가한 해로, 12개월 만에 31%에서 44%로 늘었다. 구글 엔그램에서 "네가 거기 있었어야 해"라는 표현은 1960년대부터 2012년까지 늘다가 이후 가파르게 줄어든다. (35%→85%는 4장에 나오는 2011년 이후의 스마트폰 보유율 변화다.)',
  },
  {
    id: 'm08',
    type: 'multiple',
    category: C1,
    difficulty: 'tricky',
    sourcePage: 31,
    question:
      '2010년 한국의 한 부부가 가상의 아이를 키우느라 실제 아이를 굶어 죽게 한 사건과 관련된 온라인 게임은?',
    choices: ['세컨드 라이프', '러브 플러스', '포트나이트', '프리우스'],
    answer: 3,
    explanation:
      '온라인 게임 프리우스(Prius)다. 러브 플러스는 2009년 한 일본인 남성이 애니메이션 캐릭터와 "결혼"한 연애 시뮬레이션 게임이다.',
  },
  {
    id: 'm09',
    type: 'multiple',
    category: C1,
    difficulty: 'basic',
    sourcePage: 35,
    question:
      '1990년대에 "경험의 멸종"을 애석해하며, 젊은 세대의 "자연 결핍 장애"를 염려한 자연주의자는?',
    choices: ['이-푸 투안', '리처드 세넷', '로버트 마이클 파일', '로버트 새폴스키'],
    answer: 2,
    explanation:
      '자연주의자 로버트 마이클 파일은 1990년대에 "경험의 멸종"을 애석해했고, 젊은 세대의 "자연 결핍 장애(nature deficit disorder)"를 염려했다.',
  },
  {
    id: 'm10',
    type: 'multiple',
    category: C1,
    difficulty: 'basic',
    sourcePage: 39,
    question: '저자가 실제 경험과 디지털 경험의 차이를 설명하며 비유로 든 짝은?',
    choices: ['시력(eyesight)과 시각(vision)', '지도와 영토', '사진과 그림', '청력과 경청'],
    answer: 0,
    explanation:
      '실제 경험과 디지털 경험의 차이는 시력과 시각의 차이와 같다. 시력은 눈이 얼마나 잘 포착하는가이고, 시각은 인식을 유도해 시력을 지능적으로 사용하는 것이다.',
  },
  {
    id: 'm13',
    type: 'multiple',
    category: C1,
    difficulty: 'basic',
    sourcePage: 44,
    question: '지리학자 이-푸 투안은 경험을 무엇이라고 정의했는가?',
    choices: ['위험을 극복하는 것', '기록으로 남기는 것', '같은 일을 반복해 익히는 것', '다른 사람과 공유하는 것'],
    answer: 0,
    explanation:
      '이-푸 투안은 "경험은 위험을 극복하는 것"이라고 했다. 경험은 낯선 곳으로 과감히 나아가 불확실성과 잠재적 위험을 받아들이는 것이며, 그래서 저자는 다른 사람의 위험을 배경으로 찍은 셀카는 경험이 아니라고 말한다.',
  },

  // ───────────── 2장 ─────────────
  {
    id: 'm15',
    type: 'multiple',
    category: C2,
    difficulty: 'detail',
    sourcePage: 51,
    question:
      '찰스 다윈이 런던 동물원 독사 우리의 유리에 얼굴을 대고 반사반응을 시험한 것은 어떤 책을 쓰기 위한 자료 수집이었나?',
    choices: ['《종의 기원》', '《인간의 유래》', '《인간과 동물의 감정 표현》', '《비글호 항해기》'],
    answer: 2,
    explanation:
      '다윈은 《인간과 동물의 감정 표현》(1872) 집필을 위해 자료를 모으고 있었다. "확고한 결심"으로 반사반응을 이기려 했지만 결국 놀라울 정도로 빠르게 1~2미터 물러섰다.',
  },
  {
    id: 'm17',
    type: 'multiple',
    category: C2,
    difficulty: 'tricky',
    sourcePage: 58,
    question: '심리학자 폴 에크먼이 제시한 보편 감정에 포함되지 않는 것은?',
    choices: ['경멸', '혐오', '놀라움', '질투'],
    answer: 3,
    explanation:
      '에크먼의 보편 감정은 분노, 공포, 슬픔, 혐오, 놀라움, 경멸, 행복이다. 당혹감, 죄책감, 수치심, 시기심, 질투, 자부심은 보편적이지만 같은 얼굴 움직임으로 표현되지 않는 감정으로 설명된다.',
  },
  {
    id: 'm19',
    type: 'multiple',
    category: C2,
    difficulty: 'detail',
    sourcePage: 64,
    question:
      '행위 예술가 마리나 아브라모비치가 2010년 뉴욕 현대 미술관에서 700시간 동안 선보인 작품의 제목은?',
    choices: ['<1인용 극장>', '<사진의 기회들>', '<작가가 있음>', '<진보의 회전 극장>'],
    answer: 2,
    explanation:
      '<작가가 있음(The Artist Is Present)>에서 아브라모비치는 맞은편 빈 의자에 앉은 관객과 마주했고, 50만 명 가까이 관람했다. <1인용 극장>은 2011년 타임스스퀘어의 공연이다.',
  },
  {
    id: 'm20',
    type: 'multiple',
    category: C2,
    difficulty: 'tricky',
    sourcePage: 65,
    question:
      '사회학자 어빙 고프먼에 따르면 사람은 말로는 정보를 의식적으로 "준다". 그렇다면 눈 움직임·어조·몸짓으로는 정보를 무의식적으로 어떻게 한다고 했나?',
    choices: [
      '풍긴다',
      '감춘다',
      '흘린다',
      '되돌린다',
    ],
    answer: 0,
    explanation:
      '고프먼은 말로 의식적으로 정보를 "주고", 눈 움직임·어조·몸짓으로 무의식적으로 정보를 "풍긴다"고 했다. 이런 무언의 신호가 "사회적 상호작용의 규칙"이다.',
  },
  {
    id: 'm21',
    type: 'multiple',
    category: C2,
    difficulty: 'tricky',
    sourcePage: 67,
    question:
      '저자는 공공장소에서 스마트폰 화면에만 집중하며 주변 사람을 의식하지 않는 태도를 고프먼의 "사회적 무관심"과 구별해 무엇이라고 불렀나?',
    choices: ['사회적 소외', '경험 보상 효과', '방관자 효과', '사회적 유리'],
    answer: 3,
    explanation:
      '스마트폰 화면에만 집중하는 것은 사회적 무관심이 아니라 "사회적 유리(civil disengagement)"이며, 이것이 공적 공간의 표준이 되었다고 저자는 말한다.',
  },
  {
    id: 'm26',
    type: 'multiple',
    category: C2,
    difficulty: 'detail',
    sourcePage: 78,
    question: '일본 오므론의 기술로 개발된 스마일스캔(SmileScan)에 대한 설명으로 옳은 것은?',
    choices: [
      '목소리 억양으로 거짓말 여부를 판별한다',
      '심박수로 직원의 스트레스를 측정한다',
      '얼굴을 스캔해 미소의 강도와 진실성을 0~100 척도로 평가한다',
      '눈동자 움직임으로 주의력을 추적한다',
    ],
    answer: 2,
    explanation:
      '스마일스캔은 얼굴을 스캔해 3D 모델을 만들고 미소의 강도와 진실성을 0~100 척도로 평가한다. "자동화된 폴 에크먼"이라 할 만하며, 일본 게이힌 전철역 직원들이 근무 전에 얼굴을 스캔했다.',
  },
  {
    id: 'm27',
    type: 'multiple',
    category: C2,
    difficulty: 'tricky',
    sourcePage: 85,
    question:
      '2019년 케이프타운·암스테르담 등의 공적 공간 폭력 영상을 분석한 연구에서, 목격자가 개입한 경우는 몇 건 중 몇 건이었나?',
    choices: ['10건 중 1건', '10건 중 3건', '10건 중 5건', '10건 중 9건'],
    answer: 3,
    explanation:
      '10건 중 아홉 건에서 누군가 개입했고, 사람이 많을수록 개입 가능성이 높았다. 저자는 오늘날 문제는 무관심한 방관자가 아니라 "잔인한 관음증 환자"가 가득한 사회라고 말한다.',
  },
  {
    id: 'm28',
    type: 'multiple',
    category: C2,
    difficulty: 'tricky',
    sourcePage: 87,
    question: '2장을 마무리하는 문장 "관심은 가장 희귀하고 순수한 형태의 관대함이다"를 남긴 프랑스 철학자는?',
    choices: ['시몬 드 보부아르', '한나 아렌트', '시몬 베유', '마거릿 미드'],
    answer: 2,
    explanation: '프랑스 철학자 시몬 베유의 말로 2장이 끝난다.',
  },

  // ───────────── 3장 ─────────────
  {
    id: 'm29',
    type: 'multiple',
    category: C3,
    difficulty: 'detail',
    sourcePage: 92,
    question: '법안 서명에 자동 서명기를 사용한 최초의 미국 대통령은?',
    choices: ['해리 트루먼', '제럴드 포드', '조지 W. 부시', '버락 오바마'],
    answer: 3,
    explanation:
      '버락 오바마는 2011년 애국자법 연장 때 자동 서명기로 법안에 서명한 최초의 대통령이 되었다. 부시는 법무부로부터 합법이라는 자문을 받았지만 법안에 사용한 적은 없다.',
  },
  {
    id: 'm31',
    type: 'multiple',
    category: C3,
    difficulty: 'basic',
    sourcePage: 98,
    question:
      '신경과학자 카린 제임스가 글을 모르는 5세 아이들을 MRI로 관찰한 결과, 글자를 볼 때 읽기 회로가 동원된 것은 어떤 방식으로 글자를 익혔을 때였나?',
    choices: [
      '손 글씨',
      '타이핑',
      '덧쓰기',
      '세 방법 모두 같았다',
    ],
    answer: 0,
    explanation:
      '"읽기 회로가 글자 인식에 동원된 것은 손 글씨를 이용했을 때뿐"이었다. 손 글씨는 아이의 읽기 능력 습득을 촉진한다.',
  },
  {
    id: 'm32',
    type: 'multiple',
    category: C3,
    difficulty: 'basic',
    sourcePage: 100,
    question: '심리학자 팸 뮬러와 대니얼 오펜하이머의 필기 실험 결과로 옳은 것은?',
    choices: [
      '노트북으로 필기한 학생이 사실 암기 문제에서 크게 앞섰다',
      '노트북 필기 학생은 강의를 그대로 받아 적는 경향이 있어 개념적 질문에 약했다',
      '손 필기와 노트북 필기 사이에 차이가 없었다',
      '손으로 필기한 학생은 속도가 느려 정보를 더 많이 놓쳤다',
    ],
    answer: 1,
    explanation:
      '노트북 필기는 "인지 처리 과정의 깊이가 얕아져" 학습 능력을 해친다. 손으로 적으면 속도가 느려 요약하게 되고, 그 과정에서 정보가 더 잘 유지된다.',
  },
  {
    id: 'm34',
    type: 'multiple',
    category: C3,
    difficulty: 'hard',
    sourcePage: 103,
    question: '책에 따르면 보통 미국인이 1분 동안 타이핑하는 단어 수와 손으로 쓰는 단어 수는?',
    choices: ['60단어 / 20단어', '40단어 / 25단어', '40단어 / 13단어', '30단어 / 13단어'],
    answer: 2,
    explanation:
      '분당 타이핑 40단어, 손 글씨 13단어다. 캘리그라피스트 폴 안토니오는 글쓰기를 가르칠 때 실제로 가르치는 것은 속도를 늦추는 방법이라고 했다.',
  },
  {
    id: 'm35',
    type: 'multiple',
    category: C3,
    difficulty: 'detail',
    sourcePage: 106,
    question:
      '컴퓨터를 켜는 법도 몰랐지만 컴퓨터 지원 설계(CAD)의 얼리어답터가 되어, 빌바오 구겐하임 미술관과 월트 디즈니 콘서트홀을 지은 건축가는?',
    choices: ['마이클 그레이브스', '유하니 팔라스마', '제임스 와인스', '프랭크 게리'],
    answer: 3,
    explanation:
      '프랭크 게리다. 반면 마이클 그레이브스는 "건축은 드로잉과 분리될 수 없다"고 했고, 유하니 팔라스마는 컴퓨터 디자인의 "가짜 정확성"을 비판했다.',
  },
  {
    id: 'm38',
    type: 'multiple',
    category: C3,
    difficulty: 'basic',
    sourcePage: 120,
    question:
      '3장 첫머리에도 실린 "세상에서 가장 높은 왕좌에 앉아 있는 사람도 결국 제 엉덩이 위에 앉아 있을 뿐이다"라는 말을 남긴 사람은?',
    choices: ['블레즈 파스칼', '미셸 드 몽테뉴', '르네 데카르트', '헨리 데이비드 소로'],
    answer: 1,
    explanation:
      '16세기 수필가 미셸 드 몽테뉴의 말이다. 몽테뉴는 몸과 마음이 연결되어 있음을 강조했고, 서재 들보에 <전도서>를 의역한 글귀를 새겨두었다.',
  },

  // ───────────── 4장 ─────────────
  {
    id: 'm39',
    type: 'multiple',
    category: C4,
    difficulty: 'tricky',
    sourcePage: 128,
    question: '디즈니가 1999년에 도입한 가상 대기 시스템의 이름은?',
    choices: ['프런트 오브 더 라인 패스', 'EZ 패스', '패스트패스', '골드 패스'],
    answer: 2,
    explanation:
      '패스트패스(FastPass)다. 프런트 오브 더 라인 패스는 유니버설 스튜디오의 유료 우선 탑승권, EZ 패스는 통행료 자동 징수 시스템이다.',
  },
  {
    id: 'm40',
    type: 'multiple',
    category: C4,
    difficulty: 'detail',
    sourcePage: 129,
    question: '저자는 디즈니의 패스트패스를 무엇의 재림이라고 표현했나?',
    choices: [
      '프레더릭 윈즐로 테일러의 과학적 관리 원칙',
      '헨리 포드의 컨베이어 벨트 방식',
      '제러미 벤담의 판옵티콘 설계',
      'B. F. 스키너의 조작적 조건화',
    ],
    answer: 0,
    explanation:
      '패스트패스는 19세기 프레더릭 윈즐로 테일러의 과학적 관리 원칙이 공장이 아닌 휴가에 적용되어 다시 나타난 것이라고 했다.',
  },
  {
    id: 'm41',
    type: 'multiple',
    category: C4,
    difficulty: 'detail',
    sourcePage: 134,
    question: '책에서 기다림에 대한 인식을 좌우한다고 설명한 두 가지 요소는?',
    choices: [
      '줄의 길이와 줄어드는 속도',
      '기다림에 관한 정보의 양과 공정성',
      '주변 온도와 소음',
      '동행자 유무와 스마트폰 사용 여부',
    ],
    answer: 1,
    explanation:
      '기다림 인식은 기다림에 관한 정보의 양과 공정성에 좌우된다. 설명되지 않은 불확실한 기다림은 더 길게 느껴진다(연옥이 불편한 이유는 언제까지 있어야 할지 모르기 때문).',
  },
  {
    id: 'm44',
    type: 'multiple',
    category: C4,
    difficulty: 'tricky',
    sourcePage: 145,
    question:
      '1949년 "변화는 효율성에 대한 욕구가 불러올 것"이라는 내용을 담은 편지를 쓴 사람과 받은 사람은?',
    choices: [
      '조지 오웰이 올더스 헉슬리에게',
      '올더스 헉슬리가 아이작 아지모프에게',
      '올더스 헉슬리가 조지 오웰에게',
      '조지 오웰이 루이스 멈퍼드에게',
    ],
    answer: 2,
    explanation:
      '1949년 올더스 헉슬리는 조지 오웰에게 "《1984》의 악몽이 내가 《멋진 신세계》에서 상상했던 것과 더 닮은 세상으로 바뀔 것", "변화는 효율성에 대한 욕구가 불러올 것"이라고 썼다.',
  },
  {
    id: 'm45',
    type: 'multiple',
    category: C4,
    difficulty: 'tricky',
    sourcePage: 153,
    question: '책에서 딴생각(백일몽)이 창의적 발견으로 이어진 사례로 소개된 연결이 옳은 것은?',
    choices: [
      '아인슈타인 – 숲 산책 – 교류 전류',
      '테슬라 – 전차 – 특수 상대성 이론',
      '데카르트 – 떨어지는 사과 – 만유인력',
      '데카르트 – 천장의 파리 – 좌표 기하학',
    ],
    answer: 3,
    explanation:
      '데카르트는 침대에서 천장의 파리를 보다 좌표 기하학을, 아인슈타인은 전차를 타고 베른의 탑을 보다 특수 상대성 이론을, 니콜라 테슬라는 숲을 산책하다 교류 전류를 떠올렸다.',
  },
  {
    id: 'm46',
    type: 'multiple',
    category: C4,
    difficulty: 'basic',
    sourcePage: 163,
    question: '1000명 이상의 네덜란드인을 대상으로 행복과 휴가의 관계를 조사한 연구 결과는?',
    choices: [
      '휴가를 앞둔 사람의 여행 전 행복도가 더 높았고, 여행 후 행복도는 차이가 없었다',
      '여행 후 행복도가 몇 달간 크게 높게 유지되었다',
      '여행 전후 모두 차이가 없었다',
      '휴가를 앞둔 사람은 오히려 불안 때문에 행복도가 더 낮았다',
    ],
    answer: 0,
    explanation:
      '사람들을 행복하게 만든 것은 휴가 자체가 아니라 휴가에 대한 기대였다. 저자는 이를 들어 기대를 구글에 아웃소싱하면 그 즐거움을 직접 경험하지 못한다고 말한다.',
  },
  {
    id: 'm47',
    type: 'multiple',
    category: C4,
    difficulty: 'tricky',
    sourcePage: 159,
    question: '토머스 머튼에 따르면 "침묵을 깨뜨리는 것은 말이 아니라 ○○이다." ○○에 들어갈 말은?',
    choices: ['소음', '기술', '인정받고자 하는 열망', '성급함'],
    answer: 2,
    explanation:
      '토머스 머튼은 "침묵을 깨뜨리는 것은 말이 아니라 인정받고자 하는 열망이다"라고 했다. 저자가 방문한 겟세마니 수도원은 머튼이 머물렀던 곳이다.',
  },

  // ───────────── 5장 ─────────────
  {
    id: 'm48',
    type: 'multiple',
    category: C5,
    difficulty: 'tricky',
    sourcePage: 177,
    question: '"인간의 감정을 인식·해석·대응할 수 있는 컴퓨터 또는 시스템"을 뜻하는 용어는?',
    choices: [
      '설득형 기술',
      '생활환경 지능',
      '유비쿼터스 컴퓨팅',
      '감성 컴퓨팅',
    ],
    answer: 3,
    explanation:
      '감성 컴퓨팅(affective computing)이다. 이 분야의 창시자 중 한 명인 MIT의 로잘린드 피카드는 이를 "감정과 관련되거나 감정을 유발하거나 감정에 영향을 미치는" 컴퓨팅이라 설명했다(p.212). 설득형 기술(persuasive technology)은 감정에 호소해 사용자의 행동을 바꾸도록 설계된 기술이다.',
  },
  {
    id: 'm49',
    type: 'multiple',
    category: C5,
    difficulty: 'tricky',
    sourcePage: 179,
    question: '신경과학자 안토니오 다마지오가 구분한 느낌(feeling)과 감정(emotion)에 대한 설명으로 옳은 것은?',
    choices: [
      '느낌은 외향적이며 공적이고, 감정은 내향적이며 사적이다',
      '느낌과 감정은 모두 공적인 것이다',
      '감정은 인간에게만, 느낌은 동물에게만 있다',
      '느낌은 내향적이며 사적이고, 감정은 외향적이며 공적이다',
    ],
    answer: 3,
    explanation:
      '다마지오는 "내향적이며 사적인" 느낌과 "외향적이며 공적인" 감정을 구분했다. 느낌은 "신체적 상태에 대한 정신적 경험"이다.',
  },
  {
    id: 'm51',
    type: 'multiple',
    category: C5,
    difficulty: 'detail',
    sourcePage: 186,
    question:
      '2021년 영국 의회에서 "분노와 증오는 페이스북 내에서 성장하는 가장 쉬운 방법입니다"라고 증언한 내부 고발자는?',
    choices: [
      '캐머런 말로',
      '크리스천 러더',
      '애비게일 포즈너',
      '프랜시스 하우건',
    ],
    answer: 3,
    explanation:
      '전직 페이스북 직원 프랜시스 하우건이다. 캐머런 말로는 페이스북 데이터과학팀 책임자, 크리스천 러더는 OK큐피드 설립자, 애비게일 포즈너는 구글 전략 기획 책임자다.',
  },
  {
    id: 'm52',
    type: 'multiple',
    category: C5,
    difficulty: 'hard',
    sourcePage: 188,
    question:
      '미시간대학교 사회연구소에 따르면 오늘날 대학생의 공감 능력은 20~30년 전 대학생보다 약 몇 % 낮은가?',
    choices: ['약 10%', '약 25%', '약 40%', '약 60%'],
    answer: 2,
    explanation:
      '약 40% 낮으며, 가장 급격한 감소세는 스마트폰 보급 추세와 일치한다.',
  },
  {
    id: 'm55',
    type: 'multiple',
    category: C5,
    difficulty: 'detail',
    sourcePage: 205,
    question: '저자가 "잘 알려지지는 않았지만 설득 기술의 수호성인이라 할 만한 인물"로 꼽은 사람은?',
    choices: ['B. J. 포그', 'B. F. 스키너', '앨릭스 펜틀랜드', '에곤 L. 판덴브룩'],
    answer: 1,
    explanation:
      '20세기 심리학자 B. F. 스키너다. 그는 조작적 조건화 이론으로 오늘날 설득 기술의 근거를 제시했다. B. J. 포그는 "대규모 대인 설득"을 말한 설득 기술의 선구자다.',
  },

  // ───────────── 6장 ─────────────
  {
    id: 'm57',
    type: 'multiple',
    category: C6,
    difficulty: 'tricky',
    sourcePage: 223,
    question: '지그문트 프로이트가 쾌락을 가리켜 부른 표현은?',
    choices: [
      '삶의 파수꾼',
      '이드의 노예',
      '인류의 통치권자',
      '현실의 안내자',
    ],
    answer: 0,
    explanation:
      '프로이트는 쾌락을 "삶의 파수꾼"이라 믿었다. 쾌락이 인류의 "통치권자" 중 하나라고 선언한 사람은 제러미 벤담이다.',
  },
  {
    id: 'm58',
    type: 'multiple',
    category: C6,
    difficulty: 'basic',
    sourcePage: 226,
    question: '저자가 "우리 시대 쾌락의 슬로건이 된 것 같다"고 말한 경고 문구는?',
    choices: ['"영웅이 되라"', '"손이 아닌 눈으로 봐"', '"멀리 있지만 친근한"', '"편안한 실내에서 대자연을 탐험하라"'],
    answer: 1,
    explanation:
      '깨지기 쉬운 물건 주위의 아이에게 하는 "손이 아닌 눈으로 봐"다. 쾌락을 화면으로 소비하면서 촉각·후각·미각보다 시각과 청각이 중시된다. 나머지는 고프로, 유나이티드 항공, 쉐보레 광고 문구다.',
  },
  {
    id: 'm59',
    type: 'multiple',
    category: C6,
    difficulty: 'detail',
    sourcePage: 229,
    question: '소설가이자 여행 작가인 폴 서로가 《여행자의 책》에서 "최고의 여행에 필수"라고 한 것은?',
    choices: ['동반자', '단절', '기록', '철저한 계획'],
    answer: 1,
    explanation:
      '"최고의 여행에는 단절이 필수다. 사람들이 당신이 어디에 있는지, 어떻게 해야 찾을 수 있는지 모르는 것은 행운이다." 그는 편지조차 읽지 않은 탐험가 피터 매티슨을 예로 들었다.',
  },
  {
    id: 'm60',
    type: 'multiple',
    category: C6,
    difficulty: 'detail',
    sourcePage: 237,
    question:
      '1859년 《대서양에서의 탐사》에서 사진과 사진기라는 새로운 기술이 너무 대단해 이제 여행이 쓸모없어질 것이라고 한 인물은?',
    choices: ['헨리 제임스', '올리버 웬들 홈스', '웬들 베리', '헨리 슈크먼'],
    answer: 1,
    explanation:
      '올리버 웬들 홈스다. 헨리 제임스는 베네치아를 "위로의 저장소"라 했고, 웬들 베리는 시 <휴가>를, 헨리 슈크먼은 그랜드캐니언에 실망한 경험을 남겼다.',
  },
  {
    id: 'm61',
    type: 'multiple',
    category: C6,
    difficulty: 'detail',
    sourcePage: 239,
    question: '책에 따르면 미술관 방문자들이 작품 하나를 보는 데 쓰는 평균 시간은?',
    choices: ['5~10초', '15~30초', '1~2분', '3~5분'],
    answer: 1,
    explanation:
      '방문자들은 작품 하나에 평균 15~30초를 쓴다. 반면 하버드 미술사학자 제니퍼 L. 로버츠는 학생들에게 한 작품을 세 시간 동안 살피게 한 뒤 분석하게 했다. "시선을 두었다고(looking) 해서 보았다는(seeing) 의미는 아니"기 때문이다.',
  },
  {
    id: 'm62',
    type: 'multiple',
    category: C7,
    difficulty: 'basic',
    sourcePage: 285,
    question:
      '카페, 동네 술집 같은 "좋은 장소"를 공동체의 근간이 되는 "제3의 장소"라 부르며, 진정한 공동체에는 대면 상호작용과 상호 의존성이 필요하다고 한 사회학자는?',
    choices: ['레이 올든버그', '키스 햄프턴', '윌리엄 H. 화이트', '조슈아 메이로위츠'],
    answer: 0,
    explanation:
      '저자는 레이 올든버그와 함께 장소 관련 학술회의 패널로 참여한 적이 있다. 올든버그는 제3의 장소는 대면 상호작용을 제공하는 데 탁월하지만 가상 세계는 그러지 못한다고 강조했다.',
  },
  {
    id: 'm63',
    type: 'multiple',
    category: C7,
    difficulty: 'tricky',
    sourcePage: 292,
    question:
      '사람들이 함께하는 즐거움 이외에 다른 이유 없이 모이는 것을 가리켜 사회학자 게오르크 지멜이 붙인 이름은?',
    choices: ['평준화 영향력', '공적 교제의 몸짓', '사회적 무관심', '순수한 사교성'],
    answer: 3,
    explanation:
      '지멜의 "순수한 사교성(pure sociability)"이다. 올든버그는 목적 없는 순수한 사교성이 "가장 민주적인 경험을 장려"한다고 했다. 저자는 소셜 미디어 플랫폼이 순수한 사교성을 정량화된 인기로 대체한다고 말한다. "평준화 영향력"은 올든버그가 제3의 장소에 대해 쓴 말이다.',
  },
  {
    id: 'm64',
    type: 'multiple',
    category: C7,
    difficulty: 'hard',
    sourcePage: 291,
    question:
      '2023년 미국 보건부 장관 비벡 머시의 보고서 "외로움과 고립의 전염병"은 외로움이 건강에 미치는 영향을 하루에 담배 몇 개비를 피우는 것에 비교했나?',
    choices: ['5개비', '15개비', '10개비', '20개비'],
    answer: 1,
    explanation:
      '하루 15개비의 담배에 비교했다. 보고서의 첫 번째 권고는 도서관이나 공원 같은 공적 공간에서 직접 만나는 것을 장려하는 "사회적 인프라의 강화"였다.',
  },
  {
    id: 'm65',
    type: 'multiple',
    category: C7,
    difficulty: 'detail',
    sourcePage: 287,
    question: '저자가 설명한 가라오케의 기원으로 옳은 것은?',
    choices: [
      '1960년대 후반 고베에서 클럽 가수 이노우에 다이스케가 만들었다',
      '1970년대 초반 도쿄에서 전자 회사 기술자가 만들었다',
      '1960년대 후반 오키나와에서 미군 기지 군인들이 퍼뜨렸다',
      '1980년대 오사카의 한 술집 주인이 고안했다',
    ],
    answer: 0,
    explanation:
      '가라오케는 1960년대 후반 고베에서 시작되었고, 만든 사람은 클럽 가수 이노우에 다이스케다. 그는 가라오케를 "평범한 사람들의 형편없는 노래를 견디고 어쨌든 즐기도록 가르치는 발명품"이라고 했다. 저자는 오키나와에서 미국식과 일본식 가라오케를 모두 경험하며 장소가 행동에 미치는 영향을 생각했다.',
  },
  {
    id: 'm66',
    type: 'multiple',
    category: C7,
    difficulty: 'detail',
    sourcePage: 297,
    question: '2010년 키스 햄프턴 교수 연구팀이 공적 공간의 와이파이 사용자를 관찰한 결과로 옳은 것은?',
    choices: [
      '사용자 대부분이 일행과 함께 와서 대화하고 있었다',
      '사용자의 거의 80%가 혼자였고, 와이파이 사용 밀도가 높을 때 공적 사교성이 감소했다',
      '와이파이 사용자가 낯선 사람에게 먼저 말을 거는 경우가 더 많았다',
      '와이파이가 설치된 광장일수록 방문자가 줄어들었다',
    ],
    answer: 1,
    explanation:
      '햄프턴은 필라델피아·뉴욕·샌프란시스코·토론토의 공적 공간을 관찰했다. 사용자의 거의 80%가 혼자였고 낯선 사람들의 정중한 접근을 무시했으며, "와이파이 사용 밀도가 높을 때는 공적 사교성이 감소하는" 현상이 뚜렷했다.',
  },
  {
    id: 'm67',
    type: 'multiple',
    category: EP,
    difficulty: 'tricky',
    sourcePage: 316,
    question: '2018년 연구자들이 로버트 노직의 "경험 기계"를 다시 실험한 결과로 옳은 것은?',
    choices: [
      '침습적 기계를 "경험 알약"으로 바꾸자 복용하겠다는 사람이 더 많아졌다',
      '사람들은 여전히 경험 기계와 경험 알약을 똑같이 강하게 거부했다',
      '40년 전과 달리 대부분의 사람이 경험 기계에 연결하겠다고 답했다',
      '경험 알약보다 기계를 받아들이겠다는 사람이 더 많았다',
    ],
    answer: 0,
    explanation:
      '연구자들은 "개입이 덜 침습적일수록(현실과의 단절이 덜 할수록) 더 많은 사람이 받아들인다"는 가설을 세웠고, 가설은 옳은 것으로 드러났다. 노직은 《아나키에서 유토피아로》에서 경험 기계 사고실험을 제시했다(6장).',
  },
  {
    id: 'm68',
    type: 'multiple',
    category: EP,
    difficulty: 'tricky',
    sourcePage: 317,
    question:
      '1950년대 MIT에서 "그 모든 일을 기계들을 위해 하겠다고요? 그럼 사람들을 위해서는 뭘 할 겁니까?"라고 되물은 "지능 증강(Intelligent Augmentation)"의 지지자는?',
    choices: ['마빈 민스키', '요제프 바이첸바움', '앨릭스 펜틀랜드', '더글러스 엥겔바트'],
    answer: 3,
    explanation:
      '더글러스 엥겔바트다. 인공지능의 선구자 마빈 민스키는 "우리는 지능이 있는 기계를 만들 것입니다. 의식이 있는 기계를 만들 것입니다!"라고 단언했다. 지능 증강은 기계가 인간의 지능과 능력을 대체하기보다 향상시키도록 설계되어야 한다는 생각이다.',
  },
  {
    id: 'm69',
    type: 'multiple',
    category: EP,
    difficulty: 'hard',
    sourcePage: 325,
    question:
      '리부트 재단 조사에서 "1년 동안 소셜 미디어 사용을 중단할 것인지, 투표권을 포기할 것인지" 묻자 투표권을 포기하겠다고 답한 10대의 비율은?',
    choices: ['23%', '37%', '64%', '70%'],
    answer: 2,
    explanation:
      '압도적 다수인 64%가 투표권을 포기하겠다고 답했다. 같은 재단 조사에서 10대 틱톡 사용자의 23%는 하루 네 시간 이상 앱을 사용했다.',
  },
  {
    id: 'm70',
    type: 'multiple',
    category: C5,
    difficulty: 'detail',
    sourcePage: 209,
    question:
      '《죽음의 수용소에서》에서 "인간에게서 모든 것을 빼앗을 수 있겠지만 단 한 가지, 마지막 남은 인간의 자유, 즉 주어진 상황에서 자신의 태도를 선택하고 자신의 방식을 선택하는 자유만은 빼앗을 수 없다"고 한 인물은?',
    choices: ['빅터 프랭클', '에리히 프롬', '알베르 카뮈', '브랜 놀스'],
    answer: 0,
    explanation:
      '홀로코스트 생존자이자 정신과 의사인 빅터 프랭클이다. 저자는 설득 기술이 인간의 의도를 전복하고 감정을 조작하는 파괴적인 기술로 여겨지기 쉽다며 이 말을 인용한다. 알베르 카뮈는 p.211~212에서 "그는 간음을 하고 신문을 읽었다"는 문장으로, 영국 랭커스터대학교의 브랜 놀스는 설득 기술 윤리가 "우리를 믿어라" 식이라는 비판으로 등장한다.',
  },
];

export const shortQuestions: Question[] = [
  // ───────────── 프롤로그 ─────────────
  {
    id: 's01',
    type: 'short',
    category: P,
    difficulty: 'basic',
    sourcePage: 17,
    question:
      '감각 정보, 자극을 해석하는 생리적 과정, 감각을 통해 이해를 도출하는 문화적 과정을 모두 설명하는 용어로 책에서 소개한 말은?',
    answer: '센서리엄',
    acceptableAnswers: ['sensorium', '센서리움'],
    explanation:
      "'센서리엄(sensorium)'은 감각 정보와 그 해석 과정, 감각을 통해 이해를 도출하는 문화적 과정을 모두 설명한다. 저자는 과거의 기술이 감각을 증폭했다면 오늘날의 기술은 자신의 감각을 불신하고 기술에 의존하도록 훈련시킨다고 말한다.",
  },
  {
    id: 's02',
    type: 'short',
    category: P,
    difficulty: 'basic',
    sourcePage: 14,
    question:
      '역사학자 대니얼 부어스틴이 《이미지와 환상》에서, 저절로 일어난 것이 아니라 누군가 계획·배치·선동해 발생한 일을 가리켜 만든 용어는?',
    answer: '가짜 사건',
    acceptableAnswers: ['pseudo-event', 'pseudo event', '의사 사건'],
    explanation:
      '부어스틴의 "가짜 사건(pseudo-event)"이다. 저자는 오늘날 알고리즘이 개인화된 "가짜 현실(pseudo-reality)"을 만든다고 말한다.',
  },
  {
    id: 's03',
    type: 'short',
    category: P,
    difficulty: 'tricky',
    sourcePage: 15,
    question: '"인스타그램의 정신적 지주는 루미가 아닌 ○○다." ○○에 들어갈 17세기 철학자의 이름은?',
    answer: '홉스',
    acceptableAnswers: ['토머스 홉스', '토마스 홉스', 'hobbes', 'thomas hobbes'],
    explanation:
      '루미는 영성·사랑·내면의 평화를 강조한 13세기 시인이자 신비주의자이고, 홉스는 인간이 본질적으로 이기적이며 자기 보존 욕구를 가진다고 본 17세기 철학자다.',
  },
  {
    id: 's04',
    type: 'short',
    category: P,
    difficulty: 'basic',
    sourcePage: 19,
    question: '"경험의 소멸은 불가피한 것이 아니다. 그것은 ○○이다." ○○에 들어갈 말은?',
    answer: '선택',
    acceptableAnswers: [],
    explanation: '저자는 반기술주의가 아니라, 경험의 소멸은 불가피한 것이 아닌 "선택"이라는 입장에서 이 책을 썼다고 말한다.',
  },
  {
    id: 's06',
    type: 'short',
    category: P,
    difficulty: 'hard',
    sourcePage: 0,
    question:
      '책 첫머리에 "기술…… 세상을 깔끔하게 정리해서 경험의 필요성을 없애는 재주"라는 문장이 인용된 소설 《호모 파버》의 작가는?',
    answer: '막스 프리슈',
    acceptableAnswers: ['프리슈', 'max frisch', '막스 프리쉬'],
    explanation: '책의 제사(題詞)로 막스 프리슈의 《호모 파버》 한 구절이 인용되어 있다.',
  },

  // ───────────── 1장 ─────────────
  {
    id: 's07',
    type: 'short',
    category: C1,
    difficulty: 'detail',
    sourcePage: 27,
    question:
      '저자의 아들이 2학년 발표 수업에서 다룬 인물로, 노예가 아닌 자유인으로 태어나 18세기에 날씨를 예측한 연감을 펴낸 아프리카계 미국인은?',
    answer: '벤저민 배너커',
    acceptableAnswers: ['배너커', '벤자민 배너커', 'benjamin banneker', 'banneker'],
    explanation:
      '벤저민 배너커의 발표를 준비하던 중 아들의 친구는 "왜 날씨를 책에서 찾아봐야 해?"라고 물었고, 아이들은 "텔레비전요!", "라디오", "스마트폰으로 확인하는 거죠"라고 답했다.',
  },
  {
    id: 's08',
    type: 'short',
    category: C1,
    difficulty: 'basic',
    sourcePage: 30,
    question:
      '스탠퍼드대학교 가상 인간 상호작용 연구소에서 쓰는 말로, 실제로 해본 적 없는 일을 (가상으로) 해본 것 같은 느낌, 즉 "데자 뷰의 반대"를 뜻하는 용어는?',
    answer: '베자 듀',
    acceptableAnswers: ['vêja du', 'veja du', '베자뒤'],
    explanation:
      '"베자 듀(vêja du)"다. 제러미 베일린슨은 가상현실 헤드셋과 베자 듀 기법으로, 예컨대 담배를 계속 피우면 10년 후 어떻게 될지 노화 과정을 모델링했다.',
  },
  {
    id: 's11',
    type: 'short',
    category: C1,
    difficulty: 'basic',
    sourcePage: 33,
    question: '물리적으로는 한 공간에 존재하지만 정신적·감정적으로는 그곳에 집중하지 못하는 상태를 뜻하는 말은?',
    answer: '부재의 현존',
    acceptableAnswers: [],
    explanation: "사람들이 대면 연결보다 매개된 연결을 선호하면서 나타나는 '부재의 현존' 상태다.",
  },
  {
    id: 's12',
    type: 'short',
    category: C1,
    difficulty: 'basic',
    sourcePage: 37,
    question:
      '1997년 B. 조지프 파인 2세와 제임스 H. 길모어가 "기억에 남는 개인화된" 경험을 파는 시대를 가리켜 제시한 개념은?',
    answer: '경험 경제',
    acceptableAnswers: ['experience economy'],
    explanation:
      '20세기 마케터가 "라이프스타일"을 팔았다면 21세기 마케터는 "경험"을 판다. 파인과 길모어는 이를 "경험 경제"라 불렀다.',
  },
  {
    id: 's13',
    type: 'short',
    category: C1,
    difficulty: 'basic',
    sourcePage: 41,
    question:
      '메타의 마크 저커버그가 즐겨 쓰는 표현으로, 우연과 불화 같은 "딱 떨어지지 않는 경험의 조각들"을 없앤 상태를 뜻하는 말은? (한국어 또는 영어)',
    answer: '마찰 없이',
    acceptableAnswers: ['frictionless', '마찰 없는', '마찰없이'],
    explanation:
      '"마찰 없이(frictionless)". 사회학자 리처드 세넷은 인본주의란 우연과 불화가 새로운 앱이나 알고리즘으로 해결할 문제가 아니라 인간 경험의 필수적 부분임을 인식하는 것이라 했다.',
  },
  {
    id: 's14',
    type: 'short',
    category: C1,
    difficulty: 'basic',
    sourcePage: 45,
    question: '저자에 따르면 델포이 신탁의 "너 자신을 알라"는 오늘날 어떤 말로 바뀌었나?',
    answer: '너 자신을 보여라',
    acceptableAnswers: ['너자신을보여라'],
    explanation: '1장의 소제목이기도 한 "너 자신을 보여라"다. 노출은 충분하지만 지속적인 관계로 이어지지 않는다.',
  },

  // ───────────── 2장 ─────────────
  {
    id: 's22',
    type: 'short',
    category: C2,
    difficulty: 'basic',
    sourcePage: 59,
    question: '폴 에크먼이 발견한 것으로, 사람이 감정을 감추려 할 때 순간적으로 얼굴에 나타나는 표정은?',
    answer: '미세 표정',
    acceptableAnswers: ['미세표정', 'microexpression', 'micro expression'],
    explanation: '에크먼은 미세 표정을 발견했고, 고위험 기만을 식별하는 방법으로 경찰서·교통안전청·할리우드에 조언했다.',
  },
  {
    id: 's23',
    type: 'short',
    category: C2,
    difficulty: 'hard',
    sourcePage: 59,
    question:
      '폴 에크먼에 따르면 우리의 얼굴은 분노를 표현하는 몇 가지 이상의 독특한 표정을 가지고 있나? (숫자로)',
    answer: '200',
    acceptableAnswers: ['200가지', '200개', '이백', '이백가지', '200가지 이상', '200개 이상', '200 이상'],
    explanation: '"우리의 얼굴은 분노를 표현하는 200가지 이상의 독특한 표정"을 가지며, 이는 분노를 설명하는 단어 수보다 많다.',
  },
  {
    id: 's24',
    type: 'short',
    category: C2,
    difficulty: 'basic',
    sourcePage: 60,
    question:
      '코넬대학교 제프 행콕이 말한 것으로, 컴퓨터를 매개로 소통할 때 사람들이 더 능란한 거짓말쟁이가 되는 현상을 가리키는 말은?',
    answer: '동기 향상 효과',
    acceptableAnswers: ['motivational enhancement effect', '동기향상효과'],
    explanation:
      '"동기 향상 효과"다. 대면 상황에서는 경련이나 눈 움직임으로 진실이 드러나기 때문에 거짓말을 망설이게 된다.',
  },
  {
    id: 's27',
    type: 'short',
    category: C2,
    difficulty: 'tricky',
    sourcePage: 66,
    question:
      '어빙 고프먼이 말한 것으로, 상대를 "보기는 했으나 특별한 호기심의 대상은 아닌 것처럼 대하는" 공공장소의 예의 바른 태도는?',
    answer: '사회적 무관심',
    acceptableAnswers: ['civil inattention'],
    explanation:
      '고프먼의 "사회적 무관심"은 사회적 관심과 한 쌍을 이루는 예의다(엘리베이터에서 가볍게 고개를 끄덕이는 것). 저자는 스마트폰 화면만 보는 태도는 이와 달리 "사회적 유리"라고 부른다.',
  },
  {
    id: 's32',
    type: 'short',
    category: C2,
    difficulty: 'basic',
    sourcePage: 87,
    question:
      '헬멧을 쓰면 스키를 더 위험하게 타는 "위험 보상 효과"에 빗대어, 대면 경험이 줄고 만족감이 떨어질수록 매개된 경험에 더 깊이 빠지는 악순환을 저자는 무엇이라 불렀나?',
    answer: '경험 보상 효과',
    acceptableAnswers: ['경험보상효과'],
    explanation: '저자가 제시한 "경험 보상 효과"는 대면 경험의 감소와 매개된 경험 의존이 서로를 강화하는 악순환이다.',
  },

  // ───────────── 3장 ─────────────
  {
    id: 's34',
    type: 'short',
    category: C3,
    difficulty: 'basic',
    sourcePage: 91,
    question:
      '미 국회의사당·국방부·백악관에서 쓰이는, 기계 팔이 실제 펜을 들고 서명을 복제하는 장치를 무엇이라 하나?',
    answer: '자동 서명기',
    acceptableAnswers: ['오토펜', 'autopen', '자동서명기'],
    explanation:
      '자동 서명기는 미국 관료제의 실용주의·효율성·냉정함을 보여준다. 해리 트루먼 때부터 편지와 선언문에 쓰였다.',
  },
  {
    id: 's35',
    type: 'short',
    category: C3,
    difficulty: 'detail',
    sourcePage: 95,
    question: "'펜을 들었으되 글자가 생각나지 않는다'는 뜻으로, 중국의 '문자 기억 상실' 현상을 가리키는 사자성어는?",
    answer: '제필망자',
    acceptableAnswers: ['提筆忘字'],
    explanation: '제필망자(提筆忘字). <중국청년보> 조사에서 중국 젊은이의 4%가 "이미 손 글씨 없이 생활"한다고 답했다.',
  },
  {
    id: 's36',
    type: 'short',
    category: C3,
    difficulty: 'basic',
    sourcePage: 96,
    question:
      '모리스 메를로퐁티, 조지 레이코프 같은 철학자들이 말한 것으로, 몸의 경험이 사고와 인지를 형성한다는 개념은?',
    answer: '체화인지',
    acceptableAnswers: ['체화 인지', 'embodied cognition', '체화된 인지'],
    explanation:
      '체화인지(embodied cognition)의 예로 위쪽=행복, 물리적 따뜻함=애정 같은 연결이 있다. 손 글씨에서 타이핑으로의 전환은 세상에 존재하는 방식의 전환이다.',
  },
  {
    id: 's37',
    type: 'short',
    category: C3,
    difficulty: 'hard',
    sourcePage: 99,
    question: '심리학자 버지니아 버닝거가 "마음의 눈"이라고 부른 뇌 영역은?',
    answer: '방추형회',
    acceptableAnswers: ['fusiform gyrus', '방추상회'],
    explanation:
      '버닝거는 2017년 후속 연구에서 방추형회를 "마음의 눈"이라 불렀고, 4학년 무렵부터 필기체 사용 능력이 철자와 작문 모두에 도움이 된다고 했다.',
  },
  {
    id: 's39',
    type: 'short',
    category: C3,
    difficulty: 'detail',
    sourcePage: 109,
    question: '저자가 여덟 살에 배우기 시작해, 첫 소리를 "고문당하는 오리의 비명" 같았다고 회상한 악기는?',
    answer: '바순',
    acceptableAnswers: ['bassoon', '파곳'],
    explanation:
      '저자는 아이스크림 막대와 마스킹 테이프로 키를 늘려 바순을 불었고, 음악 장학금으로 대학에 갔다. 물성 있는 악기 연주는 "자기 주도적 집중"을 이끈다.',
  },
  {
    id: 's40',
    type: 'short',
    category: C3,
    difficulty: 'detail',
    sourcePage: 115,
    question:
      '영유아 언어 습득을 연구하며 녹음이나 텔레비전으로는 "학습이 전혀 이루어지지 않았다", "아기의 학습에는 사람이 필요합니다"라고 말한 학자는?',
    answer: '퍼트리샤 쿨',
    acceptableAnswers: ['쿨', 'patricia kuhl', '패트리샤 쿨', '퍼트리셔 쿨'],
    explanation: '워싱턴대학교 학습 및 뇌과학 연구소의 퍼트리샤 쿨이다.',
  },

  // ───────────── 4장 ─────────────
  {
    id: 's44',
    type: 'short',
    category: C4,
    difficulty: 'detail',
    sourcePage: 128,
    question: '디즈니가 쓰는 말로, 상상력과 기술을 결합한 전략을 뜻하는 용어는?',
    answer: '이매지니어링',
    acceptableAnswers: ['imagineering'],
    explanation:
      '1955년 애너하임에 첫 테마파크를 연 디즈니는 이매지니어링으로 줄서기 심리학의 새 시대를 열었다.',
  },
  {
    id: 's46',
    type: 'short',
    category: C4,
    difficulty: 'basic',
    sourcePage: 139,
    question: '운전 중 다른 운전자에게 느끼는 분노를 가리키는 말은?',
    answer: '로드 레이지',
    acceptableAnswers: ['road rage', '로드레이지'],
    explanation:
      'AAA 교통안전 재단(2019)에 따르면 운전자의 거의 80%가 지난 30일간 적어도 한 번 분노와 공격성을 드러냈다. 저자는 그 뿌리에 성급함이 있다고 본다.',
  },
  {
    id: 's48',
    type: 'short',
    category: C4,
    difficulty: 'detail',
    sourcePage: 147,
    question:
      '미하이 칙센트미하이가 말한 것으로, 지루함은 줄여주지만 경험의 질을 높여주지는 못하는 소소하고 반복적인 활동은?',
    answer: '소몰입',
    acceptableAnswers: ['microflow', '소몰입 활동', '마이크로플로'],
    explanation:
      '"소몰입(microflow) 활동"은 일상의 우울함을 극복하게 해주지만, 소소한 반복적 게임은 경험의 질을 높여주지는 못한다.',
  },
  {
    id: 's50',
    type: 'short',
    category: C4,
    difficulty: 'detail',
    sourcePage: 157,
    question: '겟세마니 수도원의 카를로스 신부는 "우리 죄의 주된 원인은 무엇입니까?"라고 묻고 무엇이라 답했나?',
    answer: '편리함',
    acceptableAnswers: ['편리'],
    explanation:
      '"우리 죄의 주된 원인은 무엇입니까? 편리함입니다." 겟세마니는 토머스 머튼이 머물렀던 켄터키의 트라피스트 수도원이다.',
  },
  {
    id: 's54',
    type: 'short',
    category: C4,
    difficulty: 'hard',
    sourcePage: 164,
    question:
      '니어퓨처래버러토리 공동 설립자 줄리언 블리커가 속도와 편리함에 심취한 문화를 비판하며 만든 "메시지를 매우 느리게 전달하는 인스턴트 메시지 장치"는?',
    answer: '슬로 메신저',
    acceptableAnswers: ['slow messenger', '슬로우 메신저'],
    explanation:
      '블리커는 상대에게 전달되기까지 지구를 가로질러야 했던 연애편지에서 영감을 얻어 슬로 메신저를 만들었다. "그 기대와 불확실성의 경험을 다시 찾고 싶었습니다."',
  },

  // ───────────── 5장 ─────────────
  {
    id: 's58',
    type: 'short',
    category: C5,
    difficulty: 'basic',
    sourcePage: 173,
    question:
      "1970년대에 유전자(gene)와 '모방된 것'을 뜻하는 그리스어 미메메(mimeme)를 결합해 '밈(meme)'이라는 말을 만든 진화생물학자는?",
    answer: '리처드 도킨스',
    acceptableAnswers: ['도킨스', 'richard dawkins', 'dawkins'],
    explanation: '밈은 유전 물질처럼 사회적으로(바이러스처럼) 전달되는 아이디어를 말한다.',
  },
  {
    id: 's60',
    type: 'short',
    category: C5,
    difficulty: 'basic',
    sourcePage: 179,
    question:
      '철학자 마이클 폴라니가 "우리는 말할 수 있는 것보다 더 많은 것을 알 수 있다"며 설명한 지식의 형태는?',
    answer: '묵시적 지식',
    acceptableAnswers: ['암묵적 지식', '암묵지', 'tacit knowledge'],
    explanation: '몸이 이해하는 많은 것은 말로 표현하기 어렵고, 이런 신체적 반응은 감정적 레퍼토리의 중요한 부분이다.',
  },
  {
    id: 's62',
    type: 'short',
    category: C5,
    difficulty: 'detail',
    sourcePage: 181,
    question:
      '감정 노동 연구에서 대부분의 디즈니 직원이 분노와 원망 같은 진짜 감정을 억누르고 행복을 꾸며낸다며 쓴 용어로, "정서적 피로"로 이어지는 것은?',
    answer: '표면 연기',
    acceptableAnswers: ['surface acting', '표면연기'],
    explanation:
      '디즈니는 직원을 "캐스트 멤버"라 부르고 "고객학(guestology)"으로 교육한다. 강요된 행복은 "표면 연기"와 정서적 피로를 낳는다.',
  },
  {
    id: 's64',
    type: 'short',
    category: C5,
    difficulty: 'basic',
    sourcePage: 188,
    question: '남의 불행을 보고 얻는 쾌감을 뜻하는 독일어 단어는?',
    answer: '샤덴프로이데',
    acceptableAnswers: ['schadenfreude', '샤덴 프로이데'],
    explanation:
      '다른 사람이 온라인에 올린 경험을 소비할 때의 느낌은 공감이라기보다 동정, 연민, 부러움, 샤덴프로이데에 가깝다.',
  },
  {
    id: 's69',
    type: 'short',
    category: C5,
    difficulty: 'detail',
    sourcePage: 198,
    question:
      'MIT의 앨릭스 펜틀랜드 연구실이 위치 센서·가속도계·근접 센서·마이크로 개인의 움직임을 추적하도록 만든 장치로, 뱅크오브아메리카가 직원들에게 지급하기도 한 것은?',
    answer: '소시오메트릭 배지',
    acceptableAnswers: ['sociometric badge', '소시오메트릭배지'],
    explanation:
      '펜틀랜드는 《어니스트 시그널》의 저자로, 자신의 센서 기반 연구를 "현실 마이닝"이라 불렀다. 뱅크오브아메리카 임원은 이 배지가 "객관적인 방식으로 실제 행동을 측정한다"고 했다.',
  },
  {
    id: 's72',
    type: 'short',
    category: C5,
    difficulty: 'detail',
    sourcePage: 205,
    question: 'B. F. 스키너가 관찰 가능한 행동의 원인과 결과를 강조하며 제시해, 오늘날 설득 기술의 근거가 된 이론은?',
    answer: '조작적 조건화',
    acceptableAnswers: ['operant conditioning', '조작적 조건형성', '조작적 조건 형성'],
    explanation:
      '인터내셔널 게이밍 테크놀로지의 임원은 어떤 도박 기계가 사용자를 더 잘 붙잡아두는지 묻자 스키너의 조작적 조건화에 관한 책을 읽어보라고 했다.',
  },

  // ───────────── 6장 ─────────────
  {
    id: 's73',
    type: 'short',
    category: C6,
    difficulty: 'basic',
    sourcePage: 220,
    question:
      '혼자 여행했지만 아이패드와 휴대전화로 고향의 모든 지인과 끊임없이 연락한 사라이 시에라가 머물렀던, 마치 안전을 보장해주는 듯한 공간을 저자는 무엇이라 불렀나?',
    answer: '디지털 버블',
    acceptableAnswers: ['digital bubble'],
    explanation:
      '사라이 시에라는 21세기적 의미로만 혼자였다. 가족은 기술 때문에 그녀가 안전하다는 잘못된 인식을 갖게 된 것은 아닌지 의심했다.',
  },
  {
    id: 's74',
    type: 'short',
    category: C6,
    difficulty: 'basic',
    sourcePage: 222,
    question:
      '항공 업계에서 불연성 좌석 쿠션이나 통로 비상등처럼 위험을 줄이는 과정을 가리키는 말로, 저자가 디지털 시대의 쾌락에도 적용한 용어는?',
    answer: '치명성 제거',
    acceptableAnswers: ['delethalization'],
    explanation:
      '디지털 시대의 쾌락도 "치명성 제거"를 거쳤다. 쾌락은 디지털 형태로 쉽게 소화·공유되도록 치명성이 제거되며, 그 결과 쾌락이 완전히 탈바꿈된다.',
  },
  {
    id: 's75',
    type: 'short',
    category: C6,
    difficulty: 'tricky',
    sourcePage: 224,
    question:
      '프로이트에 따르면 이드의 원동력인 "쾌락 원리"는, 에고가 발달해 욕망의 한계를 인식하는 어떤 원리로 통제되고 길들여져야 완화되는가?',
    answer: '현실 원리',
    acceptableAnswers: ['reality principle'],
    explanation: '쾌락 원리(pleasure principle)는 에고가 발달하며 생기는 "현실 원리"로 통제된다.',
  },
  {
    id: 's76',
    type: 'short',
    category: C6,
    difficulty: 'detail',
    sourcePage: 228,
    question: '작가 헨리 제임스가 베네치아를 사랑하는 사람들에게 그 도시를 가리켜 부른 말은?',
    answer: '위로의 저장소',
    acceptableAnswers: [],
    explanation: '저자는 오늘날 위로의 저장소가 감각 기억이 아니라 어디든 가지고 다니는 스마트폰 속 사진이라고 말한다.',
  },
  {
    id: 's77',
    type: 'short',
    category: C6,
    difficulty: 'hard',
    sourcePage: 229,
    question: '일부 구조대원들이 미숙한 오지 탐험가들이 위성 전화로 거는 조난 전화를 가리켜 부르는 말은?',
    answer: '여피 911',
    acceptableAnswers: ['yuppie 911', '여피911'],
    explanation:
      '모험가 데이비드 로버츠는 "여피 911"이 유행병처럼 번지는 현상을 탐험에 대한 태도 변화의 증거로 본다. 당일치기 여행자들은 구조를 "양도할 수 없는 권리"로 생각한다.',
  },
  {
    id: 's78',
    type: 'short',
    category: C6,
    difficulty: 'detail',
    sourcePage: 233,
    question: '착용형 디지털카메라 고프로(GoPro)의 슬로건은?',
    answer: '영웅이 되라',
    acceptableAnswers: ['be a hero'],
    explanation:
      '이제 진짜 모험가가 되려면 경험을 소셜 미디어에 실시간으로 기록해야 한다. 고프로 설립자는 사람들이 자신을 촬영하는 착용형 카메라에 더 큰 기회가 있다고 했다.',
  },
  {
    id: 's79',
    type: 'short',
    category: C6,
    difficulty: 'detail',
    sourcePage: 234,
    question:
      '"우리는 탐험을 하지 않는다. 포즈를 취한다." 여행지에서 거기 있었음을 증명하려고 찍는 사진을 수전 손택은 무엇이라고 묘사했나?',
    answer: '사진-트로피',
    acceptableAnswers: ['사진 트로피', 'photograph-trophy', 'photograph trophy'],
    explanation:
      '수전 손택의 표현 "사진-트로피(photograph-trophy)"다. 인스타그램에서는 마추픽추에서 찍은 셀카가 고속도로 출구의 맥도날드만큼 흔하다.',
  },
  {
    id: 's80',
    type: 'short',
    category: C6,
    difficulty: 'detail',
    sourcePage: 243,
    question:
      '페어필드대학교 심리학자 린다 헨켈의 연구에서, 미술관 작품을 사진으로 찍은 관람객이 그 작품을 더 적게 기억한 현상을 가리키는 말은?',
    answer: '사진 손상 효과',
    acceptableAnswers: ['photo-impairment effect', 'photo impairment effect', '사진손상효과'],
    explanation:
      '헨켈은 이를 "사진 손상 효과(photo-impairment effect)"라 불렀다. "카메라의 \'눈\'은 \'마음의 눈\'이 아니"라는 것이다.',
  },
  {
    id: 's81',
    type: 'short',
    category: C6,
    difficulty: 'tricky',
    sourcePage: 260,
    question: '저자가 고안한, 요리를 이용한 일종의 로르샤흐 테스트의 이름은?',
    answer: '벨비타 테스트',
    acceptableAnswers: ['velveeta test', '벨비타테스트', '벨비타'],
    explanation:
      '초가공 "치즈 음식"인 벨비타의 이름을 딴 테스트다. 저자는 음식 대체 음료 소이렌트를 "와이파이 요리(Wi-Fi cuisines)" 시대의 논리적 귀결로 보며, 쾌락이 쾌락주의자보다 엔지니어에 의해 고안되고 있다고 말한다.',
  },
  {
    id: 's82',
    type: 'short',
    category: C7,
    difficulty: 'basic',
    sourcePage: 278,
    question:
      '"공간은 정의와 의미를 얻을 때 ○○로 변한다." 이-푸 투안의 이 말을 인용하며 저자는 "사이버 공간은 있지만 사이버 ○○는 없다"고 했다. ○○에 공통으로 들어갈 말은?',
    answer: '장소',
    acceptableAnswers: ['place'],
    explanation:
      '장소(place)가 공간(space)으로 대체되고 있다. 공간은 "경계가 생기고 인적 요소가 가미"될 때 장소가 된다. 페이스북 이전 시대의 지배적인 소셜 네트워크가 마이플레이스가 아닌 마이스페이스였던 이유도 여기에 있다.',
  },
  {
    id: 's83',
    type: 'short',
    category: C7,
    difficulty: 'hard',
    sourcePage: 279,
    question: '작가 제임스 조이스가 1939년 작품 《피네간의 경야》에서 만들어낸 단어로, 공간이 시간에 의해 방해받을 수 있음을 표현한 말은?',
    answer: '아이스페이스',
    acceptableAnswers: ['ispace', 'i-space', 'i space'],
    explanation:
      '"아이스페이스(iSpace)"는 공간이 시간에 의해 방해받을 수 있음을 표현하는 단어인 동시에 장소에는 한계가 있지만 공간에는 제한이 없음을 인정하는 말이기도 했다.',
  },
  {
    id: 's84',
    type: 'short',
    category: C7,
    difficulty: 'detail',
    sourcePage: 286,
    question: '모바일 기술이 발명되기 훨씬 전에 프랑스 철학자 시몬 베유가 "현대의 질병"이라 부른 것은?',
    answer: '뿌리 뽑힘',
    acceptableAnswers: ['uprootedness', '뿌리뽑힘'],
    explanation:
      '베유는 현대인의 지역사회 참여 부족과 장소에 기반한 유대 관계의 부족을 우려했다. 오늘날 우리는 기술이 가져온 뿌리 뽑힘을 "연결" 또는 "이동성"으로 재정의해 일과 여가의 표준으로 삼았다.',
  },
  {
    id: 's85',
    type: 'short',
    category: C7,
    difficulty: 'detail',
    sourcePage: 289,
    question:
      '인류학자 에드워드 T. 홀이 창시한 학문으로, 공간 속 우리의 물리적 위치와 다른 사람과의 관계를 연구하는 "근접공간학"을 영어식으로 부르는 이름은?',
    answer: '프록시믹스',
    acceptableAnswers: ['proxemics', '근접공간학'],
    explanation:
      '프록시믹스는 누군가 "사적인 공간"에 침입하면 불안해지는 이유, 붐비는 비행기 승객이 "기내 분노(air rage)"를 표출하는 이유를 설명해준다.',
  },
  {
    id: 's86',
    type: 'short',
    category: C7,
    difficulty: 'tricky',
    sourcePage: 295,
    question:
      '저널리스트 윌리엄 H. 화이트는 영화 <작은 도시 공간의 사회생활>에서 사람들이 광장을 수많은 교차 패턴으로 지나다니면서도 결코 충돌하지 않는 모습을 무엇이라는 말로 묘사했나?',
    answer: '안무',
    acceptableAnswers: ['choreography', '코레오그래피'],
    explanation:
      '화이트는 광장에서 펼쳐지는 일을 "안무(choreography)"라 묘사했다. "아주 작은 손짓. 잠깐의 지연. 0.1초. 타이밍은 기가 막혔습니다." 오늘날 광장의 패턴은 기술에 몰두한 보행자들이 부딪히는, 통제되지 않은 움직임에 가깝다.',
  },
  {
    id: 's87',
    type: 'short',
    category: EP,
    difficulty: 'basic',
    sourcePage: 315,
    question:
      '벤처 캐피털리스트 마크 앤드리슨이 "현실과 비현실을 구분하는 능력이 사라지면 해가 되지 않겠느냐"는 우려를 가리켜 부른 말은?',
    answer: '현실 특권',
    acceptableAnswers: ['reality privilege', '현실특권'],
    explanation:
      '앤드리슨은 의미 있는 경험으로 가득한 현실 세계에 사는 것은 소수뿐이고, 나머지 사람들은 온라인 세계에서 더 행복할 것이라 주장했다. 저자는 "현실을 지키는 것이 특권으로 여겨져서는 안 된다"고 반박한다.',
  },
  {
    id: 's88',
    type: 'short',
    category: EP,
    difficulty: 'detail',
    sourcePage: 323,
    question:
      '저자는 "기술에 대한 접근에서는 ○○가 되어야 한다"고 했다. 새로운 것을 받아들이기 전에 공동체·가정·가치관에 미칠 영향을 먼저 묻는 재침례파 계통의 생활 공동체를 가리키는 ○○는?',
    answer: '아미시',
    acceptableAnswers: ['amish', '아미쉬'],
    explanation:
      '새로운 기기와 앱을 엄격하게 거부하지 않더라도 강한 회의적 시선을 가질 필요가 있다는 뜻이다. 비슷한 예로 부모들은 "8학년까지(Wait Until 8th)" 모임을 만들어 중학교 2학년이 되기 전까지 자녀에게 스마트폰을 주지 않겠다고 서약한다.',
  },
  {
    id: 's89',
    type: 'short',
    category: C5,
    difficulty: 'detail',
    sourcePage: 210,
    question:
      'GPS와 심박수 모니터링 손목 밴드로 인간관계를 추적해, 스트레스를 주는 사람을 친구 목록에서 삭제하고 팔로우를 취소해주는 "people keeper"의 줄임말 이름을 가진 앱은?',
    answer: 'PPLKPR',
    acceptableAnswers: ['people keeper', '피플키퍼', '피플 키퍼'],
    explanation:
      '로런 매카시와 카일 맥도널드가 만든 PPLKPR은 "자동으로 일정에 추가해야 할 사람과 제거해야 할 사람을 결정"해준다고 홍보했다. 카네기멜론대학교 학생들은 열광했고, 한 학생은 데이터를 보고 "마크와 어울리지 말아야겠어요. 이기적인 놈 같아요"라고 말했다. 저자는 일상의 감정 노동을 앱과 알고리즘에 아웃소싱하는 것을 감정적 용병을 만드는 일이라고 본다.',
  },
];

export const questions: Question[] = [...multipleQuestions, ...shortQuestions];
