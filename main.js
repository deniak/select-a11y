const select = document.getElementById('js-multi-buttons');

const countries = [
  { code: "AF", country: "Afghanistan" },
  { code: "AX", country: "Åland Islands" },
  { code: "AL", country: "Albania" },
  { code: "DZ", country: "Algeria" },
  { code: "AS", country: "American Samoa" },
  { code: "AD", country: "Andorra" },
  { code: "AO", country: "Angola" },
  { code: "AI", country: "Anguilla" },
  { code: "AQ", country: "Antarctica" },
  { code: "AG", country: "Antigua And Barbuda" },
  { code: "AR", country: "Argentina" },
  { code: "AM", country: "Armenia" },
  { code: "AW", country: "Aruba" },
  { code: "AU", country: "Australia" },
  { code: "AT", country: "Austria" },
  { code: "AZ", country: "Azerbaijan" },
  { code: "BS", country: "Bahamas" },
  { code: "BH", country: "Bahrain" },
  { code: "BD", country: "Bangladesh" },
  { code: "BB", country: "Barbados" },
  { code: "BY", country: "Belarus" },
  { code: "BE", country: "Belgium" },
  { code: "BZ", country: "Belize" },
  { code: "BJ", country: "Benin" },
  { code: "BM", country: "Bermuda" },
  { code: "BT", country: "Bhutan" },
  { code: "BO", country: "Bolivia" },
  { code: "BQ", country: "Bonaire, Sint Eustatius and Saba" },
  { code: "BA", country: "Bosnia and Herzegovina" },
  { code: "BW", country: "Botswana" },
  { code: "BV", country: "Bouvet Island" },
  { code: "BR", country: "Brazil" },
  { code: "IO", country: "British Indian Ocean Territory" },
  { code: "BN", country: "Brunei Darussalam" },
  { code: "BG", country: "Bulgaria" },
  { code: "BF", country: "Burkina Faso" },
  { code: "BI", country: "Burundi" },
  { code: "KH", country: "Cambodia" },
  { code: "CM", country: "Cameroon" },
  { code: "CA", country: "Canada" },
  { code: "CV", country: "Cape Verde" },
  { code: "KY", country: "Cayman Islands" },
  { code: "CF", country: "Central African Republic" },
  { code: "TD", country: "Chad" },
  { code: "CL", country: "Chile" },
  { code: "CN", country: "China" },
  { code: "CX", country: "Christmas Island" },
  { code: "CC", country: "Cocos (Keeling) Islands" },
  { code: "CO", country: "Colombia" },
  { code: "KM", country: "Comoros" },
  { code: "CG", country: "Congo" },
  { code: "CD", country: "Congo, the Democratic Republic of the" },
  { code: "CK", country: "Cook Islands" },
  { code: "CR", country: "Costa Rica" },
  { code: "CI", country: "Côte d'Ivoire" },
  { code: "HR", country: "Croatia" },
  { code: "CU", country: "Cuba" },
  { code: "CW", country: "Curaçao" },
  { code: "CY", country: "Cyprus" },
  { code: "CZ", country: "Czech Republic" },
  { code: "DK", country: "Denmark" },
  { code: "DJ", country: "Djibouti" },
  { code: "DM", country: "Dominica" },
  { code: "DO", country: "Dominican Republic" },
  { code: "EC", country: "Ecuador" },
  { code: "EG", country: "Egypt" },
  { code: "SV", country: "El Salvador" },
  { code: "GQ", country: "Equatorial Guinea" },
  { code: "ER", country: "Eritrea" },
  { code: "EE", country: "Estonia" },
  { code: "ET", country: "Ethiopia" },
  { code: "FK", country: "Falkland Islands (Malvinas)" },
  { code: "FO", country: "Faroe Islands" },
  { code: "FJ", country: "Fiji" },
  { code: "FI", country: "Finland" },
  { code: "FR", country: "France" },
  { code: "GF", country: "French Guiana" },
  { code: "PF", country: "French Polynesia" },
  { code: "TF", country: "French Southern Territories" },
  { code: "GA", country: "Gabon" },
  { code: "GM", country: "Gambia" },
  { code: "GE", country: "Georgia" },
  { code: "DE", country: "Germany" },
  { code: "GH", country: "Ghana" },
  { code: "GI", country: "Gibraltar" },
  { code: "GR", country: "Greece" },
  { code: "GL", country: "Greenland" },
  { code: "GD", country: "Grenada" },
  { code: "GP", country: "Guadeloupe" },
  { code: "GU", country: "Guam" },
  { code: "GT", country: "Guatemala" },
  { code: "GG", country: "Guernsey" },
  { code: "GN", country: "Guinea" },
  { code: "GW", country: "Guinea-Bissau" },
  { code: "GY", country: "Guyana" },
  { code: "HT", country: "Haiti" },
  { code: "HM", country: "Heard Island and McDonald Islands" },
  { code: "VA", country: "Holy See (Vatican City State)" },
  { code: "HN", country: "Honduras" },
  { code: "HK", country: "Hong Kong" },
  { code: "HU", country: "Hungary" },
  { code: "IS", country: "Iceland" },
  { code: "IN", country: "India" },
  { code: "ID", country: "Indonesia" },
  { code: "IR", country: "Iran, Islamic Republic of" },
  { code: "IQ", country: "Iraq" },
  { code: "IE", country: "Ireland" },
  { code: "IM", country: "Isle of Man" },
  { code: "IL", country: "Israel" },
  { code: "IT", country: "Italy" },
  { code: "JM", country: "Jamaica" },
  { code: "JP", country: "Japan" },
  { code: "JE", country: "Jersey" },
  { code: "JO", country: "Jordan" },
  { code: "KZ", country: "Kazakhstan" },
  { code: "KE", country: "Kenya" },
  { code: "KI", country: "Kiribati" },
  { code: "KP", country: "Korea, Democratic People's Republic of" },
  { code: "KR", country: "Korea, Republic of" },
  { code: "KW", country: "Kuwait" },
  { code: "KG", country: "Kyrgyzstan" },
  { code: "LA", country: "Lao People's Democratic Republic" },
  { code: "LV", country: "Latvia" },
  { code: "LB", country: "Lebanon" },
  { code: "LS", country: "Lesotho" },
  { code: "LR", country: "Liberia" },
  { code: "LY", country: "Libyan Arab Jamahiriya" },
  { code: "LI", country: "Liechtenstein" },
  { code: "LT", country: "Lithuania" },
  { code: "LU", country: "Luxembourg" },
  { code: "MO", country: "Macao" },
  { code: "MG", country: "Madagascar" },
  { code: "MW", country: "Malawi" },
  { code: "MY", country: "Malaysia" },
  { code: "MV", country: "Maldives" },
  { code: "ML", country: "Mali" },
  { code: "MT", country: "Malta" },
  { code: "MH", country: "Marshall Islands" },
  { code: "MQ", country: "Martinique" },
  { code: "MR", country: "Mauritania" },
  { code: "MU", country: "Mauritius" },
  { code: "YT", country: "Mayotte" },
  { code: "MX", country: "Mexico" },
  { code: "FM", country: "Micronesia, Federated States of" },
  { code: "MD", country: "Moldova, Republic of" },
  { code: "MC", country: "Monaco" },
  { code: "MN", country: "Mongolia" },
  { code: "ME", country: "Montenegro" },
  { code: "MS", country: "Montserrat" },
  { code: "MA", country: "Morocco" },
  { code: "MZ", country: "Mozambique" },
  { code: "MM", country: "Myanmar" },
  { code: "NA", country: "Namibia" },
  { code: "NR", country: "Nauru" },
  { code: "NP", country: "Nepal" },
  { code: "NL", country: "Netherlands" },
  { code: "NC", country: "New Caledonia" },
  { code: "NZ", country: "New Zealand" },
  { code: "NI", country: "Nicaragua" },
  { code: "NE", country: "Niger" },
  { code: "NG", country: "Nigeria" },
  { code: "NU", country: "Niue" },
  { code: "NF", country: "Norfolk Island" },
  { code: "MK", country: "North Macedonia" },
  { code: "MP", country: "Northern Mariana Islands" },
  { code: "NO", country: "Norway" },
  { code: "OM", country: "Oman" },
  { code: "PK", country: "Pakistan" },
  { code: "PW", country: "Palau" },
  { code: "PS", country: "Palestinian Territory, Occupied" },
  { code: "PA", country: "Panama" },
  { code: "PG", country: "Papua New Guinea" },
  { code: "PY", country: "Paraguay" },
  { code: "PE", country: "Peru" },
  { code: "PH", country: "Philippines" },
  { code: "PN", country: "Pitcairn" },
  { code: "PL", country: "Poland" },
  { code: "PT", country: "Portugal" },
  { code: "PR", country: "Puerto Rico" },
  { code: "QA", country: "Qatar" },
  { code: "RE", country: "Réunion" },
  { code: "RO", country: "Romania" },
  { code: "RU", country: "Russian Federation" },
  { code: "RW", country: "Rwanda" },
  { code: "BL", country: "Saint Barthélemy" },
  { code: "SH", country: "Saint Helena" },
  { code: "KN", country: "Saint Kitts and Nevis" },
  { code: "LC", country: "Saint Lucia" },
  { code: "MF", country: "Saint Martin (French Part)" },
  { code: "PM", country: "Saint Pierre and Miquelon" },
  { code: "VC", country: "Saint Vincent and the Grenadines" },
  { code: "WS", country: "Samoa" },
  { code: "SM", country: "San Marino" },
  { code: "ST", country: "Sao Tome and Principe" },
  { code: "SA", country: "Saudi Arabia" },
  { code: "SN", country: "Senegal" },
  { code: "RS", country: "Serbia" },
  { code: "SC", country: "Seychelles" },
  { code: "SL", country: "Sierra Leone" },
  { code: "SG", country: "Singapore" },
  { code: "SX", country: "Sint Maarten (Dutch Part)" },
  { code: "SK", country: "Slovakia" },
  { code: "SI", country: "Slovenia" },
  { code: "SB", country: "Solomon Islands" },
  { code: "SO", country: "Somalia" },
  { code: "ZA", country: "South Africa" },
  { code: "GS", country: "South Georgia and the South Sandwich Islands" },
  { code: "SS", country: "South Sudan" },
  { code: "ES", country: "Spain" },
  { code: "LK", country: "Sri Lanka" },
  { code: "SD", country: "Sudan" },
  { code: "SR", country: "Suriname" },
  { code: "SJ", country: "Svalbard and Jan Mayen" },
  { code: "SZ", country: "Swaziland" },
  { code: "SE", country: "Sweden" },
  { code: "CH", country: "Switzerland" },
  { code: "SY", country: "Syrian Arab Republic" },
  { code: "TW", country: "Taiwan, Province of China" },
  { code: "TJ", country: "Tajikistan" },
  { code: "TZ", country: "Tanzania, United Republic of" },
  { code: "TH", country: "Thailand" },
  { code: "TL", country: "Timor-Leste" },
  { code: "TG", country: "Togo" },
  { code: "TK", country: "Tokelau" },
  { code: "TO", country: "Tonga" },
  { code: "TT", country: "Trinidad and Tobago" },
  { code: "TN", country: "Tunisia" },
  { code: "TR", country: "Turkey" },
  { code: "TM", country: "Turkmenistan" },
  { code: "TC", country: "Turks and Caicos Islands" },
  { code: "TV", country: "Tuvalu" },
  { code: "UG", country: "Uganda" },
  { code: "UA", country: "Ukraine" },
  { code: "AE", country: "United Arab Emirates" },
  { code: "GB", country: "United Kingdom" },
  { code: "US", country: "United States" },
  { code: "UM", country: "United States Minor Outlying Islands" },
  { code: "UY", country: "Uruguay" },
  { code: "UZ", country: "Uzbekistan" },
  { code: "VU", country: "Vanuatu" },
  { code: "VE", country: "Venezuela" },
  { code: "VN", country: "Vietnam" },
  { code: "VG", country: "Virgin Islands, British" },
  { code: "VI", country: "Virgin Islands, U.S." },
  { code: "WF", country: "Wallis and Futuna" },
  { code: "EH", country: "Western Sahara" },
  { code: "YE", country: "Yemen" },
  { code: "ZM", country: "Zambia" },
  { code: "ZW", country: "Zimbabwe" }
];

if (select) {
    countries.forEach(c => {
        const o = document.createElement('option');
        o.value = c.code;
        o.innerText = c.country;
        select.appendChild(o);
    });

    // options for all examples
    let options = [];
    select.querySelectorAll('option').forEach(option => 
        options.push({value: option.value, text: option.textContent})
    );

    select.hidden = true;

    /*
     * Helper constants and functions
     */

// make it easier for ourselves by putting some values in objects
// in TypeScript, these would be enums
    const Keys = {
        Backspace: 'Backspace',
        Clear: 'Clear',
        Down: 'ArrowDown',
        End: 'End',
        Enter: 'Enter',
        Escape: 'Escape',
        Home: 'Home',
        Left: 'ArrowLeft',
        PageDown: 'PageDown',
        PageUp: 'PageUp',
        Right: 'ArrowRight',
        Space: ' ',
        Tab: 'Tab',
        Up: 'ArrowUp'
    }

    const MenuActions = {
        Close: 0,
        CloseSelect: 1,
        First: 2,
        Last: 3,
        Next: 4,
        Open: 5,
        Previous: 6,
        Select: 7,
        Space: 8,
        Type: 9
    }

// filter an array of options against an input string
// returns an array of options that begin with the filter string, case-independent
    function filterOptions(options = [], filter, exclude = []) {
        return options.filter(option => {
            const matches = option.text.toLowerCase().indexOf(filter.toLowerCase()) === 0;
            return matches || exclude.includes(option.text);
        });
    }

// return an array of exact option name matches from a comma-separated string
    function findMatches(options, search) {
        const names = search.split(',');
        return names.map((name) => {
            const match = options.filter((option) => name.trim().toLowerCase() === option.toLowerCase());
            return match.length > 0 ? match[0] : null;
        })
            .filter((option) => option !== null);
    }

// return combobox action from key press
    function getActionFromKey(key, menuOpen) {
        // handle opening when closed
        if (!menuOpen && key === Keys.Down) {
            return MenuActions.Open;
        }

        // handle keys when open
        if (key === Keys.Down) {
            return MenuActions.Next;
        } else if (key === Keys.Up) {
            return MenuActions.Previous;
        } else if (key === Keys.Home) {
            return MenuActions.First;
        } else if (key === Keys.End) {
            return MenuActions.Last;
        } else if (key === Keys.Escape) {
            return MenuActions.Close;
        } else if (key === Keys.Enter) {
            return MenuActions.CloseSelect;
        } else if (key === Keys.Backspace || key === Keys.Clear || key.length === 1) {
            return MenuActions.Type;
        }
    }

// get index of option that matches a string
    function getIndexByLetter(options, filter) {
        const firstMatch = filterOptions(options, filter)[0];
        return firstMatch ? options.indexOf(firstMatch) : -1;
    }

// get updated option index
    function getUpdatedIndex(current, max, action) {
        // let currentOptions = elements.querySelectorAll(`[role=option]`)[current];
        switch (action) {
            case MenuActions.First:
                return 0;
            case MenuActions.Last:
                return max;
            case MenuActions.Previous:
                // const previousOption = currentOptions.previousElementSibling;
                // return previousOption ? previousOption.id.split('-').pop() : current;
                return Math.max(0, current - 1);
            case MenuActions.Next:
                // const nextOption = currentOptions.nextElementSibling;
                // return nextOption ? nextOption.id.split('-').pop() : current;
                return Math.min(max, current + 1);
            default:
                return current;
        }
    }

// check if an element is currently scrollable
    function isScrollable(element) {
        return element && element.clientHeight < element.scrollHeight;
    }

// ensure given child element is within the parent's visible scroll area
    function maintainScrollVisibility(activeElement, scrollParent) {
        const {offsetHeight, offsetTop} = activeElement;
        const {offsetHeight: parentOffsetHeight, scrollTop} = scrollParent;

        const isAbove = offsetTop < scrollTop;
        const isBelow = (offsetTop + offsetHeight) > (scrollTop + parentOffsetHeight);

        if (isAbove) {
            scrollParent.scrollTo(0, offsetTop);
        } else if (isBelow) {
            scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
        }
    }

    /*
     * Multiselect Combobox w/ Buttons code
     */
    const MultiselectButtons = function (el, options, multiple = true) {
        // element refs
        this.el = el;
        this.comboEl = el.querySelector('[role=combobox]');
        this.inputEl = el.querySelector('input');
        this.listboxEl = el.querySelector('[role=listbox]');

        this.idBase = this.inputEl.id;
        this.selectedEl = document.getElementById(`${this.idBase}-selected`);

        // data
        this.options = options;
        this.filteredOptions = options;

        // multiple select?
        select.multiple = multiple;

        // state
        this.activeIndex = 0;
        this.open = false;
    }

    MultiselectButtons.prototype.init = function () {

        this.inputEl.addEventListener('input', this.onInput.bind(this));
        this.inputEl.addEventListener('blur', this.onInputBlur.bind(this));
        this.inputEl.addEventListener('click', () => this.updateMenuState(true));
        this.inputEl.addEventListener('keydown', this.onInputKeyDown.bind(this));
    }

    MultiselectButtons.prototype.filterOptions = function (value) {
        if (value) {
            this.clearOptions();
            const selectedOptions = this.el.querySelectorAll('[role=option]');
            const selectedValues = [...selectedOptions].map(option => option.innerText);
            
            this.filteredOptions = filterOptions(this.options, value, selectedValues);

            this.filteredOptions.forEach(o => {
                const optionEl = [...options].find(optionEl => optionEl && optionEl.dataset ? optionEl.dataset.value === o.value : false);
                const alreadySelected = selectedValues.includes(o.text);
                if (!optionEl && !alreadySelected) {
                    const optionEl = document.createElement('li');
                    optionEl.setAttribute('role', 'option');
                    optionEl.id = `${this.idBase}-${this.options.indexOf(o)}`;
                    optionEl.className = 'combo-option';
                    optionEl.setAttribute('aria-selected', 'false');
                    optionEl.dataset.value = o.value;
                    optionEl.innerText = o.text;
                    optionEl.addEventListener('click', () => {
                        this.onOptionClick(this.options.indexOf(o));
                    });
                    optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));
                    this.listboxEl.appendChild(optionEl);
                }
            });

            // reorder options
            let children = [...this.listboxEl.children];
            children.sort((a, b) => {
                const aIndex = countries.findIndex(o => o.country === a.innerText);
                const bIndex = countries.findIndex(o => o.country === b.innerText);
                return (aIndex > bIndex) ? 1 : -1;
            });

            for (i = 0; i < children.length; ++i) {
                this.listboxEl.appendChild(children[i]);
            }
        }

    }

    MultiselectButtons.prototype.onInput = function () {
        const curValue = this.inputEl.value;
        if (curValue) {
            this.filterOptions(curValue);

            // if active option is not in filtered options, set it to first filtered option
            if (this.filteredOptions.indexOf(this.options[this.activeIndex]) < 0) {
                const firstFilteredIndex = this.options.indexOf(this.filteredOptions[0]);
                this.onOptionChange(firstFilteredIndex);
            }

            const menuState = this.filteredOptions.length > 0;
            if (this.open !== menuState) {
                this.updateMenuState(menuState, false);
            }
        } else {
            this.clearOptions();
        }
    }

    MultiselectButtons.prototype.onInputKeyDown = function (event) {
        const {key} = event;

        const max = this.filteredOptions.length - 1;
        const activeFilteredIndex = this.filteredOptions.indexOf(this.options[this.activeIndex]);

        const action = getActionFromKey(key, this.open);

        switch (action) {
            case MenuActions.Next:
            case MenuActions.Last:
            case MenuActions.First:
            case MenuActions.Previous:
                event.preventDefault();
                const nextFilteredIndex = getUpdatedIndex(activeFilteredIndex, max, action);
                const nextRealIndex = this.options.indexOf(this.filteredOptions[nextFilteredIndex]);
                return this.onOptionChange(nextRealIndex);
            case MenuActions.CloseSelect:
                event.preventDefault();
                return this.updateOption(this.activeIndex);
            case MenuActions.Close:
                event.preventDefault();
                return this.updateMenuState(false);
            case MenuActions.Open:
                return this.updateMenuState(true);
        }
    }

    MultiselectButtons.prototype.onInputBlur = function () {
        if (this.ignoreBlur) {
            this.ignoreBlur = false;
            return;
        }

        if (this.open) {
            this.updateMenuState(false, false);
        }
    }


    MultiselectButtons.prototype.onOptionChange = function (index) {
        this.activeIndex = index;
        this.inputEl.setAttribute('aria-activedescendant', `${this.idBase}-${index}`);

        // update active style
        const options = this.el.querySelectorAll('[role=option]');
        const currentOptions = this.el.querySelector(`[id=${this.idBase}-${index}]`);
        [...options].forEach((optionEl) => {
            optionEl.classList.remove('option-current');
        });
        
        if (currentOptions) {
            currentOptions.classList.add('option-current');

            if (this.open && isScrollable(this.listboxEl)) {
                maintainScrollVisibility(currentOptions, this.listboxEl);
            }
        }
    }

    MultiselectButtons.prototype.clearOptions = function () {
        const options = this.el.querySelectorAll('[role=option]');
        [...options].forEach(optionEl => {
            if (!optionEl.classList.contains('option-selected')) {
                optionEl.remove();
            }
        });
    }

    MultiselectButtons.prototype.onOptionClick = function (index) {
        // this.onOptionChange(index);
        this.updateOption(index);
        this.clearOptions();
        this.updateMenuState(false);
        this.inputEl.focus();
    }

    MultiselectButtons.prototype.onOptionMouseDown = function () {
        this.ignoreBlur = true;
    }

    MultiselectButtons.prototype.removeOption = function (option) {
        const index = this.options.indexOf(option);
        // const option = this.options[index];

        // update aria-selected
        // const options = this.el.querySelectorAll('[role=option]');
        const o = this.el.querySelector(`[id=${this.idBase}-${index}]`);
        o.setAttribute('aria-selected', 'false');
        o.classList.remove('option-selected');

        // remove button
        const buttonEl = document.getElementById(`${this.idBase}-remove-${index}`);
        this.selectedEl.removeChild(buttonEl.parentElement);

        select.querySelector('option[value="' + option.value + '"]').removeAttribute('selected');
    }

    MultiselectButtons.prototype.selectOption = function (option) {
        if (!select.multiple) { // simple select -> remove other selected options
            this.el.querySelectorAll('.option-selected').forEach(optionEl => {
                const index = this.options.findIndex(o => o.value === optionEl.dataset.value);
                this.removeOption(this.options[index]);
            });
        }
        const index = this.options.indexOf(option);
        const selected = this.options[index];
        this.activeIndex = index;

        // update aria-selected
        // const options = this.el.querySelectorAll('[role=option]');
        const o = this.el.querySelector(`[id=${this.idBase}-${index}]`);
        o.setAttribute('aria-selected', 'true');
        o.classList.add('option-selected');

        // add remove option button
        const buttonEl = document.createElement('button');
        const listItem = document.createElement('li');
        buttonEl.className = 'remove-option';
        buttonEl.type = 'button';
        buttonEl.id = `${this.idBase}-remove-${index}`;
        buttonEl.setAttribute('aria-describedby', `${this.idBase}-remove`);
        buttonEl.addEventListener('click', () => {
            this.removeOption(option);
        });
        buttonEl.innerHTML = selected.text + ' ';

        select.querySelector('option[value="' + option.value + '"]').setAttribute('selected', 'selected');

        listItem.appendChild(buttonEl);
        this.selectedEl.appendChild(listItem);
    }

    MultiselectButtons.prototype.updateOption = function (index) {
        const optionEl = this.el.querySelector(`[id=${this.idBase}-${index}]`);
        const isSelected = optionEl.getAttribute('aria-selected') === 'true';

        if (isSelected) {
            this.removeOption(this.options[index]);
        } else {
            this.selectOption(this.options[index]);
        }

        this.inputEl.value = '';
        this.filterOptions('');
    }

    MultiselectButtons.prototype.updateMenuState = function (open, callFocus = true) {
        this.open = open;

        this.comboEl.setAttribute('aria-expanded', `${open}`);
        open ? this.el.classList.add('open') : this.el.classList.remove('open');
        callFocus && this.inputEl.focus();
    }

    // init multiselect w/ top buttons
    const multiButtonEl = document.querySelector('.js-multi-buttons');

    if (multiButtonEl) {
        const multiButtonComponent = new MultiselectButtons(multiButtonEl, options);
        multiButtonComponent.init();
    }

    // init multiselect w/ inline buttons
    const inlineButtonEl = document.querySelector('.js-inline-buttons');
    if (inlineButtonEl) {
        const inlineButtonComponent = new MultiselectButtons(inlineButtonEl, options);
        inlineButtonComponent.init();
    }
}
