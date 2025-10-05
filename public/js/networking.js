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

    // --- Animation Logic ---

    function animateTCPIP() {
        updateExplanation('A message is prepared for network transit.');
        const senderX = 50;
        const receiverX = canvas.clientWidth - 180;

        // Create Layer Stacks
        const layers = ['Application', 'Transport', 'Internet', 'Link'];
        layers.forEach((layer, i) => {
            createNode(layer, 'layer', 50 + (i * 60), senderX);
            createNode(layer, 'layer', 50 + (i * 60), receiverX);
        });

        const data = createNode('Message', 'packet', 65, senderX + 130);
        data.style.backgroundColor = 'var(--color-data)';

        const timeline = anime.timeline({
            easing: 'easeInOutSine',
            duration: 3200
        });
        
        timeline
        .add({
            targets: data, translateX: -100,
            begin: () => updateExplanation('The message starts at the <strong>Application Layer</strong>.'),
        })
        .add({
            targets: data, translateY: 60,
            begin: () => updateExplanation('<strong>Transport Layer:</strong> Adds a TCP header for reliability. This is the first step of <strong>Encapsulation</strong>.'),
            update: (anim) => { if(anim.progress > 50) data.style.borderTop = '3px solid var(--color-neutral)'; }
        })
        .add({
            targets: data, translateY: 120,
            begin: () => updateExplanation('<strong>Internet Layer:</strong> Adds an IP header for addressing.'),
            update: (anim) => { if(anim.progress > 50) data.style.borderBottom = '3px solid var(--color-good)'; }
        })
        .add({
            targets: data, translateY: 180,
            begin: () => updateExplanation('<strong>Link Layer:</strong> Adds a MAC header for the local network. The packet is fully encapsulated.'),
            update: (anim) => { if(anim.progress > 50) data.style.borderLeft = '3px solid var(--color-warning)'; }
        })
        .add({
            targets: data, translateX: receiverX - senderX,
            duration: 3200,
            begin: () => updateExplanation('The packet travels across the network.'),
        })
        .add({
            targets: data, translateY: 120,
            begin: () => updateExplanation('<strong>Decapsulation:</strong> The receiver\'s Link Layer removes the MAC header.'),
            complete: () => data.style.borderLeft = 'none'
        })
        .add({
            targets: data, translateY: 60,
            begin: () => updateExplanation('The Internet Layer removes the IP header.'),
            complete: () => data.style.borderBottom = 'none'
        })
        .add({
            targets: data, translateY: 0,
            begin: () => updateExplanation('The Transport Layer removes the TCP header.'),
            complete: () => data.style.borderTop = 'none'
        })
        .add({
            targets: data, translateX: '+=100',
            begin: () => updateExplanation('The original <strong>Message</strong> arrives at the Application Layer.'),
        });
    }
    
    function animateDNS() {
        const user = createNode('Your PC', 'pc', 150, 50);
        const dnsServer = createNode('DNS Server', 'server', 50, canvas.clientWidth / 2 - 30);
        dnsServer.innerHTML += '<br>?';
        const webServer = createNode('Web Server', 'server', 250, canvas.clientWidth - 110);
        const packet = createNode('www.example.com', 'packet', 180, 100);

        const timeline = anime.timeline({ easing: 'easeInOutSine', duration: 3200 });

        timeline
        .add({
            begin: () => updateExplanation('You request "www.example.com". Your PC sends a query to the DNS Server.'),
            targets: packet,
            left: dnsServer.offsetLeft, top: dnsServer.offsetTop + 20,
        })
        .add({
            targets: dnsServer, scale: [1, 1.2, 1], duration: 3200,
            begin: () => {
                updateExplanation('The DNS server looks up the IP address and prepares a response.');
                packet.innerHTML = '93.184.216.34';
                packet.style.backgroundColor = 'var(--color-good)';
            }
        })
        .add({
            targets: packet, left: user.offsetLeft + 40, top: user.offsetTop + 20,
            begin: () => updateExplanation('The DNS server returns the IP address to your PC.'),
        })
        .add({
            begin: () => {
                updateExplanation('Now with the IP, your PC can connect directly to the Web Server!');
                webServer.innerHTML += '<br>93.184.216.34';
            },
            targets: packet, left: webServer.offsetLeft, top: webServer.offsetTop + 20,
        });
    }
    
    function animateHTTP() {
        const user = createNode('Your PC', 'pc', 150, 50);
        const server = createNode('Web Server', 'server', 150, canvas.clientWidth - 110);
        const attacker = createNode('Attacker', 'attacker', 280, canvas.clientWidth / 2 - 25);
        const packet = createNode('Plaintext', 'packet', 180, 100);
        packet.style.width = 'auto'; packet.style.borderRadius = '5px';

        const timeline = anime.timeline({ easing: 'linear', duration: 3200 });

        timeline
        .add({
            targets: packet, left: server.offsetLeft,
            begin: () => updateExplanation('<strong>HTTP:</strong> Data is sent in plaintext, visible to anyone on the network.'),
        })
        .add({
            targets: attacker,
            translateY: -100,
            borderColor: '#FFEB3B',
            scale: 1.2,
            begin: () => updateExplanation('An attacker can easily intercept and read the unencrypted data.'),
        }, '-=1500')
        .add({
            duration: 3500,
            complete: () => {
                // HTTPS part
                clearCanvas();
                const user2 = createNode('Your PC', 'pc', 150, 50);
                const server2 = createNode('Web Server', 'server', 150, canvas.clientWidth - 110);
                const attacker2 = createNode('Attacker', 'attacker', 280, canvas.clientWidth / 2 - 25);
                
                const tunnel = document.createElement('div');
                tunnel.className = 'https-tunnel';
                tunnel.style.top = `${user2.offsetTop + 25}px`;
                tunnel.style.left = `${user2.offsetLeft + 80}px`;
                tunnel.style.width = `${server2.offsetLeft - (user2.offsetLeft + 80)}px`;
                tunnel.style.height = '20px';
                canvas.appendChild(tunnel);

                const packet2 = createNode('Encrypted', 'packet', 180, 100);
                packet2.style.width = 'auto'; packet2.style.borderRadius = '5px';
                packet2.style.backgroundColor = 'var(--color-defense)';
                
                const lock = createNode('&#128274;', 'node', 120, 100);
                lock.style.background = 'none'; lock.style.boxShadow = 'none'; lock.style.fontSize = '24px';

                anime({
                    targets: attacker2,
                    translateY: -90,
                    easing: 'easeInOutQuad',
                    loop: true,
                    direction: 'alternate',
                    duration: 3200
                });

                anime({
                    targets: packet2,
                    left: server2.offsetLeft,
                    duration: 3500,
                    easing: 'linear',
                    begin: () => updateExplanation('<strong>HTTPS:</strong> A secure tunnel (TLS) is created. Data is encrypted before being sent.'),
                    complete: () => updateExplanation('The attacker cannot read the data. Your connection is secure.'),
                });
            }
        });
    }

// DELETE the old animateDHCP function in networking.js and REPLACE it with this fully corrected and working version.

function animateDHCP() {
    // --- Configuration ---
    const clientMAC = '00:1A:2B:3C:4D:5E';
    const serverMAC = '08:00:27:AE:B6:5A';
    const offeredIP = '192.168.1.100';
    const travelDuration = 3000; // 3 seconds for packet travel
    const pauseDuration = 2000;  // 2 second pause for reading

    // --- Helper function for creating the detailed packets ---
    const createDetailedPacket = (title, details, color) => {
        const p = document.createElement('div');
        p.className = 'node packet-detailed';
        p.style.opacity = '0'; // Start invisible
        p.style.borderColor = `var(--color-${color})`;
        
        p.innerHTML = `
            <div class="packet-title" style="background-color: var(--color-${color});">${title}</div>
            <div class="packet-body">${details}</div>
        `;
        
        canvas.appendChild(p);
        return p;
    };

    // --- Main Sequence Controller ---
    // This is a more robust way to chain animations than a single timeline.
    // Each function will run after the previous one completes.
    
    const runDiscover = () => {
        clearCanvas();
        const client = createNode(`Client<br>(MAC: ${clientMAC})<br><strong>(No IP)</strong>`, 'pc', 150, 50);
        const server = createNode(`DHCP Server<br>(MAC: ${serverMAC})`, 'server', 150, canvas.clientWidth - 140);

        updateExplanation('<strong>D - Discover:</strong> The client sends a <strong>broadcast</strong> message to find a DHCP server.');
        const details = `<strong>Src MAC:</strong> ${clientMAC}<br><strong>Dest MAC:</strong> FF:FF:FF:FF:FF:FF (Broadcast)`;
        const packet = createDetailedPacket('DHCP DISCOVER', details, 'neutral');
        
        packet.style.top = `${client.offsetTop + 5}px`;
        packet.style.left = `${client.offsetLeft + 85}px`;

        anime({
            targets: packet,
            left: canvas.clientWidth / 2 - 100,
            top: 50,
            opacity: 1,
            duration: travelDuration,
            easing: 'easeInOutSine',
            complete: () => {
                anime({ targets: packet, scale: 1.1, direction: 'alternate', loop: 2, duration: 400 });
                anime({ targets: server, scale: [1, 1.1, 1], duration: 500, delay: 200 });
                setTimeout(runOffer, pauseDuration); // Chain to the next step
            }
        });
    };

    const runOffer = () => {
        clearCanvas();
        const client = createNode(`Client<br>(MAC: ${clientMAC})<br><strong>(No IP)</strong>`, 'pc', 150, 50);
        const server = createNode(`DHCP Server<br>(MAC: ${serverMAC})`, 'server', 150, canvas.clientWidth - 140);
        
        updateExplanation('<strong>O - Offer:</strong> The server responds with a <strong>unicast</strong> offer directly to the client.');
        const details = `<strong>Src MAC:</strong> ${serverMAC}<br><strong>Dest MAC:</strong> ${clientMAC}<br><strong>Offered IP:</strong> ${offeredIP}`;
        const packet = createDetailedPacket('DHCP OFFER', details, 'good');

        packet.style.top = `${server.offsetTop + 20}px`;
        packet.style.left = `${server.offsetLeft - 205}px`;

        anime({
            targets: packet,
            left: client.offsetLeft + 85,
            opacity: 1,
            duration: travelDuration,
            easing: 'easeInOutSine',
            complete: () => {
                anime({ targets: client, scale: [1, 1.1, 1], duration: 500 });
                setTimeout(runRequest, pauseDuration); // Chain to the next step
            }
        });
    };

    const runRequest = () => {
        clearCanvas();
        const client = createNode(`Client<br>(MAC: ${clientMAC})<br><strong>(No IP)</strong>`, 'pc', 150, 50);
        const server = createNode(`DHCP Server<br>(MAC: ${serverMAC})`, 'server', 150, canvas.clientWidth - 140);
        
        updateExplanation('<strong>R - Request:</strong> The client accepts the offer by sending a formal <strong>broadcast</strong> request.');
        const details = `<strong>Src MAC:</strong> ${clientMAC}<br><strong>Dest MAC:</strong> FF:FF:FF:FF:FF:FF (Broadcast)<br><strong>Requesting IP:</strong> ${offeredIP}`;
        const packet = createDetailedPacket('DHCP REQUEST', details, 'warning');

        packet.style.top = `${client.offsetTop + 5}px`;
        packet.style.left = `${client.offsetLeft + 85}px`;

        anime({
            targets: packet,
            left: canvas.clientWidth / 2 - 100,
            top: 200,
            opacity: 1,
            duration: travelDuration,
            easing: 'easeInOutSine',
            complete: () => {
                anime({ targets: packet, scale: 1.1, direction: 'alternate', loop: 2, duration: 400 });
                anime({ targets: server, scale: [1, 1.1, 1], duration: 500, delay: 200 });
                setTimeout(runAcknowledge, pauseDuration); // Chain to the next step
            }
        });
    };

    const runAcknowledge = () => {
        clearCanvas();
        const client = createNode(`Client<br>(MAC: ${clientMAC})<br><strong>(No IP)</strong>`, 'pc', 150, 50);
        const server = createNode(`DHCP Server<br>(MAC: ${serverMAC})`, 'server', 150, canvas.clientWidth - 140);
        
        updateExplanation('<strong>A - Acknowledge:</strong> The server sends a final <strong>unicast</strong>, confirming the IP lease.');
        const details = `<strong>Src MAC:</strong> ${serverMAC}<br><strong>Dest MAC:</strong> ${clientMAC}<br><strong>Leased IP:</strong> ${offeredIP}`;
        const packet = createDetailedPacket('DHCP ACK', details, 'good');

        packet.style.top = `${server.offsetTop + 20}px`;
        packet.style.left = `${server.offsetLeft - 205}px`;

        anime({
            targets: packet,
            left: client.offsetLeft + 85,
            opacity: 1,
            duration: travelDuration,
            easing: 'easeInOutSine',
            complete: () => {
                client.innerHTML = `Client<br>(MAC: ${clientMAC})<br><strong>(IP: ${offeredIP})</strong>`;
                anime({
                    targets: client,
                    borderColor: 'var(--color-good)',
                    boxShadow: '0 0 25px rgba(76, 175, 80, 0.7)',
                    scale: 1.1,
                    duration: 1000,
                });
                updateExplanation('The DORA process is complete. The client is now configured for the network!');
            }
        });
    };

    // --- Start the animation chain ---
    runDiscover();
}

    // --- Main Event Listener ---
    subNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('#sub-nav button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            clearCanvas();
            const animType = e.target.dataset.anim;
            if (animType === 'tcpip') animateTCPIP();
            else if (animType === 'dns') animateDNS();
            else if (animType === 'http') animateHTTP();
            else if (animType === 'dhcp') animateDHCP();
        }
    });
});