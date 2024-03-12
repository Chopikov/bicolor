import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../images/logo.png';
import './index.scss';
import marker from '../../images/marker.png';
import telegram from '../../images/telegram-black.svg';

export function HeaderComponent(props) {
  const handlePhoneClick = ev => {
    ym(28484821, 'reachGoal', 'click_phone');
  };
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header_logo" />
      </Link>
      <div className="header_links">
        <Link to="/pokraska">
          <img src={marker} alt="marker" />
          Покраска
        </Link>
        <Link to="/pravka">
          <img src={marker} alt="marker" />
          Правка
        </Link>
      </div>
      <div className="header_flex">
        <div className="header_city">
          <Select
            value={props.current}
            onChange={ev => props.change(ev.target.value)}
          >
            {Object.keys(props.cities).map(function(el) {
              return (
                <MenuItem key={el} value={el}>
                  {props.cities[el].name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="header_contacts">
          <span className="header_contacts_item">
            <a
              href={`tel:${props.cities[props.current].phone}`}
              onClick={handlePhoneClick}
            >
              {props.cities[props.current].phone}
            </a>
          </span>
          <span className="header_contacts_call" onClick={props.openModal}>
            Заказать звонок
          </span>
        </div>
      </div>
      <div className="header_networks">
        <a
          className="icon vk"
          target="_blank"
          href="https://vk.com/club87124090"
        >
          <FontAwesomeIcon icon={['fab', 'vk']} />
        </a>
        <a
          className="icon instagram"
          target="_blank"
          href="https://t.me/BIKOLOR"
        >
          <img src={telegram} className="icon-image" alt="telegram" />
        </a>
      </div>
    </div>
  );
}

HeaderComponent.propTypes = {
  cities: PropTypes.object,
  current: PropTypes.string,
  change: PropTypes.func,
  openModal: PropTypes.func,
};
