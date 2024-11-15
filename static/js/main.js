document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // 按钮光效
    const btn = document.querySelector('.btn')
    if (btn) {
        // 当鼠标在按钮上移动时触发的事件处理函数
        btn.onmousemove = function(e) {
            // 计算鼠标相对于按钮左边界的位置
            const x = e.pageX - btn.offsetLeft;
            // 计算鼠标相对于按钮上边界的位置 
            const y = e.pageY - btn.offsetTop;

            // 设置CSS自定义属性--x和--y的值
            // 这些值用于控制按钮hover时的光效位置
            btn.style.setProperty('--x', `${x}px`);
            btn.style.setProperty('--y', `${y}px`);
        }
    }
}); 