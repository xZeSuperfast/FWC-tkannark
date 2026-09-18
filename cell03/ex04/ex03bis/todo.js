$(document).ready(function() {
    const $ft_list = $('#ft_list');
    const $newBtn = $('#new_btn');

    // 1. โหลดข้อมูลจาก Cookies เมื่อเปิดหน้าเว็บ
    const loadFromCookies = () => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const todoCookie = cookies.find(row => row.startsWith('todo_list='));
        
        if (todoCookie) {
            try {
                const tasks = JSON.parse(decodeURIComponent(todoCookie.slice('todo_list='.length)));
                if (Array.isArray(tasks) && tasks.every(task => typeof task === 'string')) {
                    // Reverse เพื่อให้ลำดับยังคงเดิมเมื่อใช้ prepend
                    tasks.reverse().forEach(taskText => addTask(taskText, false));
                }
            } catch (error) {
                // คุกกี้ที่เสียหายไม่ควรทำให้เพิ่มรายการใหม่ไม่ได้
            }
        }
    };

    // 2. Event Listener สำหรับปุ่ม New
    $newBtn.on('click', () => {
        const task = prompt("What do you need to do?");
        if (task && task.trim() !== "") {
            addTask(task, true);
        }
    });

    // 3. ฟังก์ชันสำหรับเพิ่ม Task ลงในหน้าเว็บ
    function addTask(text, save) {
        // สร้าง Element ใหม่ด้วย jQuery
        const $div = $('<div></div>').text(text);
        
        // ลบ Task เมื่อคลิก
        $div.on('click', function() {
            if (confirm("Do you really want to remove this TO DO?")) {
                $(this).remove();
                saveToCookies();
            }
        });

        // นำไปไว้บนสุดของรายการ
        $ft_list.prepend($div);

        if (save) saveToCookies();
    }

    // 4. บันทึกลง Cookies
    function saveToCookies() {
        const tasks = [];
        // วนลูปเก็บข้อความจาก div ทั้งหมดใน list
        $ft_list.find('div').each(function() {
            tasks.push($(this).text());
        });
        
        const d = new Date();
        d.setTime(d.getTime() + (7*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        
        document.cookie = "todo_list=" + encodeURIComponent(JSON.stringify(tasks)) + ";" + expires + ";path=/";
    }

    // เรียกใช้งานโหลดข้อมูลตอนเริ่มต้น
    loadFromCookies();
});
