// 全局变量和状态管理
const state = {
    isScrolling: false,
    currentSectionIndex: 0,
    sections: [],
    navLinks: [],
    lastScrollTime: Date.now()
};

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeFullPage();
    initializeNavigation();
    initializeScrollListeners();

    // 添加发光按钮效果
    const glowBtn = document.querySelector('.glow-btn');
    if (glowBtn) {
        glowBtn.onmousemove = function(e) {
            const x = e.pageX - glowBtn.offsetLeft;
            const y = e.pageY - glowBtn.offsetTop;

            glowBtn.style.setProperty('--x', `${x}px`);
            glowBtn.style.setProperty('--y', `${y}px`);
        };
    }
});

// 初始化导航
function initializeNavigation() {
    state.navLinks = Array.from(document.querySelectorAll('.nav-link[data-section]'));
    
    state.navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            navigateToSection(section);
        });
    });

    // 初始化当前活动部分
    updateActiveSection();
}

// 初始化全屏滚动
function initializeFullPage() {
    const container = document.querySelector('.fullpage-container');
    if (!container) return;

    state.sections = Array.from(document.querySelectorAll('.fullpage-section'));
}

// 初始化滚动监听器
function initializeScrollListeners() {
    const container = document.querySelector('.fullpage-container');
    if (!container) return;

    // 滚轮事件
    container.addEventListener('wheel', throttle((e) => {
        e.preventDefault();
        handleScroll(e.deltaY > 0 ? 1 : -1);
    }, 100), { passive: false });

    // 触摸事件
    let touchStartY = 0;
    container.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    });

    container.addEventListener('touchmove', e => {
        const touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > 50) {
            handleScroll(diff > 0 ? 1 : -1);
            touchStartY = touchEndY;
        }
    });

    // 键盘事件
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') {
            handleScroll(1);
        } else if (e.key === 'ArrowUp') {
            handleScroll(-1);
        }
    });
}

// 处理滚动
function handleScroll(direction) {
    if (state.isScrolling) return;
    
    const now = Date.now();
    if (now - state.lastScrollTime < 500) return; // 防止滚动过快
    
    const nextIndex = state.currentSectionIndex + direction;
    if (nextIndex >= 0 && nextIndex < state.sections.length) {
        scrollToSection(nextIndex);
        state.lastScrollTime = now;
    }
}

// 滚动到指定部分
function scrollToSection(index) {
    if (state.isScrolling) return;

    state.isScrolling = true;
    state.currentSectionIndex = index;

    const section = state.sections[index];
    const offset = section.offsetTop - 60; // 减去导航栏高度

    const container = document.querySelector('.fullpage-container');
    container.scrollTo({
        top: offset,
        behavior: 'smooth'
    });

    updateActiveSection();

    setTimeout(() => {
        state.isScrolling = false;
    }, 1000);
}

// 导航到指定部分
function navigateToSection(sectionId) {
    const sectionIndex = state.sections.findIndex(section => section.id === sectionId);
    if (sectionIndex !== -1) {
        scrollToSection(sectionIndex);
    }
}

// 更新活动部分
function updateActiveSection() {
    const currentSection = state.sections[state.currentSectionIndex];
    
    // 更新导航链接状态
    state.navLinks.forEach(link => {
        const isActive = link.dataset.section === currentSection.id;
        link.classList.toggle('active', isActive);
    });

    // 更新URL
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('section', currentSection.id);
    window.history.replaceState({}, '', newUrl);
}

// 工具函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 模态框功能
window.showModal = function(type) {
    const modal = document.getElementById('paymentModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalQR = document.getElementById('modalQR');
    
    if (modal && modalTitle && modalQR) {
        modalTitle.textContent = getModalTitle(type);
        modalQR.src = getQRCodeUrl(type);
        modal.style.display = 'block';
    }
};

window.closeModal = function() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'none';
    }
};

// 辅助函数
function getModalTitle(type) {
    const titles = {
        'basic': '基础工位套餐',
        'premium': '精英工位套餐',
        'luxury': '至尊工位套餐',
        'night': '深夜加班套餐',
        'weekend': '周末加班套餐',
        'holiday': '节假日加班套餐',
        'normal': '普通员工升级包',
        'manager': '中层管理升级包',
        'executive': '高管晋升套餐'
    };
    return titles[type] || '支付';
}

function getQRCodeUrl(type) {
    const urls = {
        'basic': '/static/images/1元.jpg',      // 基础工位套餐
        'premium': '/static/images/5元.jpg',    // 精英工位套餐
        'luxury': '/static/images/10元.jpg',    // 至尊工位套餐
        
        'night': '/static/images/1元.jpg',      // 深夜加班套餐
        'weekend': '/static/images/5元.jpg',    // 周末加班套餐
        'holiday': '/static/images/10元.jpg',   // 节假日加班套餐

        'normal': '/static/images/1元.jpg',     // 普通员工升级包
        'manager': '/static/images/5元.jpg',    // 中层管理升级包
        'executive': '/static/images/10元.jpg'  // 高管晋升套餐
    };
    return urls[type] || '/static/images/微信支付.jpg';
}

// 其他现有功能保持不变... 