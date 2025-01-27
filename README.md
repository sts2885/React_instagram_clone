<h1> 개인 공부를 위해 기존에 다른분들이 개발하신 instagram clone code를 fork해 가지고 왔습니다. </h1>
<br/>
<h1> 원본의 링크는 </h1> [여기에 있습니다.](https://github.com/Instagram-Clone-Coding)
<br/>

<h2> 원본 레포지토리에는 개발된 front-end, back-end의 코드가 aws 서버에 올라가는 구조로 되어 있었지만,</h2>
<br/>
<h2> 저는 이를 EKS에 띄우려고 합니다.</h2>
<br/>
<h3> 따라서 git을 맨 처음 commit으로 되돌리고, 중간중간 완성되는 코드를 보면서 class diagram, cloud architecture 등을 그리고</h3>
<br/>
<h3> Dockerfile, Terraform 코드, yaml 파일을 작성해 eks 배포를 할 예정 입니다.</h3>

<h1>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</h1>
<br/>

<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Instagram-Clone-Coding">
    <img src="https://avatars.githubusercontent.com/u/90607105?s=200&v=4" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">FE-Instagram-Clone</h3>

  <p align="center">
    인스타그램 클론코딩 프로젝트의 frontend 부분 github입니다.
    <br />
    <a href="https://github.com/Instagram-Clone-Coding"><strong>Explore the Organization</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
    <!-- · -->
    <a href="https://github.com/Instagram-Clone-Coding/React_instagram_clone/issues">Report Bug</a>
    ·
    <a href="https://github.com/Instagram-Clone-Coding/React_instagram_clone/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <!-- <a href="#about-the-project">About The Project</a> -->
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#convention">Convention</a></li>
        <li><a href="#commit-convention">Commit Convention</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

<!-- ## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:

-   Your time should be focused on creating something amazing. A project that solves a problem and helps others
-   You shouldn't be doing the same tasks over and over like creating a README from scratch
-   You should implement DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this template!

Use the `BLANK_README.md` to get started.

<p align="right">(<a href="#top">back to top</a>)</p> -->

### Built With

Frontend

-   [React.js](https://reactjs.org/)
-   [Redux.js](https://redux.js.org/)
-   [TypeScript](https://www.typescriptlang.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### convention

-   Conding Convention

1. Event Handler 네이밍: ~handler
    ```ts
    const exampleHandler = (): void => {};
    ```
2. Handler Function Prop 네이밍: on~
    ```ts
    return <ExampleComponent onSubmit={exampleHandler} />;
    ```
3. Interface 네이밍: Pascal Case +

    - props으로 넘길 때 ~Props

    ```ts
    interface ExampleProps {
        name: string;
    }
    ```

    - 다른 모든 경우, ~Type
      <br />

4. styled-components 구조: 최상위 태그에만 한 번

    ```ts
    const StyledTag = styled.div``;

    return (
        <StyledTag>
            <div>Not</div>
            <div>There</div>
        </StyledTag>
    );
    ```

5. 타입 관리

-   전역적으로 재사용될 타입: `src/@types/index.d.ts`에서 `declare`하여 정리(import, export 필요 없음)
-   단 하나의 컴포넌트에만 쓰이는 타입은 해당 파일 내부에 선언해도 무관
-   타입 선언 방식: interface(대부분의 타입) + type alias(원시 타입)

6.  파일(폴더) 네이밍 : Pascal Case(components, pages 제외)

    ```ts
    ExampleFileName;
    ```

7.  컴포넌트 폴더 구조 관리

    ```txt
    /SomeComponent
    │ index.js
    │ SomeComponent.tsx
    ├── /SomeChildrenComponent
    │ ├── index.js
    │ └── SomeChildrenComponent.tsx
    /SomeComponent2
    │ index.js
    │ SomeComponent2.tsx
    ```

    `index.tsx`를 자주 사용하게 되면 파일 이름으로 검색해 작업에 용이하지 못하므로
    `컴포넌트이름.tsx` 사용을 지향하고 `index.js` 로 `import`를 쉽게 할 수 있게한다.

8.  관심사 분리
    UI와 로직을 분리합니다.

-   UI 담당: `.tsx`
-   로직 담당
    -   `custom hook`: hooks 필요한 로직
    -   `utils`: hooks 필요없는 로직

### Commit Convention

feat: 새로운 기능에 대한 커밋  
fix: 버그 수정에 대한 커밋  
build: 빌드 관련 파일 수정에 대한 커밋  
etc: 그 외 자잘한 수정에 대한 커밋  
docs: README.md 수정에 대한 커밋  
style: 코드 스타일 혹은 포맷 등에 관한 커밋(prettier 등)  
refactor: 코드 리팩토링에 대한 커밋

### Directory Structure

```txt
/src
│ App.tsx
│ Index.tsx
│ react-app-env.d.ts
│ Routes.tsx
├── /@type
│ └── index.d.ts
├── /app/store
│ ├── /ducks
│ │ └── /각 기능 단위 폴더 이름
│ │   └── ...Slice.ts
│ │   └── ...Thunk.ts
│ ├── hooks.ts
│ └── store.ts
├── /assets
│ ├── Images
│ └── Svgs
├── /components
│ ├── /Commmon
│ ├── /Direct
│ ├── /Home
│ ├── /Login
│ └── /Signup
├── /pages
│ ├── /Direct
│ ├── /Home
│ └── /Login
├── /styles
│ ├── /UI
│ ├── globalStyles.ts
│ ├── styled.d.ts
│ └── theme.ts
```

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
    ```sh
    git clone https://github.com/your_username_/Project-Name.git
    ```
3. Install NPM packages
    ```sh
    npm install
    ```
4. Enter your API in `config.js`
    ```js
    const API_KEY = "ENTER YOUR API";
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [x] Add Changelog
-   [x] Add back to top links
-   [] Add Additional Templates w/ Examples
-   [] Add "components" document to easily copy & paste sections of the readme
-   [] Multi-language Support
    -   [] Chinese
    -   [] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

-   [Choose an Open Source License](https://choosealicense.com)
-   [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
-   [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
-   [Malven's Grid Cheatsheet](https://grid.malven.co/)
-   [Img Shields](https://shields.io)
-   [GitHub Pages](https://pages.github.com)
-   [Font Awesome](https://fontawesome.com)
-   [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
