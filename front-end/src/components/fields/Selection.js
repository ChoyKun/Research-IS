import React from 'react';
import uniqid from 'uniqid';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
const filterer = createFilterOptions();

const Selection = ({ options, width, freeSolo, multiple, onAddNew, onChange, label, placeholder }) => {
	const [opts, setOpts] = React.useState( options );
	const [selected, setSelected] = React.useState( [] );

	const handleAddToOpts = newOpt => {
		console.log( newOpt );
		setOpts(opts => [ ...opts, newOpt ]);
	}

	const handleSelect = newVal => {
		setSelected(selected => [ ...selected, newVal ]);
	}

	React.useEffect(() => {
		if( opts.length !== options.length )
			onAddNew?.(opts[ opts.length - 1 ]);
	}, [opts]);

	React.useEffect(() => {
		onChange?.( multiple ? selected : selected[ 0 ] );
	}, [selected]);

	return(
		<>
			<Autocomplete
				sx={{ width: width, marginBottom: '10px' }}
				freeSolo={!!freeSolo}
				multiple={!!multiple}
				options={options}
				selectOnFocus
				handleHomeEndKeys
				renderOption={(props, option) => <li {...props}>{ option }</li>}
				getOptionLabel={(option) => {
			        // Value selected with enter, right from the input
			        if( typeof option === 'string' ) {
			          return option;
			        }
			      
			        // Add "xxx" option created dynamically
			        if( option?.inputValue ) {
			          return option.inputValue;
			        }
			      
			        // Regular option
			        return option.title;
				}}

				filterOptions={(options, params) => {
			        const filtered = filterer(options, params);

			        const { inputValue } = params;

			        // console.log( options );
			        // Suggest the creation of a new value
			        const isExisting = options.some((option) => inputValue === option);
			        if (inputValue !== '' && !isExisting) {
						filtered.push( inputValue );
			        }

			        return filtered;
				}}

				renderInput={(params) => 
					<TextField 
						{...params} 
						label={label}
						placeholder={placeholder}
						variant="standard"
						fullWidth
						sx={{ width: width }}
					/>
				}

				onChange={(_, newValue) => {
					if (typeof newValue === 'string') {
						handleSelect( newValue );
					} else if (newValue && newValue.inputValue) {
						// Create a new value from the user input
						handleSelect(newValue.inputValue);
						handleAddToOpts(newValue.inputValue);
					} else {
						console.log( newValue );
						handleSelect( newValue );
					}
				}}
			/>	
		</>
	);
}

export default Selection;