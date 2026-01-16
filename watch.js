const { exec } = require('child_process');
const chokidar = require('chokidar');
const open = require('open'); // 브라우저 열기

const SITE_URL = 'https://jungchaewoo99-netizen.github.io/PANEL/';

const watcher = chokidar.watch('.', {
  ignored: /node_modules|\.git/,
  persistent: true
});

watcher.on('change', (path) => {
  console.log(`${path} 수정됨, GitHub에 반영 중...`);

  exec(`git add . && git commit -m "Auto update: ${new Date().toISOString()}" && git push origin main --force`, (err, stdout, stderr) => {
    if(err) console.error('Git push 실패:', err);
    else {
      console.log(stdout);
      console.log(`사이트 링크: ${SITE_URL}`); // 터미널에 링크 표시
      open(SITE_URL); // 브라우저 자동 열기
    }
  });
});

console.log('파일 감시 시작: 수정 시 GitHub에 자동 반영되고 브라우저 열림...');
console.log(`사이트 링크: ${SITE_URL}`); // 터미널 켰을 때도 링크 표시
