from flask import Flask, render_template, url_for, request, redirect, flash, send_from_directory
from config.nav import NAV_ITEMS
import os

app = Flask(__name__, 
    static_url_path='/static', 
    static_folder='static'
)
app.secret_key = 'your_secret_key'

# 添加全局上下文处理器
@app.context_processor
def inject_nav():
    return dict(nav_items=NAV_ITEMS)

# 添加静态文件处理
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

# 路由处理
@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    """首页路由 - 处理所有返回首页的请求"""
    return render_template('index.html')

# 员工相关路由
@app.route('/employee-portal')
def employee_portal():
    """员工入口页面"""
    return render_template('employee_portal.html')

@app.route('/login', methods=['POST'])
def login():
    """处理员工登录"""
    employee_id = request.form.get('employee_id')
    password = request.form.get('password')
    
    if employee_id == '18878877726' and password == '18878877726':
        return redirect(url_for('employee_qr'))
    elif employee_id == '18821154422' and password == '18821154422':
        return redirect(url_for('shareholder_qr'))
    else:
        if not employee_id or not password:
            flash('连ID和密码都不会输？建议先充值智商！', 'error')
        elif employee_id != password:
            flash('密码都记不住？要不要买个记忆力充值套餐？', 'error')
        else:
            flash('ID都能输错，看来你很适合我们的付费上班套餐！', 'error')
        return redirect(url_for('employee_portal'))

@app.route('/employee-qr')
def employee_qr():
    """员工二维码页面"""
    return render_template('employee_qr.html')

@app.route('/shareholder-qr')
def shareholder_qr():
    """股东二维码页面"""
    return render_template('shareholder_qr.html')

# 支付相关路由
@app.route('/payment')
def payment():
    """支付页面路由"""
    return render_template('payment.html')

@app.route('/work-rights')
def work_rights():
    """上班权购买页面"""
    return render_template('work_rights.html')

@app.route('/overtime')
def overtime():
    """加班额外付费页面"""
    return render_template('overtime.html')

@app.route('/performance')
def performance():
    """绩效充值页面"""
    return render_template('performance.html')

# 统一处理所有返回首页的请求
@app.before_request
def handle_return_to_home():
    """在请求处理前检查是否需要返回首页"""
    if request.endpoint == 'index' or request.endpoint is None:
        return render_template('index.html')

# 处理所有未定义的路由
@app.errorhandler(404)
def page_not_found(e):
    """处理404错误，返回首页"""
    return redirect(url_for('index'))

# 添加返回首页的统一处理函数
@app.route('/back-to-home')
def back_to_home():
    """通用的返回首页处理"""
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(port=5050, debug=True)