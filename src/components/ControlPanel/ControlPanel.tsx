import React from 'react';
import classes from './ControlPanel.module.scss';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';

const ControlPanel: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  interface OptionType {
    label: string;
    value: string;
  }

  const sortSelectOptions: OptionType[] = [
    { value: 'asc', label: 'default' },
    { value: 'desc', label: 'decrease' },
    { value: 'popular', label: 'popular' },
    { value: 'price:desc', label: 'expensive' },
    { value: 'price:asc', label: 'cheap' },
  ];
  const limitSelectOptions: OptionType[] = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '30', label: '30' },
  ];

  const handleOnChangeLimit = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      params.set('limit', selectedOption.value);
      setSearchParams(params);
    }
  };
  const getValueLimit = () => {
    const selectValue = searchParams.get('limit');
    return selectValue ? limitSelectOptions.find((item) => item.value === selectValue) : null;
  };
  const getValueSort = () => {
    const selectValue = searchParams.get('sort');
    return selectValue ? sortSelectOptions.find((item) => item.value === selectValue) : null;
  };

  const handleOnChangeSort = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      params.set('sort', selectedOption.value);
      setSearchParams(params);
    }
  };
  return (
    <div className={classes.wrapper_selects}>
      <Select
        classNamePrefix={classes.customSelect}
        options={sortSelectOptions}
        onChange={handleOnChangeSort}
        placeholder="Sort by"
        value={getValueSort()}
      />

      <Select
        classNamePrefix={classes.customSelect}
        options={limitSelectOptions}
        onChange={handleOnChangeLimit}
        value={getValueLimit()}
        placeholder="Show by"
      />
    </div>
  );
};

export default ControlPanel;
