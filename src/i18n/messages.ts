export type Locale = 'en' | 'ko'

export type MessageKey =
  | 'navHome'
  | 'navGenerator'
  | 'ctaGenerate'
  | 'heroEyebrow'
  | 'heroTitle'
  | 'heroLead'
  | 'point1'
  | 'point2'
  | 'point3'
  | 'generatorTitle'
  | 'generatorSubtitle'

export const messages: Record<Locale, Record<MessageKey, string>> = {
  en: {
    navHome: 'Home',
    navGenerator: 'Generator',
    ctaGenerate: 'Start generating',
    heroEyebrow: 'SVG / PNG · Free · Browser only',
    heroTitle: 'Generate bold backgrounds\nwith Scaletive',
    heroLead: 'Wave, blob, gradient, mesh, and pattern templates with mood-based palettes. Export ready for slides, heroes, and thumbnails.',
    point1: 'No account · LocalStorage quota',
    point2: '1920×1080 PNG / SVG',
    point3: 'Random palettes & templates',
    generatorTitle: 'Generator',
    generatorSubtitle: 'Pick a template, mood, tweak sliders, and export locally. Everything renders in-browser.',
  },
  ko: {
    navHome: '홈',
    navGenerator: '생성기',
    ctaGenerate: '생성 시작하기',
    heroEyebrow: 'SVG / PNG · 무료 · 브라우저만 사용',
    heroTitle: '과감한 배경을 생성하세요\nScaletive와 함께',
    heroLead: 'Wave, Blob, Gradient, Mesh, Pattern 템플릿과 무드 기반 팔레트. 슬라이드, 히어로, 썸네일에 바로 쓰는 내보내기.',
    point1: '회원가입 없음 · 로컬 스토리지 제한',
    point2: '1920×1080 PNG / SVG',
    point3: '랜덤 팔레트 & 템플릿',
    generatorTitle: '생성기',
    generatorSubtitle: '템플릿·무드 선택 후 슬라이더만 조절해 바로 로컬 내보내기. 모든 연산은 브라우저에서 처리됩니다.',
  },
}
