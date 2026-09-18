$(document).ready(function() {
    // ฟังก์ชันสร้างสีแบบสุ่ม (คงไว้เหมือนเดิมแต่เรียกใช้ผ่าน jQuery)
    function generateRandomColor() {
        const hexChars = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += hexChars[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // ใช้ jQuery ในการดักจับ Event การคลิก
    $('#colorBtn').on('click', function() {
        const newColor = generateRandomColor();
        
        // เปลี่ยนสีพื้นหลังของ body
        $('body').css('background-color', newColor);
    });
});