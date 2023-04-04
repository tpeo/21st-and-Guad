import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FormHelperText } from '@mui/material';
import { appTheme } from '../Theme';
import { useEffect } from "react";


const AddressSearchBar = ({ formData, setFormData, address, setAddress, addressValid, setAddressValid, onAddressChange }) => {
  
  useEffect(() => {
    if (onAddressChange) {
      onAddressChange(formData.address);
    }
  }, [formData.address]);
  
  return (
    <>
      <GooglePlacesAutocomplete
        selectProps={{
          value: address.label,
          onChange: async (newValue) => {
            await setFormData({
              ...formData,
              address: newValue.label,
            });
            setAddressValid(true);
          },
          styles: {
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused
                ? appTheme.palette.primary.main
                : state.isHovered
                ? appTheme.palette.primary.darkgrey
                : appTheme.palette.primary.lightgrey,
              borderRadius: 4,
              borderWidth: 1,
              borderStyle: "solid",
              "&:hover": {
                borderColor: appTheme.palette.primary.darkgrey,
              },
              "&:active": {
                borderColor: appTheme.palette.primary.main,
              },
            }),
            input: (provided) => ({
              ...provided,
              color: "black",
              padding: "12px 12px",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused
                ? appTheme.palette.primary.light
                : "transparent",
              "&:hover": {
                backgroundColor: appTheme.palette.primary.light,
              },
              "&:active": {
                backgroundColor: appTheme.palette.primary.light,
              },
            }),
            placeholder: (provided) => ({
              ...provided,
              color: appTheme.palette.primary.darkgrey,
              padding: "12px 12px",
            }),
          },
          components: {
            Placeholder: () => null,
          },
        }}
        apiKey={process.env.REACT_APP_MAPS_API_KEY}
        autocompletionRequest={{
          componentRestrictions: {
            country: ["us"],
          },
        }}
      />
      {!addressValid && (
        <FormHelperText error>Please enter a valid address</FormHelperText>
      )}
    </>
  );
};

export default AddressSearchBar;
