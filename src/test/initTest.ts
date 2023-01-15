import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import koJson from '../i18n/ko.json';
import paths from '../router/paths';
import type { JsonValue } from '../types/json';
import type { Navigation } from '../router/useNavigation';
import invariant from '../invariant';

const ko = koJson.translation;
const user = userEvent.setup();

const oldError = console.error;
type RunT = (dep: { navigation: Navigation }) => Promise<void>;
type SuiteT = [string, RunT];
const tests: SuiteT[] = [];
type ResultT = {
  pass: true,
  message: string,
} | {
  pass: false,
  message: string,
  stack: string
};

async function wait(delay: number){
  return new Promise((resolve) => setTimeout(resolve, delay));
}

const rize: {
  test: (message: string, run: RunT) => void
} = {
  test(message, run){
    tests.push([message, run]);
  }
};

rize.test('별명을 바꿀 수 있다', async ({ navigation }) => {
  const page = within(document.getElementsByClassName(paths.TEST)[0] as HTMLElement);
  await user.click(page.getByRole('button', {
    name: ko.돌아가기
  }));
  navigation.redirect(paths.CONFIG);
  await wait(1000);
  const page2 = within(document.getElementsByClassName(paths.CONFIG)[0] as HTMLElement);
  const $toInput = page2.getByLabelText(ko.으로);
  await user.clear($toInput);
  await user.type($toInput, '위즈');
  await user.clear($toInput);
  await user.type($toInput, '위즈원');
});

// '언어 바꾸기'
rize.test('프로필을 바꿀 수 있다', async  () => {
  const page = within(document.getElementsByClassName(paths.CONFIG)[0] as HTMLElement);
  await user.click(page.getByLabelText('latest'));
  await user.click(page.getByLabelText('violeta'));
  await user.click(page.getByLabelText('instagram'));

  await user.click(page.getByRole('button', {
    name: ko.돌아가기
  }));
});

rize.test('테마를 바꿀 수 있다', async () => {
  const page = within(document.getElementsByClassName(paths.MAIL_LIST)[0] as HTMLElement);
  await user.click(page.getByRole('button', {
    name: ko.닫기
  }));
  await user.click(page.getByRole('button', { name: ko.밝게 + '(ctrl+d)' }));
  await user.click(page.getByRole('button', { name: ko.다크 + '(ctrl+d)' }));
});


rize.test('멤버로 필터할 수 있다', async () => {
  const page = within(document.getElementsByClassName(paths.MAIL_LIST)[0] as HTMLElement);
  await user.click(page.getByRole('button', { name: ko.메뉴 }));
  await user.click(page.getByRole('button', { name: '장원영' }));
  await user.click(page.getByRole('button', { name: ko.전체 }));
  await user.click(page.getByRole('button', { name: ko.닫기 }));
});

rize.test('메일을 검색할 수 있다.', async () => {
  const page = within(document.getElementsByClassName(paths.MAIL_LIST)[0] as HTMLElement);
  await user.click(page.getByRole('button', { name: ko.검색 }));
  const $searchInput = page.getByPlaceholderText(ko.검색하기) as HTMLInputElement;
  await user.click($searchInput);
  await user.type($searchInput,'마ㅈ');
  await user.type($searchInput,'{Backspace}지막이라니');
  await user.clear($searchInput);
  await user.keyboard('{Escape}');
  await user.click(page.getByRole('button', { name: ko.검색 }));
  await user.click(page.getByRole('button', { name: ko.검색창_닫기 }));
});

rize.test('메일을 좋아요 할 수 있다.', async () => {
  await wait(500);
  const page = within(document.getElementsByClassName(paths.MAIL_LIST)[0] as HTMLElement);
  const yenaItem = page.getByRole('heading', { name: '사랑하는 위즈원에게' }).parentElement as HTMLHeadingElement;
  await user.click(within(yenaItem).getByLabelText('중요 표시'));
  const yenaItem2 = page.getByRole('heading', { name: '사랑하는 위즈원에게' }).parentElement as HTMLHeadingElement;
  const star = await within(yenaItem2).findByLabelText('중요 취소');
  await user.click(star);
});

rize.test('메일을 볼 수 있다', async () => {
  const page = within(document.getElementsByClassName(paths.MAIL_LIST)[0] as HTMLElement);
  await user.click(page.getByRole('heading', { name: '사랑하는 위즈원에게' }));
  const page2 = within(document.getElementsByClassName(paths.MAIL_DETAIL)[0] as HTMLElement);
  await page2.findByText('사랑하는 우리 위즈원❤️');
  const paragraph = await page2.findByText('너무 많이 고맙고 변함없이 너무 많이 사랑해요❤️');
  paragraph.scrollIntoView({behavior: 'smooth'});
  await wait(500);
  await user.click(await page2.findByRole('link', { name: '다음 메일 보기' }));
  await wait(500);
  const page3 = within(document.getElementsByClassName(paths.MAIL_DETAIL)[0] as HTMLElement);
  await user.click(await page3.findByRole('button', {
    name: ko.돌아가기
  }));
});

rize.test('앨범을 볼 수 있다', async () => {
  await wait(500);
  const page2 = within(document.getElementsByClassName(paths.MAIL_LIST)[0] as HTMLElement);
  await user.click(await page2.findByLabelText(ko.앨범));
  await wait(500);
  const page3 = within(document.getElementsByClassName(paths.ALBUM)[0] as HTMLElement);
  await user.click(await page3.findByRole('button', {
    name: ko.돌아가기
  }));
});

rize.test('탭을 바꿀 수 있다.', async () => {
  await wait(500);
  const page2 = within(document.getElementsByClassName(paths.MAIL_LIST)[0] as HTMLElement);
  await user.click(await page2.findByRole('tab', { name: /읽지 않음/ }));
  await wait(500);
  await user.click(await page2.findByRole('tab', { name: /중요/ }));
  await wait(500);
  await user.click(await page2.findByRole('tab', { name: /전체/ }));
});

async function initTest({ navigation, writeJSONfile }: {
  navigation: Navigation,
  writeJSONfile: (path: string) => (dict: JsonValue) => Promise<void>
}){
  invariant(navigation.current() === paths.TEST);
  invariant(JSON.stringify(navigation.params()) === '{}');
  console.error = (...args) => {
    if(args[0].includes('Warning: ReactDOM.render is no longer supported in React 18')){
      return;
    }
    if(args[0].includes('should be wrapped into act')){
      return;
    }
    
    oldError(args[0]);
  };
  
  const result: ResultT[] = [];

  try {
    for (const [message, test] of tests){
      await test({ navigation })
        .then(() => {
          result.push({
            pass: true,
            message,
          });
        })
        .catch((error) => {
          console.error(error.stack);
          result.push({
            pass: false,
            message,
            stack: error.stack
          });
        });
    }
  } finally {
    writeJSONfile('test_result.json')(result);
    console.log('collect test result!');
    console.log('result', result);
    if (window.__coverage__){
      writeJSONfile('coverage.json')(window.__coverage__);
      console.log('collect coverage!');
    }
  }
}


export default initTest;