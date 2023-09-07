## ⚙ 실행 방법

---

1. 프로젝트 내려받기: `git clone` [https://github.com/pre-onboarding-12th-team-8/pre-onboarding-12th-3-8.git ./](https://github.com/pre-onboarding-12th-team-8/pre-onboarding-12th-3-8.git) 
2. 패키지 설치: `npm install`
3. 애플리케이션 실행: `npm start` (브라우저가 자동으로 실행되어 홈페이지로 이동)

## 🙋‍♂️팀원 소개

---

| 강석규(배포) | 박진영(팀장) | 백민석(서기) |
| --- | --- | --- |
| <img src="https://avatars.githubusercontent.com/u/8746067?v=4.png" width="300" height="300"/> | <img src="https://avatars.githubusercontent.com/u/69949824?v=4.png" width="300" height="300"/> | <img src="https://avatars.githubusercontent.com/u/125581005?s=64&v=4" width="300" height="300"/> |
| [AlgeMoya](https://github.com/AlgeMoya) | [jypman](https://github.com/orgs/pre-onboarding-12th-team-8/people/jypman) | [Minseok96](https://github.com/Minsoek96?tab=repositories) |

## 📁 프로젝트 디렉토리 설명

---

```
📦src
 ┣ 📂api
 ┃ ┣ 📜client.tsx
 ┃ ┣ 📜config.tsx
 ┃ ┗ 📜sick.tsx
 ┣ 📂components
 ┃ ┣ 📜SearchInput.tsx
 ┃ ┣ 📜SearchItem.tsx
 ┃ ┗ 📜SearchResult.tsx
 ┣ 📂context
 ┃ ┗ 📜searchContext.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.tsx
 ┃ ┗ 📜useKeyNavigation.tsx
 ┣ 📂mocks
 ┃ ┣ 📜handlers.tsx
 ┃ ┗ 📜worker.tsx
 ┣ 📂pages
 ┃ ┣ 📜Home.tsx
 ┃ ┗ 📜Search.tsx
 ┣ 📂reducer
 ┃ ┣ 📜searchReducer.tsx
 ┃ ┗ 📜type.tsx
 ┣ 📂router
 ┃ ┗ 📜Router.tsx
 ┣ 📂styles
 ┣ 📂types
 ┃ ┗ 📜index.tsx
 ┣ 📂utils
 ┃ ┗ 📜cacheStorage.tsx
 ┣ 📜App.tsx
 ┣ 📜db.json
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
```

## 🚫 BestPratice 선정 대안

---

**배경 :**

이전 프로젝트들에서는 개별적인 접근 방식이 있더라도 일정한 구조와 로직이 유사하여 Best Practice를 선정하는 데 큰 어려움이 없었다 그러나 현재 진행 중인 프로젝트는 구조와 로직에 있어서 큰 차이가 발생하였고, 이에 따라 기존의 Best Practice 선정 방식으로는 취합이 어렵다고 판단되었다.

### **새롭게 선정된 방식** :

1. 구조에 대한 토론 과 결정 :
    1. 프로젝트의 구조에 대해 토론. 
    2. 통합적인 관점에서 최적의 구조를 결정하기 위해 여러 의견을 수렴 
    
2. 키 포인트 추출 과 통합 :
    1. 각자의 구현 과제에서 핵심적인 포인트를 추출 
    2. 팀원 모두가 만족할 수 있는 결과를 중점으로 키 포인트를 통합
    
3. 초기 구현 :
    1. 초기 단계에서 한 명의 팀 멤버가 코드를 리팩토링
    
4. 코드 검토와 건의 
    1. 나머지 팀 멤버들이 코드를 순차적으로 검토 
    2. 2차 리팩토링 & 건의사항  
    3. 2차 리팩토링 코드에 대한 리뷰 & 투표
    4. 머지 결정 

**기대효과 :**

- 프로젝트의 새롭게 채택된 접근 방식은 팀원 각자의 독립적인 생각과 구현을 단순히 조합하는 대신, 서로의 장점과 단점을 중심으로 토론하고 결합하는 방식을 채택하였다. 이러한 방식은 모든 팀원이 100% 만족하는 것은 어렵겠지만, 최대한의 만족감을 제공하고 팀 내에서 최선의 결과를 달성할 수 있게 해준다.

### 💪 New BestPratic 선정 토론 & 계획

---

1. **서버 모킹**
    - 코드 위치: **`/src/server/mock`**
    - 계획  : 모두가 비슷한 로직으로 구현하여 특이사항 없음
    
2. **질환명 검색 시 API 호출하여 검색어 추천 기능 구현**
    - 관리 방식 : Context API
    - 공통 문제 :
        - Search컴포넌트의 의존성과 관심사의 분리가 어렵다.
        - 최대한 분리를 해도 Controller를 담당하는 부분이 많은 props를 전달하게됨
        - 구현사항 특성상 서로의 컴포넌트의 의존성을 끊기는 힘들다고 판단
    - 키 포인트 :
        - 서로 의존 할 수 밖에 없는 관계라면 Props 드릴링을 최소화 하자
        - Context API를 이용한 서치컴포넌트 Controller 역할을 담당
        - Context API와 리듀서를 이용한 전역적 데이터 상태와 요청 상태 관리
    
3. **API 호출별 로컬 캐싱 구현**
    - 캐싱 함수 형태 : **`utils.ts`**
    - 관리 방식  :  유틸 함수로 관리하여 관심사를 분리
    - 캐싱 처리 구간 :  Axios 인스턴스에서 사용 (캐싱 API와 일반 API를 구분)
    - 키포인트  :
        - 캐싱함수에 대한 의존성을 최대한 분리하기 위한 유틸화
        - Axios 인스턴스를 활용하여 캐싱 API와 일반 API의 분리
        - Axios 인터셉트를 이용하여 요청을 취소하고 캐싱데이터 반환
        - localStorage를 이용한 key, value를 활용하여 expireTime 설정
    
4. **API 호출 횟수 줄이기**
    - 관리 위치 : **`utils.ts`**
    - 관리 방식 : 유틸 함수로 관리하여 특정 프레임워크에 대한 의존성 분리
    - 키포인트  :
        - 연쇄적인 요청을 방지하기 위해 디바운싱 기법 사용
        - 유틸화 하여 특정 프레임워크에 대한 의존성 분리
    
5. **키보드만으로 추천 검색어 이동 기능 구현**
    - 관리 위치 : ContextAPI ?
    - 키포인트 :
        - keyDown 이벤트를 활용

## 🔨 이슈 관련

---
