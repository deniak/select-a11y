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
function filterOptions(options = [], filter, type) {
    return options.filter(option => {
        const text = option.text.toLowerCase();
        return (type && type === 'contains') ? text.indexOf(filter.toLowerCase()) != -1 : text.startsWith(filter.toLowerCase());
    });
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

// get updated option index
function getUpdatedIndex(current, max, action) {
    switch (action) {
        case MenuActions.First:
            return 0;
        case MenuActions.Last:
            return max;
        case MenuActions.Previous:
            return Math.max(0, current - 1);
        case MenuActions.Next:
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
const MultiselectButtons = function (selectEl, params) {
    let options = [];
    const baseId = selectEl.nextElementSibling.id.replace('-label', ''); // expect label to follow select
    selectEl.hidden = true;

    selectEl.querySelectorAll('option').forEach(option => {
        if (!option.disabled)
            options.push({value: option.value, text: option.textContent});
        }
    );

    // required elements for MultiselectButtons
    const span = document.createElement('span');
    span.id = baseId + '-remove';
    span.innerText = 'remove';
    span.style.display = 'none';
    selectEl.parentNode.appendChild(span);

    if (selectEl.multiple) {
        const ul = document.createElement('ul');
        ul.id = baseId + '-selected';
        ul.classList.add('selected-options');
        selectEl.parentNode.appendChild(ul);
        this.selectedEl = ul;
    }

    const div = document.createElement('div');
    div.classList.add('combo');
    div.id = `${selectEl.id}-js-multi-buttons`;

    const divComboBox = document.createElement('div');
    divComboBox.setAttribute('role', 'combobox');
    divComboBox.setAttribute('aria-haspopup', 'listbox');
    divComboBox.setAttribute('aria-expanded', 'false');
    divComboBox.setAttribute('aria-owns', baseId + '-listbox');
    divComboBox.classList.add('input-wrapper');

    const input = document.createElement('input');
    input.setAttribute('aria-activedescendant', '');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-labelledby', baseId + '-label ' + baseId + '-selected');
    input.setAttribute('aria-controls', baseId + '-listbox');
    input.id = baseId + "-input";
    input.classList.add('combo-input');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('type', 'text');
    divComboBox.appendChild(input);

    const ulCombo = document.createElement('ul');
    ulCombo.setAttribute('role', 'listbox');
    ulCombo.setAttribute('aria-multiselectable', 'true');
    ulCombo.id = baseId + '-listbox';
    ulCombo.setAttribute('aria-labelledby', baseId + '-label');
    ulCombo.classList.add('combo-menu');

    div.appendChild(divComboBox);
    div.appendChild(ulCombo);
    selectEl.parentNode.appendChild(div);


    // element refs
    this.select = selectEl;
    this.el = div;
    this.comboEl = div.querySelector('[role=combobox]');
    this.inputEl = div.querySelector('input');
    this.listboxEl = div.querySelector('[role=listbox]');

    this.idBase = this.inputEl.id;

    // data
    this.options = options;
    this.filteredOptions = options;

    // params for ajax calls
    this.ajax = params.ajax;
    this.source = params.source;
    this.page = 1;
    this.morePages = false;
    this.ajaxResultCount;

    // state
    this.activeIndex = 0;
    this.open = false;
}

MultiselectButtons.prototype.init = function () {
    const self = this;
    let timeout = null;
    this.inputEl.addEventListener('input', async () => {
        // add 500ms delay to leave time for the user to type (ajax only)
        if (this.ajax) {
            clearTimeout(timeout);
            await new Promise(resolve => timeout = setTimeout(resolve, 500));
        }
        self.onInput();
    });
    this.inputEl.addEventListener('blur', this.onInputBlur.bind(this));
    this.inputEl.addEventListener('click', () => this.updateMenuState(true));
    this.inputEl.addEventListener('keydown', this.onInputKeyDown.bind(this));
}

const loadMoreResults = function(root, element, callback) {
    const options = {
      root,
      threshold: 0.5
    }
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        callback(entry.isIntersecting);
      });
    }, options);
  
    observer.observe(element);
  }
MultiselectButtons.prototype.filterOptions = async function (value) {
    if (value) {
        this.clearOptions();
        const selectedOptions = this.select.querySelectorAll('option:checked');
        const selectedValues = [...selectedOptions].map(option => option.innerText);

        this.filteredOptions = filterOptions(this.options, value, this.select.dataset.filtertype);

        const count = this.ajaxResultCount || this.filteredOptions.length;
        const c = document.createDocumentFragment();
        this.filteredOptions.forEach((o, k) => {
            const alreadySelected = selectedValues.includes(o.text);
            const optionEl = document.createElement('li');
            optionEl.setAttribute('role', 'option');
            optionEl.setAttribute('aria-setsize', count);
            optionEl.setAttribute('aria-posinset', k + 1);
            optionEl.id = `${this.idBase}-${this.options.indexOf(o)}`;
            optionEl.className = 'combo-option';
            optionEl.setAttribute('aria-selected', alreadySelected);
            optionEl.dataset.value = o.value;
            optionEl.innerText = o.text;
            if (alreadySelected) {
                optionEl.classList.add('option-selected');
            }
            optionEl.addEventListener('click', () => {
                this.onOptionClick(this.options.indexOf(o));
            });
            optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));
            c.appendChild(optionEl);

            if (this.ajax && this.source && this.morePages) {
                if (o === this.filteredOptions[this.filteredOptions.length - 1]) {
                    loadMoreResults(this.listboxEl, optionEl, async visible => {
                        if (visible) {
                            this.page++;
                            await this.updateResults();
                            this.filterOptions(value);
                        }
                    });
                }
            }
        });
        this.listboxEl.appendChild(c);
    }

}

MultiselectButtons.prototype.updateResults = async function() {
    const url = new URL(this.source);
    url.search = `${url.search ? url.search + '&' : '?'}q=${this.inputEl.value}&page=${this.page}`;
    const response = await fetch(url);
    const data = await response.json();
    data.results.forEach(c => {
        this.ajaxResultCount = data.total;
        if (!this.select.querySelector(`option[value="${c.id}"]`)) {
            const o = document.createElement('option');
            o.value = c.id;
            o.innerText = c.text;
            this.select.appendChild(o);
        }

        const option = {value: c.id, text: c.text};
        if (this.options.indexOf(option) === -1)
            this.options.push(option);
    });
    this.morePages = data.more || false;
}

MultiselectButtons.prototype.onInput = async function () {
    const curValue = this.inputEl.value;
    if (curValue) {
        if (this.ajax && this.source && curValue.length > 1) {
            await this.updateResults();
        }
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
            return this.onOptionClick(this.activeIndex);
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

    this.inputEl.value = '';
    if (!this.select.multiple) {
        const selectedOption = this.select.querySelector('option:checked');
        if (selectedOption) {
            this.inputEl.value = selectedOption.innerText;
        }
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
        optionEl.remove();
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

    // update aria-selected
    const o = this.el.querySelector(`[id=${this.idBase}-${index}]`);
    if (o) {
        o.setAttribute('aria-selected', 'false');
        o.classList.remove('option-selected');
    }

    // remove button
    if (this.selectedEl) {
        const buttonEl = document.getElementById(`${this.idBase}-remove-${index}`);
        this.selectedEl.removeChild(buttonEl.parentElement);
    }
    this.select.querySelector('option[value="' + option.value + '"]').removeAttribute('selected');
}

MultiselectButtons.prototype.selectOption = function (option) {
    const index = this.options.indexOf(option);
    const selected = this.options[index];
    this.activeIndex = index;

    // update aria-selected
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

    listItem.appendChild(buttonEl);
    if (this.select.multiple) {
        this.selectedEl.appendChild(listItem);
    } else {
        const selectedOption = this.select.querySelector("option[selected]");
        if (selectedOption) selectedOption.removeAttribute('selected');
    }
    this.select.querySelector('option[value="' + option.value + '"]').setAttribute('selected', 'selected');
}

MultiselectButtons.prototype.updateOption = function (index) {
    const optionEl = this.el.querySelector(`[id=${this.idBase}-${index}]`);
    const isSelected = optionEl.getAttribute('aria-selected') === 'true';

    this.inputEl.value = '';

    if (isSelected) {
        this.removeOption(this.options[index]);
    } else {
        this.selectOption(this.options[index]);
        if (!this.select.multiple) {
            this.inputEl.value = this.options[index].text;
        }
    }

    this.filterOptions('');
}

MultiselectButtons.prototype.updateMenuState = function (open, callFocus = true) {
    this.open = open;

    this.comboEl.setAttribute('aria-expanded', `${open}`);
    open ? this.el.classList.add('open') : this.el.classList.remove('open');
    callFocus && this.inputEl.focus();
}

export default MultiselectButtons;