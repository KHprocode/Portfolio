from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, join_room
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat.db'
db = SQLAlchemy(app)
socketio = SocketIO(app)
login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(120))

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
@login_required
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username, password=password).first()
        if user:
            login_user(user)
            return redirect(url_for('index'))
    return render_template('login.html')

@socketio.on('join_room')
def handle_join_room(data):
    join_room(data['room'])
    send(current_user.username + ' has entered the room.', room=data['room'])

@socketio.on('message')
def handleMessage(msg):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    message_with_timestamp = f'[{timestamp}] {msg}'
    message = Message(content=message_with_timestamp)
    db.session.add(message)
    db.session.commit()
    socketio.emit('message', message_with_timestamp)

if __name__ == '__main__':
    db.create_all()
    socketio.run(app, debug=True)
