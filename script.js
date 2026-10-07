// นำ URL ที่ได้จากการ Deploy Google Apps Script มาใส่ตรงนี้
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwP9uN0lHjBNR3seYVOOFH5b9Nqb-Mf1PZ0xHJebfLU2m86JUoeKviRd0czpQwXBu7N/exec";

document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const loadingDiv = document.getElementById('loading');
    const responseMsg = document.getElementById('responseMessage');

    // เก็บข้อมูลจากฟอร์ม
    const formData = {
        week: document.getElementById('week').value,
        rank: document.getElementById('rank').value,
        fullname: document.getElementById('fullname').value,
        discord: document.getElementById('discord').value,
        status: document.getElementById('status').value,
        problem: document.getElementById('problem').value
    };

    // แสดงสถานะกำลังโหลด
    submitBtn.disabled = true;
    loadingDiv.classList.remove('hidden');
    responseMsg.classList.add('hidden');

    // ส่งข้อมูลไปยัง Google Apps Script ด้วย Fetch API (CORS mode)
    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors', // สำคัญสำหรับ Google Apps Script Web App
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        // เนื่องจากใช้ no-cors จะไม่สามารถอ่าน JSON Response ตรงๆ ได้ แต่ถ้าผ่านถือว่าสำเร็จ
        loadingDiv.classList.add('hidden');
        submitBtn.disabled = false;
        
        responseMsg.textContent = "✅ ส่งรายงานตัวสำเร็จเรียบร้อยแล้ว!";
        responseMsg.className = "message success";
        responseMsg.classList.remove('hidden');

        // ล้างข้อมูลในฟอร์มหลังส่งสำเร็จ
        document.getElementById('reportForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        loadingDiv.classList.add('hidden');
        submitBtn.disabled = false;

        responseMsg.textContent = "❌ เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง";
        responseMsg.className = "message error";
        responseMsg.classList.remove('hidden');
    });
});