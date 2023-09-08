# README
## 🌐 배포 주소
### https://pre-onboarding-12th-3-8.vercel.app/
![image](https://github.com/Minsoek96/pre-onboarding-12th-3-8/assets/125581005/19a3062a-5d14-44b5-bdeb-852b9ed9ceb7)



## ⚙ 실행 방법

1. 프로젝트 내려받기: `git clone` [https://github.com/pre-onboarding-12th-team-8/pre-onboarding-12th-3-8.git ./](https://github.com/pre-onboarding-12th-team-8/pre-onboarding-12th-3-8.git) 
2. 패키지 설치: `npm install`
3. 애플리케이션 실행: `npm start` (브라우저가 자동으로 실행되어 홈페이지로 이동)


## 🙋‍♂️팀원 소개

| 강석규(배포) | 박진영(팀장) | 백민석(서기) |
| --- | --- | --- |
| <img src="https://avatars.githubusercontent.com/u/8746067?v=4.png" width="300" height="300"/> | <img src="https://avatars.githubusercontent.com/u/69949824?v=4.png" width="300" height="300"/> | <img src="https://avatars.githubusercontent.com/u/125581005?s=64&v=4" width="300" height="300"/> |
| [@AlgeMoya](https://github.com/AlgeMoya) | [@jypman](https://github.com/orgs/pre-onboarding-12th-team-8/people/jypman) | [@Minsoek96](https://github.com/Minsoek96?tab=repositories) |


## 📁 프로젝트 디렉토리 구조
```
📦src
 ┣ 📂api
 ┃ ┣ 📜config.ts
 ┃ ┣ 📜http.ts
 ┃ ┗ 📜sick.ts
 ┣ 📂components
 ┃ ┣ 📜Icon.tsx
 ┃ ┣ 📜SearchedKeywordCard.tsx
 ┃ ┣ 📜SearchedKeywordItem.tsx
 ┃ ┗ 📜SearchForm.tsx
 ┣ 📂context
 ┃ ┣ 📜SearchProvider.tsx
 ┃ ┗ 📜types.ts
 ┣ 📂pages
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜NotFound.tsx
 ┃ ┣ 📜Router.tsx
 ┃ ┗ 📜SearchResult.tsx
 ┣ 📂reducers
 ┃ ┣ 📜searchReducer.tsx
 ┃ ┗ 📜type.ts
 ┣ 📂server
 ┃ ┗ 📂mocks
 ┃ ┃ ┣ 📜browser.ts
 ┃ ┃ ┣ 📜db.json
 ┃ ┃ ┗ 📜sickKeywordHandler.ts
 ┣ 📂utils
 ┃ ┣ 📜cache.ts
 ┃ ┣ 📜localStorage.ts
 ┃ ┗ 📜utils.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
```

## 🚫 BestPratice 선정 대안

**배경 :**

이전 프로젝트들에서는 개별적인 접근 방식이 있더라도 일정한 구조와 로직이 유사하여 Best Practice를 선정하는 데 큰 어려움이 없었다 
그러나 현재 진행 중인 프로젝트는 구조와 로직에 있어서 큰 차이가 발생하였고, 이에 따라 
기존의 Best Practice 선정 방식으로는 취합이 어렵다고 판단되었다.

**토론과정 :**
1. 프로젝트의 구조에 대한 의견 수렴 후 토론과 결정
2. 각자의 과제에서 핵심적인 포인트를 추출하여 통합
3. 초기 단계에서 한 명의 팀 멤버가 코드를 리팩토링
4. 다른 멤버들이 검토 후 2차 리팩토링, 머지 결정

**기대효과 :**

- 최선의 모범사례를 선정하기 위해서 팀원들에게 언급할 논리적인 근거가 필요하여 해당 기술에 대해 다시 한번 공부하여 정리할 수 있는 기회를 가질 수 있음

## 💪 New BestPratic 선정 계획 & 구현사항

1. **서버 모킹**
    - 코드 위치: **`/src/server/mock`**
    - 계획: 모두가 비슷한 로직으로 구현하여 특이사항 없음
    - why?:
        - 본 프로젝트에서는 서버 모킹이 구현 사항에 명시되어 있지 않지만, 백엔드 API 배포가 아직 이루어지지 않은 상황을 고려하여 모킹을 도입하기로 결정
        - 제공된 **`ds.json`** 파일을 활용하면, 실제 백엔드 API와 유사한 동작을 구현할 수 있다. 이러한 접근방식은 프로젝트 배포 과정을 원활하게 진행할 수 있도록 돕게 될 것이라 예상된다.


2. **질환명 검색 시 API 호출하여 검색어 추천 기능 구현**
    - 관리 방식 : **`/src/searchReducer`**
    - 공통 문제 :
        - Search 컴포넌트에서 의존성과 관심사 분리가 어려운 점이 대표적인 문제다
        - 최대한 분리를 해도 Controller를 담당하는 부분이 많은 props를 전달하게됨
        - 구현 사항의 특성 상, 컴포넌트 간의 의존성을 완전히 끊어낼 수 없다고 판단
    - 키 포인트 :
        - 서로 의존 할 수 밖에 없는 관계라면 Props 드릴링을 최소화 하자
        - Context API를 이용한 서치컴포넌트 Controller 역할을 담당
        - Context API와 리듀서를 이용한 데이터 상태와 요청 상태 관리
    - why? :
        - 컴포넌트 간 의존성을 완전히 끊을 수 없는 상황에서도, Context API의 활용을 통해 Props 전달을 최소화하면서 프로젝트 관리를 더 효율적으로 할 수 있다고 판단


3. **API 호출별 로컬 캐싱 구현**
    - 캐싱 함수 형태 : **`src/utils/cache.ts`**
    - 관리 방식  :  유틸 함수로 관리하여 관심사를 분리
    - 캐싱 처리 구간 :  Axios 인스턴스에서 사용 (캐싱 API와 일반 API를 구분)
    - 키포인트  :
        - 캐싱함수에 대한 의존성을 최대한 분리하기 위한 유틸화
        - Axios 인스턴스를 활용하여 캐싱 API와 일반 API의 분리
        - Axios 인터셉트를 이용하여 요청을 취소하고 캐싱데이터 반환
        - localStorage를 이용한 key, value를 활용하여 expireTime 설정
    - why ? :
        - 세션 스토리지는 한 세션 동안만 데이터가 유지되므로 캐싱을 목적으로 한 스토리지 사용에는 부적합하다 판단
        - 지속적인 데이터 저장이 가능한 localStorage를 선택


4. **API 호출 횟수 줄이기**
    - 관리 위치 : **`src/utils/utils.ts`**
    - 관리 방식 : 유틸 함수로 관리하여 특정 프레임워크에 대한 의존성 감소
    - 키포인트  :
        - 연쇄적인 요청을 방지하기 위해 디바운싱 기법 사용
        - 디바운싱 로직을 유틸 함수로 분리, 특정 프레임워크에 대한 의존성 감소
    - why :
        - 디바운싱 로직을 분리함으로써, 의존성 분리가 더욱 명확해질 것으로 예상
        - 커스텀 훅과 유틸 함수 사이에서 고민했으나, state관리의 필요성이 덜하며 유틸 함수로 구현함으로써 프레임워크에 한정되지 않는 이점을 발견, 따라서 유틸 함수로의 구현이 더욱 바람직하다고 판단


5. **키보드만으로 추천 검색어 이동 기능 구현**
    - 관리 위치 : **`src/context/SearchProvider.tsx`**
    - 키포인트 :
        - 상태 관리를 통해 추천 검색어 목록의 인덱스를 추적
        - **`keydown`** 이벤트를 통해 방향키 상/하 입력을 감지하며, 이에 따라 상태 값을 업데이트하여 적절한 검색어를 하이라이트
        - 업데이트된 상태 값을 이용하여 배경색을 변경
        - input의 value 상태값을 해당 추천 검색어로 업데이트
    - why :
        - 키보드 이벤트 기능을 구현하다 보면 다수의 props 전달이 필요하게 되는데, 이를 최소화하기 위해 Context API를 사용하여 Props 드릴링의 최소화 하는데 중점을 맞춤
        - 방향키의 상/하 입력 감지는 **`keyPress`** 이벤트로는 처리할 수 없어, **`keydown`** 이벤트를 사용하여 이 기능을 구현.

## 🛠Tech Stack
<div>

Area| Tech Stack|
:--------:|:------------------------------:|
**Frontend** | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/React Router-CA4245.svg?&style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093.svg?&style=for-the-badge&logo=styledcomponents&logoColor=white">
**Backend** | <img src="https://img.shields.io/badge/Mock Service Worker-FF6A33?&style=for-the-badge">
</div>
