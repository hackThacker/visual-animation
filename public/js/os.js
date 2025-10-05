document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const canvas = document.getElementById('animation-canvas');
    const explanationBox = document.getElementById('explanation-box').querySelector('p');
    const subNav = document.getElementById('sub-nav');

    // --- Helper Functions ---
    const clearCanvas = () => {
        anime.running.forEach(anim => anim.pause());
        canvas.innerHTML = '';
    };

    const updateExplanation = (text) => {
        explanationBox.innerHTML = text;
    };
    
    // --- Animation Logic ---
    function animateTerminal(os) {
        clearCanvas();
        const terminal = document.createElement('div');
        terminal.className = 'terminal';
        canvas.appendChild(terminal);

        let command = '';
        let output = '';

        if (os === 'linux') {
            command = '> ps aux';
            output = `
USER      PID  %CPU %MEM  COMMAND
root        1   0.0  0.1  /sbin/init
root      954   0.0  0.5  sshd
user     1050   0.1  1.2  chrome
user     1078  <span class="malicious-text">78.0  2.5  malware.sh</span>`;
            updateExplanation('<code>ps aux</code> on Linux lists all running processes. High CPU usage from an unknown script is a major red flag.');
        } else if (os === 'windows') {
            command = '> netstat -ano';
            output = `
Proto  Local Address      Foreign Address        State        PID
TCP    192.168.1.5:49750  104.26.10.189:443      ESTABLISHED  4812
TCP    192.168.1.5:49812  <span class="malicious-text">203.0.113.88:8080</span>    ESTABLISHED  9120`;
            updateExplanation('<code>netstat -ano</code> on Windows shows active network connections. A connection to a known malicious IP is a sign of compromise.');
        }

        const fullText = command + output;
        let progress = { value: 0 };
        
        const timeline = anime.timeline({
            easing: 'linear',
        })
        .add({
            targets: terminal,
            opacity: [0, 1],
            duration: 300,
        })
        .add({
            targets: progress,
            value: fullText.length,
            duration: 2500,
            update: () => {
                terminal.innerHTML = fullText.substring(0, Math.floor(progress.value));
                terminal.scrollTop = terminal.scrollHeight; // Auto-scroll
            }
        });
    }


    // --- Main Event Listener ---
    subNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('#sub-nav button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const animType = e.target.dataset.anim;
            if (animType === 'linux') animateTerminal('linux');
            else if (animType === 'windows') animateTerminal('windows');
        }
    });

});