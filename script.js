document.addEventListener('DOMContentLoaded', () => {
    const els = {
        input: document.getElementById('inputNumeros'),
        winnersCount: document.getElementById('winnersCount'),
        fileImport: document.getElementById('fileImport'),
        btnClear: document.getElementById('btnClear'),
        btnSortear: document.getElementById('btnSortear'),
        mensagem: document.getElementById('mensagem'),
        resultado: document.getElementById('resultado'),
        btnCopy: document.getElementById('btnCopy'),
        btnExport: document.getElementById('btnExport'),
        confettiCanvas: document.getElementById('confettiCanvas')
    };

    function parseParticipants(text){
        if(!text) return [];
        const arr = text.split(',').map(s => s.trim()).filter(Boolean);
        // remove duplicates
        return Array.from(new Set(arr));
    }

    function shuffle(array){
        for(let i = array.length -1; i>0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function showMessage(text, type){
        els.mensagem.textContent = text;
        els.mensagem.className = 'mensagem ' + (type||'');
    }

    function renderResults(list){
        els.resultado.innerHTML = '';
        if(list.length === 0){ els.resultado.textContent = '— sem resultados —'; return; }
        list.forEach(v => {
            const d = document.createElement('div'); d.className = 'item'; d.textContent = v; els.resultado.appendChild(d);
        });
    }

    function draw(){
        const participants = parseParticipants(els.input.value);
        const wanted = Math.max(1, Math.min(19, Number(els.winnersCount.value) || 15));
        if(participants.length < wanted){
            showMessage(`⚠️ Há apenas ${participants.length} participantes — precisa de ${wanted}.`, 'error');
            renderResults([]);
            return;
        }

        const pool = shuffle(participants.slice());
        const winners = pool.slice(0, wanted);
        showMessage('✅ Sorteio realizado com sucesso!', 'ok');
        animateSelection(winners);
        renderResults(winners);
    }

    function copyResults(){
        const text = Array.from(els.resultado.querySelectorAll('.item')).map(n=>n.textContent).join(',');
        if(!text) return showMessage('Nada para copiar', 'error');
        navigator.clipboard?.writeText(text).then(()=> showMessage('Copiado para área de transferência', 'ok'));
    }

    function exportCSV(){
        const rows = Array.from(els.resultado.querySelectorAll('.item')).map(n=>`"${n.textContent.replace(/"/g,'""')}"`).join('\n');
        if(!rows) return showMessage('Nada para exportar', 'error');
        const blob = new Blob([rows], {type:'text/csv;charset=utf-8;'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'sorteio_resultado.csv'; a.click(); URL.revokeObjectURL(url);
    }

    function importCSVFile(file){
        if(!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            const text = String(e.target.result).replace(/\r/g,'');
            // split by comma or newline
            const items = text.split(/[\n,]+/).map(s=>s.trim()).filter(Boolean);
            els.input.value = items.join(',');
            showMessage(`Importados ${items.length} registros.`, 'ok');
        };
        reader.readAsText(file, 'UTF-8');
    }

    function clearAll(){
        els.input.value = '';
        els.resultado.innerHTML = '';
        showMessage('Limpo', '');
    }

    // small confetti implementation
    function animateSelection(winners){
        const canvas = els.confettiCanvas; if(!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width = window.innerWidth; const H = canvas.height = window.innerHeight;
        const particles = [];
        for(let i=0;i<80;i++){
            particles.push({x:Math.random()*W,y:-10,vy:2+Math.random()*6, size:4+Math.random()*8, color:`hsl(${Math.random()*360} 90% 60%)`,rot:Math.random()*360, vr:Math.random()*6-3});
        }
        let t=0;
        const id = setInterval(()=>{
            t++; ctx.clearRect(0,0,W,H);
            particles.forEach(p=>{ p.y += p.vy; p.x += Math.sin(t/10 + p.size)*0.5; p.rot += p.vr; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180); ctx.fillStyle=p.color; ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size); ctx.restore(); });
            if(t>120){ clearInterval(id); ctx.clearRect(0,0,W,H); }
        },1000/60);
    }

    // events
    els.btnSortear.addEventListener('click', draw);
    els.btnClear.addEventListener('click', clearAll);
    els.btnCopy.addEventListener('click', copyResults);
    els.btnExport.addEventListener('click', exportCSV);
    els.fileImport.addEventListener('change', e => importCSVFile(e.target.files[0]));

    // ensure confetti canvas matches window size
    function resizeCanvas(){
        const c = els.confettiCanvas; if(!c) return; c.width = window.innerWidth; c.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

});
