import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';
import { MenuItem, Select } from '@material-ui/core';
import telegram from '../../images/telegram-white.svg';

export function ContactsComponent(props) {
  const handlePhoneClick = ev => {
    ym(28484821, 'reachGoal', 'click_phone');
  };
  return (
    <section className="contacts">
      <span className="section-title">Контактная информация</span>
      <div className="contacts_content">
        <div className="contacts_content_contacts">
          <div className="city-select">
            <span>Ваш город: </span>
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
          <div className="item location">
            <span className="icon">
              <FontAwesomeIcon icon="map-marker-alt" />
            </span>
            <div className="values">
              <span>
                г. {props.cities[props.current].name},{' '}
                {props.cities[props.current].address}
              </span>
            </div>
          </div>
          <div className="item phone">
            <span className="icon">
              <FontAwesomeIcon icon="mobile-alt" />
            </span>
            <div className="values">
              <span>
                <a
                  href={`tel:${props.cities[props.current].phone}`}
                  onClick={handlePhoneClick}
                >
                  {props.cities[props.current].phone}
                </a>
              </span>
            </div>
          </div>
          <div className="item email">
            <span className="icon">
              <FontAwesomeIcon icon={['far', 'envelope']} />
            </span>
            <a href="mailto:bikolor24@gmail.com">bikolor24@gmail.com</a>
          </div>
          <div className="item social-networks">
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
        <div className="map-container">
          <YMaps>
            <Map
              state={{
                center: props.cities[props.current].position,
                zoom: 16,
              }}
              defaultOptions={{
                maxZoom: 19,
                minZoom: 10,
              }}
              style={{
                width: '35vw',
                minWidth: '300px',
                height: '22vw',
                minHeight: '200px',
              }}
            >
              <ZoomControl options={{ float: 'right' }} />
              {Object.keys(props.cities).map(el => (
                <Placemark
                  key={el}
                  geometry={props.cities[el].position}
                  properties={{
                    hintContent: props.cities[el].address,
                  }}
                />
              ))}
            </Map>
          </YMaps>
        </div>
      </div>
    </section>
  );
}

ContactsComponent.propTypes = {
  cities: PropTypes.object,
  current: PropTypes.string,
  change: PropTypes.func,
};
