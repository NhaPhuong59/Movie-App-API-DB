import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

function FMultiCheckbox({ name, options,getOptionLabel, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) =>
          field.value.includes(option)
            ? field.value.filter((value) => value !== option)
            : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={field.value.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

export default FMultiCheckbox;
