import { Person } from '@/models';
import { addFavorite } from '@/redux/states';
import { AppStore } from '@/redux/store';
import { Checkbox } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type PeopleTableProps = {
  // types...
};

const PeopleTable: React.FC<PeopleTableProps> = ({}) => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const dispatch = useDispatch();

  const pageSize = 5;

  const statePeople = useSelector((store: AppStore) => store.people);
  const stateFavorites = useSelector((store: AppStore) => store.favorites);

  const findPerson = (person: Person) =>
    !!stateFavorites.find((p) => p.id === person.id);

  const filterPerson = (person: Person) =>
    stateFavorites.filter((p) => p.id !== person.id);

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person)
      ? filterPerson(person)
      : [...selectedPeople, person];
    dispatch(addFavorite(filteredPeople));
    setSelectedPeople(filteredPeople);
  };

  const columns = [
    {
      field: 'actions',
      headerName: '',
      width: 50,
      type: 'actions',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <Checkbox
              size="small"
              checked={findPerson(params.row)}
              onChange={() => handleChange(params.row)}
            />
          }
        </>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'category',
      headerName: 'Categories',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'company',
      headerName: 'Company',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'levelOfHappiness',
      headerName: 'Level of happiness',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ];

  useEffect(() => {
    setSelectedPeople(stateFavorites);
  }, [stateFavorites]);

  return (
    <DataGrid
      initialState={{ pagination: { paginationModel: { pageSize, page: 0 } } }}
      rows={statePeople}
      columns={columns}
      disableColumnSelector
      autoHeight
      disableRowSelectionOnClick
      disableDensitySelector
      pageSizeOptions={[pageSize]}
      getRowId={(row: any) => row.id}
    />
  );
};

export default PeopleTable;
