from flask import Flask, render_template, url_for, request, redirect, flash

app = Flask(__name__, 
    static_url_path='/static', 
    static_folder='static'
)
app.secret_key = 'your_secret_key'  # 设置 secret key 用于 flash 消息

# 添加上下文处理器来处理静态文件
@app.context_processor
def utility_processor():
    return dict(static_url=lambda filename: url_for('static', filename=filename))

@app.route('/')
def index():
    """首页路由"""
    return render_template('index.html')

@app.route('/about')
def about():
    """公司介绍页面路由"""
    return render_template('about.html')

@app.route('/testimonials')
def testimonials():
    """用户评论页面路由"""
    return render_template('testimonials.html')

@app.route('/join')
def join():
    """加入我们页面路由"""
    return render_template('join.html')

@app.route('/payment')
def payment():
    """支付页面路由"""
    return render_template('payment.html')

@app.route('/employee-portal')
def employee_portal():
    """员工入口页面路由"""
    return render_template('employee_portal.html')

@app.route('/work-rights')
def work_rights():
    """上班权购买页面路由"""
    return render_template('work_rights.html')

@app.route('/overtime')
def overtime():
    """加班额外付费页面路由"""
    return render_template('overtime.html')

@app.route('/performance')
def performance():
    """绩效充值页面路由"""
    return render_template('performance.html')

@app.route('/login', methods=['POST'])
def login():
    employee_id = request.form.get('employee_id')
    password = request.form.get('password')
    
    # 验证员工身份
    if employee_id == '18878877726' and password == '18878877726':
        return redirect(url_for('employee_qr'))
    elif employee_id == '18821154422' and password == '18821154422':
        return redirect(url_for('shareholder_qr'))
    else:
        # 添加嘲讽性的错误消息
        if not employee_id or not password:
            flash('连ID和密码都不会输？建议先充值智商！', 'error')
        elif employee_id != password:
            flash('密码都记不住？要不要买个记忆力充值套餐？', 'error')
        else:
            flash('ID都能输错，看来你很适合我们的付费上班套餐！', 'error')
        return redirect(url_for('employee_portal'))

@app.route('/employee-qr')
def employee_qr():
    return render_template('employee_qr.html')

@app.route('/shareholder-qr')
def shareholder_qr():
    return render_template('shareholder_qr.html')

if __name__ == '__main__':
    app.run(port=5050, debug=True)