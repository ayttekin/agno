function dersEkle() {
    const derslerDiv = document.getElementById('dersler');
    const yeniDers = document.createElement('div');
    yeniDers.className = 'ders';
    yeniDers.innerHTML = `
        <input type="text" placeholder="Ders Adı" class="ders-adi">
        <input type="number" placeholder="Kredi" class="kredi" min="1" max="30">
        <select class="harf-notu">
            <option value="4.0">AA</option>
            <option value="3.5">BA</option>
            <option value="3.0">BB</option>
            <option value="2.5">CB</option>
            <option value="2.0">CC</option>
            <option value="1.5">DC</option>
            <option value="1.0">DD</option>
            <option value="0.5">FD</option>
            <option value="0">FF</option>
        </select>
        <button onclick="dersSil(this)" style="background-color: #ff4444;">Sil</button>
    `;
    derslerDiv.appendChild(yeniDers);
}

function dersSil(button) {
    button.parentElement.remove();
}

function hesapla() {
    const dersler = document.getElementsByClassName('ders');
    let toplamKredi = 0;
    let toplamPuan = 0;

    // Mevcut dönem derslerini hesapla
    for (let ders of dersler) {
        const kredi = parseFloat(ders.querySelector('.kredi').value);
        const harfNotu = parseFloat(ders.querySelector('.harf-notu').value);

        if (isNaN(kredi)) continue;

        toplamKredi += kredi;
        toplamPuan += kredi * harfNotu;
    }

    // Geçmiş dönem bilgilerini al
    const gecmisAgno = parseFloat(document.getElementById('gecmisAgno').value);
    const gecmisKredi = parseFloat(document.getElementById('gecmisKredi').value);
    
    const sonucDiv = document.getElementById('sonuc');
    
    if (isNaN(toplamKredi) || toplamKredi === 0) {
        sonucDiv.textContent = 'Lütfen geçerli değerler giriniz.';
        return;
    }

    // Sadece mevcut dönem AGNO'su
    const donemAgno = toplamPuan / toplamKredi;

    // Geçmiş dönem bilgileri varsa genel AGNO'yu hesapla
    if (!isNaN(gecmisAgno) && !isNaN(gecmisKredi) && gecmisKredi > 0) {
        const genelToplamKredi = toplamKredi + gecmisKredi;
        const genelToplamPuan = (gecmisAgno * gecmisKredi) + toplamPuan;
        const genelAgno = genelToplamPuan / genelToplamKredi;

        sonucDiv.innerHTML = `
            <div class="sonuc-grid">
                <div class="sonuc-item">
                    <div class="sonuc-baslik">Bu Dönem AGNO</div>
                    <div class="sonuc-deger">${donemAgno.toFixed(2)}</div>
                </div>
                <div class="sonuc-item">
                    <div class="sonuc-baslik">Bu Dönem Kredi</div>
                    <div class="sonuc-deger">${toplamKredi}</div>
                </div>
                <div class="sonuc-item highlight">
                    <div class="sonuc-baslik">Genel AGNO</div>
                    <div class="sonuc-deger">${genelAgno.toFixed(2)}</div>
                </div>
                <div class="sonuc-item">
                    <div class="sonuc-baslik">Toplam Kredi</div>
                    <div class="sonuc-deger">${genelToplamKredi}</div>
                </div>
            </div>`;
    } else {
        sonucDiv.innerHTML = `
            <div class="sonuc-grid">
                <div class="sonuc-item highlight">
                    <div class="sonuc-baslik">AGNO</div>
                    <div class="sonuc-deger">${donemAgno.toFixed(2)}</div>
                </div>
                <div class="sonuc-item">
                    <div class="sonuc-baslik">Toplam Kredi</div>
                    <div class="sonuc-deger">${toplamKredi}</div>
                </div>
            </div>`;
    }
} 