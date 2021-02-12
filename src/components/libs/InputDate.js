import React from 'react';

function InputDate( { value, onChange, readOnly } ) {

    onChange = onChange || ( () => {} );

    const separator = '-';

    const _fullYear = year =>
      year >= 1900 && year <= 2099 
        ? year 
        : year >= 1 && year <= 99
        ? 2000 + year
        : 0;

    const _isLeap = year => year % 4 === 0 && ( year % 100 !== 0 || year % 400 === 0 );

    const _isValid = ( { date, month, year } ) => {
        if (
          Number.isInteger( date ) && date > 0 && 
          Number.isInteger( month ) && month > 0 && 
          Number.isInteger( year ) && year > 0 
        ) {

          return (
            ( [ 1, 3, 5, 7, 8, 10, 12 ].includes( month ) && date <= 31 ) ||
            ( [ 4, 6, 9, 11 ].includes( month ) && date <= 30 ) ||
            ( month === 2 && date <= 28 ) ||
            ( month === 2 && date === 29 && _isLeap( year ) )
          );

        }

        return false;
    }

    const _formatted = ( { date, month, year } ) =>
      String( date ).padStart( 2, '0' ) + separator +
      String( month ).padStart( 2, '0' ) + separator +
      year;

    const _analyzed = value => {
      const digits ='0123456789';

      const parts = [ '' ];
      for ( const x of value ) {
        if ( digits.includes( x ) ) {
          parts[ parts.length - 1 ] += x;
        } else {
          parts.push( '' );
        }
      }

      return {
        date: parts.length >=1 ? parseInt( parts[ 0 ] ) : null,
        month: parts.length >=2 ? parseInt( parts[ 1 ] ) : null,
        year: parts.length >=3 ? _fullYear( parseInt( parts[ 2 ] ) ) : null
      }
    }

    const _onBlur = event => {
        let value = event.target.value;
        const analyzed = _analyzed( value );
        value = _isValid( analyzed ) ? _formatted( analyzed ) : '';
        onChange( { target: { value } } );
    }

    return (
        <input
            value={ value !== null ? value : '' }
            onChange={ onChange }
            onBlur={ _onBlur }
            readOnly={ readOnly }
            placeholder={ `ΗΗ${separator}ΜΜ${separator}ΕΕΕΕ` }
        />
    )
}

export { InputDate };