#!/usr/bin/env node

import chalk from 'chalk';

const args = process.argv;

function usage() {
  const usageText = `
  CodePace tracks your coding process to help you analyze your productivity.

  usage:
    codepace <command>

    track <location> track when changes are made to files in a project that is set up for git and understand the context.
`;

  console.log(usageText);
}

function errorLog(error: string) {
  const errLog = chalk.red(error);
  console.log(errLog);
}

if (args.length > 3) {
  errorLog('only one argument can be accepted');
  usage();
}

// TODO: 메인 커맨드와 세부 커맨드 구조 분리
// 터미널에 반응형 사이즈로 화면 출력
// 마지막 커밋, 현재 시각, 소요 시간
// 파일 변화할 때마다 차트 갱신
// 기존 git에 저장된 화면데이터와 변경 데이터 대조
// 트래킹 종료되면 리포트를 받아 볼 싱글 html export
