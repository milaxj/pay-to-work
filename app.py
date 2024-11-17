from flask import Flask, render_template, url_for

app = Flask(__name__, 
    static_url_path='/static', 
    static_folder='static'
)

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

if __name__ == '__main__':
    app.run(port=5050, debug=True)