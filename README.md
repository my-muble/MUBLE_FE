# 🎧 MUBLE Frontend

> 좋아하는 음악을 평가하고, 그 음악과 함께한 순간을 기록하는 개인 음악 아카이브

**음악 → 평가 → 감상/이야기 → 기록 → 축적 → 회고**

---

## 🛠 Tech Stack

- React Native
- Expo SDK 57
- TypeScript
- Expo Router
- ESLint / Prettier
- GitHub Actions
- CodeRabbit

---

## 📱 Support

| Platform | Minimum Version     |
| -------- | ------------------- |
| iOS      | iOS 18.0            |
| Android  | Android 10 / API 29 |

---

## 🚀 Getting Started

```bash
git clone https://github.com/my-muble/MUBLE_FE.git
cd MUBLE_FE
npm install
```

환경변수 파일 생성:

```bash
cp .env.example .env
```

실행:

```bash
npm start
```

```bash
npm run ios
npm run android
```

---

## 🌿 Git Convention

### Branch

```text
main
└── dev
    └── 작업 브랜치
```

작업 브랜치는 최신 `dev`에서 생성합니다.

```text
label/description
```

예시:

```text
feat/login
ui/home-screen
fix/search-error
chore/muble-rebranding
```

### Type

`FEAT` · `UI` · `FIX` · `REFACTOR` · `ADD` · `CHORE` · `HOTFIX` · `DELETE` · `DOCS`

### Commit

```text
[TYPE] 작업 내용
```

예시:

```text
[FEAT] 음악 검색 기능 구현
[UI] 로그인 화면 구현
[FIX] 검색 오류 수정
[CHORE] MUBLE 리브랜딩 설정 변경
```

---

## 🔢 Issue & PR

Issue에는 연속된 `MUBLE` 작업 번호를 사용합니다.

```text
[MUBLE-1] [CHORE] 소셜 로그인 인증 환경 초기 세팅
[MUBLE-2] [CHORE] 환경변수 관리 구조 설정
```

연결된 PR은 Issue와 동일한 `MUBLE` 번호를 사용합니다.

PR에서 실제 Issue를 연결할 때는 GitHub Issue 번호를 사용합니다.

```text
Closes #3
```

기존 TFS 작업 번호는 유지하며, 신규 작업부터 MUBLE 명칭을 사용합니다.

---

## ✅ Code Check

PR 생성 전 확인합니다.

```bash
npm run format:check
npm run lint
npm run typecheck
```

---

## 🔀 Workflow

```text
Issue
  ↓
작업 브랜치
  ↓
개발 / Commit
  ↓
PR → dev
  ↓
CI / CodeRabbit Review
  ↓
팀원 Approve
  ↓
Merge
```

- 하나의 PR에는 하나의 목적만 포함합니다.
- UI 변경 시 캡처 또는 영상을 첨부합니다.
- 팀원 1명 이상 Approve 후 Merge합니다.
- Merge 완료 후 작업 브랜치는 삭제합니다.

---

**Record the music. Remember the moment. 🎵**
