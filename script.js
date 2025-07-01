// SCUM属性编辑器网站 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 点击菜单项后关闭移动端菜单
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动时隐藏导航栏
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动时显示导航栏
            navbar.style.transform = 'translateY(0)';
        }
        
        // 滚动时改变导航栏背景透明度
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 元素进入视口时添加动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.feature-card, .screenshot-item, .download-card, .step, .support-card').forEach(element => {
        observer.observe(element);
    });
    
    // 下载按钮点击事件
    const downloadLinks = {
        'github-link': 'https://github.com/zhxtcom/jzsoft/releases',
        'baidu-link': 'https://share.weiyun.com/2SyWSV61'
    };
    
    Object.keys(downloadLinks).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 显示下载提示
                showDownloadNotification(this.textContent.trim());
                
                // 模拟下载
                setTimeout(() => {
                    window.open(downloadLinks[id], '_blank');
                }, 500);
            });
        }
    });
    
    // 显示下载通知
    function showDownloadNotification(downloadType) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-download"></i>
                <span>准备下载 ${downloadType}...</span>
            </div>
        `;
        
        // 添加通知样式
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 184, 148, 0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // 版本信息悬停效果
    const versionElement = document.querySelector('.version');
    if (versionElement) {
        versionElement.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        versionElement.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // 特性卡片悬停时的粒子效果
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            createParticles(this);
        });
    });
    
    function createParticles(element) {
        const particles = 5;
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00b894;
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                animation: particleFloat 1s ease-out forwards;
            `;
            
            particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(particle);
            
            // 清理粒子
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 1000);
        }
    }
    
    // 添加粒子动画CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-50px) scale(0);
            }
        }
        
        .download-notification .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .download-notification i {
            animation: pulse 1s infinite;
        }
    `;
    document.head.appendChild(style);
    
    // 统计代码计数器（模拟）
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // ESC键关闭移动端菜单
            if (navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    // 懒加载图片
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // 页面加载完成提示
    window.addEventListener('load', function() {
        console.log('🎮 SCUM属性编辑器网站加载完成！');
        console.log('🚀 由桔子大魔王精心制作');
        console.log('📞 技术支持QQ: 130228228');
    });
});

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 导出给全局使用
window.SCUMEditor = {
    debounce,
    throttle
};

// QQ对话功能
function fallbackToWebQQ(event) {
    // 检测是否在移动端
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 移动端优先使用QQ协议
        event.preventDefault();
        window.location.href = 'mqqwpa://im/chat?chat_type=wpa&uin=130228228';
        
        // 如果QQ协议失败，延迟跳转到网页版
        setTimeout(() => {
            window.open('https://wpa.qq.com/msgrd?v=3&uin=130228228&site=qq&menu=yes', '_blank');
        }, 1500);
    } else {
        // PC端先尝试QQ客户端，如果失败则使用网页版
        setTimeout(() => {
            // 如果QQ客户端没有响应，显示提示并提供网页版链接
            showQQFallbackNotification();
        }, 2000);
    }
}

// 显示QQ备选方案通知
function showQQFallbackNotification() {
    const notification = document.createElement('div');
    notification.className = 'qq-fallback-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fab fa-qq"></i>
            <div class="notification-text">
                <h4>QQ客户端未检测到</h4>
                <p>请选择其他联系方式：</p>
                <div class="fallback-buttons">
                    <a href="https://wpa.qq.com/msgrd?v=3&uin=130228228&site=qq&menu=yes" target="_blank" class="btn btn-sm">
                        <i class="fas fa-globe"></i>
                        网页版QQ
                    </a>
                    <button onclick="copyQQNumber()" class="btn btn-sm">
                        <i class="fas fa-copy"></i>
                        复制QQ号
                    </button>
                </div>
            </div>
            <button onclick="closeQQNotification()" class="close-btn">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // 添加通知样式
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--background-card);
        border: 2px solid var(--accent-color);
        border-radius: 15px;
        padding: 2rem;
        z-index: 10001;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        max-width: 400px;
        width: 90%;
        animation: slideInScale 0.3s ease-out;
    `;
    
    // 添加遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'qq-notification-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        backdrop-filter: blur(5px);
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(notification);
    
    // 点击遮罩层关闭
    overlay.addEventListener('click', closeQQNotification);
}

// 复制QQ号功能
function copyQQNumber() {
    const qqNumber = '130228228';
    
    if (navigator.clipboard && window.isSecureContext) {
        // 现代浏览器的异步clipboard API
        navigator.clipboard.writeText(qqNumber).then(() => {
            showCopySuccessMessage();
        }).catch(() => {
            fallbackCopyText(qqNumber);
        });
    } else {
        // 备用复制方法
        fallbackCopyText(qqNumber);
    }
}

// 备用复制文本方法
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccessMessage();
    } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，QQ号: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功消息
function showCopySuccessMessage() {
    const message = document.createElement('div');
    message.textContent = '✓ QQ号已复制到剪贴板';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10002;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 300);
    }, 2000);
}

// 关闭QQ通知
function closeQQNotification() {
    const notification = document.querySelector('.qq-fallback-notification');
    const overlay = document.querySelector('.qq-notification-overlay');
    
    if (notification) {
        notification.style.animation = 'slideOutScale 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }
    
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 300);
    }
} 
