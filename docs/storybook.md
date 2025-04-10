# Storybook 가이드

<br/>

## 소개

Storybook은 UI 컴포넌트를 개발하고 문서화하기 위한 툴로, 컴포넌트를 **독립적으로** 개발하게 해줄 뿐만 아니라, 다양한 상태(prop 등)에서 컴포넌트를 시각화하고 테스트할 수 있도록 도와주는 도구이다.

아래와 같은 이유로 Storybook을 사용한다:

-   **컴포넌트 중심 개발**: 전체 애플리케이션이 아닌 개별 컴포넌트에 집중
-   **간편한 테스트**: 다양한 state에서 컴포넌트를 눈으로 확인, 테스트 라이브러리와도 통합 가능
-   **문서화**: 컴포넌트의 사용법을 쉽게 문서화
-   **협업**: 디자이너 및 PM간의 소통 원활

<br/>

## Storybook 실행하기

```bash
pnpm storybook
```

<br/>

## 기본 개념

### 스토리(Story)

스토리는 **특정 상태의 컴포넌트를 렌더링하는 코드 조각**이다.
즉, 하나의 컴포넌트에 대해 여러 스토리(여러 상태)를 작성하여 한번에 확인할 수 있다.

### Component Story Format(CSF)

Component Story Format(CSF)은 아래와 같은 형식으로 정의한다:

`/src/components/shared/Button/Button.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    args: {
        label: "버튼",
        onClick: () => alert("clicked"),
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
    },
};
```

### Parameters & Args

위에서 `args`가 사용된 것을 볼 수 있을 것이다. 직관적으로, `args`는 스토리의 **동적 메타데이터**를 정의하는 것이다. 즉, 스토리북 UI에서 조작할 수 있는 props를 정의한다.

이와 더불어 `parameters`라는 개념도 있다. `parameters`는 스토리북의 **정적 메타데이터**를 정의하는 것이다. 즉, 스토리북 UI에서 조작할 수 없는 props를 정의한다.

아래와 같은 Story를 확인하자:

```typescript
export const Primary: Story = {
    args: {
        primary: true,
        label: "버튼",
    },
    parameters: {
        backgrounds: {
            values: [
                { name: "red", value: "#f00" },
                { name: "green", value: "#0f0" },
            ],
        },
    },
};
```

### Decorators

Decorator는 스토리를 감싸는 래퍼 컴포넌트로서, context provider, theme, layout 등을 추가할 수 있다.

아래는 gobal과 component / story level decorator의 예시이다:

```typescript
// .storybook/preview.ts -- global decorator
export const decorators = [
    (Story) => (
        <div style={{ margin: "2em" }}>
            <Story />
        </div>
    ),
];

// component level decorator
export default {
    title: "Components/Button",
    component: Button,
    decorators: [
        (Story) => (
            <div style={{ margin: "1em" }}>
                <Story />
            </div>
        ),
    ],
};

// story level decorator
export const Primary = {
    decorators: [
        (Story) => (
            <div style={{ background: "pink", padding: "1em" }}>
                <Story />
            </div>
        ),
    ],
};
```

<br/>

## 스토리 작성하기

### 기본 스토리 템플릿

```typescript
import { Button } from "./Button";

export default {
    title: "Components/Button",
    component: Button,
    // component level args
    args: {
        children: "기본 텍스트",
    },
    // Storybook UI에서 controls로 노출할 prop 설정
    argTypes: {
        variant: {
            control: { type: "select" },
            options: ["primary", "secondary", "danger"],
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
        },
        onClick: { action: "clicked" },
    },
};

// 기본 스토리 템플릿
const Template = (args) => <Button {...args} />;

// 첫 번째 스토리 생성
export const Primary = {
    render: Template,
    args: {
        variant: "primary",
        children: "기본 버튼",
    },
};

// 두 번째 스토리 - 이전 스토리(Primary)의 args를 확장 (... notation)
export const Secondary = {
    render: Template,
    args: {
        ...Primary.args,
        variant: "secondary",
        children: "보조 버튼",
    },
};

// 세 번째 스토리
export const Large = {
    render: Template,
    args: {
        ...Primary.args,
        size: "large",
        children: "큰 버튼",
    },
};

// 비활성화된 버튼 스토리
export const Disabled = {
    render: Template,
    args: {
        ...Primary.args,
        disabled: true,
        children: "비활성화 버튼",
    },
};
```

<br/>

## 컴포넌트 문서화

### MDX 이용

MDX(markdown + JSX)를 이용하여 문서를 더 자세하게 작성할 수 있다.

[Storybook - MDX](https://storybook.js.org/docs/writing-docs/mdx)

### 스토리 명명 및 구성

```typescript
// 명확한 계층 구조로 스토리 구성하기
export default {
  title: 'shared/Button', // 디렉토리 구조를 반영할 수 있음
  component: Button,
};

// Story 명명 규칙 예시
export const Default: Story = { ... };
export const WithIcon: Story = { ... };
export const WithLongText: Story = { ... };
export const Disabled: Story = { ... };
```

<br/>

## 트러블슈팅

### 스토리북이 시작되지 않을 때

Dependency 충돌이 있는지 확인하고, 캐시를 지운 후 재설치한다.

```bash
pnpm cache delete
pnpm install
pnpm storybook
```

#### 스토리가 렌더링되지 않을 때

-   컴포넌트 import 경로 확인 -- 특히 폴더 위치 실수할 수 있음..
-   ⭐️ 브라우저 콘솔에서 오류 확인

<br/>

# References

-   [Storybook Docs](https://storybook.js.org/docs/get-started/whats-a-story)
