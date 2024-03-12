import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Button } from '@material-ui/core';
import ScrollableAnchor from 'react-scrollable-anchor';
import './index.scss';

export default function OrderCallComponent() {
  const [isSent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    city: '',
    phone: '',
  });
  const [isLoading, setLoading] = useState(false);
  const handleChange = ev => {
    setForm({
      ...form,
      [ev.target.id]: ev.target.value,
    });
  };
  const submitForm = ev => {
    ev.preventDefault();
    setLoading(true);
    ym(28484821, 'reachGoal', 'zakaz_podbor');
    emailjs
      .send('service_u9nh2d6', 'gmail', form, 'user_WMeCZN1QgdHpppLtqZcZr')
      .then(() => {
        setForm({
          name: '',
          phone: '',
          city: '',
        });
        setSent(true);
        setLoading(false);
      });
  };
  return (
    <ScrollableAnchor id="order_call">
      <section className="call_form">
        <span className="free">Бесплатно!</span>
        <span className="color">
          Подбор цвета в любом удобном для вас месте
        </span>
        <div className="form-container">
          <div className="form-container_text">
            <p>
              Подбор цвета по каталогу, консультация. Выезд нашего специалиста в
              удобное для вас время и место в пределах города – бесплатно!
            </p>
            <p>Доставка покрашенных дисков до клиента – бесплатно!</p>
            <p>Можете оставить авто у нас!</p>
            <p>Расчет после всех работ!</p>
          </div>
          {!isSent && (
            <form onSubmit={submitForm} className="form-container_form">
              <label htmlFor="name">Имя</label>
              <input
                placeholder="Введите имя"
                value={form.name}
                id="name"
                onChange={handleChange}
                required
              />
              <label htmlFor="city">Город </label>
              <input
                placeholder="Введите Ваш город"
                value={form.city}
                id="city"
                onChange={handleChange}
                required
              />
              <label htmlFor="phone">Телефон</label>
              <input
                placeholder="Пример: 8 902 910 1234"
                value={form.phone}
                id="phone"
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                className={`form-container_form_button ${
                  isLoading ? 'loading' : ''
                }`}
              >
                {isLoading ? 'Секундочку' : 'Заказать подбор цвета'}
              </Button>
            </form>
          )}
          {isSent && (
            <div className="message-sent">
              Ваш запрос на обратную связь отправлен. Свяжемся с Вами в
              ближайшее время. Спасибо!
            </div>
          )}
        </div>
      </section>
    </ScrollableAnchor>
  );
}
