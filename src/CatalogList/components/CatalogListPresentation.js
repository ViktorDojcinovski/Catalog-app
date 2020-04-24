import React from 'react';
import { faTools, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

import { MainSearch } from '../../common/MainSearch';
import { CatalogAbstractList } from '../../common/CatalogAbstractList';
import { PartnerLabel } from '../../common/PartnerLabel';
import { CategoryLabel } from '../../common/CategoryLabel';

import { Ad } from './Ad';

const CatalogListPresentation = props => {
  const filteredCatalogs = props.catalogs.filter(catalog => {
    return catalog.name.toLowerCase().includes(props.searchfield.toLowerCase());
  });

  let showAllLabel = props.activeFilterItemValue ? (
    <h5 onClick={props.getAllCatalogs}> Show All </h5>
  ) : (
    ''
  );

  return (
    <section className='main'>
      <div className='contentWrapper'>
        <Ad id={'top_ad'} />
        <div className='filtersWrapper'>
          <h3> Filters </h3> {showAllLabel}
          <div className='searchBarWrapper'>
            <MainSearch onSearchChange={props.onSearchCallback} />
          </div>
          <div className='partnersListWrapper'>
            <h4> Filter by magazine: </h4>
            <div>
              {props.partners.map(partner => {
                return (
                  <PartnerLabel
                    key={partner._id}
                    name={partner.prefferedName}
                    avatar={partner.avatar}
                    customAvatar={partner.customAvatar}
                    isActive={
                      props.activeFilterItemValue === partner.prefferedName
                    }
                    clicked={event =>
                      props.onClickHandler(event, 'email', partner.email)
                    }
                  />
                );
              })}
            </div>
          </div>
          <div className='categoriesListWrapper'>
            <h4> Filter by product category: </h4>
            <div>
              {[
                { name: 'grocery', icon: faShoppingBasket },
                { name: 'toolkits', icon: faTools }
              ].map(category => {
                return (
                  <CategoryLabel
                    key={category.name}
                    name={category.name}
                    icon={category.icon}
                    isActive={props.activeFilterItemValue === category.name}
                    clicked={event =>
                      props.onClickHandler(event, 'category', category.name)
                    }
                  >
                    {category}
                  </CategoryLabel>
                );
              })}
            </div>
          </div>
          <Ad id={'filters_ad'} />
        </div>
        <div className='listWrapper'>
          <CatalogAbstractList
            title='Latest Catalogs'
            catalogs={filteredCatalogs}
          />
        </div>
      </div>
    </section>
  );
};

export default CatalogListPresentation;
