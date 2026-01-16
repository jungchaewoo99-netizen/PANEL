const { exec } = require('child_process');
const chokidar = require('chokidar');

const watcher = chokidar.watch('.', {
  ignored: /node_modules|\.git/,
  persistent: true
});

watcher.on('change', (path) => {
  console.log(`${path} 수정됨, GitHub에 반영 중...`);
  exec(`git add . && git commit -m "Auto update: ${new Date().toISOString()}" && git push origin main --force && gh api repos/jungchaewoo99-netizen/PANEL/pages --jq '.html_url'`, (err, stdout, stderr) => {
    if(err) console.error(err);
    else console.log(stdout);
  });
});

console.log('파일 감시 시작: 수정 시 자동 반영됩니다...');
