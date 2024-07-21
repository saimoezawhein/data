let inEntries = [];
let outEntries = [];
let currentEntry = null;

function formatNumberInput(input) {
    input.value = input.value.replace(/\D/g, '');
    input.value = parseInt(input.value).toLocaleString();
}

function changeForm() {
    const rateType = document.getElementById('rate-type').value;
    const formContent = document.getElementById('form-content');

    if (rateType === 'in') {
        formContent.innerHTML = `
            <div class="input-group">
                <label for="no">No.</label>
                <input type="number" id="no" required>
            </div>
            <div class="input-group">
                <label for="sn">SN</label>
                <input type="text" id="sn" required>
            </div>
            <div class="input-group">
                <label for="rn">RN</label>
                <input type="text" id="rn" required>
            </div>
            <div class="input-group">
                <label for="paid-payment">Paid Payment</label>
                <div style="display: flex; gap: 8px;">
                    <input type="text" id="paid-payment-input" placeholder="Input">
                    <select id="paid-payment" required style="width: auto;">
                        <option value="Kpay">Kpay</option>
                        <option value="KBZ">KBZ</option>
                        <option value="AYA">AYA</option>
                        <option value="AyaPay">AyaPay</option>
                        <option value="CB">CB</option>
                        <option value="Yoma">Yoma</option>
                        <option value="Wave">Wave</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>
            </div>
            <div class="input-group">
                <label for="b-in">B In</label>
                <select id="b-in" required>
                    <option value="SMZH K+">SMZH K+</option>
                    <option value="SMMK K+">SMMK K+</option>
                    <option value="KKH BBL">KKH BBL</option>
                    <option value="SMZH BBL">SMZH BBL</option>
                    <option value="SMMK SCB">SMMK SCB</option>
                    <option value="SZSK K+">SZSK K+</option>
                </select>
            </div>
            <div class="input-group">
                <label for="amount">Amount</label>
                <input type="text" id="amount" required oninput="formatNumberInput(this)">
            </div>
            <div class="input-group">
                <label for="rate">Rate</label>
                <input type="text" id="rate" step="0.01" required oninput="formatNumberInput(this)">
            </div>
        `;
    } else if (rateType === 'out') {
        formContent.innerHTML = `
            <div class="input-group">
                <label for="no">No.</label>
                <input type="number" id="no" required>
            </div>
            <div class="input-group">
                <label for="sn">SN</label>
                <input type="text" id="sn" required>
            </div>
            <div class="input-group">
                <label for="ob">OB</label>
                <select id="ob" required>
                    <option value="SMZH K+">SMZH K+</option>
                    <option value="SMMK K+">SMMK K+</option>
                    <option value="KKH BBL">KKH BBL</option>
                    <option value="SMZH BBL">SMZH BBL</option>
                    <option value="SMMK SCB">SMMK SCB</option>
                    <option value="SZSK K+">SZSK K+</option>
                </select>
            </div>
            <div class="input-group">
                <label for="paid-by">Paid By</label>
                <div style="display: flex; gap: 8px;">
                    <input type="text" id="paid-by-input" placeholder="Input">
                    <select id="paid-by" required style="width: auto;">
                        <option value="Kpay">Kpay</option>
                        <option value="KBZ">KBZ</option>
                        <option value="AYA">AYA</option>
                        <option value="AyaPay">AyaPay</option>
                        <option value="CB">CB</option>
                        <option value="Yoma">Yoma</option>
                        <option value="Wave">Wave</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>
            </div>
            <div class="input-group">
                <label for="amount">Amount</label>
                <input type="text" id="amount" required oninput="formatNumberInput(this)">
            </div>
            <div class="input-group">
                <label for="rate">Rate</label>
                <input type="text" id="rate" step="0.01" required oninput="formatNumberInput(this)">
            </div>
        `;
    } else {
        formContent.innerHTML = '';
    }
}

function addEntry() {
    const rateType = document.getElementById('rate-type').value;
    const no = document.getElementById('no').value;
    const sn = document.getElementById('sn').value;
    const amount = document.getElementById('amount').value.replace(/,/g, '');
    const rate = document.getElementById('rate').value.replace(/,/g, '');
    const result = (rate * (amount / 100000)).toFixed(2);
    let entry = {};
    let entryExists = false;

    if (rateType === 'in') {
        const rn = document.getElementById('rn').value;
        const paidPaymentInput = document.getElementById('paid-payment-input').value;
        const paidPayment = document.getElementById('paid-payment').value;
        const bIn = document.getElementById('b-in').value;

        entry = {
            no, sn, rn, paidPaymentInput, paidPayment, bIn, amount, rate, result
        };

        inEntries = inEntries.map(e => {
            if (e.no === no) {
                entryExists = true;
                return entry;
            }
            return e;
        });

        if (!entryExists) {
            inEntries.push(entry);
        }

        currentEntry = entry;
        displayEntry(entry);
    } else if (rateType === 'out') {
        const ob = document.getElementById('ob').value;
        const paidByInput = document.getElementById('paid-by-input').value;
        const paidBy = document.getElementById('paid-by').value;

        entry = {
            no, sn, ob, paidByInput, paidBy, amount, rate, result
        };

        outEntries = outEntries.map(e => {
            if (e.no === no) {
                entryExists = true;
                return entry;
            }
            return e;
        });

        if (!entryExists) {
            outEntries.push(entry);
        }

        currentEntry = entry;
        displayEntry(entry);
    }
}

function displayEntry(entry) {
    const output = document.getElementById('output');
    output.innerHTML = `
        <div class="entry">
            <p>No. ${entry.no}</p>
            <p>SN = ${entry.sn}</p>
            ${entry.rn ? `<p>RN = ${entry.rn}</p>` : ''}
            ${entry.paidPaymentInput ? `<p>Paid Payment = ${entry.paidPaymentInput} ${entry.paidPayment}</p>` : ''}
            ${entry.bIn ? `<p>B In = ${entry.bIn}</p>` : ''}
            ${entry.ob ? `<p>OB = ${entry.ob}</p>` : ''}
            ${entry.paidByInput ? `<p>Paid By = ${entry.paidByInput} ${entry.paidBy}</p>` : ''}
            <p>Amount = ${parseInt(entry.amount).toLocaleString()}</p>
            <p>-----</p>
            <p>Rate</p>
            <p>${parseFloat(entry.rate).toLocaleString()} × ${(entry.amount / 100000).toFixed(1)} = ${entry.result.toLocaleString()}</p>
            <button class="copy-button" onclick="copyResult()">Copy Result</button>
        </div>
    `;
}

function copyResult() {
    const outputElement = document.getElementById('output');
    let outputText = '';

    outputElement.querySelectorAll('p').forEach(paragraph => {
        outputText += paragraph.textContent.trim() + '\n';
    });

    outputText = outputText.trim();

    navigator.clipboard.writeText(outputText)
        .catch(err => {
            console.error('Failed to copy output: ', err);
        });
}

function toggleResults() {
    const allResults = document.getElementById('all-results');
    const toggleButton = document.getElementById('toggle-results-button');

    if (allResults.style.display === 'none') {
        displayAllEntries();
        allResults.style.display = 'block';
        toggleButton.textContent = 'Hide All Results';
    } else {
        allResults.style.display = 'none';
        toggleButton.textContent = 'Show All Results';
    }
}

function displayAllEntries() {
    const allEntries = document.getElementById('all-entries');
    allEntries.innerHTML = '';

    const entries = [...inEntries, ...outEntries];
    entries.forEach(entry => {
        const entryHtml = `
            <div class="entry">
                <p>No. ${entry.no}</p>
                <p>SN = ${entry.sn}</p>
                ${entry.rn ? `<p>RN = ${entry.rn}</p>` : ''}
                ${entry.paidPaymentInput ? `<p>Paid Payment = ${entry.paidPaymentInput} ${entry.paidPayment}</p>` : ''}
                ${entry.bIn ? `<p>B In = ${entry.bIn}</p>` : ''}
                ${entry.ob ? `<p>OB = ${entry.ob}</p>` : ''}
                ${entry.paidByInput ? `<p>Paid By = ${entry.paidByInput} ${entry.paidBy}</p>` : ''}
                <p>Amount = ${parseInt(entry.amount).toLocaleString()}</p>
                <p>-----</p>
                <p>Rate</p>
                <p>${parseFloat(entry.rate).toLocaleString()} × ${(entry.amount / 100000).toFixed(1)} = ${entry.result.toLocaleString()}</p>
                <button class="edit-button" onclick="editEntry(${entry.no})">Edit</button>
                <button class="delete-button" onclick="deleteEntry(${entry.no})">Delete</button>
            </div>
        `;
        allEntries.innerHTML += entryHtml;
    });
}

function editEntry(no) {
    const rateType = document.getElementById('rate-type').value;
    const entry = rateType === 'in' ? inEntries.find(e => e.no === no) : outEntries.find(e => e.no === no);

    if (entry) {
        document.getElementById('no').value = entry.no;
        document.getElementById('sn').value = entry.sn;
        document.getElementById('amount').value = entry.amount;
        document.getElementById('rate').value = entry.rate;

        if (rateType === 'in') {
            document.getElementById('rn').value = entry.rn;
            document.getElementById('paid-payment-input').value = entry.paidPaymentInput;
            document.getElementById('paid-payment').value = entry.paidPayment;
            document.getElementById('b-in').value = entry.bIn;
        } else {
            document.getElementById('ob').value = entry.ob;
            document.getElementById('paid-by-input').value = entry.paidByInput;
            document.getElementById('paid-by').value = entry.paidBy;
        }

        currentEntry = entry;
        displayEntry(entry);
    }
}

function deleteEntry(no) {
    const rateType = document.getElementById('rate-type').value;

    if (rateType === 'in') {
        inEntries = inEntries.filter(e => e.no !== no);
    } else {
        outEntries = outEntries.filter(e => e.no !== no);
    }

    document.getElementById('output').innerHTML = '';
}

function exportData(type) {
    const exportType = document.getElementById(`export-type-${type}`).value;
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    const filename = `${type}_${year}_${month}.${exportType}`;

    let entries = type === 'in' ? inEntries : outEntries;
    let data = [];

    if (exportType === 'excel') {
        if (type === 'in') {
            data = entries.map(entry => ({
                No: entry.no,
                SN: entry.sn,
                RN: entry.rn,
                'Paid Payment': entry.paidPaymentInput ? entry.paidPaymentInput + ' ' + entry.paidPayment : '',
                'B In': entry.bIn,
                Amount: entry.amount,
                Rate: entry.rate,
                Result: entry.result
            }));
        } else if (type === 'out') {
            data = entries.map(entry => ({
                No: entry.no,
                SN: entry.sn,
                OB: entry.ob,
                'Paid By': entry.paidByInput ? entry.paidByInput + ' ' + entry.paidBy : '',
                Amount: entry.amount,
                Rate: entry.rate,
                Result: entry.result
            }));
        }

        try {
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, `${day}-${month}-${year}`);
            XLSX.writeFile(wb, filename);
        } catch (error) {
            console.error("Error writing Excel file: ", error);
        }
    } else if (exportType === 'csv') {
        if (type === 'in') {
            data = entries.map(entry => ({
                No: entry.no,
                SN: entry.sn,
                RN: entry.rn,
                'Paid Payment': entry.paidPaymentInput ? entry.paidPaymentInput + ' ' + entry.paidPayment : '',
                'B In': entry.bIn,
                Amount: entry.amount,
                Rate: entry.rate,
                Result: entry.result
            }));
        } else if (type === 'out') {
            data = entries.map(entry => ({
                No: entry.no,
                SN: entry.sn,
                OB: entry.ob,
                'Paid By': entry.paidByInput ? entry.paidByInput + ' ' + entry.paidBy : '',
                Amount: entry.amount,
                Rate: entry.rate,
                Result: entry.result
            }));
        }

        let csvContent = "data:text/csv;charset=utf-8," + Object.keys(data[0]).join(",") + "\n";
        data.forEach(row => {
            csvContent += Object.values(row).join(",") + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else if (exportType === 'pdf') {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let col, rows;

        if (type === 'in') {
            col = ["No", "SN", "RN", "Paid Payment", "B In", "Amount", "Rate", "Result"];
            rows = entries.map(entry => [
                entry.no, entry.sn, entry.rn, entry.paidPaymentInput ? entry.paidPaymentInput + ' ' + entry.paidPayment : '', 
                entry.bIn, entry.amount, entry.rate, entry.result
            ]);
        } else if (type === 'out') {
            col = ["No", "SN", "OB", "Paid By", "Amount", "Rate", "Result"];
            rows = entries.map(entry => [
                entry.no, entry.sn, entry.ob, entry.paidByInput ? entry.paidByInput + ' ' + entry.paidBy : '', 
                entry.amount, entry.rate, entry.result
            ]);
        }

        doc.autoTable(col, rows);
        doc.save(filename);
    }
}
