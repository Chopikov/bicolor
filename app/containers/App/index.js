/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import emailjs from 'emailjs-com';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog } from '@material-ui/core';
import MaskedInput from 'react-text-mask/dist/reactTextMask';
import PropTypes from 'prop-types';
import Tabletop from 'tabletop';
import PravkaPage from '../PravkaPage';
import PokraskaPage from '../PokraskaPage';
import GlobalStyle from '../../global-styles';
import { parseGoogleSheet } from '../../utils/parseGoogleSheet';

const TextMaskCustom = props => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        '+',
        '7',
        '-',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar="_"
      showMask={false}
    />
  );
};

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function App() {
  const [city, setCity] = useState('kra');
  const [modalForm, setModalForm] = useState({
    show: false,
    name: '',
    phone: '',
    status: 'form',
  });
  const [sheets, setSheets] = useState({});
  useEffect(() => {
    const listId = '1ViLxN9d0n7yZyVkkUrFBLjP36ceRaiboT9YHsp5K24g';
    const apiKey = 'AIzaSyBtgoIkE1xhmcTzhIwqFWVROMYUpP0r-BU';
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${listId}?key=${apiKey}`,
    ).then(response => {
      if (response.ok) {
        response.json().then(data => {
          const sheetsList = data.sheets.reduce(
            (acc, el) => [...acc, el.properties.title],
            [],
          );
          fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${listId}/values:batchGet?key=${apiKey}${sheetsList
              .map(el => `&ranges=${el}`)
              .join('')}`,
          ).then(resp => {
            if (resp.ok) {
              resp.json().then(allData => {
                setSheets(
                  allData.valueRanges.reduce(
                    (acc, el) => ({
                      ...acc,
                      ...parseGoogleSheet(el),
                    }),
                    {},
                  ),
                );
              });
            }
          });
        });
      }
    });
  }, []);
  const handleChange = value => {
    setCity(value);
  };
  const handleFormChange = ev => {
    setModalForm({
      ...modalForm,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleFormSubmit = ev => {
    ev.preventDefault();
    const template = {
      ...modalForm,
      city,
    };
    ym(28484821, 'reachGoal', 'zakaz_zvonka');
    emailjs
      .send('service_u9nh2d6', 'gmail', template, 'user_WMeCZN1QgdHpppLtqZcZr')
      .then(() => {
        setModalForm({
          show: true,
          name: '',
          phone: '',
          status: 'sent',
        });
      });
  };
  return (
    <div>
      <Dialog
        open={modalForm.show}
        onClose={() =>
          setModalForm({ show: false, name: '', phone: '', status: 'form' })
        }
        classes={{
          paper: 'order-call-modal',
        }}
      >
        <FontAwesomeIcon
          icon={['fas', 'times']}
          onClick={() =>
            setModalForm({ show: false, name: '', phone: '', status: 'form' })
          }
        />
        {modalForm.status === 'form' && (
          <form onSubmit={handleFormSubmit}>
            <h3>Закажите звонок менеджера</h3>
            <TextField
              value={modalForm.name}
              label="Имя"
              placeholder="Введите имя"
              id="name"
              onChange={handleFormChange}
              required
            />
            <TextField
              id="phone"
              label="Номер телефона"
              placeholder="Введите номер телефона"
              required
              InputProps={{
                inputComponent: TextMaskCustom,
                value: modalForm.phone,
                onChange: handleFormChange,
              }}
            />
            <Button type="submit" variant="contained">
              Заказать звонок
            </Button>
          </form>
        )}
        {modalForm.status === 'sent' && (
          <div className="success">
            Спасибо! Ваша заявка на подбор цвета отправлена. Вам перезвонит наш
            менеджер в течение дня.
          </div>
        )}
      </Dialog>
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <HomePage
              {...props}
              city={city}
              handleChange={handleChange}
              setModalForm={setModalForm}
              sheets={sheets}
            />
          )}
        />
        <Route
          exact
          path="/pokraska"
          render={props => (
            <PokraskaPage
              {...props}
              city={city}
              handleChange={handleChange}
              setModalForm={setModalForm}
            />
          )}
        />
        <Route
          exact
          path="/pravka"
          render={props => (
            <PravkaPage
              {...props}
              city={city}
              handleChange={handleChange}
              setModalForm={setModalForm}
            />
          )}
        />
        <Route
          render={props => (
            <NotFoundPage
              {...props}
              city={city}
              handleChange={handleChange}
              setModalForm={setModalForm}
            />
          )}
        />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
