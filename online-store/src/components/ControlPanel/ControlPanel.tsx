import React from 'react';
import classes from './ControlPanel.module.scss';
import { useSearchParams } from 'react-router-dom';

const ControlPanel: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams();

  const handleOnClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.name === 'limit') {
      if (searchParams.has('sort')) params.set('sort', searchParams.get('sort')!);
      if (searchParams.has('query')) params.set('query', searchParams.get('query')!);
      params.set('limit', e.currentTarget.value);
      setSearchParams(params);
    }

    if (e.currentTarget.name === 'sort') {
      if (searchParams.has('limit')) params.set('limit', searchParams.get('limit')!);
      if (searchParams.has('query')) params.set('query', searchParams.get('query')!);
      params.set('sort', e.currentTarget.value);
      setSearchParams(params);
    }
  };
  return (
    <div className={classes.wrapper_panel}>
      <div>
        <label>Sort by: </label>
        <select
          className={classes.sort}
          name="sort"
          value={searchParams.has('sort') ? searchParams.get('sort') ?? '' : 'asc'}
          onChange={handleOnClick}
        >
          <option value="asc">default</option>
          <option value="desc">decrease</option>
          <option value="popular">popular</option>
        </select>
      </div>
      <div>
        <label>Show by: </label>
        <select
          className={classes.limit}
          name="limit"
          value={searchParams.has('limit') ? searchParams.get('limit') ?? '' : '20'}
          onChange={handleOnClick}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  );
};

export default ControlPanel;
