import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { search } from '../../Services/CRUD/Profiles';
import ProfilesComponent from '../../Components/Profile/ProfilesComponent';
import { ProfilesSkeletonLoader } from '../../Layouts/Loaders/ProfilesSkeletonLoader';
import ProfilesLayout from '../../Layouts/Profiles';
import '../../Assets/Styles/Profile.css';

const Profiles = () => {
  const [searchValue, setSearchValue] = useState('');

  const { mutate: searchQuery, isLoading, data: searchData } = useMutation(
    'search',
    () => search(searchValue),
  );
  const searchProfiles = searchData?.data?.data || null;

  useEffect(() => {
    const timeout = setTimeout(
      () => searchQuery(),
      800,
    );

    return () => clearTimeout(timeout);
  }, [searchValue]);

  const textFieldOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <ProfilesLayout
      title="Profiles"
      endActions={(
        <TextField
          value={searchValue}
          onChange={textFieldOnChange}
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
    )}
    >
      <ProfilesSkeletonLoader show={isLoading} count={5} />

      <ProfilesComponent profiles={searchProfiles} />
    </ProfilesLayout>
  );
};

export default Profiles;
