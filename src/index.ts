#!/usr/bin/env node

import { Command } from 'commander';
import asciichart from 'asciichart';
import pkg from '../package.json';

const program = new Command();

program.name(pkg.name).description(pkg.description).version(pkg.version);

program
  .command('track')
  .description(
    'Record the history of your work in your Git project in real time',
  )
  .argument('<location>', 'git project path')
  .action(() => {
    var s0 = new Array(120);
    for (var i = 0; i < s0.length; i++) {
      s0[i] = 15 * Math.sin(i * ((Math.PI * 4) / s0.length));
    }
    console.log(asciichart.plot(s0));
  });

program.parse();

// TODO: 메인 커맨드와 세부 커맨드 구조 분리
// 터미널에 반응형 사이즈로 화면 출력
// 마지막 커밋, 현재 시각, 소요 시간
// 파일 변화할 때마다 차트 갱신
// 기존 git에 저장된 화면데이터와 변경 데이터 대조
// 트래킹 종료되면 리포트를 받아 볼 싱글 html export
