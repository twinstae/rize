# RIZE: 프메 백업 뷰어 

rize는 아이즈원 프라이빗 메일의 백업을 쉽게 검색하고 찾아볼 수 있는 뷰어입니다.

[1.0.0 릴리즈](https://github.com/twinstae/rize/releases/tag/desktop-1.0.0)는 해당 링크에서 다운 받으실 수 있습니다.

현재 윈도우와 리눅스 버전을 지원하고 있습니다. 맥 빌드도 곧 배포할 예정이며, 모바일도 지원할 예정입니다.

## 기술적 세부사항

- 웹뷰를 기반으로 한 타우리, 캐패시터를 이용해서 데스크탑 앱, 모바일 앱을 모두 지원합니다.
- unit, component, e2e 테스트와 타입, assertion, mutation testing, schema parsing으로 안정성을 보장합니다.
- 핵심 로직과 플랫폼에 따른 의존성을 분리합니다
- stackflow로 모바일 앱과 같은 스택 네비게이션을 지원합니다
- tanstack virtual로 최적화된 가상 리스트를 지원합니다.
- korean-regexp로 초성을 포함한 한글 검색을 지원합니다
- i18next로 영어와 일본어 등 다국어를 지원합니다.
