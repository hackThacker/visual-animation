// This is the definitive, fully corrected, and upgraded security.js file.

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

    const createNode = (text, className, top, left) => {
        const node = document.createElement('div');
        node.innerHTML = text;
        node.className = `node ${className}`;
        node.style.top = `${top}px`;
        node.style.left = `${left}px`;
        canvas.appendChild(node);
        return node;
    };

    // --- === PART 1: CINEMATIC CIA TRIAD === ---
    function animateCIA() {
        const centerX = canvas.clientWidth / 2;
        const centerY = canvas.clientHeight / 2;
        const radius = 150;

        const runConfidentiality = () => {
            clearCanvas();
            createNode('', 'cia-circle', centerY - 175, centerX - 175);
            const cLabel = createNode('C', 'cia-label', centerY - radius - 40, centerX - 10);
            createNode('I', 'cia-label', centerY + radius + 20, centerX - 5);
            createNode('A', 'cia-label', centerY - 10, centerX - radius - 30);
            
            updateExplanation('<strong>CONFIDENTIALITY:</strong> "Keeping secrets secret." This principle restricts access to information to authorized individuals only.');
            
            cLabel.style.color = 'var(--color-defense)';
            const file = createNode('&#128272;', 'cia-icon', centerY - 25, centerX - 25);
            const attacker = createNode('Attacker', 'attacker', centerY + 100, 50);

            anime({ targets: file, opacity: 1, scale: [0, 1], duration: 1000 });
            
            const timeline = anime.timeline({ easing: 'easeInOutSine' });
            timeline.add({ delay: 2000 })
            .add({
                targets: attacker,
                translateX: centerX - 120,
                translateY: -120,
                duration: 4000,
                begin: () => updateExplanation('An unauthorized attacker attempts to access the confidential data...'),
            })
            .add({
                duration: 4000,
                begin: () => {
                    updateExplanation('...but <strong>Encryption</strong> acts as a shield, making the data unreadable without the proper key.');
                    for(let i=0; i<3; i++) {
                        const ring = createNode('', 'encryption-ring', centerY - (i*25), centerX - (i*25));
                        ring.style.width = `${i*50}px`; ring.style.height = `${i*50}px`;
                        anime({ targets: ring, opacity: [1, 0], scale: [0.5, 2.5], duration: 1500, delay: i * 200, easing: 'linear', loop: 2 });
                    }
                }
            }, '-=3500')
            .add({
                targets: attacker,
                translateX: 0,
                translateY: 0,
                duration: 2000,
                begin: () => updateExplanation('The attack is thwarted. Confidentiality is maintained.'),
                complete: () => setTimeout(runIntegrity, 3000)
            });
        };

        const runIntegrity = () => {
            clearCanvas();
            createNode('', 'cia-circle', centerY - 175, centerX - 175);
            createNode('C', 'cia-label', centerY - radius - 40, centerX - 10);
            const iLabel = createNode('I', 'cia-label', centerY + radius + 20, centerX - 5);
            createNode('A', 'cia-label', centerY - 10, centerX - radius - 30);
            
            updateExplanation('<strong>INTEGRITY:</strong> "Keeping data trustworthy." This ensures that data has not been altered in an unauthorized manner.');
            
            iLabel.style.color = 'var(--color-good)';
            const record = createNode('$100.00', 'cia-icon', centerY - 25, centerX - 40);
            const hash = createNode('HASH: #a1b2', 'node', centerY + 60, centerX - 50);
            hash.style.borderColor = 'var(--color-good)';
            const attacker = createNode('Attacker', 'attacker', centerY + 100, 50);
            
            anime({ targets: [record, hash], opacity: 1, scale: [0, 1], duration: 1000 });

            const timeline = anime.timeline({ easing: 'easeInOutSine' });
            timeline.add({ delay: 2000 })
            .add({
                targets: attacker,
                translateX: centerX - 120,
                duration: 3000,
                begin: () => updateExplanation('The attacker intercepts the data and attempts to modify it...'),
            })
            .add({
                duration: 4000,
                begin: () => {
                    updateExplanation('...changing the value from $100 to $9,999. The data itself is now altered.');
                    record.innerHTML = '$9,999.00';
                    record.style.color = 'var(--color-bad)';
                },
                complete: () => {
                    updateExplanation('However, a cryptographic <strong>Hash</strong> check reveals a mismatch. The system detects the tampering.');
                    hash.innerHTML = 'HASH MISMATCH!';
                    hash.style.borderColor = 'var(--color-bad)';
                    hash.style.backgroundColor = 'var(--color-bad)';
                    anime({
                        targets: record,
                        keyframes: [ {innerHTML: '$100.00', color: 'var(--color-good)'} ],
                        duration: 1000,
                        delay: 2000,
                        easing: 'linear',
                        complete: () => {
                            hash.innerHTML = 'HASH: #a1b2';
                            hash.style.borderColor = 'var(--color-good)';
                            hash.style.backgroundColor = 'transparent';
                            updateExplanation('The unauthorized change is reverted. Integrity is maintained.');
                            setTimeout(runAvailability, 3000);
                        }
                    });
                }
            });
        };

        const runAvailability = () => {
            clearCanvas();
            createNode('', 'cia-circle', centerY - 175, centerX - 175);
            createNode('C', 'cia-label', centerY - radius - 40, centerX - 10);
            createNode('I', 'cia-label', centerY + radius + 20, centerX - 5);
            const aLabel = createNode('A', 'cia-label', centerY - 10, centerX - radius - 30);
            
            updateExplanation('<strong>AVAILABILITY:</strong> "Keeping systems accessible." This ensures systems are operational for authorized users when needed.');
            
            aLabel.style.color = 'var(--color-neutral)';
            const server = createNode('&#128279;', 'cia-icon', centerY - 25, centerX - 25);
            anime({ targets: server, opacity: 1, scale: [0, 1], duration: 1000 });
            
            setTimeout(() => {
                updateExplanation('A <strong>Denial-of-Service (DDoS)</strong> attack begins, flooding the server with malicious traffic and causing an overload.');
                for(let i=0; i<80; i++) {
                    const packet = createNode('', 'ddos-packet', Math.random() * canvas.clientHeight, Math.random() * 200);
                    anime({
                        targets: packet, left: centerX, top: centerY, opacity: 0,
                        duration: anime.random(1000, 2000), delay: i * 30, easing: 'easeInQuad',
                        complete: () => packet.remove()
                    });
                }
                anime({
                    targets: server,
                    keyframes: [
                        {scale: 1.2, color: 'var(--color-bad)', translateX: anime.random(-5, 5), translateY: anime.random(-5, 5)},
                        {scale: 1, color: 'var(--color-bad)', translateX: 0, translateY: 0}
                    ],
                    loop: true,
                    duration: 100
                });
            }, 2000);

            setTimeout(() => {
                updateExplanation('To ensure availability, a <strong>Firewall / Load Balancer</strong> filters the malicious traffic.');
                const firewall = createNode('&#128737;', 'cia-icon', centerY - 150, centerX - 25);
                firewall.style.color = 'var(--color-neutral)';
                anime({ targets: firewall, opacity: 1, scale: [0, 1], duration: 1000 });
                setTimeout(() => {
                    updateExplanation('The server stabilizes and remains available to legitimate users.');
                    anime.running.forEach(anim => { if (anim.animatables[0].target === server) anim.pause(); });
                    server.style.color = '#FFF';
                    server.style.transform = 'scale(1)';
                }, 3000);
            }, 6000);
        };

        runConfidentiality();
    }

    // --- === PART 2: DEFINITIVE CYBER KILL CHAIN === ---
    function animateKillChain() {
        canvas.innerHTML = `
            <div class="killchain-canvas"></div>
            <div class="nav-controls">
                <button id="kc-prev" disabled>&larr; Previous</button>
                <div class="timeline-bar"></div>
                <button id="kc-next">Next Step &rarr;</button>
            </div>
        `;
        const kcCanvas = canvas.querySelector('.killchain-canvas');
        const timelineBar = canvas.querySelector('.timeline-bar');
        const nextBtn = document.getElementById('kc-next');
        const prevBtn = document.getElementById('kc-prev');

        const stepsData = ['Recon', 'Weaponize', 'Deliver', 'Exploit', 'Install', 'C2', 'Actions'];
        const steps = stepsData.map(step => {
            const el = document.createElement('div'); el.className = 'timeline-step'; el.textContent = step;
            timelineBar.appendChild(el); return el;
        });
        let currentStep = 0;

        const highlightStep = (index) => {
            steps.forEach((s, i) => i === index ? s.classList.add('active') : s.classList.remove('active'));
        };

        const createKillChainNode = (text, className, top, left) => {
            const node = document.createElement('div'); node.innerHTML = text;
            node.className = `node ${className}`; node.style.top = `${top}px`; node.style.left = `${left}px`;
            kcCanvas.appendChild(node); return node;
        };

        const runKillChainStep = (stepIndex) => {
            anime.running.forEach(anim => anim.pause());
            kcCanvas.innerHTML = '';
            highlightStep(stepIndex);
            
            const attacker = createKillChainNode('Attacker', 'attacker', 150, 50);
            const company = createKillChainNode('Company Network', 'server', 100, kcCanvas.clientWidth - 200);
            company.style.height = '200px'; company.style.width = '150px';

            const mainTimeline = anime.timeline({ easing: 'easeInOutSine' });

            switch (stepIndex) {
                case 0: // RECONNAISSANCE
                    updateExplanation('<strong>1. Reconnaissance:</strong> Attacker scans the target to find open ports, identify server technologies, and gather employee information from public sources.');
                    const term = createKillChainNode('> nmap -sV 1.2.3.4<br>> theharvester -d company.com', 'attacker-terminal', attacker.offsetTop - 70, attacker.offsetLeft);
                    
                    mainTimeline.add({ duration: 5000, begin: () => {
                        updateExplanation('<strong>Phase 1: Port Scanning.</strong> Packets are sent to discover services like web servers (port 443) or email (port 25).');
                        for(let i=0; i<20; i++) {
                            const packet = createKillChainNode('', 'scan-packet', attacker.offsetTop + 20, attacker.offsetLeft + 50);
                            anime({ targets: packet, left: company.offsetLeft, top: company.offsetTop + i * 10, duration: 2000, delay: i * 200, easing: 'linear' });
                        }
                    }})
                    .add({ duration: 5000, begin: () => {
                        updateExplanation('<strong>Phase 2: Info Gathering.</strong> The attacker scrapes public sources like LinkedIn and DNS records to find employee names and emails.');
                        const dns = createKillChainNode('DNS', 'server', 20, kcCanvas.clientWidth / 2);
                        const social = createKillChainNode('Social Media', 'server', 280, kcCanvas.clientWidth / 2);
                        anime({ targets: term, innerHTML: '> Found: Apache 2.4<br>> Found: ceo@company.com', duration: 1000, easing: 'linear' });
                        const info1 = createKillChainNode('ceo@company.com', 'info-bubble', social.offsetTop, social.offsetLeft);
                        const info2 = createKillChainNode('Apache v2.4', 'info-bubble', company.offsetTop + 50, company.offsetLeft);
                        anime({ targets: [info1, info2], left: attacker.offsetLeft + 70, top: attacker.offsetTop - 20, opacity: 0, delay: 1000, duration: 2000 });
                    }})
                    .add({ duration: 5000, begin: () => updateExplanation('<strong>Result:</strong> The attacker now has a target employee and knows the web server has a potential vulnerability.') });
                    break;

                case 1: // WEAPONIZATION
                    updateExplanation('<strong>2. Weaponization:</strong> The attacker writes exploit code targeting the Apache vulnerability and packages it into a deliverable format.');
                    const codeEditor = createKillChainNode('', 'attacker-terminal', 50, attacker.offsetLeft + 70);
                    codeEditor.style.width = '300px'; codeEditor.style.height = '250px';
                    
                    mainTimeline.add({ duration: 7000, begin: () => {
                        updateExplanation('<strong>Phase 1: Writing Code.</strong> Exploit code is written and compiled.');
                        const lines = ['#include &lt;exploit.h&gt;', 'void overflow() { ... }', 'shellcode = "\\x90\\x90...";', 'run(shellcode);'];
                        lines.forEach((line, i) => {
                            const code = createKillChainNode(line, 'code-line', codeEditor.offsetTop + 20 + i*20, codeEditor.offsetLeft + 10);
                            anime({ targets: code, opacity: [0, 1], delay: i * 1000, duration: 1000 });
                        });
                    }})
                    .add({ duration: 8000, begin: () => {
                        updateExplanation('<strong>Phase 2: Packaging.</strong> The compiled code is embedded into a PDF, which will act as the carrier.');
                        const payload = createKillChainNode('Exploit.dll', 'packet', 150, codeEditor.offsetLeft + 320);
                        payload.style.backgroundColor = 'var(--color-bad)';
                        const pdf = createKillChainNode('AnnualReport.pdf', 'packet', 250, codeEditor.offsetLeft + 320);
                        pdf.style.backgroundColor = 'var(--color-neutral)';
                        anime({ targets: [payload, pdf], left: '+=100', top: '-=50', duration: 2000, easing: 'easeInBack' });
                        anime({ targets: [payload, pdf], opacity: 0, delay: 1500, duration: 500 });
                        const finalPdf = createKillChainNode('AnnualReport.pdf', 'packet', 200, codeEditor.offsetLeft + 420);
                        finalPdf.style.backgroundColor = 'var(--color-warning)';
                        anime({ targets: finalPdf, scale: [0, 1.5], opacity: [0, 1], delay: 2000, duration: 1000 });
                    }});
                    break;
                
                case 2: // DELIVERY
                    updateExplanation('<strong>3. Delivery:</strong> A spear-phishing email is sent to the CEO, crafted to create urgency and trust.');
                    const employee = createKillChainNode('CEO', 'employee-pc', 150, company.offsetLeft + 40);
                    const emailUi = createKillChainNode('', 'email-client', 50, attacker.offsetLeft + 70);
                    emailUi.style.width = '400px'; emailUi.style.height = '200px';
                    emailUi.innerHTML = `
                        <div class="email-header">To: ceo@company.com</div>
                        <div class="email-body">
                            Hi, <br><br> Please review the attached urgent annual report for Q4.
                            <div class="email-attachment" id="attachment">📎 AnnualReport.pdf</div>
                        </div>
                    `;
                    
                    mainTimeline.add({ duration: 7000, begin: () => {
                        updateExplanation('<strong>Phase 1: Sending Email.</strong> The email travels across the internet to the company\'s mail server.');
                        anime({ targets: emailUi, left: employee.offsetLeft - 420, top: employee.offsetTop - 50, duration: 4000 });
                    }})
                    .add({ duration: 8000, begin: () => {
                        updateExplanation('<strong>Phase 2: User Interaction.</strong> The CEO, trusting the email, clicks on the malicious attachment.');
                        const attachment = document.getElementById('attachment');
                        if (attachment) {
                            const cursor = createKillChainNode('👆', 'node', 0, 0);
                            cursor.style.fontSize = '24px';
                            anime({
                                targets: cursor,
                                left: attachment.getBoundingClientRect().left + 10 - canvas.getBoundingClientRect().left,
                                top: attachment.getBoundingClientRect().top + 10 - canvas.getBoundingClientRect().top,
                                duration: 1500,
                                complete: () => anime({ targets: attachment, keyframes: [{scale: 1.1}, {scale: 1}], duration: 500 })
                            });
                        }
                    }});
                    break;

                case 3: // EXPLOITATION
                    updateExplanation('<strong>4. Exploitation:</strong> Opening the PDF triggers the hidden code, which exploits a "buffer overflow" vulnerability.');
                    const memBar = createKillChainNode('', 'memory-bar', 150, kcCanvas.clientWidth/2 - 250);
                    memBar.style.width = '500px';
                    memBar.innerHTML = `<div class="memory-segment" style="width: 70%;">Legitimate Data</div>`;
                    
                    mainTimeline.add({ duration: 7000, begin: () => {
                        updateExplanation('<strong>Phase 1: Overflow.</strong> The exploit writes more data than the buffer can handle, overwriting adjacent memory.');
                        const exploitCode = document.createElement('div');
                        exploitCode.className = 'memory-exploit-code';
                        exploitCode.style.width = '0%';
                        exploitCode.innerHTML = 'Shellcode';
                        memBar.appendChild(exploitCode);
                        anime({ targets: exploitCode, width: '50%', duration: 4000, easing: 'linear' });
                    }})
                    .add({ duration: 8000, begin: () => {
                        updateExplanation('<strong>Phase 2: Code Execution.</strong> The overflow allows the attacker\'s shellcode to be executed by the CPU, giving them control.');
                        const cpu = createKillChainNode('CPU', 'server', memBar.offsetTop + 50, memBar.offsetLeft + 225);
                        const execPath = createKillChainNode('', 'packet-tracer-dot', memBar.offsetTop + 15, memBar.offsetLeft + 400);
                        execPath.style.backgroundColor = 'var(--color-bad)';
                        anime({ targets: execPath, left: cpu.offsetLeft, top: cpu.offsetTop, duration: 2000, loop: true, direction: 'alternate' });
                    }});
                    break;

                case 4: // INSTALLATION
                    updateExplanation('<strong>5. Installation:</strong> To survive a reboot, the malware installs itself persistently on the system.');
                    const fs = createKillChainNode('C:\\Windows\\System32\\', 'filesystem', 50, kcCanvas.clientWidth/2 - 150);
                    const reg = createKillChainNode('HKLM\\Run\\', 'registry', 200, kcCanvas.clientWidth/2 - 150);
                    
                    mainTimeline.add({ duration: 7000, begin: () => {
                        updateExplanation('<strong>Phase 1: Dropping File.</strong> A copy of the malware (svchost.exe) is written to a system directory.');
                        const malwareFile = createKillChainNode('svchost.exe', 'packet', 150, 50);
                        malwareFile.style.backgroundColor = 'var(--color-bad)';
                        anime({
                            targets: malwareFile, left: fs.offsetLeft + 50, top: fs.offsetTop + 40,
                            complete: () => fs.innerHTML += '<br>svchost.exe',
                            duration: 3000
                        });
                    }})
                    .add({ duration: 8000, begin: () => {
                        updateExplanation('<strong>Phase 2: Registry Key.</strong> A registry key is created to automatically run the malware on startup.');
                         const regKey = createKillChainNode('svchost.exe', 'info-bubble', 150, 50);
                         anime({
                            targets: regKey, left: reg.offsetLeft + 50, top: reg.offsetTop + 40,
                            complete: () => reg.innerHTML += '<br>malware = svchost.exe',
                            duration: 3000
                        });
                    }});
                    break;

                case 5: // COMMAND & CONTROL (C2)
                    updateExplanation('<strong>6. Command & Control (C2):</strong> The installed malware initiates a connection back to the attacker\'s server.');
                    const empPC = createKillChainNode('Infected PC', 'employee-pc', 150, company.offsetLeft + 40);
                    
                    mainTimeline.add({ duration: 15000, begin: () => {
                        updateExplanation('An encrypted "beacon" is sent out periodically. This avoids detection and allows the attacker to send commands.');
                        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        svg.style.cssText = 'position:absolute; width:100%; height:100%; top:0; left:0; pointer-events:none;';
                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        const d = `M ${empPC.offsetLeft+30} ${empPC.offsetTop+25} C ${empPC.offsetLeft - 200} ${empPC.offsetTop - 100}, ${attacker.offsetLeft + 250} ${attacker.offsetTop + 150}, ${attacker.offsetLeft+25} ${attacker.offsetTop+25}`;
                        path.setAttribute('d', d);
                        path.setAttribute('fill', 'none');
                        path.setAttribute('stroke', 'var(--color-bad)');
                        path.setAttribute('stroke-width', '2');
                        path.classList.add('c2-path');
                        svg.appendChild(path);
                        kcCanvas.prepend(svg);
                    }});
                    break;

                case 6: // ACTIONS ON OBJECTIVES
                    updateExplanation('<strong>7. Actions on Objectives:</strong> The attacker now has full control and begins their true mission.');
                    const db = createKillChainNode('Database', 'database', 120, company.offsetLeft + 40);
                    const termAction = createKillChainNode('> ls -R<br>> zip -r data.zip /finance', 'attacker-terminal', attacker.offsetTop - 70, attacker.offsetLeft);
                    const infectedPC = createKillChainNode('Infected PC', 'employee-pc', 150, company.offsetLeft + 40);
                    
                    mainTimeline.add({ duration: 7000, begin: () => {
                        updateExplanation('<strong>Phase 1: Internal Discovery.</strong> The attacker browses the file system from the compromised PC, looking for valuable data.');
                        const scan = createKillChainNode('', 'scan-packet', infectedPC.offsetTop + 20, infectedPC.offsetLeft);
                        anime({ targets: scan, left: db.offsetLeft, duration: 3000, easing: 'linear' });
                    }})
                    .add({ duration: 8000, begin: () => {
                        updateExplanation('<strong>Phase 2: Data Exfiltration.</strong> The valuable data is compressed and smuggled out over the C2 channel.');
                        const zip = createKillChainNode('&#128447;', 'zip-file', db.offsetTop + 10, db.offsetLeft + 10);
                        anime({ targets: zip, left: attacker.offsetLeft, top: attacker.offsetTop, scale: 0.2, duration: 4000 });
                    }});
                    break;
            }

            prevBtn.disabled = (stepIndex === 0);
            nextBtn.disabled = (stepIndex >= stepsData.length - 1);
            if (stepIndex >= stepsData.length - 1) {
                nextBtn.innerHTML = "Simulation Complete";
            } else {
                nextBtn.innerHTML = "Next Step &rarr;";
            }
        };

        nextBtn.addEventListener('click', () => {
            if (currentStep < stepsData.length - 1) { currentStep++; runKillChainStep(currentStep); }
        });
        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) { currentStep--; runKillChainStep(currentStep); }
        });
        
        runKillChainStep(0);
    }

    // --- === PART 3: DYNAMIC MITRE ATT&CK / NIST === ---
    function animateDefense() {
        const runDetect = () => {
            clearCanvas();
            const nist = createNode('NIST', 'nist-circle', 150, 50);
            const mitre = createNode('MITRE ATT&CK<br>T1566: Phishing', 'node', 150, canvas.clientWidth - 220);
            const company = createNode('Company HQ', 'server', 150, canvas.clientWidth / 2 + 50);
            const attacker = createNode('Attacker', 'attacker', 150, canvas.clientWidth - 450);
            
            updateExplanation('An attacker attempts to deliver a phishing email...');
            const email = createNode('&#128231;', 'packet', attacker.offsetTop, attacker.offsetLeft);
            anime({
                targets: email,
                left: company.offsetLeft - 50,
                duration: 4000,
                easing: 'easeInOutSine',
                complete: () => {
                    updateExplanation('<strong>DETECT:</strong> An advanced email gateway (SIEM) flags the malicious email, matching the "Phishing" technique in MITRE ATT&CK.');
                    const alert = createNode('SIEM ALERT!<br>T1566 Detected', 'siem-alert', 50, canvas.clientWidth / 2 - 90);
                    anime({ targets: alert, scale: [0, 1], duration: 500 });
                    nist.innerHTML = 'DETECT';
                    nist.style.borderColor = 'var(--color-warning)';
                    nist.style.boxShadow = '0 0 20px var(--color-warning)';
                    anime({ targets: email, keyframes: [{scale: 1.2}, {scale: 0}], duration: 1000 }); // Block the email
                    setTimeout(runRespond, 4000);
                }
            });
        };

        const runRespond = () => {
            clearCanvas();
            const nist = createNode('RESPOND', 'nist-circle', 150, 50);
            nist.style.borderColor = 'var(--color-defense)'; nist.style.boxShadow = '0 0 20px var(--color-defense)';
            const company = createNode('Company HQ', 'server', 150, canvas.clientWidth / 2 + 50);

            updateExplanation('<strong>RESPOND:</strong> A Security Analyst is alerted and begins containment procedures.');
            const analyst = createNode('Analyst', 'pc', 280, 100);
            analyst.style.backgroundColor = 'var(--color-defense)';
            
            setTimeout(() => {
                updateExplanation('The analyst pushes a rule to the firewall to block the attacker\'s source IP address.');
                const blockLine = document.createElement('div');
                blockLine.style.cssText = `position:absolute; top:${analyst.offsetTop}px; left:${analyst.offsetLeft+80}px; height:2px; width:0; background:var(--color-defense);`;
                canvas.appendChild(blockLine);
                anime({ targets: blockLine, width: company.offsetLeft - (analyst.offsetLeft+80), duration: 2000 });
                setTimeout(runProtect, 4000);
            }, 2000);
        };

        const runProtect = () => {
            clearCanvas();
            const nist = createNode('PROTECT', 'nist-circle', 150, 50);
            nist.style.borderColor = 'var(--color-neutral)'; nist.style.boxShadow = '0 0 20px var(--color-neutral)';
            const company = createNode('Company HQ', 'server', 150, canvas.clientWidth / 2 + 50);

            updateExplanation('<strong>PROTECT:</strong> The new rule is now active, protecting all users from this attacker.');
            const firewall = createNode('Firewall', 'server', 50, company.offsetLeft - 150);
            firewall.style.backgroundColor = 'var(--color-neutral)';
            anime({ targets: firewall, keyframes: [{scale: 1.2}, {scale: 1}], duration: 1000, loop: 3 });
            
            setTimeout(() => {
                updateExplanation('The attacker is now blocked from making any further attempts.');
                const attacker = createNode('Attacker', 'attacker', 150, firewall.offsetLeft - 100);
                const wall = createNode('', 'node', firewall.offsetTop, firewall.offsetLeft+60);
                wall.style.height = '100px'; wall.style.width = '10px'; wall.style.background = 'var(--color-neutral)';
                anime({ targets: attacker, translateX: 50, direction: 'alternate', duration: 1000 });
                setTimeout(runRecover, 4000);
            }, 3000);
        };
        
        const runRecover = () => {
             clearCanvas();
            const nist = createNode('RECOVER', 'nist-circle', 150, 50);
            nist.style.borderColor = 'var(--color-good)'; nist.style.boxShadow = '0 0 20px var(--color-good)';

            updateExplanation('<strong>RECOVER:</strong> Since the attack was prevented, no system recovery is needed. Operations continue normally.');
            setTimeout(runIdentify, 4000);
        };
        
        const runIdentify = () => {
            clearCanvas();
            const nist = createNode('IDENTIFY', 'nist-circle', 150, 50);
            nist.style.borderColor = 'var(--text-muted)'; nist.style.boxShadow = '0 0 20px var(--text-muted)';
            
            updateExplanation('<strong>IDENTIFY:</strong> The incident is documented. This new knowledge helps refine security policies and identify gaps, continuously improving the "Protect" phase.');
        };

        runDetect();
    }

    // --- Main Event Listener ---
    subNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('#sub-nav button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            clearCanvas();
            const animType = e.target.dataset.anim;
            if (animType === 'cia') animateCIA();
            else if (animType === 'killchain') animateKillChain();
            else if (animType === 'defense') animateDefense();
        }
    });
});