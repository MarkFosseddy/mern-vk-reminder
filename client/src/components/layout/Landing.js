import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <h1 className="text-center mb-5 display-3">
      Добро пожаловать в VK Reminder
    </h1>
    <p className="text-center mb-5">
      Онлайн сервис для создания напоминаний, которые будут отправлены вам сообщением во ВКонтакте.
    </p>

    <div className="pt-5">
      <Link to="/register" className="btn btn-primary btn-block">
        Регистрация
      </Link>
      <Link to="/login" className="btn btn-success btn-block m-0">
        Вход
      </Link>
    </div>

  </div>
);

export default Landing;
