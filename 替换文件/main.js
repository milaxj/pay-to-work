document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单相关
    const initNavigation = () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });
        }
    };

    // 按钮光效相关
    const initButtonEffect = () => {
        const btn = document.querySelector('.btn');
        if (btn) {
            btn.onmousemove = function(e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                btn.style.setProperty('--x', `${x}px`);
                btn.style.setProperty('--y', `${y}px`);
            }
        }
    };

    // 分别初始化各个功能
    try {
        initNavigation();
        initButtonEffect();
    } catch (error) {
        console.warn('Some features might not be available:', error);
    }
}); 